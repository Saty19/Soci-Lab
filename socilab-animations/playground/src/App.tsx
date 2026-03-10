import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { EFFECT_CATEGORIES, EffectDef } from './config/effects';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Play, Code, Monitor, RefreshCw, Layers, Terminal, Settings2, CheckSquare, Square } from 'lucide-react';

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
      initialEnabled[p.name] = false; // By default, no overrides are applied, uses library defaults perfectly.
    });
    setPropsConfig(initialProps);
    setEnabledProps(initialEnabled);
    setTriggerKey(k => k + 1);
  }, [activeEffect]);

  const updateProp = (name: string, value: any) => {
    setPropsConfig(prev => ({ ...prev, [name]: value }));
    setEnabledProps(prev => ({ ...prev, [name]: true })); // Auto-enable when they tweak it
  };

  const toggleProp = (name: string) => {
      setEnabledProps(prev => ({ ...prev, [name]: !prev[name] }));
      setTriggerKey(k => k + 1);
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
                    <h2 className="text-3xl font-bold tracking-tight text-white">{activeEffect.name}</h2>
                    <p className="text-[#888] text-sm">{activeEffect.description}</p>
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
                           <div className="flex items-center justify-end">
                               <button onClick={() => setTriggerKey(k => k + 1)} className="px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-lg text-xs font-bold tracking-wider text-indigo-400 flex items-center gap-2 transition-colors border border-indigo-500/20 shadow-lg uppercase">
                                   <RefreshCw size={14} className="text-indigo-400" /> Replay Animation
                               </button>
                           </div>
                           
                           <div 
                               className="flex-1 w-full rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden relative shadow-2xl"
                               style={{ backgroundColor: bgColor }}
                           >
                               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] opacity-50 pointer-events-none"></div>
                               {activeEffect.isPageMode ? (
                                   <PageTransitionCanvas effect={activeEffect} props={activePropsObj} triggerKey={triggerKey} />
                               ) : (
                                   <TextAnimationCanvas effect={activeEffect} props={activePropsObj} triggerKey={triggerKey} textColor={textColor} />
                               )}
                           </div>
                       </div>

                       {/* Right: Customization Sidebar */}
                       <div className="flex flex-col gap-6 h-full">
                           <div className="flex items-center gap-2 text-white font-semibold pb-4 border-b border-white/5">
                               <Settings2 size={18} className="text-indigo-400"/> Settings
                           </div>
                           
                           <div className="flex flex-col gap-8 overflow-y-auto custom-scrollbar pr-2 pb-10">
                               {/* Appearance Controls */}
                               {!activeEffect.isPageMode && (
                                   <div className="flex flex-col gap-4">
                                       <h4 className="text-xs font-bold text-[#666] uppercase tracking-wider">Appearance</h4>
                                       <div className="flex flex-col gap-3">
                                           <div className="flex justify-between items-center">
                                                <span className="text-[13px] font-medium text-[#c0c0c0]">Text Color</span>
                                                <input type="color" value={textColor} onChange={(e) => { setTextColor(e.target.value); setTriggerKey(k => k + 1); }} className="w-8 h-8 rounded cursor-pointer bg-transparent border-none p-0" />
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-[13px] font-medium text-[#c0c0c0]">Background</span>
                                                <input type="color" value={bgColor} onChange={(e) => { setBgColor(e.target.value); setTriggerKey(k => k + 1); }} className="w-8 h-8 rounded cursor-pointer bg-transparent border-none p-0" />
                                            </div>
                                       </div>
                                   </div>
                               )}

                               {/* Animation Controls */}
                               <div className="flex flex-col gap-4">
                                   <h4 className="text-xs font-bold text-[#666] uppercase tracking-wider">Animation Props</h4>
                                   
                                   {activeEffect.props.length === 0 ? (
                                       <div className="text-sm text-[#888]">No configurable properties.</div>
                                   ) : (
                                       activeEffect.props.map(prop => {
                                           const isEnabled = enabledProps[prop.name];
                                           return (
                                           <div key={prop.name} className={`flex flex-col gap-2.5 p-3 rounded-lg border transition-all ${isEnabled ? 'bg-white/5 border-white/10' : 'bg-transparent border-transparent opacity-60 hover:opacity-100'}`}>
                                               <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleProp(prop.name)}>
                                                   <div className="flex items-center gap-2">
                                                       {isEnabled ? <CheckSquare size={14} className="text-indigo-400" /> : <Square size={14} className="text-[#666]" />}
                                                       <span className="text-[13px] font-medium text-[#c0c0c0] capitalize">{prop.name}</span>
                                                   </div>
                                                   {isEnabled && <span className="text-[11px] font-mono text-indigo-300 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">{propsConfig[prop.name]?.toString()}</span>}
                                               </div>
                                               
                                               {isEnabled && prop.type === 'number' && (
                                                   <input 
                                                       type="range" min={prop.min} max={prop.max} step={prop.step}
                                                       value={propsConfig[prop.name] || 0}
                                                       onChange={(e) => updateProp(prop.name, parseFloat(e.target.value))}
                                                       className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all mt-2"
                                                   />
                                               )}
                                               
                                               {isEnabled && prop.type === 'enum' && prop.options && (
                                                   <div className="flex flex-wrap gap-2 mt-2">
                                                       {prop.options.map(opt => (
                                                           <button key={opt} onClick={() => updateProp(prop.name, opt)}
                                                               className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${propsConfig[prop.name] === opt ? 'bg-indigo-500 text-white' : 'bg-[#111] text-[#888] border border-white/5 hover:text-white'}`}
                                                           >{opt}</button>
                                                       ))}
                                                   </div>
                                               )}

                                               {isEnabled && prop.type === 'boolean' && (
                                                   <button onClick={() => updateProp(prop.name, !propsConfig[prop.name])} className={`w-10 h-5 rounded-full transition-colors relative mt-2 ${propsConfig[prop.name] ? 'bg-indigo-500' : 'bg-[#222]'}`}>
                                                       <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${propsConfig[prop.name] ? 'left-6' : 'left-1'}`} />
                                                   </button>
                                               )}
                                           </div>
                                       )})
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
                                   <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                                   <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                                   <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                               </div>
                               <span className="text-[11px] font-mono text-[#888] tracking-widest uppercase">JavaScript / TypeScript</span>
                               <button 
                                  onClick={() => navigator.clipboard.writeText(setupCode)}
                                  className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase"
                               >
                                   Copy Code
                               </button>
                           </div>
                           <div className="p-6 text-[14px] overflow-x-auto leading-loose">
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
function TextAnimationCanvas({ effect, props, triggerKey, textColor }: any) {
    const containerRef = useRef<HTMLDivElement>(null);
    const propsRef = useRef(props);
    const colorRef = useRef(textColor);

    // Keep refs fully updated without triggering effects
    useEffect(() => {
        propsRef.current = props;
        colorRef.current = textColor;
    });

    useEffect(() => {
        if (!containerRef.current || !effect.class) return;
        
        containerRef.current.innerHTML = `<div class="text-[5vw] md:text-[8vw] font-black tracking-tighter whitespace-nowrap overflow-hidden drop-shadow-2xl" style="color: ${colorRef.current}; line-height: 1;">SOCI-LAB</div>`;
        const target = containerRef.current.firstChild as HTMLElement;

        // Animate on load/trigger key strictly
        const t = setTimeout(() => {
            try { new effect.class(target, propsRef.current); } catch(e) { /* ignore */ }
        }, 50);
        
        return () => clearTimeout(t);
    }, [effect.id, triggerKey]); // ONLY re-run when effect changes or explicitly replayed!

    return <div ref={containerRef} className="flex items-center justify-center p-8 pointer-events-auto w-full h-full" />;
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
        await new effect.class(outRef.current, inRef.current, propsRef.current);
        
        setTimeout(() => {
             inRef.current!.style.display = 'none';
             outRef.current!.style.opacity = '1';
             outRef.current!.style.transform = 'none';
             outRef.current!.style.filter = 'none';
             setIsRunning(false);
        }, 1500);
    };

    return (
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center overflow-hidden">
             {/* Outgoing View */}
             <div ref={outRef} className="absolute inset-4 sm:inset-12 lg:inset-20 rounded-2xl bg-[#111] flex items-center justify-center z-10 border border-white/10 shadow-2xl">
                 <div className="text-center">
                     <Layers size={64} className="mx-auto mb-4 text-[#444]" />
                     <h3 className="text-4xl font-bold text-white mb-2 tracking-tight">Current View</h3>
                     <p className="text-[#888] text-lg">Outgoing DOM Layer</p>
                 </div>
             </div>

             {/* Incoming View */}
             <div ref={inRef} className="absolute inset-4 sm:inset-12 lg:inset-20 rounded-2xl bg-indigo-950/40 hidden items-center justify-center z-10 backdrop-blur-xl border border-indigo-500/30 shadow-2xl">
                 <div className="text-center">
                     <h3 className="text-5xl font-black text-white mb-2 tracking-tighter drop-shadow-lg">Next View</h3>
                     <p className="text-indigo-300 font-medium text-lg">Incoming DOM Layer</p>
                 </div>
             </div>

             <div className="absolute z-20 flex gap-4 bottom-12">
                 <button onClick={runTransition} disabled={isRunning} className="px-8 py-4 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white rounded-xl text-md font-bold shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all uppercase tracking-widest hover:scale-105 active:scale-95">
                     Trigger Transition
                 </button>
             </div>
        </div>
    );
}
