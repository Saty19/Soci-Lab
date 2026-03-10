import { TextSplitter, SplitOptions } from '../../core/TextSplitter';
import { AnimationEngine, AnimationOptions } from '../../core/AnimationEngine';

export class CaptionPop {
  private engine = new AnimationEngine();

  constructor(target: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, options: AnimationOptions & SplitOptions = {}) {
    // Caption effects use words
    const splitter = new TextSplitter(target, { types: ['words'], ...options });

    const keyframes = [
      { opacity: 0, transform: 'scale(0.8) translateY(20px)' },
      { opacity: 1, transform: 'scale(1.1) translateY(-2px)', offset: 0.7 },
      { opacity: 1, transform: 'scale(1) translateY(0)', offset: 1.0 }
    ];

    this.engine.animate(splitter.words, keyframes, { duration: 300, stagger: 150, fill: 'both', easing: 'ease-out', ...options });
  }
}
