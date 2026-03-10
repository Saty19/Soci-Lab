import { TextSplitter, SplitOptions } from '../../core/TextSplitter';
import { AnimationEngine, AnimationOptions } from '../../core/AnimationEngine';

export class GlitchReveal {
  private engine = new AnimationEngine();

  constructor(target: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, options: AnimationOptions & SplitOptions = {}) {
    const splitter = new TextSplitter(target, options);

    let elementsToAnimate = splitter.chars.length > 0 ? splitter.chars : splitter.words;

    // A fast random transform effect ending in clear text
    const keyframes = [
      { opacity: 0, transform: 'translate(0,0) skew(0)', offset: 0 },
      { opacity: 1, transform: 'translate(-5px, 2px) skew(10deg)', offset: 0.1 },
      { opacity: 1, transform: 'translate(5px, -5px) skew(-10deg)', offset: 0.2 },
      { opacity: 0.5, transform: 'translate(-2px, 5px) skew(5deg)', offset: 0.4 },
      { opacity: 1, transform: 'translate(2px, -2px) skew(-5deg)', offset: 0.6 },
      { opacity: 1, transform: 'translate(0,0) skew(0)', offset: 1.0 }
    ];

    this.engine.animate(elementsToAnimate, keyframes, { duration: 400, stagger: 40, fill: 'both', easing: 'steps(4)', ...options });
  }
}
