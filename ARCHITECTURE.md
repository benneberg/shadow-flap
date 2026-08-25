schema:
  version: 1
  compatible_with:
    - CCC
  generated_by: Repository Bootstrap Prompt
  generated_at: 2026-08-25T03:58:13-07:00
  repository: copy-of-shadow-flap:-monster-chase

architecture_style:
  value: Single Page Application with HTML5 Canvas 2D Game Loop
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - App.tsx
    - components/GameCanvas.tsx
    - index.html
  notes: "Combines React declarative UI overlay with mutable imperative 60 FPS requestAnimationFrame canvas loop."

major_components:
  value:
    - App (Root orchestrator, screen state machine, score persistence, UI modals)
    - GameCanvas (requestAnimationFrame game loop, physics simulation, collision engine, input dispatcher)
    - drawing (Pure 2D canvas renderers for birds, obstacles, particles, portals, and trails)
    - gameLogic (Difficulty tuning tables, score-to-rank evaluation functions)
    - random (Seeded deterministic Linear Congruential PRNG engine)
    - sounds (Web Audio API synthetic oscillator/noise sound generator)
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - App.tsx
    - components/GameCanvas.tsx
    - utils/drawing.ts
    - utils/gameLogic.ts
    - utils/random.ts
    - utils/sounds.ts
  notes: ""

responsibilities:
  value:
    App.tsx: "UI state transitions (MENU -> PLAYING -> GAMEOVER), local storage access, HUD rendering"
    components/GameCanvas.tsx: "Entity updates, collision detection, physics ticks, particle lifecycle, touch/keyboard input handling"
    utils/drawing.ts: "Rasterizing game entities, glowing effects, matrix transformations, guide trajectories to CanvasRenderingContext2D"
    utils/gameLogic.ts: "Providing difficulty constants (gravity, flap, speed, spawn interval) and rank grades (D to S+)"
    utils/random.ts: "Generating reproducible pseudo-random sequence for seeded daily tracks"
    utils/sounds.ts: "Synthesizing sound effects and dark ambient background drone via AudioContext"
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - Source code in App.tsx, GameCanvas.tsx, utils/
  notes: ""

dependency_flow:
  value:
    - "index.tsx -> App.tsx"
    - "App.tsx -> GameCanvas.tsx, utils/gameLogic.ts, types.ts, lucide-react"
    - "GameCanvas.tsx -> utils/drawing.ts, utils/sounds.ts, utils/random.ts, utils/gameLogic.ts, types.ts"
    - "utils/* -> types.ts (where applicable)"
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - Import statements across all TS/TSX files
  notes: ""

data_flow:
  value:
    - "User selects mode/difficulty in App.tsx -> passes mode, difficulty, seed, and bonusMode props to GameCanvas.tsx"
    - "GameCanvas.tsx initializes mutable React refs for entities (birds, obstacles, particles)"
    - "requestAnimationFrame updates physics positions, detects collisions, and draws to 2D context every frame"
    - "GameCanvas.tsx fires onScoreUpdate and onGameOver callbacks to notify App.tsx"
    - "App.tsx updates React score state, checks high scores, and persists to localStorage"
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - App.tsx
    - components/GameCanvas.tsx
  notes: ""

source_of_truth:
  value:
    ui_state: "React state in App.tsx"
    gameplay_state: "Mutable React refs inside GameCanvas.tsx (birds.current, obstacles.current, particles.current)"
    persisted_high_scores: "Browser localStorage ('shadow_flap_highscore', 'shadow_flap_daily_highscore')"
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - App.tsx
    - components/GameCanvas.tsx
  notes: ""

entry_points:
  value:
    - index.html (Document shell)
    - index.tsx (React DOM root)
    - App.tsx (Main application component)
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - index.html
    - index.tsx
  notes: ""

external_systems:
  value:
    - "Browser Web Audio API (Native window.AudioContext)"
    - "Browser LocalStorage API"
    - "Browser HTML5 Canvas 2D Context"
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - utils/sounds.ts
    - App.tsx
    - components/GameCanvas.tsx
  notes: "No external third-party HTTP endpoints, cloud databases, or microservices are connected."

extension_points:
  value:
    - "New obstacle/monster types in types.ts (MonsterType) and utils/drawing.ts (drawMonster)"
    - "New transformation portal modes in types.ts (ActiveMode) and GameCanvas.tsx portal handler"
    - "Alternative backend leaderboard integrations in App.tsx onGameOver callback"
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - types.ts
    - utils/drawing.ts
    - components/GameCanvas.tsx
    - TODO.md
  notes: ""

configuration:
  value:
    - tsconfig.json (Target ES2020, module ESNext, strict type checks)
    - vite.config.ts (React plugin integration)
    - metadata.json (AI Studio application manifest)
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - tsconfig.json
    - vite.config.ts
    - metadata.json
  notes: ""

constraints:
  value:
    - "Single-view UI structure with high-performance 60 FPS Canvas rendering"
    - "Zero asset latency requirement fulfilled via procedural AudioContext and procedural vector canvas drawing"
    - "Must execute fully offline or client-side without requiring network connectivity"
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - components/GameCanvas.tsx
    - utils/drawing.ts
    - utils/sounds.ts
  notes: ""

architecture_risks:
  value:
    - "Monolithic GameCanvas.tsx holding ~680 lines of state, physics, rendering, and input logic"
    - "Lack of server-authoritative score validation allows localStorage tampering"
    - "AudioContext initialization timing on mobile devices with strict user interaction requirements"
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - components/GameCanvas.tsx
    - utils/sounds.ts
    - App.tsx
  notes: ""

improvement_opportunities:
  value:
    - "Extract physics update step from GameCanvas.tsx into dedicated game engine hooks or helper modules"
    - "Add cloud database persistence (Firebase Firestore) for authentic global leaderboards as outlined in TODO.md"
    - "Introduce dedicated Audio Settings UI with master volume control"
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - TODO.md
    - components/GameCanvas.tsx
  notes: ""

unknown_areas:
  value:
    - "Target deployment container or CDN configuration"
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - Absence of CI/CD configuration files
  notes: ""
