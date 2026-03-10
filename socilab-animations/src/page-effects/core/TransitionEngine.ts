import { InteractionOptions, InteractionManager } from '../../interactions';

export interface PageTransitionOptions extends InteractionOptions {
  duration?: number;
  easing?: string;
  delay?: number;
  zIndex?: {
    in?: number;
    out?: number;
  };
  // Wait for the exit animation to finish before starting the enter animation. Default is false (parallel)
  sequential?: boolean; 
}

export type AnimationKeyframes = Keyframe[] | PropertyIndexedKeyframes;

export class TransitionEngine {
  public defaultOptions: PageTransitionOptions = {
    duration: 1000,
    easing: 'cubic-bezier(0.77, 0, 0.175, 1)', // Smooth cinematic standard
    sequential: false,
    zIndex: {
      in: 10,
      out: 1
    }
  };

  /**
   * Orchestrates the transition between an exiting element and entering element
   */
  public animate(
    elementOut: HTMLElement | null,
    elementIn: HTMLElement | null,
    keyframesOut: AnimationKeyframes,
    keyframesIn: AnimationKeyframes,
    options: PageTransitionOptions = {}
  ): Promise<void> {
    const mergedOptions = { ...this.defaultOptions, ...options };
    const mergedZIndex = { ...this.defaultOptions.zIndex, ...options.zIndex };

    return new Promise((resolve) => {
      let exitAnim: Animation | null = null;
      let enterAnim: Animation | null = null;

      const finishHandling = () => {
        // We resolve when both animations (if they exist) are complete
        if (elementOut) {
            elementOut.style.zIndex = '';
        }
        if (elementIn) {
            elementIn.style.zIndex = '';
        }
        resolve();
      };

      const baseAnimOptions: KeyframeAnimationOptions = {
        duration: mergedOptions.duration,
        easing: mergedOptions.easing,
        delay: mergedOptions.delay || 0,
        fill: 'both' // hold final state
      };

      if (elementOut) {
        elementOut.style.zIndex = `${mergedZIndex.out}`;
        exitAnim = elementOut.animate(keyframesOut, baseAnimOptions);
      }

      if (elementIn) {
        elementIn.style.zIndex = `${mergedZIndex.in}`;
        
        let inOptions = { ...baseAnimOptions };
        
        // If sequential, delay the incoming animation by the duration of the out animation
        if (mergedOptions.sequential && exitAnim && mergedOptions.duration) {
          inOptions.delay = (inOptions.delay as number) + mergedOptions.duration;
        }

        enterAnim = elementIn.animate(keyframesIn, inOptions);
      }

      // Resolve logic
      if (exitAnim && enterAnim) {
        let finishedCount = 0;
        const checkDone = () => {
          finishedCount++;
          if (finishedCount === 2) finishHandling();
        };
        exitAnim.onfinish = checkDone;
        enterAnim.onfinish = checkDone;
      } else if (exitAnim) {
        exitAnim.onfinish = finishHandling;
      } else if (enterAnim) {
        enterAnim.onfinish = finishHandling;
      } else {
        finishHandling(); // Fallback if no elements
      }

      // Interaction bindings
      if (mergedOptions.trigger && elementOut) {
        const animsToBind: Animation[] = [];
        if (exitAnim) animsToBind.push(exitAnim);
        if (enterAnim) animsToBind.push(enterAnim);
        InteractionManager.bind(animsToBind, elementOut, mergedOptions);
      }
    });
  }
}
