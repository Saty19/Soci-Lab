import { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { EFFECT_CATEGORIES, EffectDef } from './config/effects';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Play, Code, Monitor, RefreshCw, Layers, Terminal, Settings2 } from 'lucide-react';

export default function App() {
  const [activeEffect, setActiveEffect] = useState<EffectDef>(EFFECT_CATEGORIES[0].effects[0]);
  const [propsConfig, setPropsConfig] = useState<Record<string, any>>({});
  const [enabledProps, setEnabledProps] = useState<Record<string, boolean>>({});
  const [triggerKey, setTriggerKey] = useState(0);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  
  // Customization extensions just for the playground visual
  const [textColor, setTextColor] = useState('#ffffff');
  const [bgColor, setBgColor] = useState('#0A0A0A');

  // Initialize props when effect changes
  useEffect(() => {
    const initialProps: Record<string, any> = {};
    const initialEnabled: Record<string, boolean> = {};
    activeEffect.props.forEach(p => {
      initialProps[p.name] = p.default;
      initialEnabled[p.name] = false; 
    });
    setPropsConfig(initialProps);
    setEnabledProps(initialEnabled);
    setTriggerKey(k => k + 1);
  }, [activeEffect]);

  // AUTO-REPLAY Logic: Replay when props or color changes (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
        setTriggerKey(k => k + 1);
    }, 300); // 300ms debounce for sliders
    return () => clearTimeout(timer);
  }, [propsConfig, enabledProps, textColor]);

  const updateProp = (name: string, value: any) => {
    setPropsConfig(prev => ({ ...prev, [name]: value }));
    setEnabledProps(prev => ({ ...prev, [name]: true })); 
  };

  const toggleProp = (name: string) => {
      setEnabledProps(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const activePropsObj = Object.keys(propsConfig)
       .filter(k => enabledProps[k])
       .reduce((acc: any, key) => { acc[key] = propsConfig[key]; return acc; }, {});

  const activePropsKeys = Object.keys(activePropsObj);
  const optionsString = activePropsKeys.length > 0 
      ? `, {\n${activePropsKeys.map(k => {
          const v = activePropsObj[k];
          return `  ${k}: ${typeof v === 'string' ? `'${v}'` : v}`;
      }).join(',\n')}\n}`
      : '';

  const setupCode = `// 1. Install via npm
npm install socilab-animations

// 2. Import the desired effect
import { ${activeEffect.class.name} } from 'socilab-animations';

// 3. Target your DOM element
const target = document.querySelector('.my-element');

// 4. Initialize animation
new ${activeEffect.class.name}(target${optionsString});`;

  return (
    <div className="flex w-full h-screen bg-[#050505] text-[#e0e0e0] font-sans overflow-hidden selection:bg-indigo-500/30">
      <Sidebar 
          categories={EFFECT_CATEGORIES} 
          activeEffect={activeEffect} 
          onSelectEffect={setActiveEffect} 
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="w-full h-full flex flex-col">
            
            {/* Header & Tabs Area */}
            <div className="px-8 pt-10 pb-4 border-b border-white/5 flex-shrink-0 flex justify-between items-end bg-[#050505] z-10">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest leading-none flex items-center justify-center">
                            Library V1.0
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-white">{activeEffect.name}</h2>
                    </div>
                    <p className="text-[#888] text-sm max-w-xl line-clamp-1">{activeEffect.description}</p>
                </div>
                
                <div className="flex bg-[#111] p-1 rounded-xl border border-white/5">
                    <button 
                        onClick={() => setActiveTab('preview')}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'preview' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-[#888] hover:text-white hover:bg-white/5'}`}
                    >
                        <Monitor size={16} /> Preview
                    </button>
                    <button 
                        onClick={() => setActiveTab('code')}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'code' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-[#888] hover:text-white hover:bg-white/5'}`}
                    >
                        <Code size={16} /> Code
                    </button>
                </div>
            </div>

            {/* Content Area - Scrollable */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
               
               {activeTab === 'preview' && (
                    <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8 h-full min-h-[600px]">
                        
                        {/* Left: Mega Live Canvas */}
                        <div className="flex flex-col gap-4 h-full">
                            <div className="flex items-center justify-between">
                                <div className="text-[10px] font-bold text-[#444] uppercase tracking-[0.2em]">Mega Live Canvas</div>
                                <button onClick={() => setTriggerKey(k => k + 1)} className="px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-lg text-[10px] font-bold tracking-wider text-indigo-400 flex items-center gap-2 transition-all border border-indigo-500/20 shadow-lg uppercase active:scale-95">
                                    <RefreshCw size={12} className="text-indigo-400" /> Replay
                                </button>
                            </div>
                            
                            <div 
                                className="flex-1 w-full rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)] group"
                                style={{ backgroundColor: bgColor }}
                            >
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] opacity-50 pointer-events-none"></div>
                                {/* Stable Viewport Box */}
                                <div className="w-[85%] h-[70%] max-w-[1000px] flex items-center justify-center overflow-visible relative">
                                    {activeEffect.isPageMode ? (
                                        <PageTransitionCanvas effect={activeEffect} props={activePropsObj} triggerKey={triggerKey} />
                                    ) : (
                                        <UniversalAnimationCanvas effect={activeEffect} props={activePropsObj} triggerKey={triggerKey} textColor={textColor} />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right: Customization Sidebar */}
                        <div className="flex flex-col gap-6 h-full">
                            <div className="flex items-center gap-2 text-white font-semibold pb-4 border-b border-white/5">
                                <Settings2 size={18} className="text-indigo-400"/> Customization
                            </div>
                            
                            <div className="flex flex-col gap-8 overflow-y-auto custom-scrollbar pr-2 pb-10">
                                {/* Appearance Controls */}
                                {!activeEffect.isPageMode && (
                                    <div className="flex flex-col gap-4">
                                        <h4 className="text-[10px] font-bold text-[#444] uppercase tracking-[0.25em]">Visuals</h4>
                                        <div className="flex flex-col gap-3">
                                            <div className="flex justify-between items-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                                 <span className="text-[12px] font-medium text-[#c0c0c0]">Text Color</span>
                                                 <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none p-0 outline-none ring-0" title="Change the text color" />
                                             </div>
                                             <div className="flex justify-between items-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                                 <span className="text-[12px] font-medium text-[#c0c0c0]">Canvas BG</span>
                                                 <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none p-0 outline-none ring-0" title="Change the background color" />
                                             </div>
                                        </div>
                                    </div>
                                )}

                                {/* Animation Controls */}
                                <div className="flex flex-col gap-4">
                                    <h4 className="text-[10px] font-bold text-[#444] uppercase tracking-[0.25em]">Properties</h4>
                                    
                                    {activeEffect.props.length === 0 ? (
                                        <div className="text-xs text-[#555] p-6 bg-white/[0.02] border border-dashed border-white/5 rounded-2xl text-center">No configurable properties.</div>
                                    ) : (
                                        <div className="flex flex-col gap-3">
                                            {activeEffect.props.map(prop => {
                                                const isEnabled = enabledProps[prop.name];
                                                return (
                                                <div key={prop.name} className={`flex flex-col gap-3 p-4 rounded-xl border transition-all ${isEnabled ? 'bg-indigo-500/5 border-indigo-500/20' : 'bg-transparent border-white/5 opacity-60 hover:opacity-100'}`}>
                                                    <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleProp(prop.name)}>
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${isEnabled ? 'bg-indigo-500 border-indigo-500 shadow-lg shadow-indigo-500/30' : 'border-white/20'}`}>
                                                                {isEnabled && <span className="text-white text-[10px] font-bold underline underline-offset-2">✓</span>}
                                                            </div>
                                                            <span className={`text-[13px] font-semibold tracking-tight transition-colors ${isEnabled ? 'text-white' : 'text-[#888]'}`}>{prop.name}</span>
                                                        </div>
                                                        {isEnabled && <span className="text-[10px] font-mono text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">{propsConfig[prop.name]?.toString()}</span>}
                                                    </div>
                                                    
                                                    {isEnabled && prop.type === 'number' && (
                                                        <input 
                                                            type="range" min={prop.min} max={prop.max} step={prop.step}
                                                            value={propsConfig[prop.name] || 0}
                                                            onChange={(e) => updateProp(prop.name, parseFloat(e.target.value))}
                                                            className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
                                                        />
                                                    )}
                                                    
                                                    {isEnabled && prop.type === 'enum' && prop.options && (
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {prop.options.map(opt => (
                                                                <button key={opt} onClick={() => updateProp(prop.name, opt)}
                                                                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${propsConfig[prop.name] === opt ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20' : 'bg-[#151515] text-[#777] border border-white/5 hover:text-white'}`}
                                                                >{opt}</button>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {isEnabled && prop.type === 'boolean' && (
                                                        <button onClick={() => updateProp(prop.name, !propsConfig[prop.name])} className={`w-11 h-6 rounded-full transition-all relative ${propsConfig[prop.name] ? 'bg-indigo-500 shadow-lg shadow-indigo-500/20' : 'bg-[#222]'}`}>
                                                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${propsConfig[prop.name] ? 'left-6' : 'left-1'}`} />
                                                        </button>
                                                    )}
                                                </div>
                                            )})}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
               )}

               {activeTab === 'code' && (
                    <div className="w-full max-w-[900px] mx-auto flex flex-col gap-8 pb-12">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2"><Terminal size={20} className="text-indigo-400"/> Setup & Installation</h3>
                            <p className="text-[#888] text-sm">Follow these steps to integrate this specific configuration into your project. The code below accurately reflects your currently active property overrides.</p>
                        </div>
                        
                        <div className="w-full bg-[#0A0A0A] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                            <div className="bg-[#111] px-4 py-3 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-indigo-500/40"></div>
                                    <div className="w-3 h-3 rounded-full bg-white/10"></div>
                                    <div className="w-3 h-3 rounded-full bg-white/10"></div>
                                </div>
                                <span className="text-[10px] font-bold text-[#666] tracking-[0.2em] uppercase">JavaScript / TypeScript</span>
                                <button 
                                   onClick={() => {
                                       navigator.clipboard.writeText(setupCode);
                                       const target = event?.target as HTMLElement;
                                       target.innerText = 'Copied!';
                                       setTimeout(() => target.innerText = 'Copy Code', 2000);
                                   }}
                                   className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase px-3 py-1 bg-indigo-500/10 rounded-md border border-indigo-500/20"
                                >
                                    Copy Code
                                </button>
                            </div>
                            <div className="p-6 text-[14px] overflow-x-auto leading-relaxed">
                                <SyntaxHighlighter language="typescript" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
                                    {setupCode}
                                </SyntaxHighlighter>
                            </div>
                        </div>
                    </div>
               )}

            </div>
        </div>
      </main>
    </div>
  );
}

// Sub-components for Rendering the exact animation 
function UniversalAnimationCanvas({ effect, props, triggerKey, textColor }: any) {
    const containerRef = useRef<HTMLDivElement>(null);
    const propsRef = useRef(props);
    const colorRef = useRef(textColor);

    useEffect(() => {
        propsRef.current = props;
        colorRef.current = textColor;
    });

    const getEffectType = () => {
        const id = effect.id;
        if (id.includes('card')) return 'card';
        if (id.includes('map') || id.includes('pin') || id.includes('gps') || id.includes('globe') || id.includes('city') || id.includes('route')) return 'map';
        if (id.includes('particle') || id.includes('energy') || id.includes('smoke') || id.includes('fire') || id.includes('dust') || id.includes('fractal')) return 'particle';
        return 'text';
    };

    useEffect(() => {
        if (!containerRef.current || !effect.class) return;
        
        containerRef.current.innerHTML = '';
        const type = getEffectType();
        let targetElement: HTMLElement;

        if (type === 'card') {
            // GENERATE CARD MOCK
            const cardGrid = document.createElement('div');
            cardGrid.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl p-6";
            
            const cards = [1, 2, 3].map(i => {
                const card = document.createElement('div');
                card.className = "preview-card p-6 rounded-2xl border border-white/10 flex flex-col gap-4 backdrop-blur-xl bg-white/5";
                card.innerHTML = `
                    <div class="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">#${i}</div>
                    <div class="flex flex-col gap-1">
                        <div class="h-4 w-2/3 bg-white/20 rounded"></div>
                        <div class="h-3 w-full bg-white/10 rounded"></div>
                    </div>
                `;
                cardGrid.appendChild(card);
                return card;
            });
            containerRef.current.appendChild(cardGrid);
            targetElement = cardGrid; // For stack animations, or specific card for single ones
            if (effect.id !== 'card-stack') targetElement = cards[0]; // Most card effects target single element
        } else if (type === 'map') {
            // GENERATE MAP MOCK (Minimalist SVG connection map)
            const mapContainer = document.createElement('div');
            mapContainer.className = "w-full max-w-3xl aspect-video relative rounded-3xl overflow-hidden border border-white/10 bg-[#080808]";
            mapContainer.innerHTML = `
                <svg viewBox="0 0 800 400" class="w-full h-full opacity-20">
                    <path d="M100 200 Q 200 100 400 200 T 700 200" fill="none" stroke="white" stroke-width="1" />
                    <circle cx="100" cy="200" r="4" fill="white" />
                    <circle cx="400" cy="200" r="4" fill="white" />
                    <circle cx="700" cy="200" r="4" fill="white" />
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="text-[10px] uppercase tracking-[0.4em] font-bold text-white/20">Geographical Viewport</div>
                </div>
            `;
            containerRef.current.appendChild(mapContainer);
            targetElement = mapContainer;
        } else if (type === 'particle') {
            // GENERATE PARTICLE CANVAS CONTAINER
            const particleContainer = document.createElement('div');
            particleContainer.className = "w-full h-full flex items-center justify-center relative";
            particleContainer.innerHTML = `
               <div class="particle-target text-[10vw] font-black text-white glow">ATOM</div>
            `;
            containerRef.current.appendChild(particleContainer);
            targetElement = particleContainer.querySelector('.particle-target') as HTMLElement;
        } else {
            // DEFAULT TEXT MOCK
            const wrapper = document.createElement('div');
            wrapper.className = "text-[5vw] md:text-[8vw] font-black tracking-tighter whitespace-nowrap drop-shadow-2xl leading-none transition-colors duration-300";
            wrapper.style.color = colorRef.current;
            wrapper.innerText = 'SOCI-LAB';
            containerRef.current.appendChild(wrapper);
            targetElement = wrapper;
        }

        const t = setTimeout(() => {
            try { 
                new effect.class(targetElement, propsRef.current); 
            } catch(e) { 
                console.error('Animation Engine Error:', e);
            }
        }, 50);
        
        return () => clearTimeout(t);
    }, [effect.id, triggerKey]); 

    return <div ref={containerRef} className="flex items-center justify-center p-8 w-full h-full relative" />;
}

function PageTransitionCanvas({ effect, props, triggerKey }: any) {
    const outRef = useRef<HTMLDivElement>(null);
    const inRef = useRef<HTMLDivElement>(null);
    const propsRef = useRef(props);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        propsRef.current = props;
    });

    useEffect(() => { setIsRunning(false); }, [effect.id, triggerKey]);

    const runTransition = async () => {
        if (isRunning || !outRef.current || !inRef.current) return;
        setIsRunning(true);
        
        inRef.current.style.display = 'flex';
        inRef.current.style.opacity = '1';
        inRef.current.style.transform = 'none';

        try {
            await new effect.class(outRef.current, inRef.current, propsRef.current);
        } catch(e) {
            console.error('Transition Error:', e);
        }
        
        // AUTO RESET after transition
        setTimeout(() => {
            if (inRef.current) inRef.current.style.display = 'none';
            if (outRef.current) {
                outRef.current.style.opacity = '1';
                outRef.current.style.transform = 'none';
                outRef.current.style.filter = 'none';
                outRef.current.style.zIndex = '10';
            }
            setIsRunning(false);
        }, optionsToTotalDuration(propsRef.current) + 500);
    };

    function optionsToTotalDuration(opts: any) {
        return (opts.duration || 1200) + (opts.delay || 0);
    }

    return (
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center overflow-hidden rounded-3xl">
             {/* Outgoing View */}
             <div ref={outRef} className="absolute inset-4 rounded-2xl bg-[#080808] flex items-center justify-center z-10 border border-white/5 shadow-inner">
                 <div className="text-center">
                     <Layers size={48} className="mx-auto mb-4 text-[#222]" />
                     <h3 className="text-2xl font-bold text-white mb-2 tracking-tight opacity-20">SOCILAB</h3>
                     <p className="text-[#333] text-[10px] font-bold uppercase tracking-[0.3em]">Canvas Layer A</p>
                 </div>
             </div>

             {/* Incoming View */}
             <div ref={inRef} className="absolute inset-4 rounded-2xl bg-indigo-500/10 hidden items-center justify-center z-10 backdrop-blur-md border border-indigo-500/20 shadow-2xl">
                 <div className="text-center">
                     <h3 className="text-4xl font-black text-white mb-2 tracking-tighter drop-shadow-xl">NEXT WAVE</h3>
                     <p className="text-indigo-400 font-bold text-[10px] uppercase tracking-[0.3em]">Canvas Layer B</p>
                 </div>
             </div>

             <div className="absolute z-20 flex gap-4 bottom-10 left-1/2 -translate-x-1/2">
                 <button onClick={runTransition} disabled={isRunning} className="px-10 py-5 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-30 disabled:hover:scale-100 text-white rounded-2xl text-[11px] font-black shadow-[0_20px_40px_-10px_rgba(99,102,241,0.5)] transition-all uppercase tracking-[0.2em] hover:scale-110 active:scale-95 flex items-center gap-3 group">
                     <Play size={14} className="fill-current group-hover:translate-x-0.5 transition-transform" /> Trigger Sequence
                 </button>
             </div>
        </div>
    );
}
