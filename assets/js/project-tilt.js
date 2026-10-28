/**
 * React Bits Tilted Card — Jekyll adaptation.
 * Copyright (c) 2026 David Haz. MIT + Commons Clause.
 * License: /assets/licenses/react-bits-LICENSE.md
 * Source: https://github.com/DavidHDev/react-bits/tree/main/src/content/Components/TiltedCard
 * Retains the upstream spring, tilt, glare, shadow and swinging caption equations.
 * Native project links replace React activation; no flip, gyroscope or idle animation.
 */
(() => {
  "use strict";
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const step = (state, key, target, omega, zeta, dt) => {
    const velocity = `v${key}`;
    const steps = Math.max(1, Math.ceil(dt / (1 / 240)));
    const h = dt / steps;
    for (let index = 0; index < steps; index++) {
      state[velocity] += (omega * omega * (target - state[key]) - 2 * zeta * omega * state[velocity]) * h;
      state[key] += state[velocity] * h;
    }
    const settled = Math.abs(target - state[key]) < 0.001 && Math.abs(state[velocity]) < 0.01;
    if (settled) {
      state[key] = target;
      state[velocity] = 0;
    }
    return !settled;
  };

  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const fine = matchMedia("(any-hover: hover) and (any-pointer: fine)");

  document.querySelectorAll(".project-tilt").forEach((figure) => {
    const body = figure.querySelector(".tilted-card__body");
    const shade = figure.querySelector(".tilted-card__shadow");
    const caption = figure.querySelector(".tilted-card__caption");
    const state = { rx: 0, vrx: 0, ry: 0, vry: 0, lift: 0, vlift: 0, tip: 0, vtip: 0, shown: 0, vshown: 0, tx: 0, tyy: 0 };
    const pointer = { nx: 0, ny: 0, x: 0, y: 0, inside: false, vx: 0, last: 0 };
    let raf = 0;
    let last = 0;
    let visible = true;
    let focused = false;
    let tipLimit = Infinity;
    // Classic spring settings with two-thirds of the original tilt amplitude.
    const amplitude = 8;
    const smoothness = 0.6;
    const omega = 20 * Math.pow(0.2, smoothness);
    const zeta = 1 - 0.3 * smoothness;

    function frame(now) {
      raf = 0;
      if (!visible || document.hidden) return;
      if (reduced.matches || !fine.matches) {
        reset();
        return;
      }
      const dt = clamp((now - last) / 1000, 0, 0.05);
      last = now;
      const hovering = pointer.inside && fine.matches && !reduced.matches;
      const inputX = hovering ? pointer.nx : 0;
      const inputY = hovering ? pointer.ny : 0;
      const lifted = hovering || (focused && !reduced.matches) ? 1 : 0;
      let busy = false;
      busy = step(state, "rx", -inputY * amplitude, omega, zeta, dt) || busy;
      busy = step(state, "ry", inputX * amplitude, omega, zeta, dt) || busy;
      busy = step(state, "lift", lifted, omega, Math.max(zeta, 0.85), dt) || busy;
      const active = lifted > 0 || state.lift > 0.01;
      figure.toggleAttribute("data-active", active);
      body.style.willChange = active || busy ? "transform" : "";
      const scale = 1 + 0.05 * state.lift;
      const rx = state.rx;
      const ry = state.ry;
      const radiansX = (rx * Math.PI) / 180;
      const radiansY = (ry * Math.PI) / 180;
      body.style.transform = `rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg) scale(${scale.toFixed(4)})`;
      body.style.setProperty("--tc-gx", `${(50 + (ry / amplitude) * 46).toFixed(2)}%`);
      body.style.setProperty("--tc-gy", `${(50 - (rx / amplitude) * 46).toFixed(2)}%`);
      const energy = Math.min(1, Math.hypot(rx, ry) / amplitude);
      body.style.setProperty("--tc-glare", (0.5 * Math.max(state.lift, energy)).toFixed(3));
      const offsetX = -Math.sin(radiansY) * 22;
      const offsetY = 12 + 16 * state.lift + Math.sin(radiansX) * 18;
      const spread = scale * (0.86 + 0.04 * state.lift);
      shade.style.transform = `translate3d(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px, 0) scale(${spread.toFixed(4)})`;
      shade.style.opacity = (0.5 * (0.6 + 0.4 * state.lift)).toFixed(3);

      busy = step(state, "shown", hovering ? 1 : 0, 16, 1, dt) || busy;
      const follow = 1 - Math.exp(-dt / 0.035);
      state.tx += (pointer.x - state.tx) * follow;
      state.tyy += (pointer.y - state.tyy) * follow;
      if (Math.abs(pointer.x - state.tx) + Math.abs(pointer.y - state.tyy) > 0.2) busy = true;
      pointer.vx *= Math.exp(-dt / 0.08);
      busy = step(state, "tip", reduced.matches ? 0 : clamp(-pointer.vx * 0.012, -14, 14), 18, 0.62, dt) || busy;
      // Keep long project names inside the viewport, while retaining cursor tracking.
      const tipX = Math.min(state.tx, tipLimit);
      caption.style.transform = `translate3d(${tipX.toFixed(1)}px, ${state.tyy.toFixed(1)}px, 0) rotate(${state.tip.toFixed(2)}deg)`;
      caption.style.opacity = Math.max(0, state.shown).toFixed(3);
      if (busy) raf = requestAnimationFrame(frame);
    }

    function wake() {
      if (raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
    function track(event, entering = false) {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      if (reduced.matches || !fine.matches) return;
      const rect = figure.getBoundingClientRect();
      tipLimit = innerWidth - rect.left - caption.offsetWidth - 24;
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const now = performance.now();
      if (entering || !pointer.inside) {
        state.tx = x;
        state.tyy = y;
        pointer.x = x;
        pointer.vx = 0;
        pointer.last = now;
      }
      const elapsed = Math.max(8, now - (pointer.last || now - 16)) / 1000;
      pointer.vx += ((x - pointer.x) / elapsed - pointer.vx) * 0.5;
      pointer.last = now;
      pointer.x = x;
      pointer.y = y;
      pointer.nx = clamp((x - rect.width / 2) / Math.max(1, rect.width / 2), -1, 1);
      pointer.ny = clamp((y - rect.height / 2) / Math.max(1, rect.height / 2), -1, 1);
      pointer.inside = true;
      wake();
    }
    function leave() {
      pointer.inside = false;
      pointer.vx = 0;
      wake();
    }
    function reset() {
      cancelAnimationFrame(raf);
      raf = 0;
      Object.keys(state).forEach((key) => {
        state[key] = 0;
      });
      pointer.inside = false;
      pointer.vx = 0;
      body.style.transform = "";
      body.style.willChange = "";
      body.style.setProperty("--tc-glare", "0");
      caption.style.opacity = "0";
      shade.style.opacity = "0";
      figure.removeAttribute("data-active");
    }
    figure.addEventListener("pointerenter", (event) => track(event, true));
    figure.addEventListener("pointermove", track);
    figure.addEventListener("pointerleave", leave);
    figure.addEventListener("pointercancel", leave);
    body.addEventListener("focus", () => {
      focused = body.matches(":focus-visible");
      wake();
    });
    body.addEventListener("blur", () => {
      focused = false;
      leave();
    });
    window.addEventListener("blur", leave);
    window.addEventListener("scroll", leave, { passive: true });
    window.addEventListener("resize", leave, { passive: true });
    function motionChanged() {
      reset();
      if (fine.matches && !reduced.matches) wake();
    }
    reduced.addEventListener("change", motionChanged);
    fine.addEventListener("change", motionChanged);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) reset();
      else if (fine.matches && !reduced.matches) wake();
    });
    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (!visible) reset();
      else if (fine.matches && !reduced.matches) wake();
    });
    observer.observe(figure);
  });
})();
