import { TransitionEngine, PageTransitionOptions } from '../core/TransitionEngine';

export class EdgeWipeMotion {
  constructor(outEl: HTMLElement | null, inEl: HTMLElement | null, options: PageTransitionOptions = {}) {
    const engine = new TransitionEngine();

    // Outgoing stays still, incoming wipes from right to left smoothly
    const keyframesOut = [
      { transform: 'translate(0)', opacity: 1 }
    ];

    const keyframesIn = [
      { clipPath: 'inset(0 0 0 100%)' },
      { clipPath: 'inset(0 0 0 0)' }
    ];

    return engine.animate(outEl, inEl, keyframesOut, keyframesIn, {
      duration: 800,
      easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
      ...options,
      zIndex: { in: 10, out: 1 }
    });
  }
}
