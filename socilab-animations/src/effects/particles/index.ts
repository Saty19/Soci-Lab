import { AnimationEngine, AnimationOptions } from '../../core/AnimationEngine';
import { TextSplitter } from '../../core/TextSplitter';

const engine = new AnimationEngine();

function getElements(target: HTMLElement | string): HTMLElement[] {
    if (typeof target === 'string') {
        const el = document.querySelector(target);
        return el ? [el as HTMLElement] : [];
    }
    return [target];
}

// Particle Helper
function createParticles(parent: HTMLElement, count: number, className: string): HTMLElement[] {
    const frag = document.createDocumentFragment();
    const particles: HTMLElement[] = [];
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = className;
        p.style.position = 'absolute';
        p.style.pointerEvents = 'none';
        frag.appendChild(p);
        particles.push(p);
    }
    // Parent must be relative
    if (getComputedStyle(parent).position === 'static') {
        parent.style.position = 'relative';
    }
    parent.appendChild(frag);
    return particles;
}


export class MorphShapeAnimation {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }, // Pentagon
            { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%, 0% 50%)' }, // Diamond
            { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%)' }, // Square
            { clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }
        ];
        engine.animate(elements, kf, { duration: 5000, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}


export class ParticleSystemAnimation {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const parent = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target;
        if (!parent) return;
        const particles = createParticles(parent, 50, 'particle');
        
        particles.forEach((p) => {
            p.style.width = '4px'; p.style.height = '4px';
            p.style.background = '#fff'; p.style.borderRadius = '50%';
            p.style.left = '50%'; p.style.top = '50%';
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = 50 + Math.random() * 100;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            const kf: Keyframe[] = [
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
            ];
            
            engine.animate([p], kf, { 
                duration: 1000 + Math.random() * 1000, 
                delay: Math.random() * 2000, 
                easing: 'cubic-bezier(0.25, 1, 0.5, 1)', 
                ...options 
            }).forEach(a => {
                if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
            });
        });
    }
}

