import React, { useState } from 'react';
import { 
    RUST_SNIPPET_LTC, 
    RUST_SNIPPET_KURAMOTO, 
    RUST_SNIPPET_VDFS, 
    RUST_SNIPPET_SECURITY,
    RUST_SNIPPET_PAGD,
    RUST_SNIPPET_OODA,
    MODULES 
} from '../constants';
import { CodeViewer } from '../components/CodeViewer';
import { Network, Zap, Activity, Layers, Lock, Database, Waves } from 'lucide-react';

export const Architecture: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'foundations' | 'cognitive' | 'system' | 'security'>('foundations');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-4 border-b border-slate-700 pb-4">Architecture Unifiée</h2>
        <p className="text-slate-400 max-w-3xl">
            Lichen OS fusionne physique théorique et informatique cognitive. 
            Découvrez comment nous passons de la logique discrète à la <strong>liquidité computationnelle</strong>.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-8 border-b border-slate-800 overflow-x-auto">
        <TabButton id="foundations" label="Fondations (UICT)" icon={<Layers size={16} />} active={activeTab} set={setActiveTab} />
        <TabButton id="cognitive" label="Cognition (Cerveau)" icon={<Activity size={16} />} active={activeTab} set={setActiveTab} />
        <TabButton id="system" label="Mécanique (OS)" icon={<Database size={16} />} active={activeTab} set={setActiveTab} />
        <TabButton id="security" label="Sécurité (Immuno)" icon={<Lock size={16} />} active={activeTab} set={setActiveTab} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-lichen-400 mb-4 capitalize">
                Modules : {activeTab}
            </h3>
            <ModuleTable filter={activeTab} />
        </div>
        
        <div className="bg-void-900 p-6 rounded-lg border border-slate-700 h-fit">
            <h3 className="text-lg font-bold text-white mb-3">Concepts Clés</h3>
            <KeyConcepts tab={activeTab} />
        </div>
      </div>

      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CodeSection tab={activeTab} />
      </div>
    </div>
  );
};

// --- Sub-components ---

const TabButton = ({ id, label, icon, active, set }: any) => (
    <button 
        onClick={() => set(id)}
        className={`pb-4 px-2 text-sm font-bold flex items-center gap-2 transition-colors whitespace-nowrap ${active === id ? 'text-lichen-400 border-b-2 border-lichen-400' : 'text-slate-500 hover:text-white'}`}
    >
        {icon} {label}
    </button>
);

