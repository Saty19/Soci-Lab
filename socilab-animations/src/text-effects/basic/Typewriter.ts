import { TextSplitter, SplitOptions } from '../../core/TextSplitter';
import { AnimationEngine, AnimationOptions } from '../../core/AnimationEngine';

export interface TypewriterOptions extends AnimationOptions, SplitOptions {
  cursor?: boolean;
}

export class Typewriter {
  private engine = new AnimationEngine();

  constructor(target: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, options: TypewriterOptions = {}) {
    // Typewriter typically reveals chars sequentially with 0 duration per char,
    // relying only on stagger to pop them in.
    const { cursor = true, duration = 0, stagger = 100, types = ['chars'], ...rest } = options;
    const splitter = new TextSplitter(target, { ...rest, types });

    const elementsToAnimate = splitter.chars;

    // Instant appearance based on delay/stagger
    const keyframes = [
      { opacity: 0 },
      { opacity: 1 }
    ];

    // By default, Web Animations API with step-end easing and 1ms duration acts instantly after the delay.
    this.engine.animate(elementsToAnimate, keyframes, { 
      duration: duration || 1, 
      stagger: stagger, 
      fill: 'both', 
      easing: 'step-end', 
      ...rest 
    });
  }
}
