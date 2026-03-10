import { TextSplitter, SplitOptions } from '../../core/TextSplitter';
import { AnimationEngine, AnimationOptions } from '../../core/AnimationEngine';

export class Pop {
  private engine = new AnimationEngine();

  constructor(target: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, options: AnimationOptions & SplitOptions = {}) {
    const splitter = new TextSplitter(target, options);

    let elementsToAnimate = splitter.chars.length > 0 ? splitter.chars : splitter.words;

    // Pop effect uses multiple keyframes
    const keyframes = [
      { opacity: 0, transform: 'scale(0.5)', offset: 0 },
      { opacity: 1, transform: 'scale(1.1)', offset: 0.7 },
      { opacity: 1, transform: 'scale(1)', offset: 1 }
    ];

    this.engine.animate(elementsToAnimate, keyframes, { fill: 'both', easing: 'ease-in-out', ...options });
  }
}
