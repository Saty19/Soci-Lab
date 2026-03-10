import { TransitionEngine, PageTransitionOptions } from '../core/TransitionEngine';

export class LayerDepthTransition {
  constructor(outEl: HTMLElement | null, inEl: HTMLElement | null, options: PageTransitionOptions = {}) {
    const engine = new TransitionEngine();

    // Outgoing sinks backwards into depth
    const keyframesOut = [
      { transform: 'translateZ(0) scale(1)', opacity: 1 },
      { transform: 'translateZ(-500px) scale(0.8)', opacity: 0 }
    ];

    // Incoming rises from deeper backwards
    const keyframesIn = [
      { transform: 'translateZ(-1000px) scale(0.6)', opacity: 0 },
      { transform: 'translateZ(0) scale(1)', opacity: 1 }
    ];

    return engine.animate(outEl, inEl, keyframesOut, keyframesIn, {
      duration: 1000,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)', // easeOutExpo
      ...options,
      zIndex: { in: 10, out: 1 } // ensure incoming covers outgoing eventually
    });
  }
}
