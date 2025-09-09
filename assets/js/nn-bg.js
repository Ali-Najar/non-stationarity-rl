// Neural "nodes & edges" background that fills ONLY the hero section
// Pauses when hero is offscreen for smoother scrolling

(() => {
  const canvas = document.getElementById('nn-hero');
  if (!canvas) return;

  const container = canvas.parentElement; // <header class="hero">
  const ctx = canvas.getContext('2d', { alpha: true });

  let W = 0, H = 0, DPR = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
  let nodes = [];
  const NODE_COUNT_BASE = 90;
  const EDGE_DIST = 150, EDGE_DIST_SQ = EDGE_DIST * EDGE_DIST;
  const SPEED = 0.25;
  const HUE_A = 212, HUE_B = 190;

  function seed() {
    const target = Math.floor(NODE_COUNT_BASE * (W * H) / (1440 * 800));
    nodes = new Array(Math.max(40, Math.min(target, 160))).fill(0).map(() => {
      const r = 1.2 + Math.random() * 2.2;
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        r
      };
    });
  }

  function resize() {
    const rect = container.getBoundingClientRect();
    W = Math.max(1, Math.floor(rect.width));
    H = Math.max(1, Math.floor(rect.height));
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    seed();
  }

  function step(dt) {
    for (const n of nodes) {
      n.x += n.vx * dt;
      n.y += n.vy * dt;
      if (n.x < -40) n.x = W + 40;
      if (n.x > W + 40) n.x = -40;
      if (n.y < -40) n.y = H + 40;
      if (n.y > H + 40) n.y = -40;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // connections
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx*dx + dy*dy;
        if (d2 < EDGE_DIST_SQ) {
          const t = 1 - (d2 / EDGE_DIST_SQ);
          const alpha = 0.15 * t;
          const hue = HUE_A - (HUE_A - HUE_B) * t;
          ctx.strokeStyle = `hsla(${hue}, 70%, 65%, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // nodes + subtle glow
    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fill();

      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 14);
      g.addColorStop(0, 'rgba(80, 180, 255, 0.18)');
      g.addColorStop(1, 'rgba(80, 180, 255, 0.0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 14, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  let last = performance.now(), raf;
  function loop(now) {
    const dt = Math.min(33, now - last);
    last = now;
    step(dt);
    draw();
    raf = requestAnimationFrame(loop);
  }
  function start(){ if (!raf) raf = requestAnimationFrame(loop); }
  function stop(){ if (raf){ cancelAnimationFrame(raf); raf = null; } }

  // Resize with container, not window
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  // Sleep when hero is offscreen (smoother scroll)
  const vis = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) start(); else stop();
  }, { threshold: 0.1 });
  vis.observe(container);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else start();
  });

  resize();
  start();
})();
