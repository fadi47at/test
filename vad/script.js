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

  // Each cursor painter keeps its own offscreen stamp + mask canvases
  // (created inside createCursorPainter below).

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

    // Per-painter offscreen stamp canvas, allocated once at the max brush
    // diameter — no per-stamp reallocation (was a source of jank).
    const maxDpr = Math.ceil(o.rEnd * 2 * DPR);
    const stampCanvas = document.createElement('canvas');
    stampCanvas.width = maxDpr;
    stampCanvas.height = maxDpr;
    const stampCtx = stampCanvas.getContext('2d');

    // Pre-render the soft circular mask ONCE. The old code rebuilt this
    // gradient for every stamp on every frame — the main cause of stutter.
    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = maxDpr;
    maskCanvas.height = maxDpr;
    const maskCtx = maskCanvas.getContext('2d');
    (function () {
      const mr = o.rEnd * DPR;
      const g = maskCtx.createRadialGradient(mr, mr, 0, mr, mr, mr);
      g.addColorStop(0,   'rgba(0,0,0,1)');
      g.addColorStop(0.5, 'rgba(0,0,0,0.95)');
      g.addColorStop(0.8, 'rgba(0,0,0,0.4)');
      g.addColorStop(1,   'rgba(0,0,0,0)');
      maskCtx.fillStyle = g;
      maskCtx.fillRect(0, 0, maxDpr, maxDpr);
    })();

    let w = 0, h = 0;
    // Cached "cover" mapping of the color image onto the box — constant
    // between resizes, so we don't recompute it per stamp per frame.
    let dispX = 0, dispY = 0, dispW = 0, dispH = 0, sxRatio = 1, syRatio = 1;
    function recomputeMapping() {
      if (!imgReady || w === 0 || h === 0) return;
      const boxAspect = w / h;
      const imgAspect = colorImg.naturalWidth / colorImg.naturalHeight;
      if (imgAspect > boxAspect) {
        dispH = h; dispW = h * imgAspect; dispX = (w - dispW) / 2; dispY = 0;
      } else {
        dispW = w; dispH = w / imgAspect; dispX = 0; dispY = (h - dispH) / 2;
      }
      sxRatio = colorImg.naturalWidth / dispW;
      syRatio = colorImg.naturalHeight / dispH;
    }

    // Cached container rect for mouse coords (refreshed on enter/scroll/resize).
    let rectLeft = 0, rectTop = 0;
    function refreshRect() {
      const r = container.getBoundingClientRect();
      rectLeft = r.left; rectTop = r.top;
    }

    colorImg.onload = () => { imgReady = true; recomputeMapping(); };
    colorImg.src = colorSrc;

    function resize() {
      const rect = container.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      rectLeft = rect.left;
      rectTop = rect.top;
      canvas.width = Math.round(w * DPR);
      canvas.height = Math.round(h * DPR);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, w, h);
      recomputeMapping();
    }
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', refreshRect, { passive: true });

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
      const cx0c = Math.max(dispX, x - r);
      const cy0c = Math.max(dispY, y - r);
      const cx1c = Math.min(dispX + dispW, x + r);
      const cy1c = Math.min(dispY + dispH, y + r);
      if (cx1c <= cx0c || cy1c <= cy0c) return null;
      const dw = cx1c - cx0c;
      const dh = cy1c - cy0c;
      return {
        sx: (cx0c - dispX) * sxRatio,
        sy: (cy0c - dispY) * syRatio,
        sw: dw * sxRatio,
        sh: dh * syRatio,
        dx: cx0c, dy: cy0c, dw: dw, dh: dh,
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

      stampCtx.setTransform(DPR, 0, 0, DPR, 0, 0);
      stampCtx.globalCompositeOperation = 'source-over';
      stampCtx.globalAlpha = 1;
      stampCtx.clearRect(0, 0, size, size);

      const offX = rect.dx - (s.x - r);
      const offY = rect.dy - (s.y - r);
      stampCtx.globalAlpha = alpha;
      try {
        stampCtx.drawImage(colorImg, rect.sx, rect.sy, rect.sw, rect.sh, offX, offY, rect.dw, rect.dh);
      } catch (e) { return true; }
      stampCtx.globalAlpha = 1;

      // Cut to the soft circle using the pre-rendered mask (no per-frame gradient).
      stampCtx.globalCompositeOperation = 'destination-in';
      stampCtx.drawImage(maskCanvas, 0, 0, maxDpr, maxDpr, 0, 0, size, size);

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
      if (stamps.length) requestAnimationFrame(loop);
      else running = false;
    }
    function start() {
      if (!running) { running = true; requestAnimationFrame(loop); }
    }

    container.addEventListener('mouseenter', (e) => {
      hasCursor = true;
      refreshRect();
      lastX = e.clientX - rectLeft;
      lastY = e.clientY - rectTop;
      stampAlong(lastX, lastY);
      container.classList.add('is-painted');
      start();
    });
    container.addEventListener('mousemove', (e) => {
      stampAlong(e.clientX - rectLeft, e.clientY - rectTop);
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
    createCursorPainter(hero, heroCanvas, 'hero_bg_color.webp', {
      rStart: 12, rEnd: 52, lifetime: 1500, stampStep: 9, maxStamps: 320,
    });
  }

  // ===== Wire up the 5 cards =====
  // Smaller brush since cards are smaller surfaces.
  // The painter's container is .card__media so the color overlay maps
  // 1:1 onto the grayscale .card__art (same box → identical cover crop).
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    const media = card.querySelector('.card__media');
    const canvas = card.querySelector('.card__paint');
    if (!media || !canvas) return;
    const colorName = canvas.getAttribute('data-color');
    if (!colorName) return;
    createCursorPainter(media, canvas, colorName, {
      rStart: 6, rEnd: 26, lifetime: 1200, stampStep: 6, maxStamps: 180,
    });
  });
})();

