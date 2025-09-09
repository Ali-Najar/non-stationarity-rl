document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Add class when the section is meaningfully in view…
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      } else {
        // …remove it when it leaves, so it can animate again next time
        entry.target.classList.remove('revealed');
      }
    });
  }, {
    // Trigger when ~40–60% of the section is on screen (nice with snap)
    threshold: 0.5,
    // Tighten the window so it doesn’t flicker at the edges
    rootMargin: '-10% 0px -10% 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
