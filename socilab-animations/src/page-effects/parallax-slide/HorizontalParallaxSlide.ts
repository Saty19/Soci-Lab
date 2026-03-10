import { TransitionEngine, PageTransitionOptions } from '../core/TransitionEngine';

export interface HorizontalSlideOptions extends PageTransitionOptions {
  direction?: 'left' | 'right';
  distance?: number; // Distance for the exiting element to move, creating parallax
}

/**
 * Horizontal Parallax Slide Transition
 * The incoming page slides in fully while the outgoing page slides slightly in the same direction, creating depth.
 */
export class HorizontalParallaxSlide {
  constructor(outEl: HTMLElement | null, inEl: HTMLElement | null, options: HorizontalSlideOptions = {}) {
    const { direction = 'left', distance = 30, ...rest } = options;
    const engine = new TransitionEngine();

    // If moving left, incoming comes from 100% right, outgoing moves -30% left
    const dirMult = direction === 'left' ? -1 : 1;
    
    // The incoming element needs to start off-screen
    const startX = `${-dirMult * 100}%`;
    const endXOut = `${dirMult * distance}%`;

    const keyframesIn = [
      { transform: `translateX(${startX})` },
      { transform: 'translateX(0%)' }
    ];

    const keyframesOut = [
      { transform: 'translateX(0%)', filter: 'brightness(1)' },
      { transform: `translateX(${endXOut})`, filter: 'brightness(0.5)' } // Darken slightly for depth
    ];

    // Ensure incoming element is on top
    const outZ = 1;
    const inZ = 10;

    return engine.animate(outEl, inEl, keyframesOut, keyframesIn, {
      ...rest,
      zIndex: { in: inZ, out: outZ }
    });
  }
}
