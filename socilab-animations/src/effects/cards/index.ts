import { AnimationEngine, AnimationOptions } from '../../core/AnimationEngine';
import { InteractionManager } from '../../interactions';

const engine = new AnimationEngine();

// Helper to grab elements
function getElements(target: HTMLElement | string): HTMLElement[] {
    if (typeof target === 'string') {
        const el = document.querySelector(target);
        return el ? [el as HTMLElement] : [];
    }
    return [target];
}

export class CleanModernCard {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { opacity: 0, transform: 'translateY(40px) scale(0.95)', boxShadow: '0 0 0 rgba(0,0,0,0)' },
            { opacity: 1, transform: 'translateY(0) scale(1)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }
        ];
        engine.animate(elements, kf, { duration: 800, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', ...options });
    }
}

export class FloatingCardAnimation {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { transform: 'translateY(0)', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' },
            { transform: 'translateY(-15px)', boxShadow: '0 25px 50px rgba(0,0,0,0.15)' },
            { transform: 'translateY(0)', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }
        ];
        engine.animate(elements, kf, { duration: 4000, easing: 'ease-in-out', fill: 'both', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity }); // Loop infinitely if no trigger
        });
    }
}

export class CardStackAnimation {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const parent = typeof target === 'string' ? document.querySelector(target) : target;
        if (!parent) return;
        const elements = Array.from(parent.children) as HTMLElement[];
        
        elements.forEach((el, i) => {
            const kf: Keyframe[] = [
                { opacity: 0, transform: 'translateY(100px) scale(0.8)' },
                { opacity: 1, transform: `translateY(${i * 20}px) scale(${1 - (elements.length - i) * 0.05})` }
            ];
            engine.animate([el], kf, { delay: i * 100, duration: 600, easing: 'ease-out', ...options });
        });
    }
}

export class LayeredCardReveal {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { clipPath: 'inset(100% 0 0 0)', transform: 'translateY(50px)' },
            { clipPath: 'inset(0% 0 0 0)', transform: 'translateY(0)' }
        ];
        engine.animate(elements, kf, { duration: 900, easing: 'cubic-bezier(0.77, 0, 0.175, 1)', ...options });
    }
}

export class ExpandableCardMotion {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { width: '100px', height: '100px', borderRadius: '50px' },
            { width: '400px', height: '300px', borderRadius: '16px' }
        ];
        engine.animate(elements, kf, { duration: 700, easing: 'cubic-bezier(0.25, 1, 0.5, 1)', ...options });
    }
}

export class SlideCardInterface {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { transform: 'translateX(-100%)', opacity: 0 },
            { transform: 'translateX(0)', opacity: 1 }
        ];
        engine.animate(elements, kf, { duration: 600, easing: 'ease-out', ...options });
    }
}

export class FlipCardInteraction {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        elements.forEach(el => {
            el.style.transformStyle = 'preserve-3d';
            el.style.perspective = '1000px';
        });
        const kf: Keyframe[] = [
            { transform: 'rotateY(180deg)', opacity: 0 },
            { transform: 'rotateY(0deg)', opacity: 1 }
        ];
        engine.animate(elements, kf, { duration: 800, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', ...options });
    }
}

export class ScrollCardAnimation {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = { trigger: 'scroll' }) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { transform: 'translateY(100px) rotate(-5deg)', opacity: 0 },
            { transform: 'translateY(0) rotate(0)', opacity: 1 }
        ];
        engine.animate(elements, kf, { duration: 1000, easing: 'ease-out', ...options });
    }
}

export class GlassmorphismCardAnimation {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { backdropFilter: 'blur(0px)', background: 'rgba(255,255,255,0)', borderColor: 'rgba(255,255,255,0)' },
            { backdropFilter: 'blur(16px)', background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.2)' }
        ];
        engine.animate(elements, kf, { duration: 1200, easing: 'ease', ...options });
    }
}

export class NeumorphismCardAnimation {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { boxShadow: '0 0 0 rgba(0,0,0,0), 0 0 0 rgba(255,255,255,0)' },
            { boxShadow: '10px 10px 20px rgba(0,0,0,0.5), -10px -10px 20px rgba(255,255,255,0.05)' }
        ];
        engine.animate(elements, kf, { duration: 800, easing: 'ease-out', ...options });
    }
}

export class DynamicHoverCard {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = { trigger: 'hover' }) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { transform: 'scale(1)', filter: 'brightness(1)' },
            { transform: 'scale(1.05)', filter: 'brightness(1.2)' }
        ];
        engine.animate(elements, kf, { duration: 300, easing: 'ease-out', ...options });
    }
}

export class MagneticCardMotion {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        console.warn('MagneticCardMotion requires complex mouse tracking, implementing simple hover for now');
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(10px, -10px)' }
        ];
        engine.animate(elements, kf, { duration: 400, trigger: 'hover', easing: 'ease-out', ...options });
    }
}

export class ElasticCardBounce {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { transform: 'scale(0)' },
            { transform: 'scale(1.15)' },
            { transform: 'scale(0.9)' },
            { transform: 'scale(1.05)' },
            { transform: 'scale(1)' }
        ];
        engine.animate(elements, kf, { duration: 1000, easing: 'linear', ...options });
    }
}

export class FloatingDashboardCard {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { transform: 'translateY(20px)', opacity: 0 },
            { transform: 'translateY(0)', opacity: 1 }
        ];
        engine.animate(elements, kf, { duration: 600, easing: 'ease-out', stagger: 100, ...options });
    }
}

export class TiltCardAnimation3D {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        elements.forEach(el => {
            el.style.perspective = '1000px';
        });
        const kf: Keyframe[] = [
            { transform: 'rotateX(-20deg) rotateY(20deg)', opacity: 0 },
            { transform: 'rotateX(0deg) rotateY(0deg)', opacity: 1 }
        ];
        engine.animate(elements, kf, { duration: 1000, easing: 'ease-out', ...options });
    }
}

export class PerspectiveCardRotation {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { transform: 'perspective(1000px) rotateY(45deg) scale(0.8)', opacity: 0 },
            { transform: 'perspective(1000px) rotateY(0deg) scale(1)', opacity: 1 }
        ];
        engine.animate(elements, kf, { duration: 1200, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', ...options });
    }
}

export class ParallaxCardMotion {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { transform: 'translateZ(-100px) translateY(50px)', opacity: 0 },
            { transform: 'translateZ(0px) translateY(0px)', opacity: 1 }
        ];
        engine.animate(elements, kf, { duration: 800, easing: 'ease-out', ...options });
    }
}

export class CardStackTransition3D {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { transform: 'translateZ(-500px) rotateX(45deg)', opacity: 0 },
            { transform: 'translateZ(0) rotateX(0deg)', opacity: 1 }
        ];
        engine.animate(elements, kf, { duration: 1200, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', ...options });
    }
}

export class DepthCardFlip {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { transform: 'translateZ(-200px) rotateY(-180deg)', opacity: 0 },
            { transform: 'translateZ(0) rotateY(0deg)', opacity: 1 }
        ];
        engine.animate(elements, kf, { duration: 1000, easing: 'ease-in-out', ...options });
    }
}

export class RotatingProductCard {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { transform: 'rotateY(0deg)' },
            { transform: 'rotateY(360deg)' }
        ];
        engine.animate(elements, kf, { duration: 15000, easing: 'linear', fill: 'both', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}
