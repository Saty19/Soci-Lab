import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { EFFECT_CATEGORIES, EffectDef } from './config/effects';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Play, Code, Monitor, RefreshCw, Layers } from 'lucide-react';

export default function App() {
  const [activeEffect, setActiveEffect] = useState<EffectDef>(EFFECT_CATEGORIES[0].effects[0]);
  const [propsConfig, setPropsConfig] = useState<Record<string, any>>({});
  const [triggerKey, setTriggerKey] = useState(0);

  // Initialize props when effect changes
  useEffect(() => {
    const initialProps: Record<string, any> = {};
    activeEffect.props.forEach(p => {
      initialProps[p.name] = p.default;
    });
    setPropsConfig(initialProps);
    setTriggerKey(k => k + 1);
  }, [activeEffect]);

  const updateProp = (name: string, value: any) => {
    setPropsConfig(prev => ({ ...prev, [name]: value }));
    setTriggerKey(k => k + 1); 
  };

  const codeString = `import { ${activeEffect.class.name} } from 'socilab-animations';\n\nconst target = document.querySelector('.my-element');\n\nnew ${activeEffect.class.name}(target, {\n${Object.entries(propsConfig).map(([k, v]) => `  ${k}: ${typeof v === 'string' ? `'${v}'` : v}`).join(',\n')}\n});`;

  return (
    <div className="flex w-full h-screen bg-[#050505] text-[#e0e0e0] font-sans overflow-hidden selection:bg-indigo-500/30">
      <Sidebar 
          categories={EFFECT_CATEGORIES} 
          activeEffect={activeEffect} 
          onSelectEffect={setActiveEffect} 
      />

      <main className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar relative">
        <div className="max-w-[1000px] w-full mx-auto px-8 py-12 lg:py-20 flex flex-col gap-12">
            
            {/* Header Area */}
            <div className="flex flex-col gap-4">
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-white">{activeEffect.name}</h2>
                <p className="text-[#a0a0a0] max-w-2xl text-lg leading-relaxed">{activeEffect.description || "A clean, high-performance animation effect powered by WAAPI."}</p>
                <div className="h-[1px] w-full bg-white/5 mt-4"></div>
            </div>

            {/* Live Canvas & Customization Split */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-start">
               
               {/* Left: Live Canvas */}
               <div className="flex flex-col gap-4">
                   <div className="flex items-center justify-between">
                       <h3 className="text-sm font-semibold tracking-wide text-white flex items-center gap-2"><Monitor size={16} className="text-indigo-400"/> Live Preview</h3>
                       <button onClick={() => setTriggerKey(k => k + 1)} className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
                           <RefreshCw size={12} /> Replay
                       </button>
                   </div>
                   
                   <div className="relative w-full h-[350px] bg-[#0A0A0A] rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden group shadow-2xl">
                       <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-50"></div>
                       {activeEffect.isPageMode ? (
                           <PageTransitionCanvas effect={activeEffect} props={propsConfig} triggerKey={triggerKey} />
                       ) : (
                           <TextAnimationCanvas effect={activeEffect} props={propsConfig} triggerKey={triggerKey} />
                       )}
                   </div>
               </div>

               {/* Right: Customization Controls */}
               <div className="flex flex-col gap-4">
                   <h3 className="text-sm font-semibold tracking-wide text-white">Customize</h3>
                   <div className="w-full bg-[#0A0A0A] rounded-2xl border border-white/10 p-6 flex flex-col gap-6 shadow-xl">
                       {activeEffect.props.length === 0 ? (
                           <div className="text-sm text-[#888]">No configurable properties for this effect.</div>
                       ) : (
                           activeEffect.props.map(prop => (
                               <div key={prop.name} className="flex flex-col gap-3">
                                   <div className="flex justify-between items-center">
                                       <span className="text-[13px] font-medium text-[#c0c0c0] capitalize">{prop.name}</span>
                                       <span className="text-[11px] font-mono text-[#888]">{propsConfig[prop.name]?.toString()}</span>
                                   </div>
                                   
                                   {prop.type === 'number' && (
                                       <input 
                                           type="range" min={prop.min} max={prop.max} step={prop.step}
                                           value={propsConfig[prop.name] || 0}
                                           onChange={(e) => updateProp(prop.name, parseFloat(e.target.value))}
                                           className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 focus:outline-none transition-all"
                                       />
                                   )}
                                   
                                   {prop.type === 'enum' && prop.options && (
                                       <div className="flex flex-wrap gap-2">
                                           {prop.options.map(opt => (
                                               <button key={opt} onClick={() => updateProp(prop.name, opt)}
                                                   className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${propsConfig[prop.name] === opt ? 'bg-indigo-500 text-white' : 'bg-white/5 text-[#a0a0a0] hover:bg-white/10 hover:text-white'}`}
                                               >{opt}</button>
                                           ))}
                                       </div>
                                   )}

                                   {prop.type === 'boolean' && (
                                       <button onClick={() => updateProp(prop.name, !propsConfig[prop.name])} className={`w-11 h-6 rounded-full transition-colors relative ${propsConfig[prop.name] ? 'bg-indigo-500' : 'bg-white/10'}`}>
                                           <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${propsConfig[prop.name] ? 'left-6' : 'left-1'}`} />
                                       </button>
                                   )}
                               </div>
                           ))
                       )}
                   </div>
               </div>
            </div>

            {/* Code Implementation Block */}
            <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold tracking-wide text-white flex items-center gap-2"><Code size={16} className="text-indigo-400"/> Usage Code</h3>
                <div className="w-full bg-[#0A0A0A] rounded-2xl border border-white/10 shadow-xl overflow-hidden">
                    <div className="bg-[#111] px-4 py-3 border-b border-white/5 flex items-center">
                        <span className="text-xs font-medium text-[#888]">Vanilla JS / Native TS</span>
                    </div>
                    <div className="p-4 text-[13px] overflow-x-auto">
                        <SyntaxHighlighter language="typescript" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
                            {codeString}
                        </SyntaxHighlighter>
                    </div>
                </div>
            </div>

        </div>
      </main>
    </div>
  );
}

// Sub-components for Rendering the exact animation 
function TextAnimationCanvas({ effect, props, triggerKey }: any) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !effect.class) return;
        
        containerRef.current.innerHTML = '<div class="text-5xl md:text-7xl font-bold tracking-tighter text-white whitespace-nowrap overflow-hidden">SOCI-LAB</div>';
        const target = containerRef.current.firstChild as HTMLElement;

        const t = setTimeout(() => {
            try { new effect.class(target, props); } catch(e) { /* ignore */ }
        }, 50);
        return () => clearTimeout(t);
    }, [effect, props, triggerKey]);

    return <div ref={containerRef} className="flex items-center justify-center p-8 pointer-events-auto" />;
}