const ModuleTable = ({ filter }: { filter: string }) => {
    // Simple filter logic mapping
    const getFilterStr = () => {
        if (filter === 'foundations') return ['uict', 'fc496'];
        if (filter === 'cognitive') return ['ooda', 'kuramoto', 'pagd'];
        if (filter === 'system') return ['vdfs', 'genui'];
        if (filter === 'security') return ['security'];
        return [];
    };

    const filters = getFilterStr();
    const filteredModules = MODULES.filter(m => filters.some(f => m.name.includes(f)));

    return (
        <div className="bg-void-900 rounded-lg border border-slate-700 overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-void-950 text-slate-300">
                    <tr>
                        <th className="p-4 font-mono text-xs uppercase tracking-wider">Module</th>
                        <th className="p-4 font-mono text-xs uppercase tracking-wider">Tech</th>
                        <th className="p-4 font-mono text-xs uppercase tracking-wider">Statut</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                    {filteredModules.map((mod) => (
                        <tr key={mod.name} className="hover:bg-void-800/50 transition-colors">
                            <td className="p-4 font-mono text-sm text-cyan-300">{mod.name}</td>
                            <td className="p-4 text-sm text-slate-400">{mod.lang}</td>
                            <td className="p-4">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${
                                    mod.status === 'Stable' ? 'bg-green-900/50 text-green-400' : 'bg-yellow-900/50 text-yellow-400'
                                }`}>
                                    {mod.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                    {filteredModules.length === 0 && (
                        <tr><td colSpan={3} className="p-4 text-slate-500 italic">Chargement des modules pour ce secteur...</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

const KeyConcepts = ({ tab }: { tab: string }) => {
    if (tab === 'foundations') return (
        <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex gap-3"><Waves className="text-blue-400 shrink-0" size={20} /><div><strong className="text-white">LTC</strong><p>Liquidité Computationnelle. Remplacement du discret par le continu.</p></div></li>
            <li className="flex gap-3"><Zap className="text-yellow-400 shrink-0" size={20} /><div><strong className="text-white">P-AGD</strong><p>Optimisation basée sur Φ (1.618) pour éviter le chaos.</p></div></li>
        </ul>
    );
    if (tab === 'cognitive') return (
        <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex gap-3"><Network className="text-cyan-400 shrink-0" size={20} /><div><strong className="text-white">OODA Loop</strong><p>Cycle de conscience : Perception → Décision.</p></div></li>
            <li className="flex gap-3"><Activity className="text-pink-400 shrink-0" size={20} /><div><strong className="text-white">Kuramoto</strong><p>Synchronisation logic/créativité par phase.</p></div></li>
        </ul>
    );
    if (tab === 'system') return (
        <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex gap-3"><Database className="text-emerald-400 shrink-0" size={20} /><div><strong className="text-white">VDFS</strong><p>Filesystem Vectoriel. Accès par le sens, pas le chemin.</p></div></li>
            <li className="flex gap-3"><Layers className="text-orange-400 shrink-0" size={20} /><div><strong className="text-white">GenUI</strong><p>Interface liquide générée par l'intention.</p></div></li>
        </ul>
    );
    return (
        <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex gap-3"><Lock className="text-red-400 shrink-0" size={20} /><div><strong className="text-white">BryanΩ-Lock</strong><p>Sécurité biométrique sémantique basée sur le style.</p></div></li>
            <li className="flex gap-3"><Layers className="text-purple-400 shrink-0" size={20} /><div><strong className="text-white">Neural Caps</strong><p>Système de permissions neuronales type CHERI.</p></div></li>
        </ul>
    );
};

const CodeSection = ({ tab }: { tab: string }) => {
    if (tab === 'foundations') return (
        <>
            <div><h3 className="text-2xl font-bold text-white mb-2">LTC: Liquidité Computationnelle</h3><p className="text-slate-400">Le solveur ODE qui rend les données fluides.</p><CodeViewer snippet={RUST_SNIPPET_LTC} /></div>
            <div><h3 className="text-2xl font-bold text-white mb-2">P-AGD: Optimiseur Φ</h3><CodeViewer snippet={RUST_SNIPPET_PAGD} /></div>
        </>
    );
    if (tab === 'cognitive') return (
        <>
             <div><h3 className="text-2xl font-bold text-white mb-2">Pipeline Spiralé (Kuramoto)</h3><p className="text-slate-400">Synchronisation des agents cognitifs.</p><CodeViewer snippet={RUST_SNIPPET_KURAMOTO} /></div>
             <div><h3 className="text-2xl font-bold text-white mb-2">Cycle OODA</h3><CodeViewer snippet={RUST_SNIPPET_OODA} /></div>
        </>
    );
    if (tab === 'system') return (
        <div><h3 className="text-2xl font-bold text-white mb-2">VDFS: Vector Database File System</h3><p className="text-slate-400">Stockage basé sur l'embedding sémantique.</p><CodeViewer snippet={RUST_SNIPPET_VDFS} /></div>
    );
    return (
        <div><h3 className="text-2xl font-bold text-white mb-2">BryanΩ-Lock (Sécurité)</h3><p className="text-slate-400">Signature biométrique basée sur l'interaction.</p><CodeViewer snippet={RUST_SNIPPET_SECURITY} /></div>
    );
};
