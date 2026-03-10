import { TransitionEngine, PageTransitionOptions } from '../core/TransitionEngine';

export class CardStackTransition {
  constructor(outEl: HTMLElement | null, inEl: HTMLElement | null, options: PageTransitionOptions = {}) {
    const engine = new TransitionEngine();

    // Outgoing scales down slightly and darkens to look like a background card
    const keyframesOut = [
      { transform: 'scale(1) translateY(0)', opacity: 1, filter: 'brightness(1)' },
      { transform: 'scale(0.92) translateY(-4%)', opacity: 0.8, filter: 'brightness(0.6)' }
    ];

    // Incoming slides up like a new card placed on top
    const keyframesIn = [
      { transform: 'translateY(100%) scale(0.95)', boxShadow: '0 -20px 40px rgba(0,0,0,0.5)' },
      { transform: 'translateY(0%) scale(1)', boxShadow: '0 -20px 40px rgba(0,0,0,0)' }
    ];

    return engine.animate(outEl, inEl, keyframesOut, keyframesIn, {
      duration: 800,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)', // Snappy ease out
      ...options,
      zIndex: { in: 10, out: 1 }
    });
  }
}
