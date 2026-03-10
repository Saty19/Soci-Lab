import { TransitionEngine, PageTransitionOptions } from '../core/TransitionEngine';

export class SmoothSlideReveal {
  constructor(outEl: HTMLElement | null, inEl: HTMLElement | null, options: PageTransitionOptions = {}) {
    const engine = new TransitionEngine();

    // The exiting element stays still but fades slightly
    const keyframesOut = [
      { transform: 'translateY(0)', opacity: 1 },
      { transform: 'translateY(-10%)', opacity: 0.5 }
    ];

    // The incoming element slides up smoothly over it
    const keyframesIn = [
      { transform: 'translateY(100%)', boxShadow: '0 -20px 50px rgba(0,0,0,0.5)' },
      { transform: 'translateY(0%)', boxShadow: '0 -20px 50px rgba(0,0,0,0)' }
    ];

    return engine.animate(outEl, inEl, keyframesOut, keyframesIn, {
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)', // very smooth out
      ...options,
      zIndex: { in: 10, out: 1 }
    });
  }
}
