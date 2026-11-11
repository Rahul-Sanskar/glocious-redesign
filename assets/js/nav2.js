// ================= BASIC SETUP =================
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("navMenu");
const navOverlay = document.getElementById("navOverlay");
const desktopMedia = window.matchMedia("(min-width: 991px)");

const isMobile = () => !desktopMedia.matches;

// ================= DRAWER =================
function openDrawer() {
    navMenu.classList.add("open");
    navOverlay.classList.add("show");
    navToggle.setAttribute("aria-expanded", "true");
}

function closeDrawer() {
    navMenu.classList.remove("open");
    navOverlay.classList.remove("show");
    navToggle.setAttribute("aria-expanded", "false");
}

navToggle?.addEventListener("click", () => {
    navMenu.classList.contains("open") ? closeDrawer() : openDrawer();
});

navOverlay?.addEventListener("click", closeDrawer);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("open")) {
        closeDrawer();
    }
});

// ================= RESET MOBILE STATE =================
function resetMobileDropdowns() {
    if (!isMobile()) return;

    document
        .querySelectorAll(".dropdown, .dropdown-level-2, .dropdown-level-3")
        .forEach(el => el.classList.remove("open"));
}

// ================= MOBILE LOGIC =================

// 👉 LEVEL-1 ONLY (Accordion)
document.querySelectorAll(".nav-item > .nav-links").forEach(link => {
    link.addEventListener("click", (e) => {
        if (!isMobile()) return;

        const dropdown = link.nextElementSibling;
        if (!dropdown || !dropdown.classList.contains("dropdown")) return;

        e.preventDefault(); // ONLY level-1 blocks navigation

        // close other level-1 dropdowns
        document.querySelectorAll(".dropdown.open")
            .forEach(d => d !== dropdown && d.classList.remove("open"));

        dropdown.classList.toggle("open");

        // 🔥 Level-2 ALWAYS OPEN (NO TOGGLE)
        if (dropdown.classList.contains("open")) {
            dropdown.querySelectorAll(".dropdown-level-2")
                .forEach(l2 => l2.classList.add("open"));
        }
    });
});

// ❌ NO CLICK HANDLER FOR LEVEL-2
// ❌ NO preventDefault FOR LEVEL-2
// 👉 Level-2 <a href=""> = PURE REDIRECT

// ================= DESKTOP ALIGNMENT =================
function resetInlineStylesOnMobile() {
    if (isMobile()) {
        document.querySelectorAll(".dropdown-level-2, .dropdown-level-3").forEach(el => {
            el.style.top = "";
            el.style.height = "";
            el.style.width = "";
            el.style.minWidth = "";
        });
    }
}

// Level-2 alignment
document.querySelectorAll(".dropdown > .has-children").forEach(li => {
    const sub = li.querySelector(".dropdown-level-2");
    const level1List = li.closest(".dropdown");
    if (!sub || !level1List) return;

    li.addEventListener("mouseenter", () => {
        if (!desktopMedia.matches) return;

        const offset = li.offsetTop;
        sub.style.top = -offset + "px";
        sub.style.height = level1List.offsetHeight + "px";
        sub.style.width = level1List.offsetWidth + "px";
        sub.style.minWidth = level1List.offsetWidth + "px";
    });
});

// Level-3 alignment
document.querySelectorAll(".dropdown-level-2 > .has-children").forEach(li => {
    const sub3 = li.querySelector(".dropdown-level-3");
    const level2List = li.closest(".dropdown-level-2");
    if (!sub3 || !level2List) return;

    li.addEventListener("mouseenter", () => {
        if (!desktopMedia.matches) return;

        const offset = li.offsetTop;
        sub3.style.top = -offset + "px";
        sub3.style.height = level2List.offsetHeight + "px";
        sub3.style.width = level2List.offsetWidth + "px";
        sub3.style.minWidth = level2List.offsetWidth + "px";
    });
});

// ================= BREAKPOINT CHANGE =================
desktopMedia.addEventListener("change", () => {
    resetInlineStylesOnMobile();
    resetMobileDropdowns();

    if (desktopMedia.matches) {
        closeDrawer();
    }
});

// ================= INITIAL LOAD =================
resetInlineStylesOnMobile();
resetMobileDropdowns();

const navCloseBtn = document.querySelector(".nav-close-btn");

navCloseBtn?.addEventListener("click", closeDrawer);