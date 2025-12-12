import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, CheckCircle, Database, BrainCircuit, Activity, Eye, Zap, Waves, ShieldAlert } from 'lucide-react';

export const Demo: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'fc496' | 'ooda' | 'kuramoto'>('kuramoto');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center mb-8 overflow-x-auto">
            <div className="bg-void-900 p-1 rounded-lg border border-slate-700 flex gap-1">
                 <button 
                    onClick={() => setActiveMode('kuramoto')}
                    className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${activeMode === 'kuramoto' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    <Waves size={16} /> Sync Kuramoto
                </button>
                <button 
                    onClick={() => setActiveMode('ooda')}
                    className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${activeMode === 'ooda' ? 'bg-lichen-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    <BrainCircuit size={16} /> Cycle OODA
                </button>
                <button 
                    onClick={() => setActiveMode('fc496')}
                    className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${activeMode === 'fc496' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    <Database size={16} /> Data FC-496
                </button>
            </div>
        </div>

        {activeMode === 'fc496' && <FC496Simulator />}
        {activeMode === 'ooda' && <OODASimulator />}
        {activeMode === 'kuramoto' && <KuramotoSimulator />}
    </div>
  );
};

// --- KURAMOTO SIMULATOR ---
const KuramotoSimulator: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [couplingK, setCouplingK] = useState(0.5); // Force de couplage
    const [coherence, setCoherence] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    // Initial state: Random phases for 20 oscillators
    const oscillators = useRef(Array.from({ length: 20 }, () => ({
        phase: Math.random() * Math.PI * 2,
        naturalFreq: 0.05 + Math.random() * 0.05
    })));

    useEffect(() => {
        if (!isRunning || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        
        const render = () => {
            const width = canvas.width;
            const height = canvas.height;
            const centerX = width / 2;
            const centerY = height / 2;
            const radius = 100;

            // Update phases
            const dt = 0.5;
            const oscs = oscillators.current;
            const newPhases = [...oscs];

            // Kuramoto math: dθ_i/dt = ω_i + (K/N) * Σ sin(θ_j - θ_i)
            for (let i = 0; i < oscs.length; i++) {
                let sum = 0;
                for (let j = 0; j < oscs.length; j++) {
                    sum += Math.sin(oscs[j].phase - oscs[i].phase);
                }
                const dTheta = oscs[i].naturalFreq + (couplingK / oscs.length) * sum;
                newPhases[i].phase += dTheta * dt;
            }

            // Calculate global coherence |r|
            let sumCos = 0;
            let sumSin = 0;
            oscs.forEach(o => {
                sumCos += Math.cos(o.phase);
                sumSin += Math.sin(o.phase);
            });
            const r = Math.sqrt(sumCos * sumCos + sumSin * sumSin) / oscs.length;
            setCoherence(r);

            // Draw
            ctx.clearRect(0, 0, width, height);

            // Draw orbit
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw oscillators
            oscs.forEach((o) => {
                const x = centerX + radius * Math.cos(o.phase);
                const y = centerY + radius * Math.sin(o.phase);
                
                ctx.beginPath();
                ctx.arc(x, y, 6, 0, Math.PI * 2);
                ctx.fillStyle = r > 0.9 ? '#4ade80' : '#38bdf8'; // Green if sync, Blue otherwise
                ctx.fill();

                // Draw line to center for visual effect
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(x, y);
                ctx.strokeStyle = `rgba(56, 189, 248, ${0.1 + r * 0.5})`;
                ctx.stroke();
            });

            // Center glow
            const glowSize = r * 50;
            const gradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, glowSize);
            gradient.addColorStop(0, r > 0.9 ? 'rgba(74, 222, 128, 0.8)' : 'rgba(56, 189, 248, 0.5)');
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, glowSize, 0, Math.PI * 2);
            ctx.fill();

            animationFrameId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animationFrameId);
    }, [couplingK, isRunning]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <div className="bg-void-900 border border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
                     <canvas ref={canvasRef} width={400} height={300} className="w-full max-w-[400px]" />
                     <div className="absolute top-4 right-4 text-xs font-mono text-slate-500">
                        N=20 Agents
                     </div>
                </div>
                <div className="mt-4 bg-void-950 p-4 rounded-lg border border-slate-800">
                    <h3 className="text-white font-bold mb-2">Qu'est-ce que c'est ?</h3>
                    <p className="text-slate-400 text-sm">
                        Simulation du modèle de Kuramoto. Chaque point est un agent (ou une partie du cerveau de l'IA). 
                        Quand le couplage augmente, ils se synchronisent spontanément. C'est le "Moment Aha!" de l'IA.
                    </p>
                </div>
            </div>
            
            <div className="space-y-6">
                 <div className="bg-void-900 border border-slate-700 rounded-lg p-5">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Activity className="text-pink-400" /> Paramètres
                    </h3>
                    
                    <div className="mb-6">
                        <label className="block text-xs text-slate-400 mb-2">Force de Couplage (K): {couplingK.toFixed(2)}</label>
                        <input 
                            type="range" 
                            min="0" 
                            max="2" 
                            step="0.01" 
                            value={couplingK}
                            onChange={(e) => setCouplingK(parseFloat(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-lichen-500"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                            <span>Chaos (0.0)</span>
                            <span>Synchro (2.0)</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center bg-void-950 p-3 rounded border border-slate-800">
                        <span className="text-slate-400 text-sm">Cohérence |r|</span>
                        <span className={`font-mono font-bold ${coherence > 0.9 ? 'text-lichen-400' : 'text-cyan-400'}`}>
                            {coherence.toFixed(3)}
                        </span>
                    </div>
                </div>

                <div className="bg-void-900 border border-slate-700 rounded-lg p-5">
                    <button 
                        onClick={() => setIsRunning(!isRunning)}
                        className={`w-full py-3 font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${isRunning ? 'bg-slate-700 text-slate-300' : 'bg-lichen-600 text-white'}`}
                    >
                        {isRunning ? 'Pause Simulation' : <><Play size={16} /> Reprendre</>}
                    </button>
                    <button 
                        onClick={() => {
                            oscillators.current.forEach(o => o.phase = Math.random() * Math.PI * 2);
                            setCouplingK(0.5);
                        }}
                        className="w-full mt-2 py-2 bg-transparent hover:bg-white/5 border border-slate-700 text-slate-400 text-sm rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                        <RotateCcw size={14} /> Reset Chaos
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- OODA SIMULATOR ---
const OODASimulator: React.FC = () => {
    const [step, setStep] = useState<number>(0);
    const [logs, setLogs] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);

    const steps = [
        { id: 'perceive', label: 'Perception', icon: <Eye />, desc: "Captation des signaux bruts & Data FC-496" },
        { id: 'predict', label: 'Prédiction', icon: <BrainCircuit />, desc: "Génération de modèles via P-AGD" },
        { id: 'evaluate', label: 'Évaluation', icon: <Activity />, desc: "Calcul du H-Score (Entropie vs Cohérence)" },
        { id: 'reflect', label: 'Réflexion', icon: <Zap />, desc: "Méta-analyse : Surprise & Adaptation" },
        { id: 'decide', label: 'Décision', icon: <CheckCircle />, desc: "Action validée par le seuil Φ (0.618)" },
    ];

    useEffect(() => {
        if (!isRunning) return;

        const timer = setTimeout(() => {
            if (step < 4) {
                setStep(s => s + 1);
                addLog(step + 1);
            } else {
                setIsRunning(false);
                setLogs(prev => [...prev, "✅ Cycle terminé. Action exécutée."]);
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, [isRunning, step]);

    const addLog = (stepIdx: number) => {
        const messages = [
            "📡 Signal détecté : Anomalie thermique sur capteur #42...",
            "🔮 Prédiction : Risque de surchauffe (Prob: 89%)...",
            "⚖️ H-Score calculé : 0.72 (Validé > 0.618)...",
            "⚡ Réflexion : Conforme aux modèles historiques...",
            "🚀 Décision : Activation protocole refroidissement."
        ];
        setLogs(prev => [...prev, messages[stepIdx]]);
    };

    const startCycle = () => {
        setStep(0);
        setLogs(["🔄 Initialisation du cycle OODA..."]);
        setIsRunning(true);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                 <div className="text-center lg:text-left">
                    <h2 className="text-3xl font-bold text-white mb-2">Simulateur de Conscience</h2>
                    <p className="text-slate-400">Visualisation en temps réel de la boucle OODA d'un agent Lichen.</p>
                </div>

                {/* Steps Visualization */}
                <div className="relative flex flex-col md:flex-row justify-between items-center gap-4 bg-void-900 p-8 rounded-xl border border-slate-700">
                    <div className="absolute left-1/2 top-8 bottom-8 w-1 bg-slate-800 md:w-full md:h-1 md:left-8 md:right-8 md:top-1/2 -z-0"></div>
                    
                    {steps.map((s, idx) => (
                        <div key={s.id} className={`relative z-10 flex flex-col items-center gap-2 transition-all duration-500 ${idx === step ? 'scale-110' : 'opacity-60 grayscale'}`}>
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 transition-colors duration-300 ${
                                idx === step ? 'bg-void-950 border-lichen-500 text-lichen-400 shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 
                                idx < step ? 'bg-lichen-900 border-lichen-600 text-lichen-200' :
                                'bg-void-950 border-slate-700 text-slate-600'
                            }`}>
                                {s.icon}
                            </div>
                            <div className="text-center">
                                <span className={`text-sm font-bold block ${idx === step ? 'text-white' : 'text-slate-500'}`}>{s.label}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-void-950 p-6 rounded-xl border border-slate-800">
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        {steps[step].icon} {steps[step].label}
                    </h3>
                    <p className="text-slate-400">{steps[step].desc}</p>
                    {step === 2 && (
                        <div className="mt-4 bg-void-900 p-3 rounded border border-slate-700">
                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                <span>Entropie</span>
                                <span>Cohérence (Kuramoto)</span>
                            </div>
                            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-red-500 to-green-500 h-full w-[72%]"></div>
                            </div>
                            <div className="text-center text-xs font-mono mt-1 text-lichen-400">Score: 0.72 > 0.618 (Φ-Threshold)</div>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-void-900 border border-slate-700 rounded-lg p-5">
                    <button 
                        onClick={startCycle}
                        disabled={isRunning}
                        className="w-full py-3 bg-lichen-600 hover:bg-lichen-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-lichen-500/20"
                    >
                        {isRunning ? <Activity className="animate-spin" /> : <Play />} Lancer le Cycle
                    </button>
                </div>

                <div className="bg-black border border-slate-800 rounded-lg p-4 h-80 overflow-hidden flex flex-col">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 border-b border-slate-800 pb-2">Journal Système</h3>
                    <div className="flex-grow overflow-y-auto font-mono text-xs space-y-2">
                        {logs.map((log, i) => (
                            <div key={i} className="text-lichen-400 border-l-2 border-slate-800 pl-2 py-1 animate-in fade-in slide-in-from-left-2">
                                <span className="text-slate-600 mr-2">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                                {log}
                            </div>
                        ))}
                        {logs.length === 0 && <span className="text-slate-700 italic">En attente de stimulus...</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- FC-496 SIMULATOR (Legacy) ---
const FC496Simulator: React.FC = () => {
  const [inputJson, setInputJson] = useState('{\n  "id": 123,\n  "type": "sensor",\n  "lat": 48.8566,\n  "lon": 2.3522\n}');
  const [outputHex, setOutputHex] = useState<string | null>(null);
  const [integrity, setIntegrity] = useState<'pending' | 'valid' | 'corrupted' | null>(null);

  const handleEncode = () => {
    try {
        JSON.parse(inputJson);
        let hex = '';
        for (let i = 0; i < 62; i++) {
            hex += Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
        }
        setOutputHex(hex);
        setIntegrity(null);
    } catch (e) {
        alert("JSON Invalide");
    }
  };

  const handleVerify = () => {
    if (!outputHex) return;
    setIntegrity(integrity === 'corrupted' ? 'corrupted' : 'valid');
  };

  const handleCorrupt = () => {
    if (!outputHex) return;
    const chars = outputHex.split('');
    const idx = Math.floor(Math.random() * chars.length);
    chars[idx] = chars[idx] === '0' ? '1' : '0';
    setOutputHex(chars.join(''));
    setIntegrity('corrupted');
  };

  const handleClear = () => {
    setInputJson('{\n  "id": 123,\n  "type": "sensor",\n  "lat": 48.8566,\n  "lon": 2.3522\n}');
    setOutputHex(null);
    setIntegrity(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
            <div className="bg-void-900 border border-slate-700 rounded-lg p-5">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                        <Database size={16} className="text-cyan-400"/> Entrée JSON
                    </h3>
                    <div className="flex gap-2">
                        <button onClick={handleEncode} className="px-3 py-1.5 text-xs font-bold bg-lichen-600 hover:bg-lichen-500 text-white rounded flex items-center gap-1 transition-colors">
                            <Play size={12} /> Encoder
                        </button>
                        <button onClick={handleClear} className="px-3 py-1.5 text-xs font-bold bg-slate-700 hover:bg-slate-600 text-white rounded flex items-center gap-1 transition-colors">
                            <RotateCcw size={12} /> Reset
                        </button>
                    </div>
                </div>
                <textarea 
                    value={inputJson}
                    onChange={(e) => setInputJson(e.target.value)}
                    className="w-full h-48 bg-void-950 border border-slate-800 rounded p-3 text-sm font-mono text-slate-300 focus:outline-none focus:border-lichen-500/50 resize-none"
                    spellCheck={false}
                />
            </div>
        </div>

        <div className="space-y-4">
            <div className="bg-void-900 border border-slate-700 rounded-lg p-5 h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                         Cellule FC-496
                    </h3>
                    <div className="flex gap-2 flex-wrap justify-end">
                        <button 
                            onClick={handleVerify}
                            disabled={!outputHex}
                            className="px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded transition-colors"
                        >
                            Vérifier
                        </button>
                        <button 
                            onClick={handleCorrupt}
                            disabled={!outputHex}
                            className="px-3 py-1.5 text-xs font-bold bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white rounded transition-colors"
                        >
                            Corrompre
                        </button>
                    </div>
                </div>
                
                <div className="flex-grow bg-black rounded border border-slate-800 p-4 font-mono text-xs break-all leading-relaxed relative overflow-hidden group">
                    {outputHex ? (
                        <span className="text-lichen-400">{outputHex.match(/.{1,2}/g)?.join(' ')}</span>
                    ) : (
                        <span className="text-slate-700 italic select-none">Aucune donnée encodée...</span>
                    )}
                </div>
                 <div className="mt-4 flex justify-between items-center text-xs text-slate-400 border-t border-slate-800 pt-4">
                    <span>Taille: {outputHex ? '62 octets (496 bits)' : '0 octets'}</span>
                    <span className={`font-bold flex items-center gap-1 ${
                        integrity === 'valid' ? 'text-green-400' : integrity === 'corrupted' ? 'text-red-400' : 'text-slate-500'
                    }`}>
                        {integrity === 'valid' && <> <CheckCircle size={12}/> Intégrité Validée</>}
                        {integrity === 'corrupted' && <> <ShieldAlert size={12}/> Données Corrompues</>}
                        {!integrity && 'Intégrité non vérifiée'}
                    </span>
                </div>
            </div>
        </div>
    </div>
  );
};
