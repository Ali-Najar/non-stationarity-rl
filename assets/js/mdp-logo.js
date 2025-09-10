// Non-stationary drift on edge probabilities + edge emphasis
document.addEventListener('DOMContentLoaded', () => {
  const svg = document.querySelector('.mdp-logo svg');
  if (!svg) return;

  const spans = [...svg.querySelectorAll('.mdp-prob tspan[data-p]')];

  // Update a single edge’s visual weight from p in [0,1]
  function styleEdge(edge, p){
    if (!edge) return;
    const w = 1.4 + p * 2.6;                    // stroke width
    const op = (0.35 + p * 0.65).toFixed(2);    // opacity
    const dur = Math.max(1.0, 3.0 - p * 1.8);   // faster when high prob
    edge.style.strokeWidth = w;
    edge.style.opacity = op;
    edge.style.animationDuration = `${dur}s`;
  }

  // Initialize + animate
  spans.forEach((el) => {
    let seq = [0.6, 0.5, 0.4, 0.7];
    try {
      const parsed = JSON.parse(el.dataset.p);
      if (Array.isArray(parsed) && parsed.length) seq = parsed;
    } catch(_) {}

    let i = 0;
    const edgeId = el.dataset.edge;
    const edge = svg.querySelector(`.mdp-edge[data-edge="${edgeId}"]`);

    function tick(){
      const p = Math.max(0, Math.min(1, Number(seq[i % seq.length])));
      el.textContent = p.toFixed(2);
      styleEdge(edge, p);
      i++;
    }

    tick();
    const timer = setInterval(tick, 1600);

    // Cleanup if this fragment ever gets removed
    const obs = new MutationObserver(() => {
      if (!document.body.contains(el)) { clearInterval(timer); obs.disconnect(); }
    });
    obs.observe(document.body, { childList: true, subtree: true });
  });
});
