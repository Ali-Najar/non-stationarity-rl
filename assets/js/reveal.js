// Reveal on enter; optionally hide on exit if element has [data-loop]
document.addEventListener('DOMContentLoaded', () => {
  const io = new IntersectionObserver((entries) => {
    requestAnimationFrame(() => {
      entries.forEach(e => {
        const el = e.target;
        const loop = el.hasAttribute('data-loop');
        if (e.isIntersecting) el.classList.add('revealed');
        else if (loop) el.classList.remove('revealed');
      });
    });
  }, { threshold: 0.45, rootMargin: '-12% 0px -12% 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
});
