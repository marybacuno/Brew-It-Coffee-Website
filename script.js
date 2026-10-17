//Brew It Coffee
//Your Name: Bacuño, Mary Angely M.
//Section: WD-202
//Today's Date: October 17, 2026

// Brew It Coffee: mobile menu + order form
(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (toggle && nav) {
    const setOpen = open => {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
    nav.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { setOpen(false); toggle.focus(); } });
    window.matchMedia('(min-width:700px)').addEventListener('change', e => { if (e.matches) setOpen(false); });
  }

  const form = document.getElementById('order-form');
  if (form) {
    const error = document.getElementById('form-error');
    const phoneOk = v => /^[0-9+\s-]{7,15}$/.test(v.trim());
    form.addEventListener('submit', e => {
      e.preventDefault();
      const fields = [...form.querySelectorAll('input, textarea')];
      fields.forEach(el => el.classList.remove('invalid'));
      const bad = fields.filter(el => !el.value.trim() || (el.type === 'tel' && !phoneOk(el.value)));
      if (bad.length) {
        bad.forEach(el => el.classList.add('invalid'));
        const phoneBad = bad.some(el => el.type === 'tel' && el.value.trim());
        error.textContent = phoneBad && bad.length === 1
          ? 'Please enter a valid contact number, such as 0967 676 6767.'
          : 'Please complete all required fields.';
        error.hidden = false;
        bad[0].focus();
        return;
      }
      error.hidden = true;
      window.location.href = 'confirm.html';
    });
  }
})();
