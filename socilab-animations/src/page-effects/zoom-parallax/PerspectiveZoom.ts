import { TransitionEngine, PageTransitionOptions } from '../core/TransitionEngine';

export class PerspectiveZoom {
  constructor(outEl: HTMLElement | null, inEl: HTMLElement | null, options: PageTransitionOptions = {}) {
    const engine = new TransitionEngine();

    // Outgoing element zooms wildly IN towards the viewer until it disappears
    const keyframesOut = [
      { transform: 'scale(1)', opacity: 1 },
      { transform: 'scale(3)', opacity: 0 }
    ];

    // Incoming element zooms in from a tiny perspective
    const keyframesIn = [
      { transform: 'scale(0.2)', opacity: 0 },
      { transform: 'scale(1)', opacity: 1 }
    ];

    return engine.animate(outEl, inEl, keyframesOut, keyframesIn, {
      duration: 1000,
      easing: 'cubic-bezier(0.65, 0, 0.35, 1)', // easeInOutCubic
      ...options,
      zIndex: { in: 1, out: 10 } // outgoing zooms over incoming
    });
  }
}
