import { TextSplitter, SplitOptions } from '../../core/TextSplitter';
import { AnimationEngine, AnimationOptions } from '../../core/AnimationEngine';

export interface Rotate3DOptions extends AnimationOptions, SplitOptions {
  axis?: 'X' | 'Y' | 'Z';
  degrees?: number;
}

export class Rotate3D {
  private engine = new AnimationEngine();

  constructor(target: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, options: Rotate3DOptions = {}) {
    const { axis = 'X', degrees = -90, ...rest } = options;
    const splitter = new TextSplitter(target, rest);

    let elementsToAnimate = splitter.chars.length > 0 ? splitter.chars : splitter.words;

    // We apply arbitrary perspective to the parent or directly in the transform
    elementsToAnimate.forEach(el => {
      // It's often better to apply perspective to the parent, but WAAPI needs inline transform
      // We'll wrap perspective in the transform string
      el.style.transformStyle = 'preserve-3d';
    });

    const keyframes = [
      { opacity: 0, transform: `perspective(400px) rotate${axis}(${degrees}deg)` },
      { opacity: 1, transform: `perspective(400px) rotate${axis}(0deg)` }
    ];

    this.engine.animate(elementsToAnimate, keyframes, { fill: 'both', easing: 'ease', duration: 1000, stagger: 50, ...rest });
  }
}
