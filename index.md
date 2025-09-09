---
layout: default
title: ""
---

<link rel="stylesheet"
      href="{{ '/assets/css/style.css' | relative_url }}?v={{ site.github.build_revision | default: site.time | date: '%s' }}">
<script src="{{ '/assets/js/reveal.js' | relative_url }}" defer></script>
<script src="{{ '/assets/js/nn-bg.js' | relative_url }}" defer></script>

<!-- MathJax inline config -->
<script>
  window.MathJax = { tex: { inlineMath: [["$","$"],["\\(","\\)"]] } };
  // Always start at chosen edge (top|bottom via data-start)
  history.scrollRestoration = 'manual';
  document.addEventListener('DOMContentLoaded', () => {
    const start = (document.querySelector('main.snap')?.dataset.start || 'top').toLowerCase();
    requestAnimationFrame(() => {
      window.scrollTo({ top: start === 'bottom' ? document.documentElement.scrollHeight : 0, left: 0, behavior: 'auto' });
    });
  });
</script>
<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" defer></script>

<!-- Preload the PNG to reduce the initial white flash -->
<link rel="preload" as="image" href="{{ '/assets/img/PosterSession.png' | relative_url }}?v={{ site.github.build_revision | default: site.time | date: '%s' }}">

<!-- Page-local CSS for the circular loader (safe to keep even if style.scss has similar rules) -->
<style>
  .poster-click{ position:relative; display:block; text-align:center; }
  .poster-loader{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 30%;
  max-width: min(1100px, 60vw);

  /* approximate height while the image is decoding; disappears once image shows */
  aspect-ratio: 0.707; /* A-series portrait ratio; tweak if your poster is landscape */

  display: grid;
  place-items: center;
  gap: .65rem;

  border-radius: 14px;
  border: 1px solid var(--card-border);
  background: linear-gradient(180deg, rgba(10,15,31,.65), rgba(10,15,31,.55));
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  box-shadow: var(--shadow);

  transition: opacity .22s ease;
  z-index: 2;
}
.poster-loader.is-done{
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
}
  .spinner{
    width: 34px; height: 34px; border-radius: 50%;
    border: 3px solid rgba(148,163,184,.25);
    border-top-color: rgba(148,163,184,.9);
    animation: spin .8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .poster-img{ opacity:0; visibility:hidden; transition: opacity .28s ease-out; }
  .poster-img.is-ready{ opacity:1; visibility:visible; }
</style>

<main class="snap" data-start="top">

  <!-- Screen 1: Title (taller hero, neural bg) -->
  <header class="hero reveal snap-section" data-loop>
    <canvas id="nn-hero" class="hero-canvas" aria-hidden="true"></canvas>
    <div class="hero-content">
      <h1 class="title-xl">Non-Stationarity in RL Environments</h1>
    </div>
  </header>

  <!-- Screen 2: Creators -->
  <section id="creators" class="reveal snap-section" data-loop>
    <div class="container">
      <h2 class="section-title">Created by</h2>
      <div class="creators">
        <div class="avatar" style="background-image:url('{{ '/assets/img/ali.jpg' | relative_url }}')" title="Ali Najar"></div>
        <div class="avatar" style="background-image:url('{{ '/assets/img/mazdak.jpg' | relative_url }}')" title="Mazdak Teymourian"></div>
      </div>
      <p class="creator-names">Ali Najar &amp; Mazdak Teymourian</p>
    </div>
  </section>

  <!-- Screen 3: Poster (PNG preview with circular loader; image NOT clickable) -->
  <section id="poster" class="reveal snap-section">
    <div class="container">
      <h2 class="section-title">Check out our poster</h2>

      <div class="poster-block" style="text-align:center; position:relative;">
        <!-- Overlay loader centered over the image area -->
        <div class="poster-loader" id="poster-wait" role="status" aria-live="polite" aria-busy="true">
          <div class="spinner" aria-hidden="true"></div>
          <div class="loader-text">Preparing preview…</div>
        </div>

        <!-- Keep your size exactly: max-width:60%; height:auto -->
        <img
          id="poster-img"
          class="poster-img"
          alt="Non-Stationarity in RL — poster preview"
          loading="eager"
          decoding="async"
          src="{{ '/assets/img/PosterSession.png' | relative_url }}?v={{ site.github.build_revision | default: site.time | date: '%s' }}"
          style="max-width:60%; height:auto; border-radius:14px; border:1px solid var(--card-border); background:#fff; box-shadow:var(--shadow);">

        <!-- Nice-looking download button (image is not clickable) -->
        <div style="margin-top:.9rem;">
          <a class="btn" href="{{ '/assets/img/PosterSession.pdf' | relative_url }}" download>Download the PDF</a>
        </div>
      </div>
    </div>

    <noscript>
      <div class="note" style="margin-top:1rem">
        JavaScript is disabled. <a href="{{ '/assets/img/PosterSession.png' | relative_url }}">Open the PNG</a> or
        <a href="{{ '/assets/img/PosterSession.pdf' | relative_url }}">download the PDF</a>.
      </div>
    </noscript>
  </section>

  <!-- Screen 4: Content -->
  <section id="content" class="snap-section">
    <div class="container prose">
      <h2 class="section-title reveal">Content</h2>

      <h3>Abstract</h3>
      <p>Real-world RL rarely sits still: transitions and rewards drift as goals change, sensors age, or other agents learn. We study algorithms that adapt without prior knowledge of drift magnitude or change points, targeting low dynamic regret via sliding windows, exponential forgetting, and optimism.</p>

      <h3>Introduction</h3>
      <p>We model interaction via a horizon-$H$ MDP $\mathcal{M}=(\mathcal{S},\mathcal{A},P,r,H)$. In non-stationary settings, both $P_t(\cdot\mid s,a)$ and $r_t(s,a)$ evolve with time $t$, yielding a sequence $\mathcal{M}_t$.</p>
    </div>
  </section>

</main>

<!-- Loader → fade-in handler -->
<script>
document.addEventListener('DOMContentLoaded', function(){
  const img  = document.getElementById('poster-img');
  const wait = document.getElementById('poster-wait');
  if (!img || !wait) return;

  function reveal() {
    img.classList.add('is-ready');     // fade image in
    wait.classList.add('is-done');     // fade loader out
    wait.setAttribute('aria-busy','false');
  }

  if (img.complete && img.naturalWidth > 0) {
    reveal();
  } else {
    img.addEventListener('load', reveal, { once: true });
    img.addEventListener('error', function(){
      wait.innerHTML = '<span style="opacity:.85">Could not load image. ' +
                       '<a href="{{ "/assets/img/PosterSession.pdf" | relative_url }}">Download the PDF</a>.</span>';
    }, { once: true });
  }
});
</script>
