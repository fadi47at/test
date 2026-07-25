// =========================================================
// Browser View — apply theme + content based on URL params
// =========================================================

const params = new URLSearchParams(window.location.search);
const designId = parseInt(params.get('design') || '1', 10);
const varIdx = parseInt(params.get('var') || '0', 10);

const design = getDesign(designId);
const variation = design ? design.variations[varIdx] : null;

if (!design || !variation) {
  document.body.innerHTML = '<div style="padding:40px;color:#fff;font-family:sans-serif">Design not found. <a href="index.html" style="color:#7DF9FF">Back to gallery</a></div>';
  throw new Error('Invalid design id');
}

const frame = document.getElementById('frame');
const root = document.documentElement;
const body = document.body;

// 1) Apply theme (CSS variables on the .frame element so they scope correctly)
function applyTheme(theme) {
  Object.entries(theme).forEach(([k, v]) => {
    frame.style.setProperty(k, v);
  });
  // Also expose a couple of vars on the body for the chrome to use
  body.style.setProperty('--bg', theme['--bg']);
  body.style.setProperty('--ink', theme['--ink']);
  body.style.setProperty('--accent', theme['--accent']);
}

// 2) Apply content
function applyContent(d, v) {
  // Hero background image (if any)
  const heroBg = document.getElementById('dheroBg');
  const bgSrc = HERO_BG[d.id];
  if (bgSrc) {
    heroBg.style.backgroundImage = `url('${bgSrc}')`;
    heroBg.classList.add('is-on');
  } else {
    heroBg.classList.remove('is-on');
  }

  // Wordmark
  document.getElementById('dword').textContent = d.name;
  document.getElementById('dword2').textContent = d.name;
  // Eyebrow
  document.getElementById('deyebrow').textContent = d.content.eyebrow;
  // Title
  document.getElementById('dtitle').textContent = d.name;
  // Subtitle
  document.getElementById('dsub').textContent = d.tag + ' — ' + d.desc;
  // Buttons
  document.getElementById('dbtn1').textContent = d.content.cta;
  document.getElementById('dbtn2').textContent = 'See the work';
  document.getElementById('dnavcta').textContent = d.content.cta;

  // Showcase
  const showcase = SHOWCASE[d.id] || [];
  document.getElementById('dsh-eyebrow').textContent = 'Selected work';
  document.getElementById('dsh-title').textContent = 'Things we made recently';
  document.getElementById('dsh-lede').textContent = 'A quick look at what we do, who we do it for, and how it turned out.';
  document.getElementById('dsh-grid').innerHTML = showcase.map((s) => `
    <article class="sh-card">
      <div class="sh-card__img">
        <img src="${s.img}" alt="${s.title}" loading="lazy" />
      </div>
      <div class="sh-card__body">
        <div class="sh-card__tag">${s.tag}</div>
        <h3 class="sh-card__title">${s.title}</h3>
        <p class="sh-card__desc">${s.desc}</p>
      </div>
    </article>
  `).join('');

  // Features
  const grid = document.getElementById('dgrid');
  grid.innerHTML = d.features.map((f) => `
    <div class="dfeat">
      <div class="dfeat__icon">${f.icon}</div>
      <h3 class="dfeat__title">${f.title}</h3>
      <p class="dfeat__desc">${f.desc}</p>
    </div>
  `).join('');

  // Testimonial
  const t = TESTIMONIALS[d.id] || { quote: '"We built something we are proud of."', author: '— The team', role: d.name };
  document.getElementById('dquote').textContent = t.quote;
  document.getElementById('dquote-name').textContent = t.author;
  document.getElementById('dquote-role').textContent = t.role;

  // CTA
  document.getElementById('dcta-title').textContent = 'Ready when you are.';
  document.getElementById('dcta-sub').textContent = v.title + ' — ' + d.tag;
  document.getElementById('dctabtn').textContent = d.content.cta;
  // Footer
  document.getElementById('dfooter-copy').textContent = `© 2026 ${d.name} · ${d.category}`;
  // URL bar
  document.getElementById('addr').textContent = d.url;
  // Active variation chip
  document.querySelectorAll('.chrome__var').forEach((b) => {
    b.classList.toggle('is-active', parseInt(b.dataset.var, 10) === varIdx);
  });
}

// 3) Update mark style based on theme mood (some marks are circles, some squares)
function updateMark() {
  // The mark is already styled via CSS. Nothing extra needed for now.
}

// 4) Atmospheric backdrop (subtle gradient + scattered ink dots for some themes)
function applyBackdrop(d) {
  const backdrop = document.getElementById('backdrop');
  const isLight = parseInt(getComputedStyle(frame).getPropertyValue('--bg').replace('#', ''), 16) > 0xAAAAAA;
  if (isLight) {
    backdrop.innerHTML = `
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMin slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg-glow" cx="50%" cy="0%" r="60%">
            <stop offset="0%" stop-color="currentColor" stop-opacity="0.05"/>
            <stop offset="100%" stop-color="currentColor" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="1440" height="900" fill="url(#bg-glow)" style="color: var(--accent)"/>
      </svg>
    `;
    backdrop.style.color = `var(--accent)`;
    backdrop.classList.add('is-on');
  } else {
    backdrop.innerHTML = '';
    backdrop.classList.remove('is-on');
  }
}

// Init
applyTheme(variation.theme);
applyContent(design, variation);
applyBackdrop(design);

// 5) Variation switcher
document.querySelectorAll('.chrome__var').forEach((btn) => {
  btn.addEventListener('click', () => {
    const newVar = parseInt(btn.dataset.var, 10);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('var', newVar);
    // Smooth cross-fade
    frame.style.opacity = '0';
    setTimeout(() => {
      window.location.href = newUrl.toString();
    }, 200);
  });
});

// 6) Back to gallery
document.getElementById('back').addEventListener('click', () => {
  window.location.href = 'index.html';
});

// 7) Smooth scroll for in-page links (within frame)
frame.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const href = link.getAttribute('href');
  if (href.length < 2) return;
  const t = document.querySelector(href);
  if (!t) return;
  e.preventDefault();
  t.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// 8) Apply initial transition
frame.style.transition = 'opacity 300ms ease';
frame.style.opacity = '0';
requestAnimationFrame(() => {
  setTimeout(() => { frame.style.opacity = '1'; }, 50);
});

// 9) Reveal sections on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.dfeatures, .dstory, .dpricing, .dcta').forEach((s) => io.observe(s));