export class FractalAnimation {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        // Fallback for complex webgl fractals
        const kf: Keyframe[] = [
            { transform: 'scale(1) rotate(0deg)', filter: 'contrast(1) hue-rotate(0deg)' },
            { transform: 'scale(5) rotate(90deg)', filter: 'contrast(3) hue-rotate(180deg)', opacity: 0 }
        ];
        engine.animate(elements, kf, { duration: 6000, easing: 'linear', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}

export class EnergyWaveAnimation {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        const kf: Keyframe[] = [
            { boxShadow: '0 0 0 0 rgba(0, 255, 255, 0.7), 0 0 0 0 rgba(0, 255, 255, 0.7)' },
            { boxShadow: '0 0 0 20px rgba(0, 255, 255, 0), 0 0 0 40px rgba(0, 255, 255, 0)' }
        ];
        engine.animate(elements, kf, { duration: 1500, easing: 'ease-out', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}

export class MagneticFieldMotion {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const elements = getElements(target);
        elements.forEach(el => {
            el.style.background = 'repeating-radial-gradient(circle at 0 0, transparent 0, #0ff 1px, transparent 2px, transparent 10px)';
        });
        const kf: Keyframe[] = [
            { backgroundPosition: '0 0' },
            { backgroundPosition: '100px 100px' }
        ];
        engine.animate(elements, kf, { duration: 3000, easing: 'linear', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}

export class ParticleTextDisintegration {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const parent = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target;
        if (!parent) return;
        const splitter = new TextSplitter(parent, { types: ['chars'] });
        
        splitter.chars.forEach((el, i) => {
            el.style.display = 'inline-block';
            const dx = (Math.random() - 0.5) * 100;
            const dy = -50 - Math.random() * 100;
            const r = (Math.random() - 0.5) * 90;
            const kf: Keyframe[] = [
                { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 1 },
                { transform: `translate(${dx}px, ${dy}px) rotate(${r}deg) scale(0)`, opacity: 0 }
            ];
            engine.animate([el], kf, { duration: 1200, delay: i * 20, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)', fill: 'both', ...options });
        });
    }
}

export class EnergyBurstAnimation {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const parent = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target;
        if (!parent) return;
        
        const ring = document.createElement('div');
        ring.style.position = 'absolute'; ring.style.top = '50%'; ring.style.left = '50%';
        ring.style.width = '100%'; ring.style.height = '100%';
        ring.style.borderRadius = '50%'; ring.style.border = '2px solid #fff';
        ring.style.transform = 'translate(-50%, -50%)'; ring.style.pointerEvents = 'none';
        parent.style.position = 'relative'; parent.appendChild(ring);
        
        const kf: Keyframe[] = [
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 1, borderWidth: '10px' },
            { transform: 'translate(-50%, -50%) scale(2)', opacity: 0, borderWidth: '0px' }
        ];
        const anim = engine.animate([ring], kf, { duration: 1000, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', ...options });
        anim[0].onfinish = () => ring.remove();
    }
}

export class SmokeTypography {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const parent = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target;
        if (!parent) return;
        const splitter = new TextSplitter(parent, { types: ['chars'] });
        
        splitter.chars.forEach((el, i) => {
            el.style.display = 'inline-block';
            const kf: Keyframe[] = [
                { transform: 'translate(0, 0) scale(1)', filter: 'blur(0)', opacity: 1 },
                { transform: 'translate(-20px, -50px) scale(2)', filter: 'blur(10px)', opacity: 0 }
            ];
            engine.animate([el], kf, { duration: 2000, delay: i * 100, easing: 'ease-out', fill: 'both', ...options });
        });
    }
}

export class FireTypography {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const parent = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target;
        if (!parent) return;
        parent.style.color = '#ff9900';
        const kf: Keyframe[] = [
            { textShadow: '0 -5px 10px #ff3300, 0 -10px 20px #ff0000', filter: 'brightness(1)' },
            { textShadow: '0 -10px 20px #ff3300, 0 -20px 40px #ff0000', filter: 'brightness(1.5)' },
            { textShadow: '0 -5px 10px #ff3300, 0 -10px 20px #ff0000', filter: 'brightness(1)' }
        ];
        engine.animate([parent], kf, { duration: 1000, easing: 'ease-in-out', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}

export class DustExplosionAnimation {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const parent = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target;
        if (!parent) return;
        const particles = createParticles(parent, 30, 'dust');
        
        particles.forEach((p) => {
            p.style.width = '10px'; p.style.height = '10px';
            p.style.background = '#888'; p.style.borderRadius = '50%';
            p.style.left = '50%'; p.style.top = '50%'; p.style.filter = 'blur(2px)';
            
            const dx = (Math.random() - 0.5) * 200;
            const dy = (Math.random() - 0.5) * 200;
            
            const kf: Keyframe[] = [
                { transform: 'translate(0, 0) scale(0)', opacity: 1 },
                { transform: `translate(${dx}px, ${dy}px) scale(3)`, opacity: 0 }
            ];
            
            engine.animate([p], kf, { duration: 1500, easing: 'cubic-bezier(0.1, 1, 0.1, 1)', ...options }).forEach(a => {
                a.onfinish = () => p.remove();
            });
        });
    }
}

export class GalaxyParticleMotion {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const parent = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target;
        if (!parent) return;
        const particles = createParticles(parent, 60, 'star');
        
        particles.forEach((p, i) => {
            p.style.width = '2px'; p.style.height = '2px';
            p.style.background = '#fff'; p.style.borderRadius = '50%';
            p.style.left = '50%'; p.style.top = '50%'; 
            p.style.boxShadow = '0 0 5px #fff';
            
            const radius = 20 + Math.random() * 150;
            const angle = (i / 60) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            const kf: Keyframe[] = [
                { transform: `rotate(0deg) translate(${x}px, ${y}px)` },
                { transform: `rotate(360deg) translate(${x}px, ${y}px)` }
            ];
            
            engine.animate([p], kf, { 
                duration: 10000 + (radius * 50), 
                easing: 'linear', 
                ...options 
            }).forEach(a => {
                if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
            });
        });
    }
}
