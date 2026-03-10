import { TextSplitter, SplitOptions } from '../../core/TextSplitter';
import { AnimationEngine, AnimationOptions } from '../../core/AnimationEngine';

export class DigitalGlitch {
  private engine = new AnimationEngine();

  constructor(target: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, options: AnimationOptions & SplitOptions = {}) {
    const splitter = new TextSplitter(target, options);
    const elementsToAnimate = splitter.chars.length > 0 ? splitter.chars : splitter.words;

    // Use CSS text-shadow to create RGB split glitching
    const shadowA = '2px 0 red, -2px 0 cyan';
    const shadowB = '-2px 0 red, 2px 0 cyan';
    
    const keyframes = [
      { opacity: 0, textShadow: 'none', transform: 'translate(0)' },
      { opacity: 1, textShadow: shadowA, transform: 'translate(-2px)' },
      { opacity: 1, textShadow: shadowB, transform: 'translate(2px)' },
      { opacity: 1, textShadow: shadowA, transform: 'translate(-2px)' },
      { opacity: 1, textShadow: shadowB, transform: 'translate(2px)' },
      { opacity: 1, textShadow: 'none', transform: 'translate(0)' }
    ];

    this.engine.animate(elementsToAnimate, keyframes, { duration: 300, stagger: 30, fill: 'both', easing: 'steps(5)', ...options });
  }
}
