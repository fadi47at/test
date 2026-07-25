/* =========================================================
   VAD Landing — Interactions
   ========================================================= */

// ────────────────────────────────────────────────────────────
// Ink-reveal effect: cursor brushes the cream mask away,
// exposing the painting underneath. (Inspired by MiMo Code.)
// ────────────────────────────────────────────────────────────
(function () {
  const hero = document.querySelector('.hero');
  const canvas = document.getElementById('heroMask');
  if (!hero || !canvas) return;

  // Skip on touch / no-hover devices
  const canHover = window.matchMedia('(hover: hover)').matches;
  if (!canHover) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const MASK = '252, 250, 248';   // matches --color-bg (#fcfaf8)
  const R_START = 18;             // each ink dot starts small…
  const R_END = 160;              // …and expands up to a random max around this
  const R_VARY = 0.45;            // per-dot size randomness for brush variation
  const LIFETIME = 4500;          // ms — an ink dot expands + fades (longer = stays visible)
  const STAMP_STEP = 10;          // distance (px) between dots along cursor path
  const MAX_STAMPS = 240;         // cap on simultaneously-living dots
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

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
    paintSolid();
  }

  function paintSolid() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgb(' + MASK + ')';
    ctx.fillRect(0, 0, w, h);
  }

  resize();
  window.addEventListener('resize', resize);

  // Living ink dots; each expands + fades over LIFETIME.
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
      const dx = x - lastX, dy = y - lastY;
      const dist = Math.hypot(dx, dy);
      const steps = Math.max(1, Math.ceil(dist / STAMP_STEP));
      for (let i = 1; i <= steps; i++) {
        addStamp(lastX + (dx * i) / steps, lastY + (dy * i) / steps);
      }
    }
    lastX = x; lastY = y;
  }

  // Carve an irregular, soft-edged hole at (x,y) with radius r
  function carveInk(x, y, r, alpha, seed) {
    const g = ctx.createRadialGradient(x, y, r * 0.25, x, y, r);
    g.addColorStop(0,    'rgba(0, 0, 0, ' + 0.95 * alpha + ')');
    g.addColorStop(0.55, 'rgba(0, 0, 0, ' + 0.88 * alpha + ')');
    g.addColorStop(1,    'rgba(0, 0, 0, 0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    const segs = 32;
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      const wob =
        0.78 +
        0.14 * Math.sin(a * 3 + seed) +
        0.08 * Math.sin(a * 7 + seed * 2.1) +
        0.05 * Math.sin(a * 13 + seed * 0.7);
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
    // Repaint the solid cream, then carve every living dot back out.
    paintSolid();
    ctx.globalCompositeOperation = 'destination-out';
    for (let i = stamps.length - 1; i >= 0; i--) {
      const t = (now - stamps[i].born) / LIFETIME;
      if (t >= 1) { stamps.splice(i, 1); continue; }
      const ease = 1 - Math.pow(1 - t, 3);
      const r = R_START + (stamps[i].rmax - R_START) * ease;
      const alpha = 1 - t * t;
      carveInk(stamps[i].x, stamps[i].y, r, alpha, stamps[i].seed);
    }
    if (stamps.length) {
      requestAnimationFrame(loop);
    } else {
      running = false;
    }
  }

  function start() {
    if (!running) { running = true; requestAnimationFrame(loop); }
  }

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
  hero.addEventListener('mouseleave', () => {
    lastX = null; lastY = null;
  });

  // Welcome animation: pre-carve a few brush strokes on first load so the
  // user immediately sees that the painting is hidden behind the cream.
  function welcomeCarve() {
    const seedPath = [
      [260, 180], [380, 160], [500, 200], [620, 170], [740, 200],
      [860, 170], [980, 200], [1100, 180], [1200, 210],
      [320, 320], [460, 350], [600, 320], [740, 360], [880, 330],
      [1020, 360], [1160, 330],
      [400, 480], [560, 460], [720, 490], [880, 460], [1040, 490],
    ];
    const t0 = performance.now();
    seedPath.forEach(([x, y], i) => {
      setTimeout(() => {
        stamps.push({
          x, y,
          born: performance.now(),
          seed: Math.random() * Math.PI * 2,
          rmax: R_END * (0.7 + Math.random() * 0.3),
        });
        start();
      }, i * 35);
    });
  }
  // Run welcome carve once after the page settles
  setTimeout(welcomeCarve, 800);

  // Demo mode: pre-carve a brush path so static screenshots can show the effect
  if (new URLSearchParams(window.location.search).get('demo') === '1') {
    // Override lifetime for the demo so carved areas stay visible
    const DEMO_LIFETIME = 60000;
    const _loop = loop;
    const path = [
      [180, 200], [260, 180], [340, 220], [420, 200], [500, 240],
      [580, 200], [660, 220], [740, 180], [820, 200], [900, 240],
      [980, 200], [1060, 180], [1140, 220], [1220, 200],
      [200, 350], [320, 380], [440, 360], [560, 390], [680, 360],
      [800, 380], [920, 350], [1040, 380], [1160, 360],
      [180, 500], [320, 480], [460, 510], [600, 480], [740, 510],
      [880, 480], [1020, 510], [1160, 480],
      [300, 100], [500, 120], [700, 90], [900, 130], [1100, 100],
    ];
    const now = performance.now();
    path.forEach(([x, y]) => {
      stamps.push({
        x, y,
        born: now - Math.random() * 200,
        seed: Math.random() * Math.PI * 2,
        rmax: R_END * (1 - R_VARY + Math.random() * R_VARY),
      });
    });
    if (!running) {
      running = true;
      // Custom loop with extended lifetime
      function demoLoop() {
        const t = performance.now();
        paintSolid();
        ctx.globalCompositeOperation = 'destination-out';
        for (let i = stamps.length - 1; i >= 0; i--) {
          const dt = (t - stamps[i].born) / DEMO_LIFETIME;
          if (dt >= 1) continue; // never expire in demo
          const ease = 1 - Math.pow(1 - dt, 3);
          const r = R_START + (stamps[i].rmax - R_START) * ease;
          const alpha = 1;
          carveInk(stamps[i].x, stamps[i].y, r, alpha, stamps[i].seed);
        }
        requestAnimationFrame(demoLoop);
      }
      requestAnimationFrame(demoLoop);
    }
  }
})();

