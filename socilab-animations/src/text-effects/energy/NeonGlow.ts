import { TextSplitter, SplitOptions } from '../../core/TextSplitter';
import { AnimationEngine, AnimationOptions } from '../../core/AnimationEngine';

export interface NeonGlowOptions extends AnimationOptions, SplitOptions {
  color?: string;
}

export class NeonGlow {
  private engine = new AnimationEngine();

  constructor(target: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, options: NeonGlowOptions = {}) {
    const { color = '#0ff', ...rest } = options;
    const splitter = new TextSplitter(target, rest);

    let elementsToAnimate = splitter.chars.length > 0 ? splitter.chars : splitter.words;

    const baseShadow = `0 0 5px #fff, 0 0 10px #fff, 0 0 20px ${color}, 0 0 40px ${color}, 0 0 80px ${color}`;

    const keyframes = [
      { opacity: 0.1, textShadow: 'none' },
      { opacity: 1, textShadow: baseShadow, offset: 0.1 },
      { opacity: 0.2, textShadow: 'none', offset: 0.2 },
      { opacity: 1, textShadow: baseShadow, offset: 0.3 },
      { opacity: 0.9, textShadow: baseShadow, offset: 0.4 },
      { opacity: 1, textShadow: baseShadow, offset: 1 }
    ];

    this.engine.animate(elementsToAnimate, keyframes, { duration: 1500, stagger: 100, fill: 'both', easing: 'linear', ...rest });
  }
}
