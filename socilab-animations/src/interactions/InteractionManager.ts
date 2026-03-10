export interface InteractionOptions {
  trigger?: 'hover' | 'scroll' | 'click' | 'focus';
  reverseOnLeave?: boolean;
}

export class InteractionManager {
  /**
   * Binds WAAPI animations to DOM events using the interaction options.
   * @param animations Array of native Web Animations
   * @param target The DOM element to attach event listeners / observers to
   * @param options The trigger configuration
   */
  public static bind(animations: Animation[], target: HTMLElement, options: InteractionOptions) {
    if (!options.trigger) return;

    // Immediately pause all animations since they are waiting for a trigger
    animations.forEach(anim => anim.pause());

    const playAll = () => animations.forEach(anim => {
      // If the animation is reversed and at the beginning, or played and at the end, 
      // WAAPI's play() automatically handles restarting.
      if (anim.playbackRate < 0) {
        anim.playbackRate = 1;
      }
      anim.play();
    });

    const reverseAll = () => animations.forEach(anim => {
      if (options.reverseOnLeave) {
        anim.reverse();
      } else {
        // Optional: If not reversing on leave, do we do anything? Usually just let it stay.
      }
    });

    switch (options.trigger) {
      case 'hover':
        target.addEventListener('mouseenter', playAll);
        target.addEventListener('mouseleave', reverseAll);
        break;

      case 'focus':
        // Ensure element is focusable
        if (!target.hasAttribute('tabindex')) {
            target.setAttribute('tabindex', '0');
        }
        target.addEventListener('focus', playAll);
        target.addEventListener('blur', reverseAll);
        break;

      case 'click':
        // Toggle play/reverse on click
        let isForward = false;
        target.addEventListener('click', () => {
          if (isForward && options.reverseOnLeave) {
            reverseAll();
          } else {
            playAll();
          }
          if (options.reverseOnLeave) {
              isForward = !isForward;
          }
        });
        break;

      case 'scroll':
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              playAll();
            } else if (options.reverseOnLeave) {
              reverseAll();
            }
          });
        }, { threshold: 0.1 }); // Trigger when 10% visible
        
        observer.observe(target);
        break;
    }
  }
}
