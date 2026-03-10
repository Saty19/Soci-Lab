import { AnimationEngine, AnimationOptions } from '../../core/AnimationEngine';

const engine = new AnimationEngine();

function getElements(target: HTMLElement | string): HTMLElement[] {
    if (typeof target === 'string') {
        const el = document.querySelector(target);
        return el ? [el as HTMLElement] : [];
    }
    return [target];
}

export class BasicMapMotion {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        elements.forEach(el => el.style.overflow = 'hidden');
        const kf: Keyframe[] = [
            { transform: 'scale(1) translate(0, 0)' },
            { transform: 'scale(1.5) translate(-10%, 10%)' },
            { transform: 'scale(1) translate(0, 0)' }
        ];
        engine.animate(elements, kf, { duration: 15000, easing: 'ease-in-out', fill: 'both', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}

export class RoutePathAnimation {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { clipPath: 'inset(0 100% 0 0)' },
            { clipPath: 'inset(0 0% 0 0)' }
        ];
        engine.animate(elements, kf, { duration: 2000, easing: 'ease-in-out', fill: 'both', ...options });
    }
}

export class LocationPinDrop {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        elements.forEach((el, i) => {
            const kf: Keyframe[] = [
                { transform: 'translateY(-100px) scale(1.5)', opacity: 0, offset: 0 },
                { transform: 'translateY(0) scale(1)', opacity: 1, offset: 0.6 },
                { transform: 'translateY(-20px) scale(1)', opacity: 1, offset: 0.8 },
                { transform: 'translateY(0) scale(1)', opacity: 1, offset: 1 }
            ];
            engine.animate([el], kf, { duration: 800, delay: i * 200, easing: 'cubic-bezier(0.25, 1, 0.5, 1)', fill: 'both', ...options });
        });
    }
}

export class LineTravelAnimation {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        // Assumes target is an SVG path or a repeating linear gradient background
        const kf: Keyframe[] = [
            { strokeDashoffset: '1000', backgroundPosition: '200% 0' },
            { strokeDashoffset: '0', backgroundPosition: '0% 0' }
        ];
        engine.animate(elements, kf, { duration: 3000, easing: 'linear', fill: 'both', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}

export class GPSTrackingMotion {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { transform: 'scale(0.5)', opacity: 1, boxShadow: '0 0 0 0 rgba(79, 70, 229, 0.7)' },
            { transform: 'scale(1)', opacity: 0.5, boxShadow: '0 0 0 20px rgba(79, 70, 229, 0)' },
            { transform: 'scale(0.5)', opacity: 1, boxShadow: '0 0 0 0 rgba(79, 70, 229, 0)' }
        ];
        engine.animate(elements, kf, { duration: 2000, easing: 'ease-out', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}

export class NavigationPathAnimation {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { transform: 'translateX(-50px) rotate(-10deg)', opacity: 0 },
            { transform: 'translateX(0) rotate(0)', opacity: 1 }
        ];
        engine.animate(elements, kf, { duration: 1500, easing: 'ease-in-out', ...options });
    }
}

// Globes & 3D Maps (CSS simulated)
export class GlobeMap3D {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        elements.forEach(el => {
            el.style.borderRadius = '50%';
            el.style.boxShadow = 'inset -20px -20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.1)';
            el.style.backgroundSize = '200% 100%';
        });
        const kf: Keyframe[] = [
            { backgroundPosition: '0% 0%' },
            { backgroundPosition: '200% 0%' }
        ];
        engine.animate(elements, kf, { duration: 20000, easing: 'linear', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}

export class SatelliteMapZoom {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { transform: 'scale(5) translateY(-20%)', filter: 'blur(10px)', opacity: 0 },
            { transform: 'scale(1) translateY(0)', filter: 'blur(0px)', opacity: 1 }
        ];
        engine.animate(elements, kf, { duration: 2500, easing: 'cubic-bezier(0.8, 0, 0.2, 1)', ...options });
    }
}

export class MapParallaxAnimation {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const parent = typeof target === 'string' ? document.querySelector(target) : target;
        if (!parent) return;
        const elements = Array.from(parent.children) as HTMLElement[];
        
