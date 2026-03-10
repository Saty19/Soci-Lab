import { TextSplitter, SplitOptions } from '../../core/TextSplitter';
import { AnimationEngine, AnimationOptions } from '../../core/AnimationEngine';

export interface ScaleOptions extends AnimationOptions, SplitOptions {
  from?: number;
  to?: number;
}

export class Scale {
  private engine = new AnimationEngine();

  constructor(target: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, options: ScaleOptions = {}) {
    const { from = 0, to = 1, ...rest } = options;
    const splitter = new TextSplitter(target, rest);

    let elementsToAnimate = splitter.chars.length > 0 ? splitter.chars : splitter.words;

    const keyframes = [
      { opacity: 0, transform: `scale(${from})` },
      { opacity: 1, transform: `scale(${to})` }
    ];

    this.engine.animate(elementsToAnimate, keyframes, { fill: 'both', easing: 'ease-out', ...rest });
  }
}
