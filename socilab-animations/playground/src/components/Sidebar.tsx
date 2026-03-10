import React, { useState } from 'react';
import { Settings, ChevronDown, ChevronRight } from 'lucide-react';

interface SidebarProps {
    categories: any[];
    activeEffect: any;
    onSelectEffect: (effect: any) => void;
}

// Icon Mapping
import * as Icons from 'lucide-react';
const getIcon = (name: string) => {
    const IconComponent = (Icons as any)[name];
    return IconComponent ? <IconComponent size={14} /> : null;
};

export const Sidebar: React.FC<SidebarProps> = ({ categories, activeEffect, onSelectEffect }) => {
    // Track open categories - default all open for now or just the first few
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
        categories.reduce((acc, cat) => ({ ...acc, [cat.name]: true }), {})
    );

    const toggleCategory = (name: string) => {
        setOpenCategories(prev => ({ ...prev, [name]: !prev[name] }));
    };

    return (
        <aside className="w-[280px] h-full flex flex-col bg-[#020202] border-r border-[#1a1a1a] z-20 shrink-0 shadow-2xl">
            {/* Logo Area */}
            <div className="px-6 h-20 flex items-center gap-3 border-b border-white/5 bg-[#020202]">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
                    <span className="text-white font-bold text-lg">SL</span>
                </div>
                <div>
                   <h1 className="font-bold text-white text-[16px] tracking-tight">Soci-Lab</h1>
                   <div className="text-[10px] font-bold text-indigo-500/80 tracking-[0.2em] uppercase">Architecture</div>
                </div>
            </div>

            {/* Navigation Lists */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 custom-scrollbar">
                {categories.map(cat => {
                    const isOpen = openCategories[cat.name];
                    const hasActive = cat.effects.some((e: any) => e.id === activeEffect.id);
                    
                    return (
                        <div key={cat.name} className={`space-y-1 rounded-xl transition-all ${hasActive && !isOpen ? 'bg-indigo-500/5' : ''}`}>
                            <button 
                                onClick={() => toggleCategory(cat.name)}
                                className="w-full px-3 py-2.5 flex items-center justify-between text-[#555] hover:text-[#aaa] transition-colors group"
                            >
                                <div className="flex items-center gap-2.5">
                                    <div className={`p-1.5 rounded-lg transition-colors ${hasActive ? 'bg-indigo-500 text-white' : 'bg-[#111] text-[#444] group-hover:text-[#888]'}`}>
                                        {getIcon(cat.icon)}
                                    </div>
                                    <span className={`text-[11px] font-bold uppercase tracking-wider ${hasActive ? 'text-indigo-400' : ''}`}>
                                        {cat.name}
                                    </span>
                                </div>
                                {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </button>
                            
                            {isOpen && (
                                <div className="space-y-[2px] ml-2 pl-2 border-l border-white/5 mb-4">
                                    {cat.effects.map((effect: any) => {
                                        const isActive = activeEffect.id === effect.id;
                                        return (
                                            <button
                                                key={effect.id}
                                                onClick={() => onSelectEffect(effect)}
                                                className={`
                                                    w-full flex items-center px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-150
                                                    ${isActive 
                                                        ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                                                        : 'text-[#888] hover:text-[#e0e0e0] hover:bg-white/5'}
                                                `}
                                            >
                                                {effect.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="p-5 border-t border-white/5 bg-[#050505]">
                <a href="https://github.com/Saty19/Soci-Lab" target="_blank" className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#111] border border-white/5 text-[12px] font-semibold text-[#888] hover:text-white hover:bg-[#1a1a1a] transition-all group">
                    <Settings size={14} className="group-hover:rotate-45 transition-transform" />
                    Library Settings
                </a>
            </div>
        </aside>
    );
};
