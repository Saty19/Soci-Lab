import { TextSplitter, SplitOptions } from '../../core/TextSplitter';
import { AnimationEngine, AnimationOptions } from '../../core/AnimationEngine';

export class Wavy {
  private engine = new AnimationEngine();

  constructor(target: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, options: AnimationOptions & SplitOptions = {}) {
    // Wavy often works best on characters
    const splitter = new TextSplitter(target, { types: ['chars'], ...options });
    const elementsToAnimate = splitter.chars;

    const keyframes = [
      { transform: 'translateY(0)' },
      { transform: 'translateY(-30%)' },
      { transform: 'translateY(0)' }
    ];

    // For a continuous wave effect, we can use infinite repetition.
    this.engine.animate(elementsToAnimate, keyframes, { 
      duration: 1000, 
      stagger: 100, 
      easing: 'ease-in-out', 
      fill: 'both', 
      ...options,
      // @ts-ignore - native WAAPI supports iterations
      iterations: Infinity 
    });
  }
}
