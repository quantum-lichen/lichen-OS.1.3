import React, { useState } from 'react';
import { ViewState } from './types';
import { Navbar } from './components/Navbar';
import { Landing } from './views/Landing';
import { Architecture } from './views/Architecture';
import { Demo } from './views/Demo';
import { Community } from './views/Community';

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewState>('landing');

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <Landing setView={setView} />;
      case 'architecture':
        return <Architecture />;
      case 'demo':
        return <Demo />;
      case 'community':
        return <Community />;
      default:
        return <Landing setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-void-950 text-slate-200 font-sans selection:bg-lichen-500/30 selection:text-white">
      <Navbar currentView={currentView} setView={setView} />
      <main className="animate-in fade-in duration-500">
        {renderView()}
      </main>
      
      <footer className="border-t border-slate-800 bg-void-950 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-600 text-sm">
            <p>&copy; 2025 Lichen OS Foundation. MIT License.</p>
            <p className="mt-2 text-xs font-mono">System Status: ONLINE | Node FC-496: SYNCED</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
