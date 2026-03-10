import {
    CinematicReveal, Fade, Jelly, Scramble, CameraFlyThrough,
    HorizontalParallaxSlide, CardStackTransition, MaskParallaxReveal,
    StaggeredLayerSlide, EdgeWipeMotion, CinematicDepth, PerspectiveZoom,
    LayerDepthTransition, Stretch, Wavy, Bounce, Pop, Rotate, Scale, Slide,
    Typewriter, Zoom, Blur, NeonGlow, DigitalGlitch, Shatter, AIMorph, Floating3D, Rotate3D
  } from 'socilab-animations';
  
  export interface EffectPropDef {
      name: string;
      type: 'string' | 'number' | 'boolean' | 'enum';
      options?: string[]; // for enum
      default: any;
      description: string;
      min?: number;
      max?: number;
      step?: number;
  }
  
  export interface EffectDef {
      id: string;
      name: string;
      class: any;
      description: string;
      isPageMode?: boolean;
      props: EffectPropDef[];
  }
  
  export interface CategoryDef {
      name: string;
      icon: string; // string identifier for lucide icons
      isPage?: boolean;
      effects: EffectDef[];
  }
  
  // Standard Text Props that apply to most text animations
  const baseTextProps: EffectPropDef[] = [
      { name: 'trigger', type: 'enum', options: ['hover', 'scroll', 'click', 'focus', 'load'], default: 'load', description: 'What interaction triggers the animation.' },
      { name: 'duration', type: 'number', min: 100, max: 3000, step: 50, default: 800, description: 'Duration of the animation in ms.' },
      { name: 'delay', type: 'number', min: 0, max: 2000, step: 50, default: 0, description: 'Delay before starting.' },
      { name: 'stagger', type: 'number', min: 0, max: 200, step: 5, default: 30, description: 'Delay between animating individual characters or words.' },
      { name: 'types', type: 'enum', options: ['chars', 'words', 'lines'], default: 'chars', description: 'How to split the text.' },
      { name: 'reverseOnLeave', type: 'boolean', default: false, description: 'Automatically reverse on mouse leave or scroll out.' }
  ];
  
  export const EFFECT_CATEGORIES: CategoryDef[] = [
    {
      name: 'Basic Text',
      icon: 'Type',
      effects: [
        { 
            id: 'fade', name: 'Fade', class: Fade, 
            description: 'A smooth opacity transition for characters or words.',
            props: [...baseTextProps]
        },
        { 
            id: 'slide', name: 'Slide', class: Slide, 
            description: 'Slides elements in from a specified direction.',
            props: [
                ...baseTextProps,
                { name: 'direction', type: 'enum', options: ['top', 'bottom', 'left', 'right'], default: 'bottom', description: 'Direction to slide from.' },
                { name: 'distance', type: 'number', min: 10, max: 500, step: 10, default: 50, description: 'Slide distance in pixels.' }
            ]
        },
        { 
            id: 'scale', name: 'Scale', class: Scale, 
            description: 'Scales elements up or down from a starting value.',
            props: [
                ...baseTextProps,
                { name: 'startScale', type: 'number', min: 0, max: 2, step: 0.1, default: 0, description: 'Initial scale value.' }
            ]
        },
        { 
            id: 'blur', name: 'Blur Text', class: Blur, 
            description: 'A cinematic blur and reveal effect.',
            props: [
                ...baseTextProps,
                { name: 'amount', type: 'number', min: 2, max: 40, step: 1, default: 10, description: 'Initial blur radius in px.' }
            ]
        },
        { id: 'pop', name: 'Pop', class: Pop, description: 'A bouncy pop-in effect.', props: baseTextProps },
        { id: 'bounce', name: 'Bounce', class: Bounce, description: 'Elastic bounce effect.', props: baseTextProps },
        { id: 'rotate', name: 'Rotate', class: Rotate, description: 'Rotates elements into view.', props: baseTextProps },
        { id: 'typewriter', name: 'Typewriter', class: Typewriter, description: 'Classic staggered typing effect.', props: baseTextProps },
        { id: 'zoom', name: 'Zoom', class: Zoom, description: 'Z-axis perspective zoom.', props: baseTextProps },
      ]
    },
    {
      name: 'Advanced Motion',
      icon: 'Zap',
      effects: [
        { 
            id: 'jelly', name: 'Jelly', class: Jelly, 
            description: 'A liquid-like elastic hover effect that distorts the text scale perfectly.',
            props: [...baseTextProps]
        },
        { id: 'stretch', name: 'Stretch', class: Stretch, description: 'Stretches characters in the X or Y axis.', props: baseTextProps },
        { id: 'wavy', name: 'Wavy', class: Wavy, description: 'Sine wave motion across the text elements.', props: baseTextProps },
      ]
    },
    {
      name: 'Cinematic & Tech',
      icon: 'Box',
      effects: [
         { 
             id: 'cinematic', name: 'Cinematic Reveal', class: CinematicReveal, 
             description: 'High-end 3D rotation and filter sequence used in major film sites.',
             props: baseTextProps
         },
         { id: 'neon', name: 'Neon Glow', class: NeonGlow, description: 'Flickering cyberpunk neon light effect.', props: baseTextProps },
         { id: 'glitch', name: 'Digital Glitch', class: DigitalGlitch, description: 'Chromatic aberration and shifting block glitch.', props: baseTextProps },
         { id: 'scramble', name: 'Scramble', class: Scramble, description: 'Decodes text through randomized symbols before settling.', props: baseTextProps },
         { id: 'shatter', name: 'Shatter', class: Shatter, description: 'Explodes the text into shards radially.', props: baseTextProps },
      ]
    },
    {
      name: '3D & AI',
      icon: 'Layers',
      effects: [
        { id: 'floating3d', name: 'Floating 3D', class: Floating3D, description: 'Continuous ambient 3D floating animation.', props: baseTextProps },
        { id: 'rotate3d', name: 'Rotate 3D', class: Rotate3D, description: 'Spins elements natively in 3D space.', props: baseTextProps },
        { id: 'aimorph', name: 'AI Morph', class: AIMorph, description: 'Generative, evolving fluid gradients masquerading as text.', props: baseTextProps },
      ]
    },
    {
      name: 'Page Transitions',
      icon: 'Layout',
      isPage: true,
      effects: [
        { 
            id: 'camera-fly', name: 'Camera Fly Through', class: CameraFlyThrough, isPageMode: true,
            description: 'Cinematic 3D camera push through the outgoing layer into the incoming layer.',
            props: [
                { name: 'duration', type: 'number', min: 500, max: 3000, step: 100, default: 1200, description: 'Total transition duration.' },
                { name: 'easing', type: 'string', default: 'cubic-bezier(0.76, 0, 0.24, 1)', description: 'Easing curve.'}
            ]
        },
        { 
            id: 'parallax-slide', name: 'Horizontal Parallax', class: HorizontalParallaxSlide, isPageMode: true,
            description: 'Layers slide at different speeds to create spatial depth.',
            props: [
                { name: 'duration', type: 'number', min: 500, max: 3000, step: 100, default: 1200, description: 'Total transition duration.' }
            ]
        },
        { id: 'stagger-layer', name: 'Staggered Layers', class: StaggeredLayerSlide, isPageMode: true, description: 'Multi-slice staggered page wipe.', props: [{ name: 'duration', type: 'number', default: 1200, description: 'duration' }] },
        { id: 'card-stack', name: 'Card Stack', class: CardStackTransition, isPageMode: true, description: 'Outgoing page falls behind as a card.', props: [{ name: 'duration', type: 'number', default: 1200, description: 'duration' }] },
        { id: 'mask-parallax', name: 'Mask Parallax', class: MaskParallaxReveal, isPageMode: true, description: 'Circular mask reveal overlay.', props: [{ name: 'duration', type: 'number', default: 1200, description: 'duration' }] },
      ]
    }
  ];
