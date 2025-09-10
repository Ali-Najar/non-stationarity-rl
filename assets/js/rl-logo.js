// /assets/js/rl-logo.js
(() => {
  const mediaOK = !window.matchMedia || !matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!mediaOK) return;
  const svg = document.querySelector('.rl-logo');
  if (!svg) return;

  // Select any inner groups you mark with data-drift (add to the inner <g> wrappers)
  const nodes = [...svg.querySelectorAll('[data-drift]')];
  if (!nodes.length) return;

  // Random walk targets
  const targets = nodes.map((_, i) => ({ x: 0, y: 0, ampX: 6 + (i % 5), ampY: 6 + (i % 7) }));
  let t0 = 0;

  function retarget(k){
    targets[k].x = (Math.random()*2 - 1) * targets[k].ampX;
    targets[k].y = (Math.random()*2 - 1) * targets[k].ampY;
  }
  targets.forEach((_, i) => retarget(i));

  function lerp(a,b,u){ return a + (b-a)*u; }

  function tick(ts){
    if(!t0) t0 = ts;
    const dt = Math.min(0.05, (ts - t0)/1000); // ~60fps cap
    t0 = ts;

    nodes.forEach((g, i) => {
      const cur = g._p || { x: 0, y: 0 };
      // ease toward target
      const nx = lerp(cur.x, targets[i].x, 0.08);
      const ny = lerp(cur.y, targets[i].y, 0.08);
      g.setAttribute('transform', `translate(${nx.toFixed(2)},${ny.toFixed(2)})`);
      g._p = { x: nx, y: ny };

      // occasionally retarget
      if (!g._t || ts - g._t > 1200 + Math.random()*1800){
        retarget(i);
        g._t = ts;
      }
    });

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
