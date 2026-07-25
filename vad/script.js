// =========================================================
// Fadi landing — scroll-triggered B&W → color hero reveal
// =========================================================

(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Threshold = how far you scroll (in px) before the color reveal completes.
  // Tuned to roughly the hero height so the transition is "scroll through the hero".
  const THRESHOLD = () => Math.max(360, hero.offsetHeight * 0.85);

  let ticking = false;
  function update() {
    const y = window.scrollY || window.pageYOffset || 0;
    const t = Math.max(0, Math.min(1, y / THRESHOLD()));
    // ease-out so the first 20% of scroll does most of the work
    const eased = 1 - Math.pow(1 - t, 1.6);
    hero.classList.toggle('is-revealed', eased > 0.5);
    // Drive opacities directly so the transition is buttery, not gated by the class
    const ink = hero.querySelector('.hero__bg--ink');
    const color = hero.querySelector('.hero__bg--color');
    if (ink) ink.style.opacity = String(1 - eased);
    if (color) {
      color.style.opacity = String(eased);
      color.style.transform = `scale(${1.04 - eased * 0.04})`;
    }
    ticking = false;
  }
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();

  // Test helper: ?scroll=400 → instant scroll on load (for screenshot tests)
  const params = new URLSearchParams(window.location.search);
  const testScroll = parseInt(params.get('scroll') || '0', 10);
  if (testScroll > 0) {
    requestAnimationFrame(() => {
      window.scrollTo(0, testScroll);
    });
  }
})();

// =========================================================
// Hero subtitle typewriter (RTL-aware: chars revealed RTL)
// =========================================================
(function () {
  const sub = document.querySelector('.hero__subtitle');
  if (!sub) return;
  if (window.matchMedia('(max-width: 700px)').matches) return;
  const original = sub.textContent.trim();
  // Build RTL container — single line, centered
  sub.textContent = original;

  function type() {
    sub.textContent = '';
    sub.classList.add('is-typing');
    const chars = [];
    for (const ch of original) {
      const s = document.createElement('span');
      s.className = 'char';
      s.textContent = ch;
      sub.appendChild(s);
      chars.push(s);
    }
    const caret = document.createElement('span');
    caret.className = 'type-caret';
    caret.setAttribute('aria-hidden', 'true');
    sub.appendChild(caret);

    // RTL: reveal right-to-left by indexing from the end
    const DELAY = 50;
    const START = 350;
    chars.forEach((c, i) => {
      setTimeout(() => c.classList.add('is-typed'), START + (chars.length - 1 - i) * DELAY);
    });
    setTimeout(() => sub.classList.add('is-done'), START + chars.length * DELAY + 200);
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(type);
  } else {
    setTimeout(type, 100);
  }
})();

// =========================================================
// Card title typewriter on scroll
// =========================================================
(function () {
  const titles = document.querySelectorAll('.card__text h3');
  if (!titles.length || !('IntersectionObserver' in window)) return;

  const CHAR_DELAY = 50;

  titles.forEach((h3) => {
    const text = h3.textContent;
    h3.textContent = '';
    for (const c of text) {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = c;
      h3.appendChild(span);
    }
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.setAttribute('aria-hidden', 'true');
    h3.appendChild(cursor);
  });

  function animateType(h3) {
    if (h3.dataset.typed === '1') return;
    h3.dataset.typed = '1';
    h3.classList.add('is-active');
    const chars = h3.querySelectorAll('.char');
    // RTL: reveal from right (last char) to left (first char)
    chars.forEach((char, i) => {
      setTimeout(() => char.classList.add('is-typed'), i * CHAR_DELAY);
    });
    setTimeout(() => h3.classList.add('is-done'), chars.length * CHAR_DELAY + 200);
  }

  function snapShow(h3) {
    if (h3.dataset.typed === '1') return;
    h3.dataset.typed = '1';
    h3.classList.add('is-active', 'is-done');
    h3.querySelectorAll('.char').forEach((c) => c.classList.add('is-typed'));
  }

  const obs = new IntersectionObserver(
    (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) animateType(entry.target); }); },
    { threshold: 0.3 }
  );
  titles.forEach((h3) => obs.observe(h3));

  window.addEventListener('scroll', () => {
    const cut = window.innerHeight * 0.5;
    titles.forEach((h3) => {
      if (h3.dataset.typed === '1') return;
      if (h3.getBoundingClientRect().bottom < cut) snapShow(h3);
    });
  }, { passive: true });
})();

// =========================================================
// Terminal copy button
// =========================================================
(function () {
  const btn = document.querySelector('.terminal__copy');
  const terminal = document.querySelector('.terminal');
  if (!btn || !terminal) return;

  let resetTimer = 0;

  function fallbackCopy(text) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '-1000px';
      ta.style.left = '0';
      document.body.appendChild(ta);
      ta.focus(); ta.select();
      ta.setSelectionRange(0, text.length);
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch (err) { return false; }
  }

  function copy() {
    const text = terminal.getAttribute('data-copy-text') || '';
    const ok = fallbackCopy(text);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    if (!ok) return;
    btn.classList.add('is-copied');
    if (resetTimer) clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => btn.classList.remove('is-copied'), 1500);
  }

  btn.addEventListener('click', copy);
})();

// =========================================================
// Smooth scroll for in-page links
// =========================================================
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const href = link.getAttribute('href');
  if (href.length < 2) return;
  const t = document.querySelector(href);
  if (!t) return;
  e.preventDefault();
  t.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
