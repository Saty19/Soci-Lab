import { AnimationEngine, AnimationOptions } from '../../core/AnimationEngine';
import { TextSplitter, SplitOptions } from '../../core/TextSplitter';

const engine = new AnimationEngine();

function applySplitter(target: HTMLElement | string, options: any, defaultTypes: ('chars'|'words'|'lines')[] = ['chars']) {
    const parent = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target;
    if (!parent) return { elements: [], splitter: null };
    const mergedOpts = { types: defaultTypes, ...options };
    const splitter = new TextSplitter(parent, mergedOpts);
    
    let elements = splitter.chars;
    if (mergedOpts.types?.includes('chars')) elements = splitter.chars;
    else if (mergedOpts.types?.includes('words')) elements = splitter.words;
    else if (mergedOpts.types?.includes('lines')) elements = splitter.lines;
    
    if (elements.length === 0) elements = splitter.elements;
    return { elements, splitter };
}

// ============================================
// Cinematic 3D Text Effects
// ============================================

export class ExtrudedText3D {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const { elements } = applySplitter(target, options, ['words']);
        elements.forEach(el => {
            el.style.textShadow = '1px 1px 0 #ccc, 2px 2px 0 #c9c9c9, 3px 3px 0 #bbb, 4px 4px 0 #b9b9b9, 5px 5px 0 #aaa, 6px 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 1px 1px 3px rgba(0,0,0,.3), 3px 3px 5px rgba(0,0,0,.2), 5px 5px 10px rgba(0,0,0,.25), 10px 10px 10px rgba(0,0,0,.2), 20px 20px 20px rgba(0,0,0,.15)';
        });
        const kf: Keyframe[] = [
            { transform: 'perspective(500px) rotateX(20deg) rotateY(-20deg) scale(0.8)', opacity: 0 },
            { transform: 'perspective(500px) rotateX(0) rotateY(0) scale(1)', opacity: 1 }
        ];
        engine.animate(elements, kf, { duration: 1000, easing: 'cubic-bezier(0.25, 1, 0.5, 1)', ...options });
    }
}

export class CinematicDepthText {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const { elements } = applySplitter(target, options, ['chars']);
        const kf: Keyframe[] = [
            { filter: 'blur(20px)', transform: 'translateZ(-500px) scale(0.5)', opacity: 0 },
            { filter: 'blur(0)', transform: 'translateZ(0) scale(1)', opacity: 1 }
        ];
        engine.animate(elements, kf, { duration: 1500, easing: 'ease-out', stagger: 50, ...options });
    }
}

export class MetallicTitle {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const parent = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target;
        if (!parent) return;
        parent.style.backgroundImage = 'linear-gradient(to right, #b8c6db 0%, #f5f7fa 20%, #b8c6db 40%, #e0e0e0 60%, #8a9ba8 80%, #b8c6db 100%)';
        parent.style.backgroundClip = 'text';
        parent.style.webkitBackgroundClip = 'text';
        parent.style.color = 'transparent';
        parent.style.backgroundSize = '200% auto';
        
