// =========================================================
// Fadi landing — cursor paints the COLORFUL version onto the
// B&W hero. Like the original MiMo ink-brush, but reveals color.
// =========================================================

(function () {
  const hero = document.querySelector('.hero');
  const canvas = document.getElementById('heroPaint');
  if (!hero || !canvas) return;

  // Only on hover-capable devices
  if (!window.matchMedia('(hover: hover)').matches) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Brush geometry
  const R_START = 30;     // initial brush radius
  const R_END = 200;      // max brush radius
  const R_VARY = 0.35;    // per-stamp radius variation
  const LIFETIME = 2200;  // ms — how long a stamp stays before fading out
  const STAMP_STEP = 18;  // px between stamps along the cursor path
  const MAX_STAMPS = 220; // cap
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  // Test helper: ?paint=hold → never fade (for screenshot tests)
  const testParams = new URLSearchParams(window.location.search);
  const HOLD = testParams.get('paint') === 'hold';

  // Load the colorful image (this is what we paint)
  const colorImg = new Image();
  let imgReady = false;
  colorImg.onload = () => { imgReady = true; computeImagePlacement(); };
  colorImg.src = 'hero_bg_color.png';

  // We read the B&W image element's actual bounding rect to know exactly
  // where the painting happens. This way the painted color lines up
  // pixel-perfect with the visible B&W.
  const bgImg = hero.querySelector('.hero__bg--ink');

  let w = 0, h = 0;
  let imgW = 0, imgH = 0;
  let imgOffsetX = 0, imgOffsetY = 0;

  function computeImagePlacement() {
    const heroRect = hero.getBoundingClientRect();
    const bgRect = bgImg.getBoundingClientRect();
    w = heroRect.width;
    h = heroRect.height;
    imgW = bgRect.width;
    imgH = bgRect.height;
    imgOffsetX = bgRect.left - heroRect.left;
    imgOffsetY = bgRect.top - heroRect.top;
  }

  function resize() {
    const rect = hero.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * DPR);
    canvas.height = Math.round(h * DPR);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, w, h);
    computeImagePlacement();
  }
  resize();
  window.addEventListener('resize', resize);
  // Re-measure after fonts and images settle — the B&W image size
  // can change slightly once CSS fully resolves.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(computeImagePlacement);
  }
  colorImg.addEventListener && colorImg.addEventListener('load', computeImagePlacement);

  const stamps = [];
  let lastX = null, lastY = null;

  function addStamp(x, y) {
    if (stamps.length >= MAX_STAMPS) stamps.shift();
    stamps.push({
      x: x, y: y,
      born: performance.now(),
      seed: Math.random() * Math.PI * 2,
      rmax: R_END * (1 - R_VARY + Math.random() * R_VARY),
      scaleX: 1, scaleY: 1, offX: 0, offY: 0,
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

  // Compute where a stamp should sample the colorful image.
  // The B&W background and the color image are both rendered at 1440px wide
  // with the image's natural aspect, bottom-anchored inside the hero.
  // This function returns a slice of the color image that should be painted
  // at the cursor position, clipped to the image's actual placement.
  function getSourceRect(x, y, r) {
    if (!imgReady) return null;
    // Image-local coordinates of the stamp center:
    const lx = x - imgOffsetX;
    const ly = y - imgOffsetY;
    // Clip the stamp's footprint to the image bounds:
    const cx0 = Math.max(0, lx - r);
    const cy0 = Math.max(0, ly - r);
    const cx1 = Math.min(imgW, lx + r);
    const cy1 = Math.min(imgH, ly + r);
    if (cx1 <= cx0 || cy1 <= cy0) return null;
    // Map the clipped footprint back to source-image coordinates:
    const sx = cx0 * (colorImg.naturalWidth / imgW);
    const sy = cy0 * (colorImg.naturalHeight / imgH);
    const sw = (cx1 - cx0) * (colorImg.naturalWidth / imgW);
    const sh = (cy1 - cy0) * (colorImg.naturalHeight / imgH);
    return {
      sx: sx, sy: sy, sw: sw, sh: sh,
      dx: imgOffsetX + cx0,
      dy: imgOffsetY + cy0,
      dw: cx1 - cx0,
      dh: cy1 - cy0,
    };
  }

  // Draw one stamp: a soft circle that "stamps" the color image at
  // the cursor position. The soft edge comes from destination-in on a
  // radial gradient (alpha mask).
  function drawStamp(s, now) {
    const age = now - s.born;
    const t = age / LIFETIME; // 0..1
    if (t >= 1 && !HOLD) return false;

    // Expand smoothly (easeOutCubic), hold for a beat, then fade
    const expand = Math.min(1, t * 2.4);          // 0→1 in first ~40% of life
    const ease = 1 - Math.pow(1 - expand, 3);
    const r = R_START + (s.rmax - R_START) * ease;
    // Fade in quickly, hold, fade out
    const fadeIn = Math.min(1, t * 8);
    const fadeOut = t < 0.55 ? 1 : 1 - (t - 0.55) / 0.45;
    const alpha = HOLD ? 1 : Math.max(0, Math.min(1, fadeIn)) * Math.max(0, Math.min(1, fadeOut));

    const rect = getSourceRect(s.x, s.y, r);
    if (!rect) return true;

    // 1) Paint the color image slice to an offscreen-equivalent region on the
    //    main canvas. We use destination-over so the stamp adds to whatever
    //    is already there, never erasing existing paint.
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = alpha;
    try {
      ctx.drawImage(colorImg, rect.sx, rect.sy, rect.sw, rect.sh, rect.dx, rect.dy, rect.dw, rect.dh);
    } catch (e) {
      // Source rect may briefly fall outside the image — skip safely
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    return true;
  }

  let running = false;
  function loop() {
    const now = performance.now();
    // We DON'T clear the canvas — stamps accumulate. We just repaint them all
    // every frame so the "fade" reads as a smooth alpha transition.
    // To fade stamps, we need them to not paint themselves at full alpha.
    // Simplest: clear and redraw all stamps each frame, computing per-stamp alpha.
    ctx.clearRect(0, 0, w, h);
    for (let i = stamps.length - 1; i >= 0; i--) {
      const alive = drawStamp(stamps[i], now);
      if (!alive) stamps.splice(i, 1);
    }
    if (stamps.length || hasCursor) {
      requestAnimationFrame(loop);
    } else {
      running = false;
    }
  }
  function start() {
    if (!running) { running = true; requestAnimationFrame(loop); }
  }

  let hasCursor = false;
  hero.addEventListener('mouseenter', (e) => {
    hasCursor = true;
    const rect = hero.getBoundingClientRect();
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;
    stampAlong(lastX, lastY);
    hero.classList.add('is-painted');
    start();
  });
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    stampAlong(e.clientX - rect.left, e.clientY - rect.top);
    start();
  });
  hero.addEventListener('mouseleave', () => {
    hasCursor = false;
    lastX = null; lastY = null;
  });

  // Test helper: ?paint=1 or ?paint=hold → paint a diagonal trail on load
  if (testParams.get('paint') === '1' || HOLD) {
    const simulatePath = () => {
      const rect = hero.getBoundingClientRect();
      const startX = rect.width * 0.15, startY = rect.height * 0.55;
      const endX = rect.width * 0.85, endY = rect.height * 0.7;
      const steps = 40;
      hasCursor = true;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = startX + (endX - startX) * t;
        const y = startY + (endY - startY) * t + Math.sin(t * 6) * 30;
        stampAlong(x, y);
      }
      hero.classList.add('is-painted');
      start();
    };
    // Wait for the image to load before simulating
    const tryStart = () => {
      if (imgReady) simulatePath();
      else setTimeout(tryStart, 100);
    };
    tryStart();
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
