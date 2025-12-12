import { Bounty, ModuleInfo, CodeSnippet } from './types';

export const MODULES: ModuleInfo[] = [
  { name: 'core/uict/ltc', lang: 'Rust', description: 'Liquidité Computationnelle (ODE Solver)', status: 'En cours' },
  { name: 'core/fc496', lang: 'Rust', description: 'Format FC-496 (496 bits) & S2', status: 'Stable' },
  { name: 'core/hse/ooda', lang: 'Rust', description: 'Cycle de Conscience (OODA)', status: 'Stable' },
  { name: 'core/hse/kuramoto', lang: 'Rust', description: 'Pipeline Spiralé (Sync Phase)', status: 'En cours' },
  { name: 'core/hse/vdfs', lang: 'Rust', description: 'Vector Database File System', status: 'En cours' },
  { name: 'core/hse/security', lang: 'Rust', description: 'Neural Caps & BryanΩ-Lock', status: 'En cours' },
  { name: 'apps/genui', lang: 'WASM', description: 'Générateur d\'interface Liquide', status: 'En cours' },
];

export const BOUNTIES: Bounty[] = [
  { id: '1', task: 'Implémenter le solveur RK4 pour LTC', reward: '350$', difficulty: 'Élevée', language: 'Rust' },
  { id: '2', task: 'Connecter VDFS à hnsw-rs', reward: '300$', difficulty: 'Difficile', language: 'Rust' },
  { id: '3', task: 'Visualiseur Kuramoto WebGL', reward: '250$', difficulty: 'Moyenne', language: 'JS/Rust' },
  { id: '4', task: 'Implémenter BryanΩ-Lock (Biométrie)', reward: '500$', difficulty: 'Élevée', language: 'Rust' },
  { id: '5', task: 'Créer le protocole V-NET P2P', reward: '400$', difficulty: 'Difficile', language: 'Rust' },
];

export const RUST_SNIPPET_LTC: CodeSnippet = {
  filename: "core/uict/src/ltc.rs",
  language: "rust",
  code: `/// Liquidité Computationnelle (LTC)
/// Remplace les algos discrets par des flux continus.
pub struct LiquidSolver {
    solver: RK4<Array1<f64>>,
}

impl LiquidSolver {
    /// Résout une équation différentielle pour un flux de données.
    pub fn solve(&mut self, initial: Array1<f64>, dt: f64) -> Array1<f64> {
        // Modélisation fluide de l'information
        self.solver.solve(&initial, |_, y| array![y[1], -y[0]], 0.0, dt, 10)
    }
}`
};

export const RUST_SNIPPET_KURAMOTO: CodeSnippet = {
    filename: "core/hse/src/kuramoto.rs",
    language: "rust",
    code: `/// Pipeline Spiralé (Synchronisation Conscient/Subconscient)
pub struct KuramotoPipeline {
    phases: Array1<f64>, // Phases des oscillateurs
    coupling: f64,       // Force de couplage (K)
}

impl KuramotoPipeline {
    /// Met à jour les phases selon l'équation de Kuramoto.
    pub fn update(&mut self) {
        let n = self.phases.len();
        for i in 0..n {
            let mut sum = 0.0;
            for j in 0..n {
                if i != j {
                    sum += (self.phases[j] - self.phases[i]).sin();
                }
            }
            self.phases[i] += self.coupling * sum;
        }
    }
}`
};

export const RUST_SNIPPET_VDFS: CodeSnippet = {
    filename: "core/hse/src/vdfs.rs",
    language: "rust",
    code: `/// VDFS: Vector Database File System
/// Abolition des dossiers hiérarchiques pour un stockage sémantique.
pub struct VDFS {
    index: Hnsw<f32>,            // Index vectoriel (HNSW)
    files: HashMap<String, Value> // Stockage Blob
}

impl VDFS {
    /// Cherche un fichier par "sens" (embedding) plutôt que par chemin.
    pub fn search(&self, query_embedding: &[f32], k: usize) -> Vec<String> {
        self.index.search(query_embedding, k) // Recherche K-NN
    }
}`
};

export const RUST_SNIPPET_SECURITY: CodeSnippet = {
    filename: "core/hse/src/bryan_omega_lock.rs",
    language: "rust",
    code: `/// BryanΩ-Lock : Sécurité biométrique sémantique
/// Analyse la "vibration" unique de l'utilisateur.
pub struct BryanOmegaLock {
    user_signature: Vec<u8>,
}

impl BryanOmegaLock {
    /// Vérifie si le style d'interaction correspond à l'utilisateur.
    pub fn verify(&self, interaction: &Value) -> bool {
        let mut hasher = Sha256::new();
        hasher.update(serde_json::to_string(interaction).unwrap());
        let hash = hasher.finalize();
        // Compare avec la signature sémantique enregistrée
        hash.as_ref() == self.user_signature
    }
}`
};

// Keeping these for reference/other tabs if needed
export const RUST_SNIPPET_PAGD: CodeSnippet = {
  filename: "core/uict/src/pagd.rs",
  language: "rust",
  code: `pub struct PAGD {
    momentum: f64,      // μ_Φ ≈ 0.618
    learning_rate: f64, // η_Φ ≈ 0.618
    velocity: Array1<f64>,
}
// ... (Optimiseur Φ-Accéléré)`
};

export const RUST_SNIPPET_OODA: CodeSnippet = {
    filename: "core/hse/src/ooda.rs",
    language: "rust",
    code: `pub struct OODACycle {
    pub agents: HashMap<String, AgentState>,
}
// ... (Perceive, Predict, Decide)`
};
