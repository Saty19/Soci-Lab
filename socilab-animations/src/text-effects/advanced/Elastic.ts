import { TextSplitter, SplitOptions } from '../../core/TextSplitter';
import { AnimationEngine, AnimationOptions } from '../../core/AnimationEngine';

export class Elastic {
  private engine = new AnimationEngine();

  constructor(target: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, options: AnimationOptions & SplitOptions = {}) {
    const splitter = new TextSplitter(target, options);
    const elementsToAnimate = splitter.chars.length > 0 ? splitter.chars : splitter.words;

    // Elastic entrance
    const keyframes = [
      { opacity: 0, transform: 'scale(0.3)', offset: 0 },
      { opacity: 1, transform: 'scale(1.2)', offset: 0.4 },
      { opacity: 1, transform: 'scale(0.85)', offset: 0.6 },
      { opacity: 1, transform: 'scale(1.05)', offset: 0.8 },
      { opacity: 1, transform: 'scale(1)', offset: 1.0 }
    ];

    this.engine.animate(elementsToAnimate, keyframes, { duration: 1000, stagger: 40, fill: 'both', easing: 'ease-out', ...options });
  }
}
