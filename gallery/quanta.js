// =========================================================
// Quanta — interactions
// =========================================================

// Animated counters
(function () {
  const counters = document.querySelectorAll('.qstat__num');
  const animate = (el) => {
    const target = parseFloat(el.dataset.target);
    const decimal = parseInt(el.dataset.decimal || '0', 10);
    const duration = 1500;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = decimal > 0 ? value.toFixed(decimal) : Math.floor(value);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = decimal > 0 ? target.toFixed(decimal) : target;
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach((c) => io.observe(c));
})();

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

// FAQ: only one open at a time
document.querySelectorAll('.qfaq__item').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      document.querySelectorAll('.qfaq__item').forEach((other) => {
        if (other !== item) other.open = false;
      });
    }
  });
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.qsec-head, .qcourse, .qstep, .qcat, .qinstr, .qstory, .qplan, .qstat').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 600ms ease, transform 600ms ease';
  io.observe(el);
});
