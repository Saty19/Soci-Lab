import { TextSplitter, SplitOptions } from '../../core/TextSplitter';
import { AnimationEngine, AnimationOptions } from '../../core/AnimationEngine';

export interface SlideOptions extends AnimationOptions, SplitOptions {
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: string | number;
}

export class Slide {
  private engine = new AnimationEngine();

  constructor(target: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, options: SlideOptions = {}) {
    const { direction = 'up', distance = '100%', ...rest } = options;
    const splitter = new TextSplitter(target, rest);

    let elementsToAnimate = splitter.chars.length > 0 ? splitter.chars : (splitter.words.length > 0 ? splitter.words : splitter.lines);
    if (!rest.types) elementsToAnimate = splitter.chars.length > 0 ? splitter.chars : splitter.words;

    // determine translation
    const distStr = typeof distance === 'number' ? `${distance}px` : distance;
    let transformStart = '';
    if (direction === 'up') transformStart = `translateY(${distStr})`;
    if (direction === 'down') transformStart = `translateY(-${distStr})`;
    if (direction === 'left') transformStart = `translateX(${distStr})`;
    if (direction === 'right') transformStart = `translateX(-${distStr})`;

    const keyframes = [
      { opacity: 0, transform: transformStart },
      { opacity: 1, transform: 'translate(0, 0)' }
    ];

    this.engine.animate(elementsToAnimate, keyframes, { fill: 'both', easing: 'ease-out', ...rest });
  }
}
