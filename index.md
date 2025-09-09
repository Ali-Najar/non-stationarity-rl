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

  <!-- Screen 3: Poster (PNG preview with circular loader; click downloads PDF) -->
  <section id="poster" class="reveal snap-section">
    <div class="container">
      <h2 class="section-title">Check out our poster</h2>

      <!-- Click image to download original PDF -->
      <a class="poster-click"
         href="{{ '/assets/img/PosterSession.pdf' | relative_url }}"
         download
         style="display:block; text-align:center; position:relative;">

        <!-- Circular loader overlay (hidden after image loads) -->
        <div class="poster-loader" role="status" aria-live="polite" aria-busy="true">
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

        <span class="poster-hint" style="display:block; margin-top:.6rem; opacity:.85;">Click to download PDF</span>
      </a>
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
  const img = document.getElementById('poster-img');
  if (!img) return;
  const anchor = img.closest('.poster-click');
  const loader = anchor ? anchor.querySelector('.poster-loader') : null;
  if (!loader) return;

  function show() {
    img.classList.add('is-ready');      // CSS fades the image in
    loader.classList.add('is-done');    // CSS hides the loader
    anchor.setAttribute('aria-busy','false');
  }

  if (img.complete && img.naturalWidth > 0) {
    show();
  } else {
    img.addEventListener('load', show, { once: true });
    img.addEventListener('error', function(){
      loader.innerHTML = '<span style="opacity:.85">Could not load image. ' +
                         '<u>Click to download the PDF</u>.</span>';
    }, { once: true });
  }
});
</script>