        elements.forEach((el, i) => {
            const z = (i + 1) * 50;
            const kf: Keyframe[] = [
                { transform: `translateZ(${z}px) rotateX(45deg) translateY(-20px)`, opacity: 0 },
                { transform: `translateZ(0) rotateX(45deg) translateY(0)`, opacity: 1 }
            ];
            engine.animate([el], kf, { duration: 1500, delay: i * 200, easing: 'ease-out', ...options });
        });
    }
}

export class CityNetworkAnimation {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { opacity: 0.2, filter: 'drop-shadow(0 0 0px rgba(255,255,255,0))' },
            { opacity: 1, filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.8))' },
            { opacity: 0.2, filter: 'drop-shadow(0 0 0px rgba(255,255,255,0))' }
        ];
        engine.animate(elements, kf, { duration: 3000, easing: 'ease-in-out', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}

export class DigitalMapGridAnimation {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        elements.forEach(el => {
            el.style.backgroundImage = 'linear-gradient(rgba(0,255,0,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.2) 1px, transparent 1px)';
            el.style.backgroundSize = '50px 50px';
        });
        const kf: Keyframe[] = [
            { transform: 'perspective(500px) rotateX(60deg) translateY(0)', opacity: 0 },
            { transform: 'perspective(500px) rotateX(60deg) translateY(50px)', opacity: 1 }
        ];
        engine.animate(elements, kf, { duration: 2000, easing: 'linear', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}

export class WorldConnectionLines {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { strokeDasharray: '0, 1000', opacity: 0 },
            { strokeDasharray: '1000, 0', opacity: 1 }
        ];
        engine.animate(elements, kf, { duration: 2000, easing: 'ease-out', ...options });
    }
}

// Networks and Datastreams
export class HologramMapInterface {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { transform: 'scaleY(0.01) scaleX(0)', filter: 'brightness(3) hue-rotate(90deg)', opacity: 0 },
            { transform: 'scaleY(0.01) scaleX(1)', filter: 'brightness(2) hue-rotate(45deg)', opacity: 1, offset: 0.4 },
            { transform: 'scaleY(1) scaleX(1)', filter: 'brightness(1) hue-rotate(0deg)', opacity: 1, offset: 1 }
        ];
        engine.animate(elements, kf, { duration: 1200, easing: 'cubic-bezier(0.1, 1, 0.1, 1)', ...options });
    }
}

export class AIDataMapVisualization {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { filter: 'hue-rotate(0deg) contrast(1)', opacity: 0.8 },
            { filter: 'hue-rotate(180deg) contrast(1.5)', opacity: 1 },
            { filter: 'hue-rotate(360deg) contrast(1)', opacity: 0.8 }
        ];
        engine.animate(elements, kf, { duration: 5000, easing: 'linear', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}

export class NetworkNodeMap {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const parent = typeof target === 'string' ? document.querySelector(target) : target;
        if (!parent) return;
        const elements = Array.from(parent.children) as HTMLElement[];
        
        elements.forEach((el, i) => {
            const kf: Keyframe[] = [
                { transform: 'scale(0)', opacity: 0 },
                { transform: 'scale(1.2)', opacity: 1 },
                { transform: 'scale(1)', opacity: 1 }
            ];
            engine.animate([el], kf, { duration: 600, delay: Math.random() * 1000, easing: 'ease-out', fill: 'both', ...options });
        });
    }
}

export class GlobalDataFlowMap {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { transform: 'translateX(-100%) skewX(-20deg)', filter: 'blur(10px)', opacity: 0 },
            { transform: 'translateX(0) skewX(0deg)', filter: 'blur(0)', opacity: 1 }
        ];
        engine.animate(elements, kf, { duration: 1500, easing: 'ease-out', ...options });
    }
}

