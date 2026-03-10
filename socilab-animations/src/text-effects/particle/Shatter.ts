import { TextSplitter, SplitOptions } from '../../core/TextSplitter';
import { AnimationEngine, AnimationOptions } from '../../core/AnimationEngine';

export class Shatter {
  private engine = new AnimationEngine();

  constructor(target: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, options: AnimationOptions & SplitOptions = {}) {
    // Better on characters
    const splitter = new TextSplitter(target, { types: ['chars'], ...options });
    const elementsToAnimate = splitter.chars;

    const animations: Animation[] = [];

    elementsToAnimate.forEach((el, i) => {
      // random direction for each char
      const dx = (Math.random() - 0.5) * 200 + 'px';
      const dy = (Math.random() - 0.5) * 200 + 'px';
      const rot = (Math.random() - 0.5) * 180 + 'deg';

      const keyframes = [
        { opacity: 1, transform: 'translate(0,0) rotate(0deg) scale(1)' },
        { opacity: 0, transform: `translate(${dx}, ${dy}) rotate(${rot}) scale(0)` }
      ];

      // Custom animation application per element because keyframes differ
      const anim = el.animate(keyframes, {
        duration: 1000,
        delay: i * (options.stagger || 10),
        fill: 'both',
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        ...options
      });
      animations.push(anim);
    });
  }
}
