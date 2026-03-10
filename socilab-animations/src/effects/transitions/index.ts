export class SmoothPanelTransition {
    constructor(public outNode: HTMLElement, public inNode: HTMLElement, public options: any = {}) {
        const duration = options.duration || 800;
        outNode.style.zIndex = '1';
        inNode.style.zIndex = '2';
        inNode.animate([
            { transform: 'translateY(100%)' },
            { transform: 'translateY(0)' }
        ], { duration, easing: 'cubic-bezier(0.85, 0, 0.15, 1)', fill: 'both' });
    }
}

export class SlidingFrameTransition {
    constructor(public outNode: HTMLElement, public inNode: HTMLElement, public options: any = {}) {
        const duration = options.duration || 800;
        outNode.style.zIndex = '1';
        inNode.style.zIndex = '2';
        
        const wipe = document.createElement('div');
        wipe.style.position = 'absolute';
        wipe.style.top = '0'; wipe.style.left = '0';
        wipe.style.width = '100%'; wipe.style.height = '100%';
        wipe.style.backgroundColor = '#111';
        wipe.style.zIndex = '15';
        wipe.style.transformOrigin = 'left center';
        inNode.parentElement?.appendChild(wipe);

        inNode.style.opacity = '0';

        const wAnim = wipe.animate([
            { transform: 'scaleX(0)' },
            { transform: 'scaleX(1)' }
        ], { duration: duration / 2, easing: 'ease-in-out', fill: 'both' });

        wAnim.onfinish = () => {
            inNode.style.opacity = '1';
            outNode.style.opacity = '0';
            wipe.style.transformOrigin = 'right center';
            const wAnim2 = wipe.animate([
                { transform: 'scaleX(1)' },
                { transform: 'scaleX(0)' }
            ], { duration: duration / 2, easing: 'ease-in-out', fill: 'both' });
            wAnim2.onfinish = () => { wipe.remove(); };
        };
    }
}

