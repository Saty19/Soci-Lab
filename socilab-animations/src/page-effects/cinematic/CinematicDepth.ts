import { TransitionEngine, PageTransitionOptions } from '../core/TransitionEngine';

export class CinematicDepth {
  constructor(outEl: HTMLElement | null, inEl: HTMLElement | null, options: PageTransitionOptions = {}) {
    const engine = new TransitionEngine();

    // Outgoing sinks deeply and blurs
    const keyframesOut = [
      { transform: 'translateZ(0) scale(1)', filter: 'blur(0px) brightness(1)', opacity: 1 },
      { transform: 'translateZ(-1000px) scale(0.5)', filter: 'blur(10px) brightness(0)', opacity: 0 }
    ];

    // Incoming zooms in from blurred depth
    const keyframesIn = [
      { transform: 'translateZ(500px) scale(1.5)', filter: 'blur(20px) brightness(2)', opacity: 0 },
      { transform: 'translateZ(0) scale(1)', filter: 'blur(0px) brightness(1)', opacity: 1 }
    ];

    return engine.animate(outEl, inEl, keyframesOut, keyframesIn, {
      duration: 1500, // slower cinematic pace
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      ...options,
      zIndex: { in: 10, out: 1 }
    });
  }
}
