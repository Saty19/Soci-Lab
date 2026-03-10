import { TextSplitter, SplitOptions } from '../../core/TextSplitter';
import { AnimationEngine, AnimationOptions } from '../../core/AnimationEngine';

export class Zoom {
  private engine = new AnimationEngine();

  constructor(target: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, options: AnimationOptions & SplitOptions = {}) {
    const splitter = new TextSplitter(target, options);

    let elementsToAnimate = splitter.chars.length > 0 ? splitter.chars : splitter.words;

    const keyframes = [
      { opacity: 0, transform: 'scale(2) translateZ(0)' },
      { opacity: 1, transform: 'scale(1) translateZ(0)' }
    ];

    this.engine.animate(elementsToAnimate, keyframes, { fill: 'both', easing: 'ease-out', ...options });
  }
}