export class DynamicGridTransition {
    constructor(public outNode: HTMLElement, public inNode: HTMLElement, public options: any = {}) {
        const duration = options.duration || 1000;
        outNode.style.zIndex = '2';
        inNode.style.zIndex = '1';
        inNode.style.opacity = '1';

        outNode.animate([
            { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
            { clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)' }
        ], { duration, easing: 'cubic-bezier(0.7, 0, 0.3, 1)', fill: 'both' });
    }
}

export class SeamlessFlowTransition {
    constructor(public outNode: HTMLElement, public inNode: HTMLElement, public options: any = {}) {
        const duration = options.duration || 800;
        inNode.style.zIndex = '2';
        outNode.style.zIndex = '1';
        outNode.animate([
            { filter: 'blur(0)', transform: 'scale(1)', opacity: 1 },
            { filter: 'blur(20px)', transform: 'scale(0.9)', opacity: 0 }
        ], { duration, easing: 'ease-out', fill: 'both' });
        inNode.animate([
            { filter: 'blur(20px)', transform: 'scale(1.1)', opacity: 0 },
            { filter: 'blur(0)', transform: 'scale(1)', opacity: 1 }
        ], { duration, easing: 'ease-out', fill: 'both' });
    }
}

export class PanelRevealMotion {
    constructor(public outNode: HTMLElement, public inNode: HTMLElement, public options: any = {}) {
        const duration = options.duration || 900;
        inNode.style.zIndex = '1';
        outNode.style.zIndex = '2';
        inNode.style.opacity = '1';
        outNode.animate([
            { transform: 'translateY(0)' },
            { transform: 'translateY(-100%)' }
        ], { duration, easing: 'cubic-bezier(0.75, 0, 0.25, 1)', fill: 'both' });
    }
}

// Depth & Parallax
export class MultiLayerParallaxTransition {
    constructor(public outNode: HTMLElement, public inNode: HTMLElement, public options: any = {}) {
        const duration = options.duration || 1200;
        outNode.style.zIndex = '1';
        inNode.style.zIndex = '2';
        outNode.animate([
            { transform: 'translateX(0) scale(1)', opacity: 1 },
            { transform: 'translateX(-30%) scale(0.9)', opacity: 0 }
        ], { duration, easing: 'cubic-bezier(0.6, 0.05, 0.28, 0.91)', fill: 'both' });

        inNode.animate([
            { transform: 'translateX(100%) scale(1.1)' },
            { transform: 'translateX(0) scale(1)' }
        ], { duration, easing: 'cubic-bezier(0.6, 0.05, 0.28, 0.91)', fill: 'both' });
    }
}

export class DepthSlideTransition {
    constructor(public outNode: HTMLElement, public inNode: HTMLElement, public options: any = {}) {
        const duration = options.duration || 1000;
        outNode.style.zIndex = '1';
        inNode.style.zIndex = '2';
        outNode.animate([
            { transform: 'scale(1) translateY(0)' },
            { transform: 'scale(0.8) translateY(-100%)' }
        ], { duration, easing: 'cubic-bezier(0.7,0,0.3,1)', fill: 'both' });

        inNode.animate([
            { transform: 'scale(1.2) translateY(100%)' },
            { transform: 'scale(1) translateY(0)' }
        ], { duration, easing: 'cubic-bezier(0.7,0,0.3,1)', fill: 'both' });
    }
}

export class FloatingLayerTransition {
    constructor(public outNode: HTMLElement, public inNode: HTMLElement, public options: any = {}) {
        const duration = options.duration || 1200;
        inNode.style.zIndex = '2';
        outNode.style.zIndex = '1';
        outNode.animate([{ opacity: 1 }, { opacity: 0 }], { duration: duration/2, fill: 'both' });
        inNode.animate([
            { transform: 'translateY(-50px)', opacity: 0, boxShadow: '0 50px 100px rgba(0,0,0,0.5)' },
            { transform: 'translateY(0)', opacity: 1, boxShadow: '0 0 0 rgba(0,0,0,0)' }
        ], { duration, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'both' });
    }
}

export class PerspectiveCameraTransition {
    constructor(public outNode: HTMLElement, public inNode: HTMLElement, public options: any = {}) {
        const duration = options.duration || 1400;
        const container = inNode.parentElement;
        if (container) { container.style.perspective = '1500px'; }
        outNode.style.zIndex = '2';
        inNode.style.zIndex = '1';
        inNode.style.opacity = '1';

        const anim = outNode.animate([
            { transform: 'translateZ(0) rotateY(0deg)', opacity: 1 },
            { transform: 'translateZ(500px) rotateY(-90deg)', opacity: 0 }
        ], { duration, easing: 'cubic-bezier(0.5, 0, 0, 1)', fill: 'both' });
        anim.onfinish = () => {
            if (container) container.style.perspective = 'none';
        };
    }
}

export class InfiniteCanvasTransition {
    constructor(public outNode: HTMLElement, public inNode: HTMLElement, public options: any = {}) {
        const duration = options.duration || 1200;
        inNode.style.zIndex = '1';
        outNode.style.zIndex = '2';
        inNode.style.opacity = '1';
        outNode.animate([
            { transform: 'scale(1) translate(0,0)' },
            { transform: 'scale(3) translate(-50%, -50%)', opacity: 0 }
        ], { duration, easing: 'cubic-bezier(0.8, 0, 0.2, 1)', fill: 'both' });
    }
}

// 3D Cinematic
export class CameraFlyThrough3D {
    constructor(public outNode: HTMLElement, public inNode: HTMLElement, public options: any = {}) {
        const duration = options.duration || 1500;
        outNode.style.zIndex = '2';
        inNode.style.zIndex = '1';
        inNode.style.opacity = '1';
        const container = inNode.parentElement;
        if (container) { container.style.perspective = '1000px'; }

        const anim = outNode.animate([
            { transform: 'translateZ(0)', opacity: 1 },
            { transform: 'translateZ(800px)', opacity: 0 }
        ], { duration, easing: 'cubic-bezier(0.7, 0, 0.3, 1)', fill: 'both' });
        anim.onfinish = () => {
            if (container) container.style.perspective = 'none';
        };
    }
}

export class CubeSceneTransition {
    constructor(public outNode: HTMLElement, public inNode: HTMLElement, public options: any = {}) {
        const duration = options.duration || 1200;
        const container = inNode.parentElement;
        if (container) { container.style.perspective = '2000px'; }
        
        outNode.style.zIndex = '2';
        inNode.style.zIndex = '1';
        
        outNode.style.transformOrigin = 'right center';
        outNode.animate([
            { transform: 'rotateY(0deg) translateZ(0)', opacity: 1 },
            { transform: 'rotateY(-90deg) translateZ(0)', opacity: 0 }
        ], { duration, easing: 'ease-in-out', fill: 'both' });

        inNode.style.transformOrigin = 'left center';
        const anim = inNode.animate([
            { transform: 'rotateY(90deg) translateZ(0)', opacity: 0 },
            { transform: 'rotateY(0deg) translateZ(0)', opacity: 1 }
        ], { duration, easing: 'ease-in-out', fill: 'both' });

        anim.onfinish = () => {
            outNode.style.transformOrigin = '';
            inNode.style.transformOrigin = '';
            if (container) container.style.perspective = 'none';
        }
    }
}

export class TunnelWarpTransition {
    constructor(public outNode: HTMLElement, public inNode: HTMLElement, public options: any = {}) {
        const duration = options.duration || 1800;
        outNode.style.zIndex = '2';
        inNode.style.zIndex = '1';
        inNode.style.opacity = '1';

        outNode.animate([
            { transform: 'scale(1)', filter: 'blur(0)', opacity: 1 },
            { transform: 'scale(5)', filter: 'blur(20px)', opacity: 0 }
        ], { duration, easing: 'cubic-bezier(0.8,0,0.2,1)', fill: 'both' });
        
        inNode.animate([
            { transform: 'scale(0.5)', filter: 'blur(10px)', opacity: 0 },
            { transform: 'scale(1)', filter: 'blur(0)', opacity: 1 }
        ], { duration, delay: duration * 0.2, easing: 'cubic-bezier(0.2,0.8,0.2,1)', fill: 'both' });
    }
}

export class PortalTransition {
    constructor(public outNode: HTMLElement, public inNode: HTMLElement, public options: any = {}) {
        const duration = options.duration || 1500;
        outNode.style.zIndex = '2';
        inNode.style.zIndex = '1';
        inNode.style.opacity = '1';

        outNode.animate([
            { clipPath: 'circle(100% at center)' },
            { clipPath: 'circle(0% at center)' }
        ], { duration, easing: 'cubic-bezier(0.8,0,0.2,1)', fill: 'both' });
        
        inNode.animate([
            { transform: 'scale(0.5)', opacity: 0 },
            { transform: 'scale(1)', opacity: 1 }
        ], { duration, delay: 200, easing: 'ease-out', fill: 'both' });
    }
}

export class EnvironmentTransition3D {
    constructor(public outNode: HTMLElement, public inNode: HTMLElement, public options: any = {}) {
        const duration = options.duration || 1500;
        outNode.style.zIndex = '2';
        inNode.style.zIndex = '1';
        
        outNode.animate([
            { transform: 'rotateX(0deg) scale(1)', opacity: 1 },
            { transform: 'rotateX(90deg) scale(0.5)', opacity: 0 }
        ], { duration, easing: 'cubic-bezier(0.7,0,0.3,1)', fill: 'both' });

        inNode.animate([
            { transform: 'rotateX(-90deg) scale(1.5)', opacity: 0 },
            { transform: 'rotateX(0deg) scale(1)', opacity: 1 }
        ], { duration, easing: 'cubic-bezier(0.7,0,0.3,1)', fill: 'both' });
    }
}

// Viral
export class SpeedRampTransition {
    constructor(public outNode: HTMLElement, public inNode: HTMLElement, public options: any = {}) {
        const duration = options.duration || 800;
        outNode.style.zIndex = '1';
        inNode.style.zIndex = '2';
        
        inNode.animate([
            { transform: 'translateX(100%) skewX(-20deg)', filter: 'blur(10px)' },
            { transform: 'translateX(0) skewX(0deg)', filter: 'blur(0)' }
        ], { duration, easing: 'cubic-bezier(0.1, 1, 0.1, 1)', fill: 'both' });
        
        outNode.animate([
            { transform: 'translateX(0) blur(0)' },
            { transform: 'translateX(-50%) blur(10px)' }
        ], { duration, easing: 'cubic-bezier(0.7, 0, 0.3, 1)', fill: 'both' });
    }
}

export class WhipPanTransition {
    constructor(public outNode: HTMLElement, public inNode: HTMLElement, public options: any = {}) {
        const duration = options.duration || 600;
        outNode.style.zIndex = '1';
        inNode.style.zIndex = '2';

        outNode.animate([
            { transform: 'translateX(0)', filter: 'blur(0)' },
            { transform: 'translateX(-100%)', filter: 'blur(30px)' }
        ], { duration, easing: 'cubic-bezier(0.8, 0, 0.2, 1)', fill: 'both' });

        inNode.animate([
            { transform: 'translateX(100%)', filter: 'blur(30px)' },
            { transform: 'translateX(0)', filter: 'blur(0)' }
        ], { duration, easing: 'cubic-bezier(0.8, 0, 0.2, 1)', fill: 'both' });
    }
}

export class BeatSyncTransition {
    constructor(public outNode: HTMLElement, public inNode: HTMLElement, public options: any = {}) {
        const duration = options.duration || 900;
        outNode.style.zIndex = '2';
        inNode.style.zIndex = '1';
        inNode.style.opacity = '1';

        outNode.animate([
            { transform: 'scale(1)', opacity: 1, offset: 0 },
            { transform: 'scale(1.1)', opacity: 0.5, offset: 0.33 },
            { transform: 'scale(1.2)', opacity: 0, offset: 0.66 },
            { transform: 'scale(1.5)', opacity: 0, offset: 1 }
        ], { duration, easing: 'steps(4, end)', fill: 'both' });
    }
}

export class ZoomWarpTransition {
    constructor(public outNode: HTMLElement, public inNode: HTMLElement, public options: any = {}) {
        const duration = options.duration || 800;
        outNode.style.zIndex = '2';
        inNode.style.zIndex = '1';
        inNode.style.opacity = '1';

        outNode.animate([
            { transform: 'scale(1)', filter: 'contrast(1) blur(0)' },
            { transform: 'scale(3)', filter: 'contrast(2) blur(15px)', opacity: 0 }
        ], { duration, easing: 'cubic-bezier(0.9, 0, 0.1, 1)', fill: 'both' });

        inNode.animate([
            { transform: 'scale(0.5)', filter: 'blur(10px)', opacity: 0 },
            { transform: 'scale(1)', filter: 'blur(0)', opacity: 1 }
        ], { duration, easing: 'ease-out', fill: 'both' });
    }
}

export class SwipeMotionTransition {
    constructor(public outNode: HTMLElement, public inNode: HTMLElement, public options: any = {}) {
        const duration = options.duration || 700;
        outNode.style.zIndex = '2';
        inNode.style.zIndex = '1';
        inNode.style.opacity = '1';

        outNode.animate([
            { transform: 'translate(0, 0) rotate(0)', opacity: 1 },
            { transform: 'translate(100%, -20%) rotate(15deg)', opacity: 0 }
        ], { duration, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)', fill: 'both' });

        inNode.animate([
            { transform: 'scale(0.9)', opacity: 0.5 },
            { transform: 'scale(1)', opacity: 1 }
        ], { duration, easing: 'ease', fill: 'both' });
    }
}
