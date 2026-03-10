import { TextSplitter, SplitOptions } from '../../core/TextSplitter';
import { AnimationEngine, AnimationOptions } from '../../core/AnimationEngine';

export class CinematicReveal {
  private engine = new AnimationEngine();

  constructor(target: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, options: AnimationOptions & SplitOptions = {}) {
    const splitter = new TextSplitter(target, options);
    const elementsToAnimate = splitter.chars.length > 0 ? splitter.chars : splitter.words;

    // We animate letter spacing on the parent, opacity on the children
    splitter.elements.forEach(el => {
      el.animate([
         { letterSpacing: '2em' },
         { letterSpacing: 'normal' }
      ], { duration: 3000, easing: 'ease-out', fill: 'both' });
    });

    const keyframes = [
      { opacity: 0, filter: 'blur(20px)' },
      { opacity: 1, filter: 'blur(0px)' }
    ];

    this.engine.animate(elementsToAnimate, keyframes, { duration: 3000, stagger: 100, fill: 'both', easing: 'ease-out', ...options });
  }
}
