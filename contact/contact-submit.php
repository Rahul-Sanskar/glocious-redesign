<?php
/**
 * Glocious Infotech Pvt. Ltd. - Contact form handler.
 *
 * Receives submissions from /contact/ (both the main "Get Free Consultation"
 * form and the off-canvas "Schedule a Consultation" form) and emails them to
 * the configured recipient.
 *
 * Requirements: PHP 7.2+ on standard shared / cPanel hosting with a working
 * mail() transport. No external libraries or runtime API keys are required.
 *
 * reCAPTCHA: the site uses a Google reCAPTCHA v2 checkbox widget. The secret
 * key belongs to the site owner and is NOT stored in the repository. Set it in
 * RECAPTCHA_SECRET below (or via the GLOCIOUS_RECAPTCHA_SECRET environment
 * variable). When it is left empty, verification is skipped so the form still
 * works out of the box; add the secret before going live to enable protection.
 */

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

// Where enquiries are delivered.
const MAIL_TO = 'info@glocious.com';

// "From" address used for the notification email (must belong to your domain
// to avoid spam filtering on most shared hosts).
const MAIL_FROM = 'no-reply@glocious.com';

// Email subject prefix.
const SUBJECT_PREFIX = 'New Website Enquiry';

// Google reCAPTCHA v2 secret key. Fill this in for production.
// You can also define it in the environment: GLOCIOUS_RECAPTCHA_SECRET
const RECAPTCHA_SECRET = '';

// Minimum number of seconds a real visitor must spend on the form before
// submitting. Submissions that arrive faster are treated as bots.
const MIN_FILL_SECONDS = 3;

// Maximum number of submissions allowed per IP within the window below.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 3600; // seconds (1 hour)

// ---------------------------------------------------------------------------

/**
 * Redirect back to the contact page with a status code.
 */
function fail($code)
{
    header('Location: index.html?error=' . rawurlencode($code), true, 303);
    exit;
}

/**
 * Redirect back to the contact page on success.
 */
function succeed()
{
    header('Location: index.html?status=success', true, 303);
    exit;
}

/**
 * Trim + strip control characters / tags from a scalar input value.
 */
function clean($value, $maxLen = 500)
{
    if (!is_string($value)) {
        return '';
    }
    $value = str_replace(["\r", "\n", "%0a", "%0d"], ' ', $value);
    $value = strip_tags($value);
    $value = trim(preg_replace('/\s+/', ' ', $value));
    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $maxLen);
    }
    return substr($value, 0, $maxLen);
}

/**
 * Best-effort client IP address.
 */
function client_ip()
{
    foreach (['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'] as $key) {
        if (!empty($_SERVER[$key])) {
            $ip = trim(explode(',', $_SERVER[$key])[0]);
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }
    }
    return '0.0.0.0';
}

/**
 * Simple file based rate limiter keyed by IP.
 */
function rate_limit_exceeded($ip)
{
    $dir = sys_get_temp_dir() . '/glocious_rl';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
        return false; // cannot track -> do not block legitimate users
    }
    $file = $dir . '/' . md5($ip) . '.json';
    $now = time();

    $hits = [];
    if (is_readable($file)) {
        $decoded = json_decode(@file_get_contents($file), true);
        if (is_array($decoded)) {
            $hits = $decoded;
        }
    }

    // Keep only hits inside the window.
    $hits = array_values(array_filter($hits, function ($t) use ($now) {
        return ($now - (int) $t) < RATE_LIMIT_WINDOW;
    }));

    if (count($hits) >= RATE_LIMIT_MAX) {
        return true;
    }

    $hits[] = $now;
    @file_put_contents($file, json_encode($hits), LOCK_EX);
    return false;
}

/**
 * Verify a Google reCAPTCHA v2 response if a secret is configured.
 * Returns true when verification passes or is not configured.
 */
function recaptcha_ok($token, $ip)
{
    $secret = RECAPTCHA_SECRET !== ''
        ? RECAPTCHA_SECRET
        : (getenv('GLOCIOUS_RECAPTCHA_SECRET') ?: '');

    if ($secret === '') {
        return true; // not configured -> skip
    }
    if (!$token) {
        return false;
    }

    $post = http_build_query([
        'secret'   => $secret,
        'response' => $token,
        'remoteip' => $ip,
    ]);

    $ok = false;
    if (function_exists('curl_init')) {
        $ch = curl_init('https://www.google.com/recaptcha/api/siteverify');
        curl_setopt_array($ch, [
            CURLOPT_POST           => true,
            CURLOPT_POSTFIELDS     => $post,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 8,
        ]);
        $body = curl_exec($ch);
        curl_close($ch);
    } else {
        $ctx = stream_context_create([
            'http' => [
                'method'  => 'POST',
                'header'  => "Content-Type: application/x-www-form-urlencoded\r\n",
                'content' => $post,
                'timeout' => 8,
            ],
        ]);
        $body = @file_get_contents(
            'https://www.google.com/recaptcha/api/siteverify',
            false,
            $ctx
        );
    }

    if ($body) {
        $json = json_decode($body, true);
        $ok = !empty($json['success']);
    }
    return $ok;
}