function PageTransitionCanvas({ effect, props, triggerKey }: any) {
    const outRef = useRef<HTMLDivElement>(null);
    const inRef = useRef<HTMLDivElement>(null);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => { setIsRunning(false); }, [effect, triggerKey]);

    const runTransition = async () => {
        if (isRunning || !outRef.current || !inRef.current) return;
        setIsRunning(true);
        
        inRef.current.style.display = 'flex';
        await new effect.class(outRef.current, inRef.current, props);
        
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
             <div ref={outRef} className="absolute inset-4 rounded-xl bg-[#111] flex items-center justify-center z-10 border border-white/5">
                 <div className="text-center">
                     <Layers size={40} className="mx-auto mb-3 text-[#555]" />
                     <h3 className="text-2xl font-semibold text-white mb-1">Current View</h3>
                     <p className="text-[#888] text-sm">Outgoing Content</p>
                 </div>
             </div>

             {/* Incoming View */}
             <div ref={inRef} className="absolute inset-4 rounded-xl bg-indigo-950/30 hidden items-center justify-center z-10 backdrop-blur-md border border-indigo-500/20">
                 <div className="text-center">
                     <h3 className="text-3xl font-bold text-indigo-100 mb-1">Next View</h3>
                     <p className="text-indigo-400/80 text-sm">Incoming Content</p>
                 </div>
             </div>

             <div className="absolute z-20 flex gap-4 bottom-8">
                 <button onClick={runTransition} disabled={isRunning} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-full text-sm font-semibold shadow-xl transition-all">
                     Trigger Transition
                 </button>
             </div>
        </div>
    );
}
