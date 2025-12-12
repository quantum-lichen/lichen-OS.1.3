export type ViewState = 'landing' | 'demo' | 'architecture' | 'community';

export interface Bounty {
  id: string;
  task: string;
  reward: string;
  difficulty: 'Facile' | 'Moyenne' | 'Difficile' | 'Élevée';
  language: string;
}

export interface ModuleInfo {
  name: string;
  lang: string;
  description: string;
  status: 'Stable' | 'En cours';
}

export interface CodeSnippet {
  filename: string;
  language: string;
  code: string;
}
