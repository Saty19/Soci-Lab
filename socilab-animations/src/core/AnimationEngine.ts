import { InteractionOptions, InteractionManager } from '../interactions';

export interface AnimationOptions extends InteractionOptions {
  duration?: number;
  delay?: number;
  easing?: string;
  stagger?: number;
  fill?: FillMode;
}

export class AnimationEngine {
  public defaultOptions: AnimationOptions = {
    duration: 1000,
    delay: 0,
    easing: 'ease',
    stagger: 50,
    fill: 'both'
  };

  /**
   * Applies standard WAAPI animation to an array of elements with stagger
   */
  public animate(
    elements: HTMLElement[],
    keyframes: Keyframe[] | PropertyIndexedKeyframes,
    options: AnimationOptions = {},
    triggerTarget?: HTMLElement // Explicit target for the interaction, e.g. the text container
  ): Animation[] {
    const mergedOptions = { ...this.defaultOptions, ...options };
    const animations: Animation[] = [];

    elements.forEach((el, index) => {
      const delay = (mergedOptions.delay || 0) + index * (mergedOptions.stagger || 0);
      
      const animParams: KeyframeAnimationOptions = {
        duration: mergedOptions.duration,
        easing: mergedOptions.easing,
        delay: delay,
        fill: mergedOptions.fill,
      };

      const anim = el.animate(keyframes, animParams);
      animations.push(anim);
      
      anim.onfinish = () => {
        // Optional complete callback hooking
      };
    });

    if (options.trigger && triggerTarget) {
      InteractionManager.bind(animations, triggerTarget, options);
    } else if (options.trigger && elements.length > 0) {
      // If no explicit target provided, bind to the first element
      InteractionManager.bind(animations, elements[0].parentElement || elements[0], options);
    }

    return animations;
  }
}
