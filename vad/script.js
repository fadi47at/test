// =========================================================
// Fadi landing — ink-reveal mask + typewriter reveal
// =========================================================

(function () {
  // ---------- Ink-reveal hero mask ----------
  const hero = document.querySelector('.hero');
  const canvas = document.getElementById('heroMask');
  if (!hero || !canvas) return;

  const canHover = window.matchMedia('(hover: hover)').matches;
  if (!canHover) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const MASK = '252, 250, 248'; // --color-bg
  const R_START = 8;
  const R_END = 128;
  const R_VARY = 0.45;
  const LIFETIME = 520; // ms
  const STAMP_STEP = 12;
  const MAX_STAMPS = 160;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  let w = 0, h = 0;
  function resize() {
    const rect = hero.getBoundingClientRect();
    w = rect.width; h = rect.height;
    canvas.width = Math.round(w * DPR);
    canvas.height = Math.round(h * DPR);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgb(' + MASK + ')';
    ctx.fillRect(0, 0, w, h);
  }
  resize();
  window.addEventListener('resize', resize);

  const stamps = [];
  let lastX = null, lastY = null;

  function addStamp(x, y) {
    if (stamps.length >= MAX_STAMPS) stamps.shift();
    stamps.push({
      x, y,
      born: performance.now(),
      seed: Math.random() * Math.PI * 2,
      rmax: R_END * (1 - R_VARY + Math.random() * R_VARY),
    });
  }

  function stampAlong(x, y) {
    if (lastX === null) {
      addStamp(x, y);
    } else {
      const dx = x - lastX;
      const dy = y - lastY;
      const dist = Math.hypot(dx, dy);
      const steps = Math.max(1, Math.ceil(dist / STAMP_STEP));
      for (let i = 1; i <= steps; i++) {
        addStamp(lastX + (dx * i) / steps, lastY + (dy * i) / steps);
      }
    }
    lastX = x; lastY = y;
  }

  function carveInk(x, y, r, alpha, seed) {
    const g = ctx.createRadialGradient(x, y, r * 0.25, x, y, r);
    g.addColorStop(0, 'rgba(0, 0, 0, ' + 0.95 * alpha + ')');
    g.addColorStop(0.55, 'rgba(0, 0, 0, ' + 0.88 * alpha + ')');
    g.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    const segs = 32;
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      const wob = 0.78 + 0.14 * Math.sin(a * 3 + seed) + 0.08 * Math.sin(a * 7 + seed * 2.1) + 0.05 * Math.sin(a * 13 + seed * 0.7);
      const rr = r * wob;
      const px = x + Math.cos(a) * rr;
      const py = y + Math.sin(a) * rr;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
  }

  let running = false;
  function loop() {
    const now = performance.now();
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgb(' + MASK + ')';
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'destination-out';
    for (let i = stamps.length - 1; i >= 0; i--) {
      const t = (now - stamps[i].born) / LIFETIME;
      if (t >= 1) { stamps.splice(i, 1); continue; }
      const ease = 1 - Math.pow(1 - t, 3);
      const r = R_START + (stamps[i].rmax - R_START) * ease;
      const alpha = 1 - t * t;
      carveInk(stamps[i].x, stamps[i].y, r, alpha, stamps[i].seed);
    }
    if (stamps.length) requestAnimationFrame(loop);
    else running = false;
  }
  function start() { if (!running) { running = true; requestAnimationFrame(loop); } }

  hero.addEventListener('mouseenter', (e) => {
    const rect = hero.getBoundingClientRect();
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;
    stampAlong(lastX, lastY);
    start();
  });
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    stampAlong(e.clientX - rect.left, e.clientY - rect.top);
    start();
  });
  hero.addEventListener('mouseleave', () => { lastX = null; lastY = null; });
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