// ---------------------------------------------------------------------------
// Request handling
// ---------------------------------------------------------------------------

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Location: index.html', true, 303);
    exit;
}

$ip = client_ip();

// Allow both the main form and the off-canvas form to post here.
$name    = clean($_POST['name'] ?? $_POST['full_name'] ?? '', 120);
$email   = clean($_POST['email'] ?? $_POST['business_email'] ?? '', 160);
$phone   = clean($_POST['phone'] ?? $_POST['phone_no'] ?? '', 20);
$website = clean($_POST['website'] ?? '', 200);
$subject = clean($_POST['subject'] ?? '', 160);
$city    = clean($_POST['city'] ?? $_POST['citys'] ?? '', 80);
$company = clean($_POST['company_name'] ?? '', 160);
$message = isset($_POST['message']) ? trim(strip_tags((string) $_POST['message'])) : '';
$message = function_exists('mb_substr') ? mb_substr($message, 0, 4000) : substr($message, 0, 4000);

// "service" may arrive as a single value (select) or multiple values (select[]).
$services = [];
$rawService = $_POST['service'] ?? null;
if (is_array($rawService)) {
    foreach ($rawService as $s) {
        $s = clean($s, 80);
        if ($s !== '') {
            $services[] = $s;
        }
    }
} elseif (is_string($rawService) && $rawService !== '') {
    $services[] = clean($rawService, 80);
}

// --- Validation -------------------------------------------------------------
if ($name === '' || strlen($name) < 2) {
    fail('bot');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail('bot');
}
if ($phone !== '' && !preg_match('/^[0-9]{6,15}$/', preg_replace('/\D/', '', $phone))) {
    fail('bot');
}

// --- Bot heuristics ---------------------------------------------------------
$loadedAt = isset($_POST['form_loaded_at']) ? (float) $_POST['form_loaded_at'] : 0;
if ($loadedAt > 0) {
    $elapsed = (microtime(true) * 1000 - $loadedAt) / 1000;
    if ($elapsed >= 0 && $elapsed < MIN_FILL_SECONDS) {
        fail('bot');
    }
}

// reCAPTCHA is only enforced for forms that actually render the widget
// (i.e. the POST contains a "g-recaptcha-response" field).
if (isset($_POST['g-recaptcha-response'])
    && !recaptcha_ok($_POST['g-recaptcha-response'], $ip)) {
    fail('bot');
}

if (rate_limit_exceeded($ip)) {
    fail('ip_limit');
}

// --- Compose the email ------------------------------------------------------
$eol = "\r\n";
$lines = [];
$lines[] = 'You have received a new enquiry from the Glocious website.';
$lines[] = '';
$lines[] = 'Name:    ' . $name;
$lines[] = 'Email:   ' . $email;
$lines[] = 'Phone:   ' . ($phone !== '' ? $phone : '-');
if ($website !== '') {
    $lines[] = 'Website: ' . $website;
}
if ($company !== '') {
    $lines[] = 'Company: ' . $company;
}
if ($city !== '') {
    $lines[] = 'City:    ' . $city;
}
if (!empty($services)) {
    $lines[] = 'Services: ' . implode(', ', $services);
}
if ($subject !== '') {
    $lines[] = 'Subject: ' . $subject;
}
$lines[] = '';
$lines[] = 'Message:';
$lines[] = ($message !== '' ? $message : '-');
$lines[] = '';
$lines[] = '--';
$lines[] = 'Submitted: ' . date('Y-m-d H:i:s');
$lines[] = 'IP:        ' . $ip;

$body = implode($eol, $lines);

$subjectLine = SUBJECT_PREFIX . ' - ' . $name;
if ($subject !== '') {
    $subjectLine .= ' (' . $subject . ')';
}

$headers = [
    'From: ' . MAIL_FROM,
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];

$sent = @mail(MAIL_TO, $subjectLine, $body, implode($eol, $headers));

if ($sent) {
    succeed();
}

fail('mail');
