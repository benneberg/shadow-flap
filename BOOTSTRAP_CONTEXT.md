schema:
  version: 1
  compatible_with:
    - CCC
  generated_by: Repository Bootstrap Prompt
  generated_at: 2026-08-25T03:58:13-07:00
  repository: copy-of-shadow-flap:-monster-chase

repository_summary:
  value: A fast-paced 2D silhouette reaction game built with React 19, TypeScript, and HTML5 Canvas, featuring procedural transformation portals, difficulty modes, seeded daily tracks, and practice guides.
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - App.tsx
    - components/GameCanvas.tsx
    - README.md
  notes: ""

technology_summary:
  value: React 19, TypeScript, Vite 6, Vitest 4, HTML5 Canvas 2D, Web Audio API, Lucide React, Tailwind CSS.
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - package.json
    - tsconfig.json
  notes: ""

architecture_summary:
  value: Declarative React UI for screens/menus wrapping an imperative 60 FPS requestAnimationFrame canvas loop with mutable entity refs and decoupled procedural drawing/sound utilities.
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - App.tsx
    - components/GameCanvas.tsx
    - utils/drawing.ts
    - utils/sounds.ts
  notes: ""

coding_patterns:
  value:
    - "React Functional Components with standard hooks (useState, useRef, useEffect, useCallback)"
    - "High-frequency animation state stored in useRef (birds, obstacles, particles) to avoid React re-render overhead"
    - "Pure rendering helper functions receiving CanvasRenderingContext2D"
    - "AudioContext synthesis functions instantiated lazily on user gesture"
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - components/GameCanvas.tsx
    - utils/drawing.ts
    - utils/sounds.ts
  notes: ""

naming_patterns:
  value:
    - "PascalCase for React components (App.tsx, GameCanvas.tsx)"
    - "camelCase for utility modules and functions (drawing.ts, gameLogic.ts, random.ts, sounds.ts)"
    - "UPPER_CASE for enum values and physics constants (GameMode, GameState, ActiveMode, GRAVITY, FLAP)"
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - types.ts
    - components/GameCanvas.tsx
    - utils/gameLogic.ts
  notes: ""

important_conventions:
  value:
    - "Never trigger React state updates inside the 60fps canvas tick; only invoke state callbacks on discrete game events (score increment, game over)"
    - "Ensure all deterministic procedural generation passes through SeededRandom"
    - "Keep all visual rendering self-contained in utils/drawing.ts"
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - components/GameCanvas.tsx
    - utils/random.ts
    - utils/drawing.ts
  notes: ""

critical_files:
  value:
    - App.tsx (Main application shell, UI state management)
    - components/GameCanvas.tsx (Core physics simulation, game loop, input routing)
    - types.ts (Core domain types, enums, interfaces)
    - utils/drawing.ts (Entity rendering algorithms)
    - utils/gameLogic.ts (Difficulty configurations and rank logic)
    - utils/random.ts (Deterministic PRNG for seeded tracks)
    - utils/sounds.ts (Web Audio API sound generator)
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - File analysis across workspace
  notes: ""

primary_entry_points:
  value:
    - index.html
    - index.tsx
    - App.tsx
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - index.html
    - index.tsx
    - App.tsx
  notes: ""

dangerous_areas:
  value:
    - "GameCanvas.tsx collision loop (modifying collision bounding boxes can break hitboxes or cause clipping)"
    - "AudioContext suspension/resumption on browsers with strict autoplay blocks"
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - components/GameCanvas.tsx
    - utils/sounds.ts
  notes: ""

files_likely_to_change:
  value:
    - components/GameCanvas.tsx (Adding monster behaviors, obstacle types, or control mappings)
    - utils/drawing.ts (Adding visual effects, skins, or monster sprites)
    - App.tsx (Adding leaderboard UI or audio settings modal)
    - TODO.md (Tracking roadmap items)
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - TODO.md
    - components/GameCanvas.tsx
  notes: ""

generated_files:
  value:
    - dist/* (Vite production build output)
  evidence_state: INFERRED
  confidence: HIGH
  evidence:
    - .gitignore
    - package.json
  notes: ""

repository_gaps:
  value:
    - "No remote cloud database for true multiplayer or cross-device global daily leaderboard"
    - "No lint script defined in package.json ('npm run lint' is missing)"
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - package.json
    - TODO.md
  notes: ""

known_unknowns:
  value:
    - "Remote production deployment environment specifications"
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - Absence of deployment manifests
  notes: ""

overall_confidence:
  value: HIGH
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - Direct code analysis, build verification, and test execution
  notes: ""
