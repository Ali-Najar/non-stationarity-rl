---
layout: default
title: ""
---

<!-- Styles (cache-busted so GH Pages refreshes) -->
<link rel="stylesheet"
      href="{{ '/assets/css/style.css' | relative_url }}?v={{ site.github.build_revision | default: site.time | date: '%s' }}">

<!-- Scripts -->
<script src="{{ '/assets/js/reveal.js' | relative_url }}" defer></script>
<script src="{{ '/assets/js/nn-bg.js' | relative_url }}" defer></script>
<script>
  // MathJax inline config
  window.MathJax = { tex: { inlineMath: [["$","$"],["\\(","\\)"]] } };
  // Always start at the top (change data-start="bottom" to start at end)
  history.scrollRestoration = 'manual';
  document.addEventListener('DOMContentLoaded', () => {
    const start = (document.querySelector('main.snap')?.dataset.start || 'top').toLowerCase();
    requestAnimationFrame(() => {
      window.scrollTo({ top: start === 'bottom' ? document.documentElement.scrollHeight : 0, left: 0, behavior: 'auto' });
    });
  });
</script>
<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" defer></script>

<main class="snap" data-start="top">

  <!-- Screen 1: Title (hero with neural background) -->
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

  <!-- Screen 3: Poster (PNG preview that downloads the PDF) -->
  <section id="poster" class="reveal snap-section">
    <div class="container">
      <h2 class="section-title">Check out our poster</h2>

      <!-- Click image to download original PDF -->
      <a class="poster-click"
         href="{{ '/assets/img/PosterSession.pdf' | relative_url }}"
         download
         style="display:block; text-align:center;">
        <img
          class="poster-img"
          alt="Non-Stationarity in RL — poster preview"
          loading="lazy"
          decoding="async"
          src="{{ '/assets/img/PosterSession.png' | relative_url }}?v={{ site.github.build_revision | default: site.time | date: '%s' }}"
          style="max-width:100%; height:auto; border-radius:14px; border:1px solid var(--card-border); background:#fff; box-shadow:var(--shadow);">
        <span class="poster-hint" style="display:block; margin-top:.6rem; opacity:.85;">Click to download PDF</span>
      </a>
    </div>
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
