import { TextSplitter, SplitOptions } from '../../core/TextSplitter';
import { AnimationEngine, AnimationOptions } from '../../core/AnimationEngine';

export interface MaskRevealOptions extends AnimationOptions, SplitOptions {
  direction?: 'ttb' | 'btt' | 'ltr' | 'rtl'; // top-to-bottom, bottom-to-top, etc.
}

export class MaskReveal {
  private engine = new AnimationEngine();

  constructor(target: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, options: MaskRevealOptions = {}) {
    const { direction = 'ltr', ...rest } = options;
    const splitter = new TextSplitter(target, rest);

    let elementsToAnimate = splitter.chars.length > 0 ? splitter.chars : splitter.words;

    // Use CSS clip-path inset for masking
    let startClip = '';
    if (direction === 'ltr') startClip = 'inset(0 100% 0 0)';
    if (direction === 'rtl') startClip = 'inset(0 0 0 100%)';
    if (direction === 'ttb') startClip = 'inset(0 0 100% 0)';
    if (direction === 'btt') startClip = 'inset(100% 0 0 0)';

    const keyframes = [
      { opacity: 0, clipPath: startClip }, // using opacity 0 to prevent FOUC prior to animation
      { opacity: 1, clipPath: startClip, offset: 0.01 },
      { opacity: 1, clipPath: 'inset(0 0 0 0)' }
    ];

    this.engine.animate(elementsToAnimate, keyframes, { fill: 'both', easing: 'ease', duration: 1000, stagger: 50, ...rest });
  }
}
