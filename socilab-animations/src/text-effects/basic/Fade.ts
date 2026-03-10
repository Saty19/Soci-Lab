import { TextSplitter, SplitOptions } from '../../core/TextSplitter';
import { AnimationEngine, AnimationOptions } from '../../core/AnimationEngine';

export interface FadeOptions extends AnimationOptions, SplitOptions {
  direction?: 'in' | 'out';
}

export class Fade {
  private engine = new AnimationEngine();

  constructor(target: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, options: FadeOptions = {}) {
    const { direction = 'in', ...rest } = options;
    
    // We want the text to be invisible initially if we are fading in.
    // However, if we do that, we might break the bounding boxes for lines.
    // Web Animations fill: 'both' fixes the visual jump.
    const splitter = new TextSplitter(target, rest);

    let elementsToAnimate = splitter.chars;
    
    // Prioritize how we animate based on user choice.
    if (rest.types) {
      if (rest.types.includes('chars')) {
        elementsToAnimate = splitter.chars;
      } else if (rest.types.includes('words')) {
        elementsToAnimate = splitter.words;
      } else if (rest.types.includes('lines')) {
        elementsToAnimate = splitter.lines;
      }
    } else {
       // defaults to chars if none specified but options existed
       if (splitter.chars.length > 0) elementsToAnimate = splitter.chars;
       else if (splitter.words.length > 0) elementsToAnimate = splitter.words;
       else if (splitter.lines.length > 0) elementsToAnimate = splitter.lines;
       else elementsToAnimate = splitter.elements;
    }

    const keyframes = direction === 'in'
      ? [{ opacity: 0 }, { opacity: 1 }]
      : [{ opacity: 1 }, { opacity: 0 }];

    this.engine.animate(elementsToAnimate, keyframes, { fill: 'both', ...rest });
  }
}
