// =========================================================
// Fadi landing — cursor paints the COLORFUL version onto the
// B&W surfaces (hero + cards). Like the original MiMo ink-brush,
// but reveals color where the cursor passes.
// =========================================================

(function () {
  // Only on hover-capable devices
  if (!window.matchMedia('(hover: hover)').matches) return;

  // Test helper: ?paint=hold → never fade (for screenshot tests)
  const testParams = new URLSearchParams(window.location.search);
  const HOLD = testParams.get('paint') === 'hold';

  // Offscreen canvas used to compose each stamp with its soft edge
  // mask — kept module-level so all painters share it.
  const stampCanvas = document.createElement('canvas');
  const stampCtx = stampCanvas.getContext('2d');

  /**
   * Wire up a cursor-paint effect to a container.
   * @param {HTMLElement} container - The element that listens to mouse events
   * @param {HTMLCanvasElement} canvas - The canvas that holds the painted color
   * @param {string} colorSrc - URL of the color image to paint
   * @param {object} opts - { rStart, rEnd, lifetime, stampStep, maxStamps }
   */
  function createCursorPainter(container, canvas, colorSrc, opts) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const o = Object.assign({
      rStart: 12, rEnd: 52, lifetime: 1500, stampStep: 9, maxStamps: 320,
    }, opts || {});
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const colorImg = new Image();
    let imgReady = false;
    colorImg.onload = () => { imgReady = true; };
    colorImg.src = colorSrc;

    let w = 0, h = 0;
    function resize() {
      const rect = container.getBoundingClientRect();
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
    let hasCursor = false;

    function addStamp(x, y) {
      if (stamps.length >= o.maxStamps) stamps.shift();
      stamps.push({
        x: x, y: y,
        born: performance.now(),
        rmax: o.rEnd * (1 - 0.5 + Math.random() * 0.5),
      });
    }
    function stampAlong(x, y) {
      if (lastX === null) {
        addStamp(x, y);
      } else {
        const dx = x - lastX;
        const dy = y - lastY;
        const dist = Math.hypot(dx, dy);
        const steps = Math.max(1, Math.ceil(dist / o.stampStep));
        for (let i = 1; i <= steps; i++) {
          addStamp(lastX + (dx * i) / steps, lastY + (dy * i) / steps);
        }
      }
      lastX = x; lastY = y;
    }

    // Compute where a stamp should sample the colorful image.
    // The B&W is a CSS background (cover) so the color image is mapped
    // to the same displayed area — painted color lines up with the B&W.
    function getSourceRect(x, y, r) {
      if (!imgReady) return null;
      const boxAspect = w / h;
      const imgAspect = colorImg.naturalWidth / colorImg.naturalHeight;
      let dispW, dispH, dispX, dispY;
      if (imgAspect > boxAspect) {
        dispH = h; dispW = h * imgAspect;
        dispX = (w - dispW) / 2; dispY = 0;
      } else {
        dispW = w; dispH = w / imgAspect;
        dispX = 0; dispY = (h - dispH) / 2;
      }
      const cx0 = Math.max(0, x - r);
      const cy0 = Math.max(0, y - r);
      const cx1 = Math.min(w, x + r);
      const cy1 = Math.min(h, y + r);
      if (cx1 <= cx0 || cy1 <= cy0) return null;
      const cx0c = Math.max(dispX, cx0);
      const cy0c = Math.max(dispY, cy0);
      const cx1c = Math.min(dispX + dispW, cx1);
      const cy1c = Math.min(dispY + dispH, cy1);
      if (cx1c <= cx0c || cy1c <= cy0c) return null;
      const lx0 = cx0c - dispX;
      const ly0 = cy0c - dispY;
      const lx1 = cx1c - dispX;
      const ly1 = cy1c - dispY;
      const sx = lx0 * (colorImg.naturalWidth / dispW);
      const sy = ly0 * (colorImg.naturalHeight / dispH);
      const sw = (lx1 - lx0) * (colorImg.naturalWidth / dispW);
      const sh = (ly1 - ly0) * (colorImg.naturalHeight / dispH);
      return {
        sx: sx, sy: sy, sw: sw, sh: sh,
        dx: cx0c, dy: cy0c, dw: cx1c - cx0c, dh: cy1c - cy0c,
      };
    }

    function drawStamp(s, now) {
      const age = now - s.born;
      const t = age / o.lifetime;
      if (t >= 1 && !HOLD) return false;

      const expand = Math.min(1, t * 2.4);
      const ease = 1 - Math.pow(1 - expand, 3);
      const r = o.rStart + (s.rmax - o.rStart) * ease;
      const fadeIn = Math.min(1, t * 8);
      const fadeOut = t < 0.45 ? 1 : 1 - (t - 0.45) / 0.55;
      const alpha = HOLD ? 1 : Math.max(0, Math.min(1, fadeIn)) * Math.max(0, Math.min(1, fadeOut));

      const rect = getSourceRect(s.x, s.y, r);
      if (!rect) return true;

      const size = Math.ceil(r * 2);
      const dprSize = Math.ceil(size * DPR);
      if (stampCanvas.width !== dprSize || stampCanvas.height !== dprSize) {
        stampCanvas.width = dprSize;
        stampCanvas.height = dprSize;
      }
      stampCtx.setTransform(DPR, 0, 0, DPR, 0, 0);
      stampCtx.clearRect(0, 0, size, size);

      const offX = rect.dx - (s.x - r);
      const offY = rect.dy - (s.y - r);
      stampCtx.globalAlpha = alpha;
      try {
        stampCtx.drawImage(colorImg, rect.sx, rect.sy, rect.sw, rect.sh, offX, offY, rect.dw, rect.dh);
      } catch (e) { return true; }
      stampCtx.globalAlpha = 1;

      stampCtx.globalCompositeOperation = 'destination-in';
      const grad = stampCtx.createRadialGradient(r, r, 0, r, r, r);
      grad.addColorStop(0,   'rgba(0,0,0,1)');
      grad.addColorStop(0.5, 'rgba(0,0,0,0.95)');
      grad.addColorStop(0.8, 'rgba(0,0,0,0.4)');
      grad.addColorStop(1,   'rgba(0,0,0,0)');
      stampCtx.fillStyle = grad;
      stampCtx.fillRect(0, 0, size, size);

      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(stampCanvas, 0, 0, dprSize, dprSize, s.x - r, s.y - r, size, size);
      return true;
    }

    let running = false;
    function loop() {
      const now = performance.now();
      ctx.clearRect(0, 0, w, h);
      for (let i = stamps.length - 1; i >= 0; i--) {
        const alive = drawStamp(stamps[i], now);
        if (!alive) stamps.splice(i, 1);
      }
      if (stamps.length || hasCursor) requestAnimationFrame(loop);
      else running = false;
    }
    function start() {
      if (!running) { running = true; requestAnimationFrame(loop); }
    }

    container.addEventListener('mouseenter', (e) => {
      hasCursor = true;
      const rect = container.getBoundingClientRect();
      lastX = e.clientX - rect.left;
      lastY = e.clientY - rect.top;
      stampAlong(lastX, lastY);
      container.classList.add('is-painted');
      start();
    });
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      stampAlong(e.clientX - rect.left, e.clientY - rect.top);
      start();
    });
    container.addEventListener('mouseleave', () => {
      hasCursor = false;
      lastX = null; lastY = null;
    });

    // Test helper for screenshots
    if (HOLD) {
      const simulatePath = () => {
        const rect = container.getBoundingClientRect();
        if (rect.width === 0) { setTimeout(simulatePath, 200); return; }
        const startX = rect.width * 0.15, startY = rect.height * 0.55;
        const endX = rect.width * 0.85, endY = rect.height * 0.7;
        const steps = 40;
        hasCursor = true;
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const x = startX + (endX - startX) * t;
          const y = startY + (endY - startY) * t + Math.sin(t * 6) * (rect.height * 0.06);
          stampAlong(x, y);
        }
        container.classList.add('is-painted');
        start();
      };
      const tryStart = () => {
        if (imgReady) simulatePath();
        else setTimeout(tryStart, 100);
      };
      tryStart();
    }
  }

  // ===== Wire up the hero =====
  const hero = document.querySelector('.hero');
  const heroCanvas = document.getElementById('heroPaint');
  if (hero && heroCanvas) {
    createCursorPainter(hero, heroCanvas, 'hero_bg_color.png', {
      rStart: 12, rEnd: 52, lifetime: 1500, stampStep: 9, maxStamps: 320,
    });
  }

  // ===== Wire up the 5 cards =====
  // Smaller brush since cards are smaller surfaces.
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    const canvas = card.querySelector('.card__paint');
    if (!canvas) return;
    const colorName = canvas.getAttribute('data-color');
    if (!colorName) return;
    createCursorPainter(card, canvas, colorName, {
      rStart: 6, rEnd: 26, lifetime: 1200, stampStep: 6, maxStamps: 180,
    });
  });
})();

// =========================================================
// Hero subtitle typewriter (RTL-aware: chars revealed RTL)
// =========================================================
(function () {
  const sub = document.querySelector('.hero__subtitle');
  if (!sub) return;
  if (window.matchMedia('(max-width: 700px)').matches) return;
  const original = sub.textContent.trim();
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
