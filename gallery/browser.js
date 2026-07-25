// =========================================================
// Browser View — apply theme, layout, decoration, rich content
// =========================================================

const params = new URLSearchParams(window.location.search);
const designId = parseInt(params.get('design') || '1', 10);
const varIdx = parseInt(params.get('var') || '0', 10);

const design = getDesign(designId);
const variation = design ? design.variations[varIdx] : null;
const preset = DESIGN_PRESETS[designId] || {};

if (!design || !variation) {
  document.body.innerHTML = '<div style="padding:40px;color:#fff;font-family:sans-serif">Design not found. <a href="index.html" style="color:#7DF9FF">Back to gallery</a></div>';
  throw new Error('Invalid design id');
}

const frame = document.getElementById('frame');
const root = document.documentElement;
const body = document.body;

// 1) Apply theme (CSS variables on the .frame element)
function applyTheme(theme) {
  Object.entries(theme).forEach(([k, v]) => {
    frame.style.setProperty(k, v);
  });
  body.style.setProperty('--bg', theme['--bg']);
  body.style.setProperty('--ink', theme['--ink']);
  body.style.setProperty('--accent', theme['--accent']);
}

// 2) Apply hero layout
function applyLayout(layout) {
  const hero = document.getElementById('dhero');
  hero.setAttribute('data-layout', layout);

  // For full-bleed: set the bg image on the overlay
  if (layout === 'full-bleed') {
    const bgSrc = HERO_BG[designId];
    if (bgSrc) {
      hero.style.setProperty('--dhero-full-bg', `url('${bgSrc}')`);
    }
  }
  if (layout === 'split') {
    const showcase = SHOWCASE[designId] || [];
    if (showcase[0]) {
      document.getElementById('dhero-split-img').src = showcase[0].img;
      document.getElementById('dhero-split-sticker').textContent = design.category;
    }
  }
}

// 3) Apply decoration layer
function applyDecoration(decoration) {
  const deco = document.getElementById('ddeco');
  if (decoration) {
    deco.setAttribute('data-deco', decoration);
    deco.classList.add('is-on');
  } else {
    deco.classList.remove('is-on');
  }
}

