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

  /* Loader overlay — same box as the poster image */
.poster-loader{
  position: absolute;
  top: 0;                         /* align to top of image area */
  left: 50%;
  transform: translateX(-50%);
  /* match your <img style="max-width:60%;"> */
  max-width: 40%;
  width: 100%;                    /* width is maxed by max-width above */
  /* reserve height so it’s visible before the PNG decodes */
  aspect-ratio: 0.75;            /* A-series portrait (width / height). Use 1.414 for landscape. */

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


/* Circular spinner */
.spinner{
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 4px solid rgba(148,163,184,.25);
  border-top-color: rgba(148,163,184,.9);
  animation: spin .9s linear infinite;
}
  @keyframes spin { to { transform: rotate(360deg); } }

  /* keep these as you had them */
  .poster-img{ opacity:0; visibility:hidden; transition: opacity .28s ease-out; }
  .poster-img.is-ready{ opacity:1; visibility:visible; }
</style>

<main class="snap" data-start="top">

  <!-- Screen 1: Title (taller hero, neural bg) -->
  <header class="hero reveal snap-section" data-loop>
  <canvas id="nn-hero" class="hero-canvas" aria-hidden="true"></canvas>
  <div class="hero-content">

    <!-- Logos row (inline, centered) -->
    <div class="brand-row" aria-label="Affiliations">
      <img class="brand" src="{{ '/assets/img/logo.png'  | relative_url }}">
      <img class="brand" src="{{ '/assets/img/riml-logo.png'  | relative_url }}">
      <img class="brand" src="{{ '/assets/img/drl-logo.png' | relative_url }}" style="display:block; transform:scale(1.18); transform-origin:center;">
    </div>

    <h1 class="title-xl">Non-Stationarity in RL Environments</h1>
  </div>
</header>


  <!-- Screen 2: Creators -->
  <section id="creators" class="reveal snap-section" data-loop>
  <div class="container">
    <h2 class="section-title">Created by</h2>

    <div class="creators">
      <div class="creator-card">
        <div class="avatar"
             style="background-image:url('{{ '/assets/img/ali.jpg' | relative_url }}')"
             title="Ali Najar" aria-label="Ali Najar"></div>
        <div class="creator-name">Ali Najar</div>
        <p class="creator-contact">
          <svg class="icon-mail" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 7.5l9 6 9-6M4.5 6h15a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 19.5 18h-15A1.5 1.5 0 0 1 3 16.5v-9A1.5 1.5 0 0 1 4.5 6z"/>
          </svg>
          <a href="mailto:anajar13750@gmail.com">anajar13750@gmail.com</a>
        </p>
      </div>

      <div class="creator-card">
        <div class="avatar"
             style="background-image:url('{{ '/assets/img/mazdak.jpg' | relative_url }}')"
             title="Mazdak Teymourian" aria-label="Mazdak Teymourian"></div>
        <div class="creator-name">Mazdak Teymourian</div>
        <p class="creator-contact">
          <svg class="icon-mail" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 7.5l9 6 9-6M4.5 6h15a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 19.5 18h-15A1.5 1.5 0 0 1 3 16.5v-9A1.5 1.5 0 0 1 4.5 6z"/>
          </svg>
          <a href="mailto:mazdak.tey@gmail.com">mazdak.tey@gmail.com</a>
        </p>
      </div>
    </div>
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
          style="max-width:100%; height:auto; border-radius:14px; border:1px solid var(--card-border); background:#fff; box-shadow:var(--shadow);">

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
  const img       = document.getElementById('poster-img');
  const wait      = document.getElementById('poster-wait');
  const posterSec = document.getElementById('poster');
  if (!img || !wait || !posterSec) return;

  // make sure the loader is visible initially
  wait.classList.remove('is-done');
  wait.setAttribute('aria-busy','true');

  function startSequence(){
    if (startSequence._started) return;   // run once
    startSequence._started = true;

    const MIN_SPIN_MS = 3000;
    const timer  = new Promise(res => setTimeout(res, MIN_SPIN_MS));
    const loaded = (img.complete && img.naturalWidth > 0)
      ? Promise.resolve()
      : new Promise((res, rej) => {
          img.addEventListener('load', res, { once:true });
          img.addEventListener('error', rej, { once:true });
        });

    // Reveal after BOTH the timer and the image load
    Promise.all([timer, loaded]).then(() => {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        img.classList.add('is-ready');   // fades in via CSS
        wait.classList.add('is-done');   // fades out via CSS
        wait.setAttribute('aria-busy','false');
      }));
    }).catch(() => {
      // If the image fails, show message AFTER the 3s spinner
      timer.then(() => {
        wait.setAttribute('aria-busy','false');
        const spin = wait.querySelector('.spinner'); if (spin) spin.remove();
        wait.innerHTML =
          '<div class="loader-text" style="opacity:.9">Could not load image. ' +
          '<a href="{{ "/assets/img/PosterSession.pdf" | relative_url }}">Download the PDF</a>.</div>';
      });
    });
  }

  // Start the 3s clock only when the poster section first appears
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          startSequence();
          io.disconnect(); // only once
          break;
        }
      }
    }, {
      root: null,
      threshold: 0.12,          // ~12% of the section visible
      rootMargin: '0px 0px -10%'// start just before it fully centers
    });
    io.observe(posterSec);
  } else {
    // Fallback for very old browsers: start immediately
    startSequence();
  }
});
</script>