// Platform switcher (changes the install command + copy text)
(function () {
  const switcher = document.querySelector('.platform-switch');
  const terminal = document.querySelector('.terminal');
  const cmdText = terminal?.querySelector('.terminal__text');
  if (!switcher || !terminal || !cmdText) return;

  const commands = {
    unix: 'curl -fsSL https://vad.dev/install | bash',
    windows: 'powershell -ep Bypass -c "irm https://vad.dev/install.ps1 | iex"',
  };

  const options = Array.from(switcher.querySelectorAll('.platform-switch__option'));
  function applyPlatform(platform) {
    const cmd = commands[platform] || commands.unix;
    cmdText.textContent = cmd;
    terminal.setAttribute('data-copy-text', cmd);
    options.forEach((opt) => {
      const active = opt.dataset.platform === platform;
      opt.classList.toggle('is-active', active);
      opt.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }
  options.forEach((opt) => opt.addEventListener('click', () => applyPlatform(opt.dataset.platform)));
})();

// Copy-to-clipboard
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
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, text.length);
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch (e) { return false; }
  }

  function copy() {
    const text = terminal.getAttribute('data-copy-text') || '';
    const ok = fallbackCopy(text);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    if (!ok) return;
    btn.classList.add('is-copied');
    clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => btn.classList.remove('is-copied'), 1500);
  }
  btn.addEventListener('click', copy);
})();