// =========================================================
// Hero subtitle typewriter (RTL: reveals right-to-left)
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
    // One growing text node keeps Arabic letters CONNECTED (per-char
    // spans isolate each letter and break cursive shaping). Caret sits
    // at the left (the RTL "end"), so text grows right→left.
    const textNode = document.createTextNode('');
    sub.appendChild(textNode);
    const caret = document.createElement('span');
    caret.className = 'type-caret';
    caret.setAttribute('aria-hidden', 'true');
    sub.appendChild(caret);

    const DELAY = 45;
    const START = 350;
    let i = 0;
    function step() {
      i++;
      textNode.nodeValue = original.slice(0, i);
      if (i < original.length) setTimeout(step, DELAY);
      else setTimeout(() => sub.classList.add('is-done'), 200);
    }
    setTimeout(step, START);
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

  const CHAR_DELAY = 45;

  // One growing text node per title keeps Arabic letters CONNECTED
  // (per-char spans isolate letters and break cursive shaping).
  const items = [];
  titles.forEach((h3) => {
    const text = h3.textContent.trim();
    h3.textContent = '';
    const textNode = document.createTextNode('');
    h3.appendChild(textNode);
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.setAttribute('aria-hidden', 'true');
    h3.appendChild(cursor);
    items.push({ h3, text, textNode });
  });

  function animateType(item) {
    const { h3, text, textNode } = item;
    if (h3.dataset.typed === '1') return;
    h3.dataset.typed = '1';
    h3.classList.add('is-active');
    let i = 0;
    function step() {
      i++;
      textNode.nodeValue = text.slice(0, i);
      if (i < text.length) setTimeout(step, CHAR_DELAY);
      else setTimeout(() => h3.classList.add('is-done'), 200);
    }
    step();
  }

  function snapShow(item) {
    const { h3, text, textNode } = item;
    if (h3.dataset.typed === '1') return;
    h3.dataset.typed = '1';
    h3.classList.add('is-active', 'is-done');
    textNode.nodeValue = text;
  }

  const byNode = new Map(items.map((it) => [it.h3, it]));

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const item = byNode.get(entry.target);
          if (item) animateType(item);
        }
      });
    },
    { threshold: 0.3 }
  );
  titles.forEach((h3) => obs.observe(h3));

  window.addEventListener('scroll', () => {
    const cut = window.innerHeight * 0.5;
    items.forEach((item) => {
      if (item.h3.dataset.typed === '1') return;
      if (item.h3.getBoundingClientRect().bottom < cut) snapShow(item);
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
