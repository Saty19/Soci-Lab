import { TextSplitter, SplitOptions } from '../../core/TextSplitter';
import { AnimationEngine, AnimationOptions } from '../../core/AnimationEngine';

export class Bounce {
  private engine = new AnimationEngine();

  constructor(target: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, options: AnimationOptions & SplitOptions = {}) {
    const splitter = new TextSplitter(target, options);

    let elementsToAnimate = splitter.chars.length > 0 ? splitter.chars : splitter.words;

    const keyframes = [
      { opacity: 0, transform: 'translateY(-100%)', offset: 0 },
      { opacity: 1, transform: 'translateY(0)', offset: 0.4 },
      { opacity: 1, transform: 'translateY(-20%)', offset: 0.6 },
      { opacity: 1, transform: 'translateY(0)', offset: 0.8 },
      { opacity: 1, transform: 'translateY(-10%)', offset: 0.9 },
      { opacity: 1, transform: 'translateY(0)', offset: 1.0 }
    ];

    // default duration should be slightly longer for multiple bounces
    this.engine.animate(elementsToAnimate, keyframes, { duration: 1200, fill: 'both', easing: 'ease', ...options });
  }
}
