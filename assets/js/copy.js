(function () {
    function showBadge(badge) {
      badge.classList.add('show');
      setTimeout(() => badge.classList.remove('show'), 1400);
    }
  
    async function copyText(pre, button, badge) {
      const text = pre.innerText.trim();
      if (!text) return;
  
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed';
          ta.style.left = '-9999px';
          document.body.appendChild(ta);
          ta.focus();
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        showBadge(badge);
        button.textContent = 'Copied';
        setTimeout(() => (button.textContent = 'Copy'), 1200);
      } catch (err) {
        console.error('Copy failed', err);
        alert('Press Ctrl/Cmd+C to copy manually');
      }
    }
  
    document.querySelectorAll('.copyBtn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-target');
        const pre = document.getElementById(id);
        const badge = document.getElementById('badge' + id.replace(/\D/g, ''));
        await copyText(pre, btn, badge);
      });
    });
  })();