        const kf: Keyframe[] = [
            { backgroundPosition: '200% center' },
            { backgroundPosition: '0% center' }
        ];
        engine.animate([parent], kf, { duration: 3000, easing: 'linear', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}

export class GoldReflectionText {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const parent = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target;
        if (!parent) return;
        parent.style.backgroundImage = 'linear-gradient(to bottom, #cfc09f 22%, #634f2c 24%, #cfc09f 26%, #cfc09f 27%, #ffecb3 40%, #3a2c0f 78%)';
        parent.style.backgroundClip = 'text';
        parent.style.webkitBackgroundClip = 'text';
        parent.style.color = 'transparent';
        
        const kf: Keyframe[] = [
            { filter: 'brightness(0.5) contrast(1.2)' },
            { filter: 'brightness(1.5) contrast(1.5)' },
            { filter: 'brightness(0.5) contrast(1.2)' }
        ];
        engine.animate([parent], kf, { duration: 4000, easing: 'ease-in-out', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}

export class GlassMorphText {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const { elements } = applySplitter(target, options, ['words']);
        elements.forEach(el => {
            el.style.color = 'rgba(255,255,255,0.4)';
            el.style.textShadow = '0 8px 32px rgba(0,0,0,0.3)';
            el.style.backdropFilter = 'blur(10px)'; // backdropFilter on text doesn't work well without bg, simulating via color
        });
        const kf: Keyframe[] = [
            { transform: 'translateY(20px)', opacity: 0 },
            { transform: 'translateY(0)', opacity: 1 }
        ];
        engine.animate(elements, kf, { duration: 1200, easing: 'ease-out', stagger: 100, ...options });
    }
}

export class ChromeLiquidText {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const parent = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target;
        if (!parent) return;
        parent.style.color = 'transparent';
        parent.style.webkitTextStroke = '1px rgba(255,255,255,0.8)';
        parent.style.backgroundImage = 'radial-gradient(circle at 50% 50%, #fff, #888, #000)';
        parent.style.backgroundClip = 'text';
        parent.style.webkitBackgroundClip = 'text';
        
        const kf: Keyframe[] = [
            { backgroundPosition: '0% 0%', filter: 'hue-rotate(0deg)' },
            { backgroundPosition: '100% 100%', filter: 'hue-rotate(45deg)' }
        ];
        engine.animate([parent], kf, { duration: 5000, easing: 'linear', ...options }).forEach(a => {
            if(a.effect) (a.effect as any).updateTiming({ direction: 'alternate' });
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}

export class CrystalText {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const parent = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target;
        if (!parent) return;
        parent.style.color = 'rgba(200, 240, 255, 0.5)';
        parent.style.textShadow = '0 0 10px rgba(200,240,255,0.8), 2px 2px 2px rgba(255,255,255,0.8), -2px -2px 2px rgba(0,0,0,0.5)';
        
        const kf: Keyframe[] = [
            { transform: 'scale(0.95)', filter: 'brightness(1)' },
            { transform: 'scale(1)', filter: 'brightness(1.5)' },
            { transform: 'scale(0.95)', filter: 'brightness(1)' }
        ];
        engine.animate([parent], kf, { duration: 3000, easing: 'ease-in-out', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}

export class Floating3DTypography {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const { elements } = applySplitter(target, options, ['chars']);
        elements.forEach(el => { el.style.display = 'inline-block'; });
        elements.forEach((el, i) => {
            const kf: Keyframe[] = [
                { transform: 'translateY(0) rotateX(0deg)' },
                { transform: 'translateY(-15px) rotateX(20deg)' },
                { transform: 'translateY(0) rotateX(0deg)' }
            ];
            engine.animate([el], kf, { duration: 3000, delay: i * 100, easing: 'ease-in-out', ...options }).forEach(a => {
                if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
            });
        });
    }
}

export class InfiniteDepthText {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const parent = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target;
        if (!parent) return;
        
        // Simulating depth by animating scale extremely high
        const kf: Keyframe[] = [
            { transform: 'perspective(500px) translateZ(-1000px)', opacity: 0 },
            { transform: 'perspective(500px) translateZ(300px)', opacity: 1 },
            { transform: 'perspective(500px) translateZ(1000px)', opacity: 0 }
        ];
        engine.animate([parent], kf, { duration: 4000, easing: 'linear', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}

export class ParticleExplosionText {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        // High fidelity particle explosions require canvas. 
        // Fallback: shatter using blur, extreme scale and opacity.
        const { elements } = applySplitter(target, options, ['chars']);
        elements.forEach(el => { el.style.display = 'inline-block'; });
        elements.forEach((el) => {
            const x = (Math.random() - 0.5) * 500;
            const y = (Math.random() - 0.5) * 500;
            const r = (Math.random() - 0.5) * 360;
            const kf: Keyframe[] = [
                { transform: 'translate(0, 0) rotate(0deg) scale(1)', filter: 'blur(0)', opacity: 1 },
                { transform: `translate(${x}px, ${y}px) rotate(${r}deg) scale(0)`, filter: 'blur(10px)', opacity: 0 }
            ];
            engine.animate([el], kf, { duration: 1500, easing: 'cubic-bezier(0.1, 1, 0.1, 1)', fill: 'both', ...options });
        });
    }
}

// ============================================
// AI Typography
// ============================================

export class AIMorphingTypography {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const parent = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target;
        if (!parent) return;
        parent.style.filter = 'url(#goo)'; // Assumption: SVG filter exists, or fallback to blur/contrast
        const kf: Keyframe[] = [
            { letterSpacing: '-10px', filter: 'blur(10px) contrast(5)' },
            { letterSpacing: 'normal', filter: 'blur(0) contrast(1)' }
        ];
        engine.animate([parent], kf, { duration: 2000, easing: 'ease-out', ...options });
    }
}

export class NeuralNetworkText {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const { elements } = applySplitter(target, options, ['chars']);
        elements.forEach((el, i) => {
            const kf: Keyframe[] = [
                { opacity: 0.1, textShadow: '0 0 0px rgba(0,255,255,0)' },
                { opacity: 1, textShadow: '0 0 10px rgba(0,255,255,1)' },
                { opacity: 0.1, textShadow: '0 0 0px rgba(0,255,255,0)' }
            ];
            engine.animate([el], kf, { duration: 2000, delay: i * 150, easing: 'linear', ...options }).forEach(a => {
                if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
            });
        });
    }
}

export class AILiquidFlowText {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const parent = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target;
        if (!parent) return;
        parent.style.backgroundImage = 'background-image: linear-gradient(45deg, #f3ec78, #af4261, #f3ec78)';
        parent.style.backgroundClip = 'text';
        parent.style.webkitBackgroundClip = 'text';
        parent.style.color = 'transparent';
        parent.style.backgroundSize = '300% 300%';
        const kf: Keyframe[] = [
            { backgroundPosition: '0% 50%' },
            { backgroundPosition: '100% 50%' }
        ];
        engine.animate([parent], kf, { duration: 4000, easing: 'ease', ...options }).forEach(a => {
            if(a.effect) (a.effect as any).updateTiming({ direction: 'alternate' });
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}

export class AIParticleTypography {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const { elements } = applySplitter(target, options, ['chars']);
        elements.forEach(el => { el.style.display = 'inline-block'; });
        const kf: Keyframe[] = [
            { transform: 'translateY(-10px)', filter: 'blur(5px)', opacity: 0 },
            { transform: 'translateY(0)', filter: 'blur(0px)', opacity: 1 }
        ];
        engine.animate(elements, kf, { duration: 800, stagger: 30, easing: 'ease-out', ...options });
    }
}

export class AIGeneratedOrganicText {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const { elements } = applySplitter(target, options, ['chars']);
        elements.forEach(el => { el.style.display = 'inline-block'; });
        elements.forEach((el, i) => {
            const kf: Keyframe[] = [
                { transform: 'scale(1) skew(0deg)' },
                { transform: 'scale(1.1) skew(2deg)' },
                { transform: 'scale(1) skew(0deg)' }
            ];
            engine.animate([el], kf, { duration: 3000, delay: i * 200, easing: 'ease-in-out', ...options }).forEach(a => {
                if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
            });
        });
    }
}

export class AINeuralPulseText {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const { elements } = applySplitter(target, options, ['words']);
        elements.forEach((el, i) => {
            const kf: Keyframe[] = [
                { transform: 'scale(1)', opacity: 0.5 },
                { transform: 'scale(1.1)', opacity: 1, filter: 'drop-shadow(0 0 10px #0f0)' },
                { transform: 'scale(1)', opacity: 0.5 }
            ];
            engine.animate([el], kf, { duration: 1000, delay: i * 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', ...options }).forEach(a => {
                if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
            });
        });
    }
}

export class AIDataStreamText {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const { elements } = applySplitter(target, options, ['chars']);
        elements.forEach(el => { el.style.display = 'inline-block'; });
        elements.forEach((el, i) => {
            const kf: Keyframe[] = [
                { transform: 'translateY(-100%)', opacity: 0 },
                { transform: 'translateY(0)', opacity: 1 },
                { transform: 'translateY(100%)', opacity: 0 }
            ];
            engine.animate([el], kf, { duration: 2000, delay: Math.random() * 2000, easing: 'linear', ...options }).forEach(a => {
                if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
            });
        });
    }
}

export class AIEnergyWaveText {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const { elements } = applySplitter(target, options, ['chars']);
        elements.forEach(el => { el.style.display = 'inline-block'; });
        const kf: Keyframe[] = [
            { transform: 'translateY(10px)', color: '#4f46e5', textShadow: '0 0 0 #4f46e5' },
            { transform: 'translateY(-10px)', color: '#06b6d4', textShadow: '0 0 20px #06b6d4' },
            { transform: 'translateY(10px)', color: '#4f46e5', textShadow: '0 0 0 #4f46e5' }
        ];
        engine.animate(elements, kf, { duration: 2000, stagger: 50, easing: 'ease-in-out', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}

// ============================================
// Kinetic & Tech
// ============================================

export class KineticTypographyPro {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const { elements } = applySplitter(target, options, ['words']);
        elements.forEach(el => { el.style.display = 'inline-block'; });
        const kf: Keyframe[] = [
            { transform: 'rotate(-10deg) scale(0.5)', opacity: 0 },
            { transform: 'rotate(0deg) scale(1)', opacity: 1 }
        ];
        engine.animate(elements, kf, { duration: 600, stagger: 100, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', ...options });
    }
}

export class DynamicWordBurst {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const { elements } = applySplitter(target, options, ['words']);
        elements.forEach(el => { el.style.display = 'inline-block'; });
        elements.forEach((el) => {
            const kf: Keyframe[] = [
                { transform: 'scale(2) translateY(-20px)', opacity: 0 },
                { transform: 'scale(1) translateY(0)', opacity: 1 }
            ];
            // Random delay for burst effect
            engine.animate([el], kf, { duration: 500, delay: Math.random() * 300, easing: 'ease-out', ...options });
        });
    }
}

export class StaggeredCharacterAnimation {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const { elements } = applySplitter(target, options, ['chars']);
        elements.forEach(el => { el.style.display = 'inline-block'; });
        const kf: Keyframe[] = [
            { transform: 'translateY(100%)', opacity: 0 },
            { transform: 'translateY(0)', opacity: 1 }
        ];
        engine.animate(elements, kf, { duration: 600, stagger: 20, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', ...options });
    }
}

export class ElasticTypographyMotion {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const { elements } = applySplitter(target, options, ['words']);
        elements.forEach(el => { el.style.display = 'inline-block'; });
        const kf: Keyframe[] = [
            { transform: 'scaleX(0.5)' },
            { transform: 'scaleX(1.2)' },
            { transform: 'scaleX(0.9)' },
            { transform: 'scaleX(1.05)' },
            { transform: 'scaleX(1)' }
        ];
        engine.animate(elements, kf, { duration: 1000, stagger: 100, easing: 'linear', ...options });
    }
}

export class MagneticTextAnimation {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        // Simple hover translation fallback for magnetism
        const { elements } = applySplitter(target, options, ['words']);
        elements.forEach(el => { el.style.display = 'inline-block'; });
        const kf: Keyframe[] = [
            { transform: 'translate(0,0)' },
            { transform: 'translate(5px, -5px)' }
        ];
        engine.animate(elements, kf, { duration: 300, trigger: 'hover', easing: 'ease-out', ...options });
    }
}

export class GravityDropText {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const { elements } = applySplitter(target, options, ['chars']);
        elements.forEach(el => { el.style.display = 'inline-block'; });
        elements.forEach((el, i) => {
            const kf: Keyframe[] = [
                { transform: 'translateY(-200px)', opacity: 0 },
                { transform: 'translateY(0)', opacity: 1 },
                { transform: 'translateY(-30px)' },
                { transform: 'translateY(0)' },
                { transform: 'translateY(-10px)' },
                { transform: 'translateY(0)' }
            ];
            engine.animate([el], kf, { duration: 1000, delay: i * 50, easing: 'ease-in', fill: 'both', ...options });
        });
    }
}

export class RippleWaveText {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const { elements } = applySplitter(target, options, ['chars']);
        elements.forEach(el => { el.style.display = 'inline-block'; });
        const kf: Keyframe[] = [
            { transform: 'translateY(0) scale(1)', color: 'inherit' },
            { transform: 'translateY(-15px) scale(1.2)', color: '#6366f1' },
            { transform: 'translateY(0) scale(1)', color: 'inherit' }
        ];
        engine.animate(elements, kf, { duration: 800, stagger: 40, easing: 'ease-in-out', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}

export class KineticGridTypography {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const { elements } = applySplitter(target, options, ['words']);
        elements.forEach(el => { el.style.display = 'inline-block'; });
        elements.forEach((el) => {
            const dx = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 50);
            const dy = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 50);
            const kf: Keyframe[] = [
                { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 },
                { transform: 'translate(0, 0)', opacity: 1 }
            ];
            engine.animate([el], kf, { duration: 800, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'both', ...options });
        });
    }
}

// ============================================
// Hologram & Matrix
// ============================================

export class HologramText {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const parent = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target;
        if (!parent) return;
        parent.style.color = '#0ff';
        parent.style.textShadow = '0 0 5px #0ff, 0 0 10px #0ff';
        const kf: Keyframe[] = [
            { opacity: 0.8, transform: 'skew(0deg)', filter: 'brightness(1)' },
            { opacity: 0.5, transform: 'skew(-5deg)', filter: 'brightness(2)' },
            { opacity: 1, transform: 'skew(5deg)', filter: 'brightness(0.8)' },
            { opacity: 0.8, transform: 'skew(0deg)', filter: 'brightness(1)' }
        ];
        engine.animate([parent], kf, { duration: 150, easing: 'steps(2, end)', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}

export class CyberpunkNeonText {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const parent = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target;
        if (!parent) return;
        parent.style.color = '#fff';
        parent.style.textShadow = '0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 40px #ff00ff';
        const kf: Keyframe[] = [
            { opacity: 1 },
            { opacity: 0.6 },
            { opacity: 1 },
            { opacity: 0.2 },
            { opacity: 1 }
        ];
        engine.animate([parent], kf, { duration: 2000, easing: 'linear', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}

export class HUDInterfaceTypography {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const { elements } = applySplitter(target, options, ['chars']);
        elements.forEach(el => { 
            el.style.display = 'inline-block';
            el.style.fontFamily = 'monospace';
            el.style.color = '#0f0';
        });
        const kf: Keyframe[] = [
            { opacity: 0, transform: 'scale(0.8)' },
            { opacity: 1, transform: 'scale(1)' }
        ];
        engine.animate(elements, kf, { duration: 200, stagger: 20, easing: 'ease', fill: 'both', ...options });
    }
}

export class MatrixCodeText {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const { elements } = applySplitter(target, options, ['chars']);
        elements.forEach(el => {
            el.style.display = 'inline-block';
            el.style.color = '#0F0';
            el.style.textShadow = '0 0 5px #0F0';
        });
        const kf: Keyframe[] = [
            { filter: 'brightness(0)', opacity: 0 },
            { filter: 'brightness(2)', opacity: 1 },
            { filter: 'brightness(1)', opacity: 1 }
        ];
        engine.animate(elements, kf, { duration: 300, stagger: 50, easing: 'linear', fill: 'both', ...options });
    }
}

export class DigitalScanText {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const parent = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target;
        if (!parent) return;
        parent.style.position = 'relative';
        const kf: Keyframe[] = [
            { clipPath: 'inset(0 100% 0 0)' },
            { clipPath: 'inset(0 0% 0 0)' }
        ];
        engine.animate([parent], kf, { duration: 1500, easing: 'linear', fill: 'both', ...options });
    }
}

export class DataStreamTypography {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const { elements } = applySplitter(target, options, ['chars']);
        elements.forEach(el => { el.style.display = 'inline-block'; });
        elements.forEach((el, i) => {
            const kf: Keyframe[] = [
                { transform: 'translateY(10px)', opacity: 0, filter: 'blur(5px)' },
                { transform: 'translateY(0)', opacity: 1, filter: 'blur(0)' }
            ];
            engine.animate([el], kf, { duration: 400, delay: Math.random() * 1000, easing: 'ease-out', fill: 'both', ...options });
        });
    }
}

export class GlitchMatrixTitle {
    constructor(public target: HTMLElement | string, public options: AnimationOptions = {}) {
        const parent = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target;
        if (!parent) return;
        const kf: Keyframe[] = [
            { transform: 'translate(0)', filter: 'drop-shadow(2px 0 0 red) drop-shadow(-2px 0 0 cyan)' },
            { transform: 'translate(-2px, 2px)', filter: 'drop-shadow(-2px 0 0 red) drop-shadow(2px 0 0 cyan)' },
            { transform: 'translate(2px, -2px)', filter: 'drop-shadow(2px 0 0 red) drop-shadow(-2px 0 0 cyan)' },
            { transform: 'translate(0)', filter: 'drop-shadow(0 0 0 red) drop-shadow(0 0 0 cyan)' }
        ];
        engine.animate([parent], kf, { duration: 200, easing: 'steps(3, end)', ...options }).forEach(a => {
            if (!options.trigger) if(a.effect) (a.effect as any).updateTiming({ iterations: Infinity });
        });
    }
}
