import { TextSplitter, SplitOptions } from '../../core/TextSplitter';
import { AnimationEngine, AnimationOptions } from '../../core/AnimationEngine';

export interface BlurOptions extends AnimationOptions, SplitOptions {
  amount?: string;
}

export class Blur {
  private engine = new AnimationEngine();

  constructor(target: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, options: BlurOptions = {}) {
    const { amount = '10px', ...rest } = options;
    const splitter = new TextSplitter(target, rest);

    let elementsToAnimate = splitter.chars.length > 0 ? splitter.chars : splitter.words;

    const keyframes = [
      { opacity: 0, filter: `blur(${amount})` },
      { opacity: 1, filter: 'blur(0px)' }
    ];

    this.engine.animate(elementsToAnimate, keyframes, { fill: 'both', ...rest });
  }
}
