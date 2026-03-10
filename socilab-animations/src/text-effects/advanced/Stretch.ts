import { TextSplitter, SplitOptions } from '../../core/TextSplitter';
import { AnimationEngine, AnimationOptions } from '../../core/AnimationEngine';

export class Stretch {
  private engine = new AnimationEngine();

  constructor(target: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, options: AnimationOptions & SplitOptions = {}) {
    const splitter = new TextSplitter(target, options);
    const elementsToAnimate = splitter.chars.length > 0 ? splitter.chars : splitter.words;

    // Stretch stretches the text horizontally
    const keyframes = [
      { opacity: 0, transform: 'scaleX(0.1) scaleY(2)' },
      { opacity: 1, transform: 'scaleX(1.5) scaleY(0.8)' },
      { opacity: 1, transform: 'scaleX(1) scaleY(1)' }
    ];

    this.engine.animate(elementsToAnimate, keyframes, { duration: 800, stagger: 50, fill: 'both', easing: 'ease', ...options });
  }
}