// Language switcher + typewriter effect on the hero subtitle
(function () {
  const langBtns = Array.from(document.querySelectorAll('.lang-btn'));
  const subtitle = document.getElementById('heroSubtitle');
  if (!langBtns.length || !subtitle) return;

  const i18n = {
    en: {
      heroSubtitle: 'A next-generation AI coding assistant with unlimited context — helping you understand, build, and ship faster.',
    },
    ar: {
      heroSubtitle: 'مساعد برمجة بالذكاء الاصطناعي من الجيل التالي، بسياق غير محدود — يساعدك تفهم، تبني، وتطلق أسرع.',
    },
  };

  function typeInto(el, text) {
    // Skip on small screens so text can wrap
    if (window.matchMedia('(max-width: 700px)').matches) {
      el.textContent = text;
      el.classList.remove('is-typing', 'is-done');
      return;
    }
    el.style.whiteSpace = 'nowrap';
    el.textContent = text;
    const fullW = el.getBoundingClientRect().width;
    if (fullW > 0) el.style.width = Math.ceil(fullW) + 'px';
    el.textContent = '';
    el.classList.add('is-typing');
    el.classList.remove('is-done');

    const chars = [];
    for (const ch of text) {
      const s = document.createElement('span');
      s.className = 'char';
      s.textContent = ch;
      el.appendChild(s);
      chars.push(s);
    }
    const caret = document.createElement('span');
    caret.className = 'type-caret';
    caret.setAttribute('aria-hidden', 'true');
    el.appendChild(caret);

    const DELAY = 50;
    const START = 350;
    chars.forEach((c, i) => {
      setTimeout(() => c.classList.add('is-typed'), START + i * DELAY);
    });
    setTimeout(() => el.classList.add('is-done'), START + chars.length * DELAY + 200);
  }

  function applyLang(lang) {
    const text = (i18n[lang] || i18n.en).heroSubtitle;
    document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    langBtns.forEach((b) => b.classList.toggle('is-active', b.dataset.lang === lang));
    typeInto(subtitle, text);
  }

  // Run typewriter once on load
  function init() {
    const initial = subtitle.dataset.text || subtitle.textContent.trim();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => typeInto(subtitle, initial));
    } else {
      setTimeout(() => typeInto(subtitle, initial), 200);
    }
  }
  init();

  langBtns.forEach((b) => b.addEventListener('click', () => applyLang(b.dataset.lang)));
})();

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#' || href.length < 2) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Inject abstract SVG illustrations into each card art
(function () {
  const arts = document.querySelectorAll('.card__art');
  const illustrations = {
    models: `
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="m1" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#7c5cff"/><stop offset="100%" stop-color="#2ec4ff"/>
          </linearGradient>
        </defs>
        <g fill="none" stroke="#26251e" stroke-width="0.8" stroke-opacity="0.2">
          <circle cx="200" cy="120" r="90"/>
          <circle cx="200" cy="120" r="60"/>
          <circle cx="200" cy="120" r="30"/>
        </g>
        <g>
          <circle cx="200" cy="120" r="14" fill="url(#m1)"/>
          <circle cx="290" cy="120" r="6" fill="#26251e" opacity="0.4"/>
          <circle cx="110" cy="120" r="6" fill="#26251e" opacity="0.4"/>
          <circle cx="200" cy="30" r="6" fill="#26251e" opacity="0.4"/>
          <circle cx="200" cy="210" r="6" fill="#26251e" opacity="0.4"/>
        </g>
        <g stroke="#26251e" stroke-width="1" stroke-opacity="0.4">
          <line x1="200" y1="120" x2="290" y2="120"/>
          <line x1="200" y1="120" x2="110" y2="120"/>
          <line x1="200" y1="120" x2="200" y2="30"/>
          <line x1="200" y1="120" x2="200" y2="210"/>
        </g>
      </svg>`,
    agents: `
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g fill="none" stroke="#26251e" stroke-width="0.8" stroke-opacity="0.25">
          <rect x="60" y="60" width="100" height="60" rx="8"/>
          <rect x="240" y="60" width="100" height="60" rx="8"/>
          <rect x="60" y="140" width="100" height="60" rx="8"/>
          <rect x="240" y="140" width="100" height="60" rx="8"/>
        </g>
        <g>
          <text x="110" y="96" text-anchor="middle" font-family="monospace" font-size="13" fill="#26251e" opacity="0.7">Model A</text>
          <text x="290" y="96" text-anchor="middle" font-family="monospace" font-size="13" fill="#26251e" opacity="0.7">Model B</text>
          <text x="110" y="176" text-anchor="middle" font-family="monospace" font-size="13" fill="#26251e" opacity="0.7">Agent 1</text>
          <text x="290" y="176" text-anchor="middle" font-family="monospace" font-size="13" fill="#26251e" opacity="0.7">Agent 2</text>
        </g>
        <g stroke="#7c5cff" stroke-width="1.4" stroke-opacity="0.6" fill="none" stroke-dasharray="4 3">
          <path d="M 160 90 C 200 90, 200 90, 240 90"/>
          <path d="M 160 170 C 200 170, 200 170, 240 170"/>
          <path d="M 110 120 L 110 140"/>
          <path d="M 290 120 L 290 140"/>
        </g>
      </svg>`,
    context: `
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g stroke="#26251e" stroke-width="0.6" stroke-opacity="0.15" fill="none">
          <line x1="50" y1="40" x2="350" y2="40"/>
          <line x1="50" y1="60" x2="350" y2="60"/>
          <line x1="50" y1="80" x2="350" y2="80"/>
          <line x1="50" y1="100" x2="350" y2="100"/>
          <line x1="50" y1="120" x2="350" y2="120"/>
          <line x1="50" y1="140" x2="350" y2="140"/>
          <line x1="50" y1="160" x2="350" y2="160"/>
          <line x1="50" y1="180" x2="350" y2="180"/>
          <line x1="50" y1="200" x2="350" y2="200"/>
        </g>
        <rect x="50" y="40" width="300" height="160" fill="none" stroke="#7c5cff" stroke-width="1.2" stroke-opacity="0.4" rx="4"/>
        <g fill="#7c5cff" opacity="0.5">
          <circle cx="80" cy="60" r="3"/><circle cx="140" cy="80" r="3"/><circle cx="210" cy="100" r="3"/>
          <circle cx="280" cy="120" r="3"/><circle cx="100" cy="140" r="3"/><circle cx="180" cy="160" r="3"/>
          <circle cx="260" cy="180" r="3"/><circle cx="120" cy="180" r="3"/>
        </g>
      </svg>`,
    evolution: `
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g fill="none" stroke="#26251e" stroke-width="0.8" stroke-opacity="0.3">
          <path d="M 50 200 Q 120 100 200 130 T 350 60" />
        </g>
        <g fill="#26251e" opacity="0.5">
          <circle cx="50" cy="200" r="3"/>
          <circle cx="120" cy="140" r="3"/>
          <circle cx="200" cy="130" r="3"/>
          <circle cx="280" cy="95" r="3"/>
          <circle cx="350" cy="60" r="4"/>
        </g>
        <text x="200" y="220" text-anchor="middle" font-family="serif" font-style="italic" font-size="11" fill="#26251e" opacity="0.5">v1 → v2 → v3 → v4</text>
      </svg>`,
    compose: `
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g fill="none" stroke="#26251e" stroke-width="0.8" stroke-opacity="0.3">
          <rect x="80" y="50" width="240" height="140" rx="10"/>
          <line x1="80" y1="90" x2="320" y2="90"/>
        </g>
        <g fill="#26251e" opacity="0.7">
          <circle cx="95" cy="70" r="2.5"/>
          <circle cx="105" cy="70" r="2.5"/>
          <circle cx="115" cy="70" r="2.5"/>
        </g>
        <g font-family="monospace" font-size="9" fill="#26251e" opacity="0.6">
          <text x="100" y="115">→ analyze</text>
          <text x="100" y="135">→ design</text>
          <text x="100" y="155">→ implement</text>
          <text x="100" y="175">→ test & ship</text>
        </g>
      </svg>`,
  };
  arts.forEach((art) => {
    const key = art.dataset.art;
    if (illustrations[key]) art.innerHTML = illustrations[key];
  });
})();
