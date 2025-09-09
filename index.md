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

  <!-- Screen 3: Poster (PNG preview with circular loader; image NOT clickable) -->
  <section id="poster" class="reveal snap-section">
    <div class="container">
      <h2 class="section-title">Check out our poster</h2>

      <div class="poster-block" style="text-align:center;">
        <!-- Size wrapper matches your image size (60% of container, max 1100px) -->
        <div id="poster-wrap"
             style="position:relative; display:inline-block; width:60%; max-width:1100px;">

          <!-- Circular loader overlay (exact same footprint as the poster) -->
          <div id="poster-loader"
               class="poster-loader"
               role="status" aria-live="polite" aria-busy="true"
               style="position:absolute; inset:0; display:grid; place-items:center; gap:.65rem;
                      border-radius:14px; border:1px solid var(--card-border);
                      background:linear-gradient(180deg, rgba(10,15,31,.65), rgba(10,15,31,.55));
                      backdrop-filter:blur(2px); -webkit-backdrop-filter:blur(2px);">
            <div class="spinner" aria-hidden="true"></div>
            <div class="loader-text">Preparing preview…</div>
          </div>

          <!-- Keep your size, but let the image fill the wrapper -->
          <img
            id="poster-img"
            class="poster-img"
            alt="Non-Stationarity in RL — poster preview"
            loading="eager"
            decoding="async"
            src="{{ '/assets/img/PosterSession.png' | relative_url }}?v={{ site.github.build_revision | default: site.time | date: '%s' }}"
            style="display:block; width:100%; height:auto;
                   border-radius:14px; border:1px solid var(--card-border);
                   background:#fff; box-shadow:var(--shadow);
                   opacity:0; visibility:hidden;">
        </div>

        <!-- Nice download button (image stays non-clickable) -->
        <div style="margin-top:.9rem;">
          <a class="btn"
             href="{{ '/assets/img/PosterSession.pdf' | relative_url }}"
             download>
            Download the PDF
          </a>
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
  const img    = document.getElementById('poster-img');
  const loader = document.getElementById('poster-loader');
  if (!img || !loader) return;

  function reveal() {
    img.style.visibility = 'visible';
    img.style.opacity = '1';
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none';
    loader.style.visibility = 'hidden';
    loader.setAttribute('aria-busy', 'false');
  }

  if (img.complete && img.naturalWidth > 0) {
    reveal();
  } else {
    img.addEventListener('load', reveal, { once: true });
    img.addEventListener('error', function(){
      loader.innerHTML =
        '<span style="opacity:.9">Could not load image. ' +
        '<a href="{{ '/assets/img/PosterSession.pdf' | relative_url }}" ' +
        'style="color:var(--accent)">Download the PDF</a>.</span>';
    }, { once: true });
  }
});
</script>
