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

  // Brush geometry — a tight, sharp-cored ink droplet. Small + dense so
  // the color reveals crisp and the cursor feels responsive.
  const R_START = 12;     // initial brush radius (px)
  const R_END = 52;       // max brush radius
  const R_VARY = 0.5;     // per-stamp radius variation (more droplet feel)
  const LIFETIME = 1500;  // ms — how long a stamp stays before fading
  const STAMP_STEP = 9;   // px between stamps along the cursor path
  const MAX_STAMPS = 320; // cap
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  // Test helper: ?paint=hold → never fade (for screenshot tests)
  const testParams = new URLSearchParams(window.location.search);
  const HOLD = testParams.get('paint') === 'hold';

  // Load the colorful image (this is what we paint)
  const colorImg = new Image();
  let imgReady = false;
  colorImg.onload = () => { imgReady = true; };
  colorImg.src = 'hero_bg_color.png';

  // The B&W is a CSS background that fills the entire hero
  // (background-size: 100% 100%). The color image is mapped to the
  // same hero rectangle, so painting at any cursor position reveals
  // the color of the underlying B&W at that exact spot.
  let w = 0, h = 0;

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
  }
  resize();
  window.addEventListener('resize', resize);

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
  // The B&W CSS background fills the entire hero (background-size: 100% 100%),
  // so the color image is mapped 1:1 to the hero's pixel rectangle.
  // This function returns a slice of the color image clipped to the
  // stamp's footprint, ready to be drawn at the cursor position.
  function getSourceRect(x, y, r) {
    if (!imgReady) return null;
    // Clip the stamp's footprint to the hero bounds.
    const cx0 = Math.max(0, x - r);
    const cy0 = Math.max(0, y - r);
    const cx1 = Math.min(w, x + r);
    const cy1 = Math.min(h, y + r);
    if (cx1 <= cx0 || cy1 <= cy0) return null;
    // Map the footprint back to source-image coordinates:
    const sx = cx0 * (colorImg.naturalWidth / w);
    const sy = cy0 * (colorImg.naturalHeight / h);
    const sw = (cx1 - cx0) * (colorImg.naturalWidth / w);
    const sh = (cy1 - cy0) * (colorImg.naturalHeight / h);
    return {
      sx: sx, sy: sy, sw: sw, sh: sh,
      dx: cx0, dy: cy0, dw: cx1 - cx0, dh: cy1 - cy0,
    };
  }

  // Offscreen canvas used to compose each stamp with its soft edge mask
  // in isolation — that way the mask's destination-in never wipes other
  // stamps already on the main canvas.
  const stampCanvas = document.createElement('canvas');
  const stampCtx = stampCanvas.getContext('2d');

  // Draw one stamp: paint the color image slice, then mask its outer
  // edge with a soft radial gradient. The mask gives the stamp a sharp
  // core that fades to transparent at the edge — like real ink soaking
  // into paper — without blurring the colors themselves.
  function drawStamp(s, now) {
    const age = now - s.born;
    const t = age / LIFETIME; // 0..1
    if (t >= 1 && !HOLD) return false;

    // Expand smoothly (easeOutCubic), then fade
    const expand = Math.min(1, t * 2.4);
    const ease = 1 - Math.pow(1 - expand, 3);
    const r = R_START + (s.rmax - R_START) * ease;
    const fadeIn = Math.min(1, t * 8);
    const fadeOut = t < 0.45 ? 1 : 1 - (t - 0.45) / 0.55;
    const alpha = HOLD ? 1 : Math.max(0, Math.min(1, fadeIn)) * Math.max(0, Math.min(1, fadeOut));

    const rect = getSourceRect(s.x, s.y, r);
    if (!rect) return true;

    // Size the offscreen canvas to this stamp's footprint (in device pixels)
    const size = Math.ceil(r * 2);
    const dprSize = Math.ceil(size * DPR);
    if (stampCanvas.width !== dprSize || stampCanvas.height !== dprSize) {
      stampCanvas.width = dprSize;
      stampCanvas.height = dprSize;
    }
    stampCtx.setTransform(DPR, 0, 0, DPR, 0, 0);
    stampCtx.clearRect(0, 0, size, size);

    // 1) Paint the color image slice in the offscreen canvas.
    //    The stamp's top-left in hero coords is (s.x - r, s.y - r), so
    //    translate (rect.dx, rect.dy) into the offscreen coordinate space.
    const offX = rect.dx - (s.x - r);
    const offY = rect.dy - (s.y - r);
    stampCtx.globalAlpha = alpha;
    try {
      stampCtx.drawImage(colorImg, rect.sx, rect.sy, rect.sw, rect.sh, offX, offY, rect.dw, rect.dh);
    } catch (e) {
      return true;
    }
    stampCtx.globalAlpha = 1;

    // 2) Apply a radial-gradient soft-edge mask on the offscreen canvas.
    stampCtx.globalCompositeOperation = 'destination-in';
    const grad = stampCtx.createRadialGradient(r, r, 0, r, r, r);
    grad.addColorStop(0,    'rgba(0,0,0,1)');
    grad.addColorStop(0.5,  'rgba(0,0,0,0.95)');
    grad.addColorStop(0.8,  'rgba(0,0,0,0.4)');
    grad.addColorStop(1,    'rgba(0,0,0,0)');
    stampCtx.fillStyle = grad;
    stampCtx.fillRect(0, 0, size, size);

    // 3) Stamp the composited result onto the main canvas.
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(stampCanvas, 0, 0, dprSize, dprSize, s.x - r, s.y - r, size, size);
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
