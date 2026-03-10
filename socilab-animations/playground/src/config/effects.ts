import {
    // Current Core
    CinematicReveal, Fade, Jelly, Scramble, CameraFlyThrough,
    HorizontalParallaxSlide, CardStackTransition, MaskParallaxReveal,
    StaggeredLayerSlide, EdgeWipeMotion, CinematicDepth, PerspectiveZoom,
    LayerDepthTransition, Stretch, Wavy, Bounce, Pop, Rotate, Scale, Slide,
    Typewriter, Zoom, Blur, NeonGlow, DigitalGlitch, Shatter, AIMorph, Floating3D, Rotate3D,
    
    // New Advanced 3D & AI Text
    ExtrudedText3D, CinematicDepthText, MetallicTitle, GoldReflectionText, GlassMorphText, ChromeLiquidText, CrystalText, Floating3DTypography, InfiniteDepthText, ParticleExplosionText,
    AIMorphingTypography, NeuralNetworkText, AILiquidFlowText, AIParticleTypography, AIGeneratedOrganicText, AINeuralPulseText, AIDataStreamText, AIEnergyWaveText,
    KineticTypographyPro, DynamicWordBurst, StaggeredCharacterAnimation, ElasticTypographyMotion, MagneticTextAnimation, GravityDropText, RippleWaveText, KineticGridTypography,
    HologramText, CyberpunkNeonText, HUDInterfaceTypography, MatrixCodeText, DigitalScanText, DataStreamTypography, GlitchMatrixTitle,
    
    // Cards
    CleanModernCard, FloatingCardAnimation, CardStackAnimation, LayeredCardReveal, ExpandableCardMotion, SlideCardInterface, FlipCardInteraction, ScrollCardAnimation,
    GlassmorphismCardAnimation, NeumorphismCardAnimation, DynamicHoverCard, MagneticCardMotion, ElasticCardBounce, FloatingDashboardCard,
    TiltCardAnimation3D, PerspectiveCardRotation, ParallaxCardMotion, CardStackTransition3D, DepthCardFlip, RotatingProductCard,

    // Maps
    BasicMapMotion, RoutePathAnimation, LocationPinDrop, LineTravelAnimation, GPSTrackingMotion, NavigationPathAnimation,
    GlobeMap3D, SatelliteMapZoom, MapParallaxAnimation, CityNetworkAnimation, DigitalMapGridAnimation, WorldConnectionLines,
    HologramMapInterface, AIDataMapVisualization, NetworkNodeMap, GlobalDataFlowMap, DigitalEarthAnimation,

    // Particles & Ultra Modern
    LiquidMotionGraphics, MorphShapeAnimation, FluidSimulationAnimation, ParticleSystemAnimation, FractalAnimation, EnergyWaveAnimation, MagneticFieldMotion,
    ParticleTextDisintegration, EnergyBurstAnimation, SmokeTypography, FireTypography, DustExplosionAnimation, GalaxyParticleMotion,

    // 3D Motion
    LayerParallax3D, InfiniteLoopMotion, DepthCameraMotion, FloatingObjectAnimation, MotionGrid3D, OrbitalMotionAnimation,

    // Transitions
    SmoothPanelTransition, SlidingFrameTransition, DynamicGridTransition, SeamlessFlowTransition, PanelRevealMotion,
    MultiLayerParallaxTransition, DepthSlideTransition, FloatingLayerTransition, PerspectiveCameraTransition, InfiniteCanvasTransition,
    CameraFlyThrough3D, CubeSceneTransition, TunnelWarpTransition, PortalTransition, EnvironmentTransition3D,
    SpeedRampTransition, WhipPanTransition, BeatSyncTransition, ZoomWarpTransition, SwipeMotionTransition

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

  const emptyProps: EffectPropDef[] = [
    { name: 'duration', type: 'number', min: 500, max: 3000, step: 50, default: 1000, description: 'Duration of the animation' }
  ];
  
  // Stub gen helper
  const s = (id: string, name: string, cls: any, desc: string, isPageMode = false) => ({
      id, name, class: cls, description: desc, isPageMode, props: emptyProps
  });

  export const EFFECT_CATEGORIES: CategoryDef[] = [
    {
      name: 'Basic Text',
      icon: 'Type',
      effects: [
        { id: 'fade', name: 'Fade', class: Fade, description: 'A smooth opacity transition for characters or words.', props: [...baseTextProps] },
        { id: 'slide', name: 'Slide', class: Slide, description: 'Slides elements in from a specified direction.', props: [ ...baseTextProps, { name: 'direction', type: 'enum', options: ['top', 'bottom', 'left', 'right'], default: 'bottom', description: 'Direction to slide from.' }, { name: 'distance', type: 'number', min: 10, max: 500, step: 10, default: 50, description: 'Slide distance in pixels.' }] },
        { id: 'scale', name: 'Scale', class: Scale, description: 'Scales elements up or down from a starting value.', props: [ ...baseTextProps, { name: 'startScale', type: 'number', min: 0, max: 2, step: 0.1, default: 0, description: 'Initial scale value.' }] },
        { id: 'blur', name: 'Blur Text', class: Blur, description: 'A cinematic blur and reveal effect.', props: [ ...baseTextProps, { name: 'amount', type: 'number', min: 2, max: 40, step: 1, default: 10, description: 'Initial blur radius in px.' }] },
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
        { id: 'jelly', name: 'Jelly', class: Jelly, description: 'A liquid-like elastic hover effect.', props: [...baseTextProps]},
        { id: 'stretch', name: 'Stretch', class: Stretch, description: 'Stretches characters in the X or Y axis.', props: baseTextProps },
        { id: 'wavy', name: 'Wavy', class: Wavy, description: 'Sine wave motion across the text elements.', props: baseTextProps },
        s('kinetic-pro', 'Kinetic Typography Pro', KineticTypographyPro, 'High-end kinetic manipulation.'),
        s('word-burst', 'Dynamic Word Burst', DynamicWordBurst, 'Explosive word burst reveal.'),
        s('staggered-char', 'Staggered Char Animation', StaggeredCharacterAnimation, 'Complex staggered timing.'),
        s('elastic-motion', 'Elastic Typography', ElasticTypographyMotion, 'Over-exaggerated elasticity.'),
        s('magnetic-text', 'Magnetic Text', MagneticTextAnimation, 'Text that magnetically attracts to cursor.'),
        s('gravity-drop', 'Gravity Drop Text', GravityDropText, 'Text falling under simulated physics.'),
        s('ripple-wave', 'Ripple Wave Text', RippleWaveText, 'Concentric ripples passing through.'),
        s('kinetic-grid', 'Kinetic Grid Text', KineticGridTypography, 'Layout-breaking grid shifts.')
      ]
    },
    {
      name: 'Cinematic & Tech',
      icon: 'Box',
      effects: [
         { id: 'cinematic', name: 'Cinematic Reveal', class: CinematicReveal, description: 'High-end rotation and filter sequence.', props: baseTextProps },
         { id: 'neon', name: 'Neon Glow', class: NeonGlow, description: 'Flickering cyberpunk neon light effect.', props: baseTextProps },
         { id: 'glitch', name: 'Digital Glitch', class: DigitalGlitch, description: 'Chromatic aberration and shifting block glitch.', props: baseTextProps },
         { id: 'scramble', name: 'Scramble', class: Scramble, description: 'Decodes text through randomized symbols before settling.', props: baseTextProps },
         { id: 'shatter', name: 'Shatter', class: Shatter, description: 'Explodes the text into shards radially.', props: baseTextProps },
         s('hologram-text', 'Hologram Text', HologramText, 'Sci-Fi glowing scanline projection.'),
         s('cyberpunk-neon', 'Cyberpunk Neon', CyberpunkNeonText, 'Aggressive overdriven neon.'),
         s('hud-interface', 'HUD Interface Typography', HUDInterfaceTypography, 'Iron-man style UI text overlays.'),
         s('matrix-code', 'Matrix Code Text', MatrixCodeText, 'Classic raining green code.'),
         s('digital-scan', 'Digital Scan Text', DigitalScanText, 'Laser scan readout.'),
         s('data-stream', 'Data Stream Typography', DataStreamTypography, 'High velocity data transit.'),
         s('glitch-matrix', 'Glitch Matrix Title', GlitchMatrixTitle, 'Combines matrix and digital corruption.')
      ]
    },
    {
      name: '3D Text Effects',
      icon: 'Layers',
      effects: [
        { id: 'floating3d', name: 'Basic Floating 3D', class: Floating3D, description: 'Continuous ambient 3D floating animation.', props: baseTextProps },
        { id: 'rotate3d', name: 'Basic Rotate 3D', class: Rotate3D, description: 'Spins elements natively in 3D space.', props: baseTextProps },
        s('extruded-3d', '3D Extruded Text', ExtrudedText3D, 'True geometrical 3D extrusion.'),
        s('cinematic-depth', 'Cinematic Depth', CinematicDepthText, 'Focal depth of field text.'),
        s('metallic-title', 'Metallic Title', MetallicTitle, 'Shiny metal material emulation.'),
        s('gold-reflection', 'Gold Reflection', GoldReflectionText, 'Lustrous gold environment maps.'),
        s('glass-morph', 'Glass Morph Text', GlassMorphText, 'Refractive glass letterforms.'),
        s('chrome-liquid', 'Chrome Liquid Text', ChromeLiquidText, 'T1000 style melting chrome.'),
        s('crystal-text', 'Crystal Text', CrystalText, 'Geometric crystal faceting.'),
        s('float-3d-typo', 'Floating 3D Typo', Floating3DTypography, 'Advanced floating physics.'),
        s('infinite-depth', 'Infinite Depth Text', InfiniteDepthText, 'Text stretching into infinity.'),
        s('particle-explode', 'Particle Explosion Text', ParticleExplosionText, 'Text blowing apart into 3D particles.')
      ]
    },
    {
        name: 'AI Typography',
        icon: 'Cpu',
        effects: [
            { id: 'aimorph', name: 'Basic AI Morph', class: AIMorph, description: 'Generative fluid gradients masquerading as text.', props: baseTextProps },
            s('ai-morph-pro', 'AI Morphing Typography', AIMorphingTypography, 'High-fidelity procedural morphing.'),
            s('neural-network', 'Neural Network Text', NeuralNetworkText, 'Text formed by connecting nodes.'),
            s('ai-liquid', 'AI Liquid Flow Text', AILiquidFlowText, 'Viscous colored liquids forming words.'),
            s('ai-particle', 'AI Particle Typography', AIParticleTypography, 'Swarm intelligence forming text.'),
            s('ai-organic', 'AI Organic Text', AIGeneratedOrganicText, 'Growing, breathing organic forms.'),
            s('ai-pulse', 'AI Neural Pulse Text', AINeuralPulseText, 'Synaptic firing animations.'),
            s('ai-data', 'AI Data Stream Text', AIDataStreamText, 'High-volume AI data rendering.'),
            s('ai-energy', 'AI Energy Wave Text', AIEnergyWaveText, 'Plasma and energy field masking.')
        ]
    },
    {
        name: 'Modern Cards',
        icon: 'CreditCard',
        effects: [
            s('clean-card', 'Clean Modern Card', CleanModernCard, 'Smooth UI scale and shadow reveal.'),
            s('float-card', 'Floating Card', FloatingCardAnimation, 'Slight continuous ambient levitation.'),
            s('stack-card', 'Card Stack', CardStackAnimation, 'Cards piling up satisfyingly.'),
            s('layer-reveal', 'Layered Reveal', LayeredCardReveal, 'Multi-layer interior content reveal.'),
            s('expand-card', 'Expandable Card', ExpandableCardMotion, 'Fluid layout expansion morph.'),
            s('slide-card', 'Slide Card Interface', SlideCardInterface, 'Carousel style sliding cards.'),
            s('flip-card', 'Flip Card Interaction', FlipCardInteraction, '3D flip to back side.'),
            s('scroll-card', 'Scroll Card Animation', ScrollCardAnimation, 'Scroll linked timeline cards.'),
            s('glass-card', 'Glassmorphism Card', GlassmorphismCardAnimation, 'Frosted glass with dynamic lighting.'),
            s('neumorph-card', 'Neumorphism Card', NeumorphismCardAnimation, 'Soft extruded plastic shadows.'),
            s('dyn-hover', 'Dynamic Hover Card', DynamicHoverCard, 'Cursor tracking glare and tilt.'),
            s('mag-card', 'Magnetic Card', MagneticCardMotion, 'Snaps to cursor vicinity.'),
            s('elast-card', 'Elastic Bounce', ElasticCardBounce, 'Over-exaggerated squishy physics.'),
            s('dash-card', 'Dashboard Card', FloatingDashboardCard, 'Optimized for heavy data view levitation.'),
            s('tilt-3d', '3D Tilt Card', TiltCardAnimation3D, 'True 3D perspective rotational tilt.'),
            s('persp-rot', 'Perspective Rotation', PerspectiveCardRotation, 'Cinematic spinning presentation.'),
            s('para-card', 'Parallax Card', ParallaxCardMotion, 'Internal elements move at different speeds.'),
            s('3d-stack', '3D Stack', CardStackTransition3D, 'Depth-separated piling.'),
            s('depth-flip', 'Depth Flip', DepthCardFlip, 'Flipping with massive Z-axis push.'),
            s('rot-product', 'Rotating Product', RotatingProductCard, 'Showcase style 360 rotation.')
        ]
    },
    {
        name: 'Map Animations',
        icon: 'MapPin',
        effects: [
            s('map-motion', 'Basic Map Motion', BasicMapMotion, 'Simple zoom and pan.'),
            s('route-path', 'Route Path', RoutePathAnimation, 'Drawing a route line over time.'),
            s('pin-drop', 'Location Pin Drop', LocationPinDrop, 'Bouncing marker placement.'),
            s('line-travel', 'Line Travel', LineTravelAnimation, 'Dash-array motion lines.'),
            s('gps-track', 'GPS Tracking', GPSTrackingMotion, 'Pulsing dot tracking.'),
            s('nav-path', 'Navigation Path', NavigationPathAnimation, 'Turn-by-turn simulation.'),
            s('globe-3d', '3D Globe Map', GlobeMap3D, 'Spinning 3D mapped sphere.'),
            s('satellite', 'Satellite Map Zoom', SatelliteMapZoom, 'Deep zoom into imagery.'),
            s('map-para', 'Map Parallax', MapParallaxAnimation, 'Multi-layer topographical shift.'),
            s('city-net', 'City Network', CityNetworkAnimation, 'Linking urban centers.'),
            s('grid-map', 'Digital Grid Map', DigitalMapGridAnimation, 'Wireframe terrain.'),
            s('world-lines', 'World Connection Lines', WorldConnectionLines, 'Arcs leaping across the Earth.'),
            s('holo-map', 'Hologram Map', HologramMapInterface, 'Sci-Fi base map projection.'),
            s('ai-map', 'AI Data Map', AIDataMapVisualization, 'Big data heatmap flux.'),
            s('node-map', 'Network Node Map', NetworkNodeMap, 'Abstract topography.'),
            s('flow-map', 'Global Data Flow', GlobalDataFlowMap, 'Rivers of data traffic.'),
            s('digi-earth', 'Digital Earth', DigitalEarthAnimation, 'Cyberpunk planet render.')
        ]
    },
    {
        name: 'WebGL Particles & Energy',
        icon: 'Flame',
        effects: [
            s('liquid-mg', 'Liquid Motion Graphics', LiquidMotionGraphics, 'Viscous 2D deformations.'),
            s('morph-shape', 'Morph Shape', MorphShapeAnimation, 'Polygon count morphing.'),
            s('fluid-sim', 'Fluid Simulation', FluidSimulationAnimation, 'Navier-stokes physics.'),
            s('particle-sys', 'Particle System', ParticleSystemAnimation, 'Emit millions of points.'),
            s('fractal', 'Fractal Animation', FractalAnimation, 'Mathematical recursive loops.'),
            s('energy-wave', 'Energy Wave', EnergyWaveAnimation, 'Sine displaced emission.'),
            s('mag-field', 'Magnetic Field', MagneticFieldMotion, 'Vector field manipulation.'),
            s('text-disintegrate', 'Text Disintegration', ParticleTextDisintegration, 'Thanos snap effect.'),
            s('energy-burst', 'Energy Burst', EnergyBurstAnimation, 'Supernova blast ring.'),
            s('smoke-typo', 'Smoke Typography', SmokeTypography, 'Volumetric smoke trails.'),
            s('fire-typo', 'Fire Typography', FireTypography, 'Combusting lettering.'),
            s('dust-explode', 'Dust Explosion', DustExplosionAnimation, 'Powder impact.'),
            s('galaxy-motion', 'Galaxy Particles', GalaxyParticleMotion, 'Swirling starry arms.')
        ]
    },
    {
        name: 'Modern 3D Motion',
        icon: 'Cube',
        effects: [
            s('layer-para-3d', '3D Layer Parallax', LayerParallax3D, 'True Z-depth separated planes.'),
            s('loop-motion', 'Infinite Loop', InfiniteLoopMotion, 'Seamless looping geometry.'),
            s('depth-cam', 'Depth Camera', DepthCameraMotion, 'Focal shifting fly-through.'),
            s('float-obj', 'Floating Object', FloatingObjectAnimation, 'Rigid body ambient sway.'),
            s('motion-grid', '3D Motion Grid', MotionGrid3D, 'Tron-like flying grid.'),
            s('orbital', 'Orbital Motion', OrbitalMotionAnimation, 'Satellites circling a mass.')
        ]
    },
    {
      name: 'Page Transitions',
      icon: 'Layout',
      isPage: true,
      effects: [
        { id: 'camera-fly', name: 'Camera Fly Through', class: CameraFlyThrough, isPageMode: true, description: 'Cinematic 3D camera push.', props: [{ name: 'duration', type: 'number', min: 500, max: 3000, step: 100, default: 1200, description: 'Total transition duration.' }, { name: 'easing', type: 'string', default: 'cubic-bezier(0.76, 0, 0.24, 1)', description: 'Easing curve.'}] },
        { id: 'parallax-slide', name: 'Horizontal Parallax', class: HorizontalParallaxSlide, isPageMode: true, description: 'Layers slide at different speeds.', props: [{ name: 'duration', type: 'number', min: 500, max: 3000, step: 100, default: 1200, description: 'Total transition duration.' }] },
        { id: 'stagger-layer', name: 'Staggered Layers', class: StaggeredLayerSlide, isPageMode: true, description: 'Multi-slice staggered page wipe.', props: [{ name: 'duration', type: 'number', default: 1200, description: 'duration' }] },
        { id: 'card-stack-trans', name: 'UI Card Stack', class: CardStackTransition, isPageMode: true, description: 'Outgoing page falls behind as a card.', props: [{ name: 'duration', type: 'number', default: 1200, description: 'duration' }] },
        { id: 'mask-parallax', name: 'Mask Parallax', class: MaskParallaxReveal, isPageMode: true, description: 'Circular mask reveal overlay.', props: [{ name: 'duration', type: 'number', default: 1200, description: 'duration' }] },
        
        s('smooth-panel', 'Smooth Panel', SmoothPanelTransition, 'Clean planar swap.', true),
        s('sliding-frame', 'Sliding Frame', SlidingFrameTransition, 'Window-pane slider.', true),
        s('dyn-grid', 'Dynamic Grid', DynamicGridTransition, 'Multi-box reveal.', true),
        s('seamless', 'Seamless Flow', SeamlessFlowTransition, 'Morphing common elements.', true),
        s('panel-reveal', 'Panel Reveal', PanelRevealMotion, 'Geometric uncovering.', true),
        
        s('multi-para', 'Multi-Layer Parallax', MultiLayerParallaxTransition, 'Extreme depth separation.', true),
        s('depth-slide', 'Depth Slide', DepthSlideTransition, 'Z-axis push then slide.', true),
        s('float-layer', 'Floating Layer', FloatingLayerTransition, 'Incoming view floats down.', true),
        s('persp-cam', 'Perspective Camera', PerspectiveCameraTransition, 'Fisheye distorted pan.', true),
        s('inf-canvas', 'Infinite Canvas', InfiniteCanvasTransition, 'Figma style zoom-pan.', true),

        s('cam-fly-3d', '3D Camera Fly', CameraFlyThrough3D, 'Passing through geometry.', true),
        s('cube-scene', 'Cube Scene', CubeSceneTransition, 'Rotating a massive 3D box.', true),
        s('tunnel-warp', 'Tunnel Warp', TunnelWarpTransition, 'Hyper-drive starry warp.', true),
        s('portal', 'Portal', PortalTransition, 'Dr Strange style gateway opening.', true),
        s('env-3d', '3D Environment', EnvironmentTransition3D, 'Full world replacement.', true),

        s('speed-ramp', 'Speed Ramp', SpeedRampTransition, 'Slow pan accelerating into wipe.', true),
        s('whip-pan', 'Whip Pan', WhipPanTransition, 'Motion-blurred violent swipe.', true),
        s('beat-sync', 'Beat Sync', BeatSyncTransition, 'Stuttering swap for music.', true),
        s('zoom-warp', 'Zoom Warp', ZoomWarpTransition, 'Aggressive scaling push.', true),
        s('swipe-motion', 'Swipe Motion', SwipeMotionTransition, 'Tinder-style card throw.', true)
      ]
    }
  ];
