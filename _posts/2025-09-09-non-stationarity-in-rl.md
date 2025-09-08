---
layout: default
title: "Non‑Stationarity in RL Environments"
excerpt: "Adapting to evolving MDPs via risk‑averse planning, confidence widening, and windowed optimism."
tags: [reinforcement-learning, non-stationarity, mdp, dynamic-regret]
---


<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/custom.css">


<!-- MathJax for equations -->
<script>
window.MathJax = { tex: { inlineMath: [["$","$"],["\\(","\\)"]] } };
</script>
<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" defer></script>


<header class="post-hero">
<h1>Non‑Stationarity in RL Environments</h1>
<p><em>Ali Najar</em><sup>1</sup>, <em>Mazdak Teymourian</em><sup>1</sup></p>
<p><sup>1</sup>Department of Computer Engineering, Sharif University of Technology, Tehran, Iran<br>
anajar13750@gmail.com • mazdak.tey@gmail.com</p>
</header>


<nav class="toc">
<strong>On this page</strong>
<ol>
<li><a href="#abstract">Abstract</a></li>
<li><a href="#introduction">Introduction</a></li>
<li><a href="#risk-averse-tree-search">Risk‑Averse Tree‑Search (RATS)</a></li>
<li><a href="#blessing-of-optimism">The Blessing of Optimism</a></li>
<li><a href="#results">Results</a></li>
<li><a href="#references">References</a></li>
</ol>
</nav>


## <a id="abstract"></a>Abstract
Real‑world RL rarely sits still: transitions and rewards drift as goals change, sensors age, or other agents learn. We study algorithms that **adapt without prior knowledge** of drift magnitude or change points. Our objectives are to (1) characterize the limits of learning under bounded and smooth non‑stationarity, (2) design model‑based and model‑free methods using **sliding windows**, **exponential forgetting**, and **optimism**, and (3) extend to deep and multi‑agent settings. We target low **dynamic regret** while keeping exploration robust to stale data.


**Keywords:** non‑stationary RL, non‑stationary MDPs, policy optimization, dynamic regret


## <a id="introduction"></a>Introduction
We model interaction via a horizon‑$H$ MDP $\mathcal{M}=(\mathcal{S},\mathcal{A},P,r,H)$. In non‑stationary settings, $P_t(\cdot\mid s,a)$ and $r_t(s,a)$ evolve with time $t$, yielding a sequence $\mathcal{M}_t$.


**Two lenses for drift**


- **Bounded variation (drift budget).**
$$B_r = \sum_{t=1}^{T-1} \max_{s,a} |r_{t+1}(s,a)-r_t(s,a)|,\quad
B_p = \sum_{t=1}^{T-1} \max_{s,a} \|P_{t+1}(\cdot\mid s,a)-P_t(\cdot\mid s,a)\|_1.$$
Piecewise‑stationarity is a special case.


- **Lipschitz (smooth drift).** For $\Delta\ge1$,
$$|r_{t+\Delta}(s,a)-r_t(s,a)|\le L_r\Delta,\quad
W_1\!\left(P_{t+\Delta}(\cdot\mid s,a),P_t(\cdot\mid s,a)\right)\le L_p\Delta.$$


**Goal:** track $\pi_t^\star\in\arg\max_\pi V_{t,1}^\pi(s_{t,1})$ despite staleness of past data.


## <a id="risk-averse-tree-search"></a>Risk‑Averse Tree‑Search (RATS)
RATS treats nature as an adversary over Lipschitz‑consistent evolutions of $(P_t,r_t)$ and plans with minimax value backups. Intuitively, it selects actions that **maximize worst‑case return** across plausible dynamics within a lookahead depth $D$.


<div class="figure">
<img src="{{ site.baseurl }}/assets/img/rat-diagram.png" alt="RATS minimax search diagram" />
<p class="caption">RATS minimax planner (illustrative). Replace with your RAT.pdf rendering.</p>
</div>


**Sketch (minimax recursion):**
```text
Decision node: V(ν) = max_{child ν'} V(ν') (or heuristic at depth/terminal)
Chance node @t: V(ν) = min_{(p,R)∈Δ^{t}_{t0}} [ R(ν) + γ Σ_{ν'} p(ν'|ν) V(ν') ]