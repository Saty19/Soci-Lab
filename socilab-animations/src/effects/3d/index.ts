import { AnimationEngine, AnimationOptions } from '../../core/AnimationEngine';

const engine = new AnimationEngine();

function getElements(target: HTMLElement | string): HTMLElement[] {
    if (typeof target === 'string') {
        const el = document.querySelector(target);
        return el ? [el as HTMLElement] : [];
    }
    return [target];
}

export class LayerParallax3D {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const parent = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target as HTMLElement;
        if (!parent) return;
        parent.style.perspective = '1000px';
        const elements = Array.from(parent.children) as HTMLElement[];
        
        elements.forEach((el, i) => {
            const depth = (i + 1) * -100;
            const kf: Keyframe[] = [
                { transform: `translateZ(${depth}px) translateX(-50px)` },
                { transform: `translateZ(${depth}px) translateX(50px)` }
            ];
            engine.animate([el], kf, { duration: 4000, easing: 'ease-in-out', fill: 'both', ...options }).forEach(a => {
                if(a.effect) (a.effect as any).updateTiming({ direction: 'alternate' });
                if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
            });
        });
    }
}

export class InfiniteLoopMotion {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { transform: 'rotateX(0deg) rotateY(0deg) translateZ(100px)' },
            { transform: 'rotateX(360deg) rotateY(360deg) translateZ(100px)' }
        ];
        engine.animate(elements, kf, { duration: 8000, easing: 'linear', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}

export class DepthCameraMotion {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const parent = elements[0]?.parentElement;
        if (parent) {
            parent.style.perspective = '2000px';
            parent.style.transformStyle = 'preserve-3d';
        }
        
        const kf: Keyframe[] = [
            { transform: 'translateZ(-1000px)', opacity: 0 },
            { transform: 'translateZ(500px)', opacity: 1 },
            { transform: 'translateZ(-1000px)', opacity: 0 }
        ];
        
        engine.animate(elements, kf, { duration: 6000, easing: 'ease-in-out', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}

export class FloatingObjectAnimation {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { transform: 'translateY(0) rotateX(0deg) rotateY(0deg)', filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.5))' },
            { transform: 'translateY(-20px) rotateX(10deg) rotateY(15deg)', filter: 'drop-shadow(0 30px 20px rgba(0,0,0,0.2))' },
            { transform: 'translateY(0) rotateX(0deg) rotateY(0deg)', filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.5))' }
        ];
        engine.animate(elements, kf, { duration: 4000, easing: 'ease-in-out', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}

export class MotionGrid3D {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        elements.forEach(el => {
            el.style.backgroundImage = 'radial-gradient(circle, #4f46e5 2px, transparent 2px), radial-gradient(circle, #4f46e5 2px, transparent 2px)';
            el.style.backgroundSize = '40px 40px';
            el.style.backgroundPosition = '0 0, 20px 20px';
            el.style.boxShadow = 'inset 0 0 100px rgba(0,0,0,0.9)';
        });
        
        const kf: Keyframe[] = [
            { transform: 'perspective(600px) rotateX(60deg) translateY(0)', opacity: 0 },
            { transform: 'perspective(600px) rotateX(60deg) translateY(100px)', opacity: 1 },
            { transform: 'perspective(600px) rotateX(60deg) translateY(200px)', opacity: 0 }
        ];
        engine.animate(elements, kf, { duration: 3000, easing: 'linear', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}

export class OrbitalMotionAnimation {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        elements.forEach(el => {
            el.style.transformOrigin = '150% 50%';
        });
        const kf: Keyframe[] = [
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(360deg)' }
        ];
        engine.animate(elements, kf, { duration: 5000, easing: 'linear', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}
