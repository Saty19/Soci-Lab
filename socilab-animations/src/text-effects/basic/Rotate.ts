import { TextSplitter, SplitOptions } from '../../core/TextSplitter';
import { AnimationEngine, AnimationOptions } from '../../core/AnimationEngine';

export interface RotateOptions extends AnimationOptions, SplitOptions {
  degrees?: number;
  origin?: string;
}

export class Rotate {
  private engine = new AnimationEngine();

  constructor(target: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, options: RotateOptions = {}) {
    const { degrees = 90, origin = 'center center', ...rest } = options;
    const splitter = new TextSplitter(target, rest);

    let elementsToAnimate = splitter.chars.length > 0 ? splitter.chars : splitter.words;
    
    // Set transform origins dynamically if needed.
    elementsToAnimate.forEach(el => el.style.transformOrigin = origin);

    const keyframes = [
      { opacity: 0, transform: `rotate(${degrees}deg)` },
      { opacity: 1, transform: 'rotate(0deg)' }
    ];

    this.engine.animate(elementsToAnimate, keyframes, { fill: 'both', easing: 'ease-out', ...rest });
  }
}
