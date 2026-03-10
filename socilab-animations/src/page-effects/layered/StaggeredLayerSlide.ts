import { TransitionEngine, PageTransitionOptions } from '../core/TransitionEngine';

export class StaggeredLayerSlide {
  constructor(outEl: HTMLElement | null, inEl: HTMLElement | null, options: PageTransitionOptions = {}) {
    const engine = new TransitionEngine();

    // In a real multi-layer transition, we'd animate individual internal elements (like header, hero, footer).
    // For a whole page, we can fake staggered blocks using clip-path polygons or multiple in/out steps.
    // However, the cleanest whole-page stagger is a fast slide-out of outEl and bouncy slide-in of inEl.
    const keyframesOut = [
      { transform: 'translateY(0)', opacity: 1 },
      { transform: 'translateY(-20%)', opacity: 0 }
    ];

    const keyframesIn = [
      { transform: 'translateY(30%)', opacity: 0 },
      { transform: 'translateY(-5%)', opacity: 1, offset: 0.8 },
      { transform: 'translateY(0)', opacity: 1, offset: 1.0 }
    ];

    return engine.animate(outEl, inEl, keyframesOut, keyframesIn, {
      duration: 1000,
      easing: 'ease-out',
      ...options,
      zIndex: { in: 10, out: 1 }
    });
  }
}
