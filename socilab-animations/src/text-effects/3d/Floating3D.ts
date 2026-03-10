import { TextSplitter, SplitOptions } from '../../core/TextSplitter';
import { AnimationEngine, AnimationOptions } from '../../core/AnimationEngine';

export class Floating3D {
  private engine = new AnimationEngine();

  constructor(target: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, options: AnimationOptions & SplitOptions = {}) {
    const splitter = new TextSplitter(target, options);

    let elementsToAnimate = splitter.chars.length > 0 ? splitter.chars : splitter.words;
    
    // Continuous floating hovering along Y and Z
    const keyframes = [
      { transform: 'perspective(400px) translate3d(0, 0, 0)' },
      { transform: 'perspective(400px) translate3d(0, -10px, 20px)' },
      { transform: 'perspective(400px) translate3d(0, 0, 0)' }
    ];

    this.engine.animate(elementsToAnimate, keyframes, { 
      duration: 3000, 
      stagger: 200, 
      easing: 'ease-in-out', 
      fill: 'both', 
      // @ts-ignore
      iterations: Infinity, 
      ...options 
    });
  }
}
