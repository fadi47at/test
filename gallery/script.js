// =========================================================
// Studio Gallery — interactivity
// =========================================================

const grid = document.getElementById('grid');
const empty = document.getElementById('empty');
const search = document.getElementById('search');
const modal = document.getElementById('modal');

let currentFilter = 'all';
let currentSearch = '';

function renderGrid() {
  const filtered = DESIGNS.filter((d) => {
    const okFilter = currentFilter === 'all' || d.category === currentFilter;
    const q = currentSearch.toLowerCase();
    const okSearch = !q || d.name.toLowerCase().includes(q) || d.category.toLowerCase().includes(q) || d.tag.toLowerCase().includes(q);
    return okFilter && okSearch;
  });

  grid.innerHTML = filtered.map((d) => `
    <button class="card" data-id="${d.id}" type="button">
      <div class="card__thumb">
        <img src="${d.thumb}" alt="${d.name}" loading="lazy" />
        <div class="card__overlay"><span>Browse live →</span></div>
      </div>
      <div class="card__meta">
        <div class="card__cat">${d.category}</div>
        <div class="card__name">${d.name}</div>
        <div class="card__tag">${d.tag}</div>
      </div>
    </button>
  `).join('');

  empty.classList.toggle('is-visible', filtered.length === 0);

  // Update chip counts
  document.querySelectorAll('.chip').forEach((chip) => {
    const f = chip.dataset.filter;
    const count = f === 'all' ? DESIGNS.length : DESIGNS.filter((d) => d.category === f).length;
    const span = chip.querySelector('span');
    if (span) span.textContent = count;
  });
}

// Filter chips
document.querySelectorAll('.chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach((c) => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    currentFilter = chip.dataset.filter;
    renderGrid();
  });
});

// Search
search.addEventListener('input', (e) => {
  currentSearch = e.target.value;
  renderGrid();
});

// Modal
function openModal(id) {
  // Open the live browser view for this design (var 0 by default)
  window.location.href = `browser.html?design=${id}&var=0`;
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

grid.addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (card) openModal(parseInt(card.dataset.id, 10));
});

modal.addEventListener('click', (e) => {
  if (e.target.dataset.close !== undefined || e.target.closest('[data-close]')) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
});

document.getElementById('m-pick').addEventListener('click', (e) => {
  const id = parseInt(e.target.dataset.id, 10);
  const d = DESIGNS.find((x) => x.id === id);
  if (!d) return;
  // Pick the focused variation if any, otherwise the first
  const focused = document.querySelector('.var.is-focused');
  const idx = focused ? parseInt(focused.dataset.var, 10) : 0;
  const v = d.variations[idx];
  alert(`Picked: ${d.name} — "${v.title}"\n\nI'll build this design for you next. 🎨`);
  closeModal();
});

// Mark focused variation when clicked
document.getElementById('m-vars').addEventListener('click', (e) => {
  const v = e.target.closest('.var');
  if (!v) return;
  document.querySelectorAll('.var').forEach((x) => x.classList.remove('is-focused'));
  v.classList.add('is-focused');
});

// Initial render
renderGrid();

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.length < 2) return;
    const t = document.querySelector(href);
    if (!t) return;
    e.preventDefault();
    t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
