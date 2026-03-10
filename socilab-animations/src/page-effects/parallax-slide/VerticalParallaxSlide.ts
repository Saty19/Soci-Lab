import { TransitionEngine, PageTransitionOptions } from '../core/TransitionEngine';

export interface VerticalSlideOptions extends PageTransitionOptions {
  direction?: 'up' | 'down';
  distance?: number; 
}

export class VerticalParallaxSlide {
  constructor(outEl: HTMLElement | null, inEl: HTMLElement | null, options: VerticalSlideOptions = {}) {
    const { direction = 'up', distance = 30, ...rest } = options;
    const engine = new TransitionEngine();

    const dirMult = direction === 'up' ? -1 : 1;
    const startY = `${-dirMult * 100}%`;
    const endYOut = `${dirMult * distance}%`;

    const keyframesIn = [
      { transform: `translateY(${startY})` },
      { transform: 'translateY(0%)' }
    ];

    const keyframesOut = [
      { transform: 'translateY(0%)', filter: 'brightness(1)' },
      { transform: `translateY(${endYOut})`, filter: 'brightness(0.5)' }
    ];

    return engine.animate(outEl, inEl, keyframesOut, keyframesIn, { ...rest, zIndex: { in: 10, out: 1 } });
  }
}
