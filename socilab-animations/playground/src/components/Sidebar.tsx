import React from 'react';
import { Settings } from 'lucide-react';

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
    return (
        <aside className="w-[260px] h-full flex flex-col bg-[#020202] border-r border-[#1a1a1a] z-20 shrink-0">
            {/* Logo Area */}
            <div className="px-6 h-20 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
                    <span className="text-white font-bold text-sm">SL</span>
                </div>
                <div>
                   <h1 className="font-semibold text-white text-[15px] tracking-tight">Soci-Lab</h1>
                   <div className="text-[10px] font-medium text-[#888] tracking-widest uppercase">Animations</div>
                </div>
            </div>

            {/* Navigation Lists */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-8 custom-scrollbar">
                {categories.map(cat => (
                    <div key={cat.name} className="space-y-1.5">
                        <div className="px-3 py-1.5 flex items-center gap-2 text-[#777] text-[11px] font-semibold uppercase tracking-wider">
                            {cat.name}
                        </div>
                        <div className="space-y-[2px]">
                            {cat.effects.map((effect: any) => {
                                const isActive = activeEffect.id === effect.id;
                                return (
                                    <button
                                        key={effect.id}
                                        onClick={() => onSelectEffect(effect)}
                                        className={`
                                            w-full flex items-center px-3 py-1.5 rounded-md text-[13px] font-medium transition-all duration-150
                                            ${isActive 
                                                ? 'bg-indigo-500/15 text-indigo-400' 
                                                : 'text-[#a0a0a0] hover:text-[#e0e0e0] hover:bg-white/5'}
                                        `}
                                    >
                                        {effect.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-5 border-t border-[#1a1a1a]">
                <a href="https://github.com/Saty19/Soci-Lab" target="_blank" className="flex items-center gap-2 text-[12px] font-medium text-[#777] hover:text-white transition-colors">
                    <Settings size={14} />
                    Library Config
                </a>
            </div>
        </aside>
    );
};
