---
layout: default
title: ""
---

<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">
<script src="{{ '/assets/js/reveal.js' | relative_url }}" defer></script>
<script src="{{ '/assets/js/nn-bg.js' | relative_url }}" defer></script>
<script>
  // MathJax inline config
  window.MathJax = { tex: { inlineMath: [["$","$"],["\\(","\\)"]] } };
  // Always start at top/bottom (toggle data-start on <main>)
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

  <!-- Screen 3: Poster -->
  <section id="poster" class="snap-section">
    <div class="container">
      <h2 class="section-title reveal">Check out our poster</h2>

      <div class="poster-frame">

        <!-- ===== Option A: Simple <object> (may show browser toolbar) ===== -->
        <object
          class="poster-embed"
          data="{{ '/assets/img/PosterSession.pdf' | relative_url }}#view=FitH&toolbar=0&navpanes=0&scrollbar=0"
          type="application/pdf"></object>

        <!-- ===== Option B: PDF.js canvas (NO toolbar). Uncomment to use. =====
        <canvas id="poster-canvas" class="poster-canvas"></canvas>
        <script defer src="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.min.js"></script>
        <script>
          document.addEventListener('DOMContentLoaded', () => {
            const url = "{{ '/assets/img/PosterSession.pdf' | relative_url }}";
            // worker
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
            const canvas = document.getElementById('poster-canvas');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            const frame = document.querySelector('.poster-frame');

            function render() {
              pdfjsLib.getDocument(url).promise.then(pdf => pdf.getPage(1)).then(page => {
                const w = frame.clientWidth;
                const vp1 = page.getViewport({ scale: 1 });
                const scale = Math.min(w / vp1.width, 2.0); // limit scale for perf
                const vp = page.getViewport({ scale });
                canvas.width = Math.floor(vp.width);
                canvas.height = Math.floor(vp.height);
                canvas.style.width = vp.width + 'px';
                canvas.style.height = vp.height + 'px';
                return page.render({ canvasContext: ctx, viewport: vp }).promise;
              }).catch(console.error);
            }

            // Re-render on resize (throttled)
            let tid;
            window.addEventListener('resize', () => { clearTimeout(tid); tid = setTimeout(render, 120); });
            render();
          });
        </script>
        ===== End Option B ===== -->

      </div>
    </div>
  </section>

  <!-- Screen 4: Content -->
  <section id="content" class="snap-section">
    <div class="container prose">
      <h2 class="section-title reveal">Content</h2>

      <h3>Abstract</h3>
      <p>YEST. Real-world RL rarely sits still: transitions and rewards drift as goals change, sensors age, or other agents learn. We study algorithms that adapt without prior knowledge of drift magnitude or change points, targeting low dynamic regret via sliding windows, exponential forgetting, and optimism.</p>

      <h3>Introduction</h3>
      <p>We model interaction via a horizon-$H$ MDP $\mathcal{M}=(\mathcal{S},\mathcal{A},P,r,H)$. In non-stationary settings, both $P_t(\cdot\mid s,a)$ and $r_t(s,a)$ evolve with time $t$, yielding a sequence $\mathcal{M}_t$.</p>
    </div>
  </section>

</main>
