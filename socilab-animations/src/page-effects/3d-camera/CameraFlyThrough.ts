import { TransitionEngine, PageTransitionOptions } from '../core/TransitionEngine';

export class CameraFlyThrough {
  constructor(outEl: HTMLElement | null, inEl: HTMLElement | null, options: PageTransitionOptions = {}) {
    const engine = new TransitionEngine();

    // Outgoing flies OUT towards camera (scale up, opacity 0)
    const keyframesOut = [
      { transform: 'scale(1)', opacity: 1 },
      { transform: 'scale(2.5)', opacity: 0 }
    ];

    // Incoming flies IN from behind (scale down from small, opacity up)
    const keyframesIn = [
      { transform: 'scale(0.8)', opacity: 0 },
      { transform: 'scale(1)', opacity: 1 }
    ];

    // We want the exiting element on top so it flies "over" the camera
    return engine.animate(outEl, inEl, keyframesOut, keyframesIn, {
      duration: 1200, // Cinematic
      ...options,
      zIndex: { in: 1, out: 10 }
    });
  }
}
