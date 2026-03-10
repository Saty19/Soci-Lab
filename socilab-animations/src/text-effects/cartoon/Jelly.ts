import { TextSplitter, SplitOptions } from '../../core/TextSplitter';
import { AnimationEngine, AnimationOptions } from '../../core/AnimationEngine';

export class Jelly {
  private engine = new AnimationEngine();

  constructor(target: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, options: AnimationOptions & SplitOptions = {}) {
    const splitter = new TextSplitter(target, options);
    const elementsToAnimate = splitter.chars.length > 0 ? splitter.chars : splitter.words;

    const keyframes = [
      { transform: 'scale(1, 1)' },
      { transform: 'scale(1.25, 0.75)' },
      { transform: 'scale(0.75, 1.25)' },
      { transform: 'scale(1.15, 0.85)' },
      { transform: 'scale(0.95, 1.05)' },
      { transform: 'scale(1, 1)' }
    ];

    this.engine.animate(elementsToAnimate, keyframes, { duration: 1000, stagger: 50, fill: 'both', easing: 'ease-in-out', ...options });
  }
}