// 4) Apply content to all sections
function applyContent(d, v) {
  // Hero background image
  const heroBg = document.getElementById('dheroBg');
  const bgSrc = HERO_BG[d.id];
  if (bgSrc && preset.layout !== 'full-bleed') {
    heroBg.style.backgroundImage = `url('${bgSrc}')`;
    heroBg.classList.add('is-on');
  } else {
    heroBg.classList.remove('is-on');
  }

  // Hero text (4 layout variants)
  const eyebrow = d.content.eyebrow;
  const title = d.name;
  const sub = d.tag + ' — ' + d.desc;
  ['1', '2', '3', '4'].forEach((i) => {
    const e = document.getElementById('deyebrow' + (i === '1' ? '' : '-' + i));
    const t = document.getElementById('dtitle' + (i === '1' ? '' : '-' + i));
    const s = document.getElementById('dsub' + (i === '1' ? '' : '-' + i));
    const b1 = document.getElementById('dbtn1' + (i === '1' ? '' : '-' + i));
    const b2 = document.getElementById('dbtn2' + (i === '1' ? '' : '-' + i));
    if (e) e.textContent = eyebrow;
    if (t) t.textContent = title;
    if (s) s.textContent = sub;
    if (b1) b1.textContent = d.content.cta;
    if (b2) b2.textContent = 'See the work';
  });

  // Wordmark
  document.getElementById('dword').textContent = d.name;
  document.getElementById('dword2').textContent = d.name;
  document.getElementById('dnavcta').textContent = d.content.cta;

  // Marquee
  const marqueeItems = preset.marquee || [];
  const marqueeTrack = document.getElementById('dmarquee-track');
  // Duplicate items for seamless loop
  const itemsHtml = marqueeItems.map((m) => `<span>${m}</span>`).join('');
  marqueeTrack.innerHTML = itemsHtml + itemsHtml;

  // Hide marquee if no items
  document.getElementById('dmarquee').style.display = marqueeItems.length ? 'block' : 'none';

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

  // Gallery (6 images in mosaic grid)
  const gallery = preset.gallery || [];
  document.getElementById('dgal-eyebrow').textContent = preset.galleryEyebrow || 'Inside the work';
  document.getElementById('dgal-title').textContent = preset.galleryTitle || 'A closer look';
  document.getElementById('dgal-lede').textContent = preset.galleryLede || 'Six moments from the studio, the road, the kitchen, the lab.';
  const galTiles = ['gal-tile--lg', 'gal-tile--sm', 'gal-tile--sm', 'gal-tile--sm', 'gal-tile--sm', 'gal-tile--sm'];
  document.getElementById('dgal-grid').innerHTML = gallery.slice(0, 6).map((g, i) => `
    <div class="gal-tile ${galTiles[i] || 'gal-tile--sm'}">
      <img src="${g.img}" alt="${g.cap || ''}" loading="lazy" />
      ${g.cap ? `<span class="gal-tile__cap">${g.cap}</span>` : ''}
    </div>
  `).join('');
  document.getElementById('d-gallery').style.display = gallery.length ? 'block' : 'none';

  // Details (6 items with icon + title + short text)
  const details = preset.details || [];
  document.getElementById('ddet-eyebrow').textContent = preset.detailsEyebrow || "What's inside";
  document.getElementById('ddet-title').textContent = preset.detailsTitle || 'The small details that matter';
  document.getElementById('ddet-grid').innerHTML = details.slice(0, 6).map((it) => `
    <div class="det-item">
      <div class="det-item__icon">${it.icon || '✦'}</div>
      <div class="det-item__body">
        <h4 class="det-item__title">${it.title}</h4>
        <p class="det-item__desc">${it.desc}</p>
      </div>
    </div>
  `).join('');
  document.getElementById('d-details').style.display = details.length ? 'block' : 'none';

  // Team / People
  const team = preset.team || [];
  document.getElementById('dteam-eyebrow').textContent = preset.teamEyebrow || 'The people';
  document.getElementById('dteam-title').textContent = preset.teamTitle || "Who you'll be working with";
  document.getElementById('dteam-grid').innerHTML = team.slice(0, 4).map((p) => `
    <div class="dteam-card">
      <div class="dteam-card__avatar" style="${p.avatarBg ? `background:${p.avatarBg};` : ''}">${p.initials || (p.name || '?').slice(0, 2)}</div>
      <h4 class="dteam-card__name">${p.name}</h4>
      <p class="dteam-card__role">${p.role}</p>
      <p class="dteam-card__bio">${p.bio || ''}</p>
    </div>
  `).join('');
  document.getElementById('d-team').style.display = team.length ? 'block' : 'none';

  // Press / As Seen In
  const press = preset.press || [];
  document.getElementById('dpress-eyebrow').textContent = preset.pressEyebrow || 'As seen in';
  document.getElementById('dpress-row').innerHTML = press.slice(0, 6).map((p) => `
    <span class="press-logo press-logo--${p.style || 'display'}">${p.name}</span>
  `).join('');
  document.getElementById('d-press').style.display = press.length ? 'block' : 'none';

  // FAQ
  const faq = preset.faq || [];
  document.getElementById('dfaq-eyebrow').textContent = preset.faqEyebrow || 'Questions, answered';
  document.getElementById('dfaq-title').textContent = preset.faqTitle || 'What people ask first';
  document.getElementById('dfaq-list').innerHTML = faq.slice(0, 5).map((f) => `
    <div class="faq-item">
      <h4 class="faq-item__q">${f.q}<span class="faq-item__plus">+</span></h4>
      <p class="faq-item__a">${f.a}</p>
    </div>
  `).join('');
  document.getElementById('d-faq').style.display = faq.length ? 'block' : 'none';

  // FAQ toggle
  document.querySelectorAll('.faq-item').forEach((item) => {
    item.addEventListener('click', () => item.classList.toggle('is-open'));
  });

  // Stats
  const stats = preset.stats || [];
  const statsInner = document.getElementById('dstats-inner');
  statsInner.innerHTML = stats.map((s) => `
    <div class="dstat">
      <div class="dstat__num">${s.value}${s.suffix ? `<span class="dstat__suffix">${s.suffix}</span>` : ''}</div>
      <div class="dstat__label">${s.label}</div>
    </div>
  `).join('');
  document.getElementById('dstats').style.display = stats.length ? 'block' : 'none';

  // Process
  const process = preset.process || [];
  document.getElementById('dprocess-title').textContent = 'How we work';
  document.getElementById('dprocess-grid').innerHTML = process.map((p) => `
    <div class="dprocess-step">
      <div class="dprocess-step__icon">${p.icon}</div>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
    </div>
  `).join('');
  document.getElementById('dprocess').style.display = process.length ? 'block' : 'none';

  // Features
  const grid = document.getElementById('dgrid');
  grid.innerHTML = d.features.map((f) => `
    <div class="dfeat">
      <div class="dfeat__icon">${f.icon}</div>
      <h3 class="dfeat__title">${f.title}</h3>
      <p class="dfeat__desc">${f.desc}</p>
    </div>
  `).join('');

  // Big quote
  const bq = preset.bigQuote;
  if (bq) {
    document.getElementById('dbigquote-text').textContent = bq.text;
    document.getElementById('dbigquote-attr').textContent = bq.attr;
    document.getElementById('dbigquote').style.display = 'block';
  } else {
    document.getElementById('dbigquote').style.display = 'none';
  }

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

// Init
applyTheme(variation.theme);
applyLayout(preset.layout || 'centered');
applyDecoration(preset.decoration);
applyContent(design, variation);

// Variation switcher
document.querySelectorAll('.chrome__var').forEach((btn) => {
  btn.addEventListener('click', () => {
    const newVar = parseInt(btn.dataset.var, 10);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('var', newVar);
    frame.style.opacity = '0';
    setTimeout(() => {
      window.location.href = newUrl.toString();
    }, 200);
  });
});

// Back to gallery
document.getElementById('back').addEventListener('click', () => {
  window.location.href = 'index.html';
});

// Smooth scroll for in-page links
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

// Initial transition
frame.style.transition = 'opacity 300ms ease';
frame.style.opacity = '0';
requestAnimationFrame(() => {
  setTimeout(() => { frame.style.opacity = '1'; }, 50);
});
