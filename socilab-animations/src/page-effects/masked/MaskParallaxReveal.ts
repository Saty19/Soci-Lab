import { TransitionEngine, PageTransitionOptions } from '../core/TransitionEngine';

export interface MaskParallaxRevealOptions extends PageTransitionOptions {
  direction?: 'ttb' | 'btt' | 'ltr' | 'rtl';
}

export class MaskParallaxReveal {
  constructor(outEl: HTMLElement | null, inEl: HTMLElement | null, options: MaskParallaxRevealOptions = {}) {
    const { direction = 'ttb', ...rest } = options;
    const engine = new TransitionEngine();

    // The outgoing element acts as the mask container or sliding layer underneath
    // Here we use clip-path to reveal the incoming element
    const keyframesOut = [
      { transform: 'translateY(0)', filter: 'brightness(1)' },
      { transform: 'translateY(-20%)', filter: 'brightness(0.5)' }
    ];
    
    let startClip = '';
    if (direction === 'ltr') startClip = 'inset(0 100% 0 0)';
    if (direction === 'rtl') startClip = 'inset(0 0 0 100%)';
    if (direction === 'ttb') startClip = 'inset(0 0 100% 0)';
    if (direction === 'btt') startClip = 'inset(100% 0 0 0)';

    const keyframesIn = [
      { clipPath: startClip, transform: 'translateY(10%)' },
      { clipPath: 'inset(0 0 0 0)', transform: 'translateY(0)' }
    ];

    return engine.animate(outEl, inEl, keyframesOut, keyframesIn, {
      duration: 1000,
      easing: 'cubic-bezier(0.77, 0, 0.175, 1)',
      ...rest,
      zIndex: { in: 10, out: 1 }
    });
  }
}
