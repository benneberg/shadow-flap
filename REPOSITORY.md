schema:
  version: 1
  compatible_with:
    - CCC
  generated_by: Repository Bootstrap Prompt
  generated_at: 2026-08-25T03:58:13-07:00
  repository: copy-of-shadow-flap:-monster-chase

overview:
  value: Single-page React application rendering an HTML5 Canvas 2D silhouette arcade game called Shadow Flap.
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - App.tsx
    - components/GameCanvas.tsx
    - index.html
  notes: ""

purpose:
  value: Deliver a fast-paced reaction web arcade game featuring obstacle avoidance, dynamic modifier portals, seeded daily levels, and practice assists.
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - README.md
    - metadata.json
    - App.tsx
  notes: ""

scope:
  value: Client-side single-player gameplay, sound synthesis, local score tracking, particle physics, and responsive input handling.
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - App.tsx
    - components/GameCanvas.tsx
    - utils/sounds.ts
    - utils/drawing.ts
  notes: ""

capabilities:
  value:
    - HTML5 Canvas 60FPS animation loop
    - Multi-mode portal transformations (Split, Mirror, Gravity)
    - Seeded random generation for global daily tracks
    - Real-time Web Audio API sound synthesis
    - Physics trajectory prediction and targeting in Practice mode
    - Multi-touch and keyboard targeting for split entities
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - components/GameCanvas.tsx
    - utils/random.ts
    - utils/sounds.ts
  notes: ""

verified_features:
  value:
    - "Four game modes: Random/Endless, Daily Track, Chaos Master, and Practice Mode"
    - "Three difficulty tiers: Easy, Medium, Hard"
    - "Three active portal transformations: Split, Mirror, and Gravity"
    - "Particle emitter for flapping, scoring, collisions, and portal transitions"
    - "Dynamic obstacle generation: pillars, rotating monster saws, gears, bloats, squares, and spiders"
    - "Practice mode trajectory preview curves (drop vs flap) and next-gap target guidance"
    - "Local storage persistence for standard and daily high scores"
    - "Unit test coverage for game logic ranking and seeded PRNG"
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - App.tsx
    - components/GameCanvas.tsx
    - game.test.ts
    - utils/gameLogic.ts
    - utils/random.ts
  notes: ""

inferred_features:
  value:
    - "Global Seeded Survival branding simulates daily competition locally via Date-derived PRNG seed"
  evidence_state: INFERRED
  confidence: HIGH
  evidence:
    - App.tsx (dailySeed calculation based on current year/month/date)
    - TODO.md (noting lack of external database)
  notes: ""

future_indicators:
  value:
    - "Global Leaderboards via Firebase Firestore integration"
    - "Audio Mix Control with BGM and SFX volume sliders"
    - "Adaptive Monster AI with player Y-position tracking"
    - "Custom Theme unlockables based on rank achievements"
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - TODO.md
  notes: ""

technology_stack:
  value:
    runtime: Browser / ECMAScript Module
    framework: React 19.2.3
    bundler: Vite 6.2.0
    language: TypeScript 5.8.2
    testing: Vitest 4.1.9
    ui_icons: Lucide React 0.562.0
    audio: Web Audio API (Native AudioContext)
    styling: Tailwind CSS (via Vite plugin/CDN)
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - package.json
    - tsconfig.json
    - vite.config.ts
    - utils/sounds.ts
  notes: ""

repository_structure:
  value:
    root:
      - App.tsx (Main UI state, menus, score display, overlays)
      - index.tsx (DOM mounting entry point)
      - index.html (HTML host)
      - types.ts (TypeScript interfaces and enums)
      - game.test.ts (Vitest unit tests)
      - vite.config.ts (Vite configuration)
      - package.json (Dependency manifest)
    components:
      - GameCanvas.tsx (Canvas game loop, physics, collisions, input)
    utils:
      - drawing.ts (Canvas rendering for obstacles, birds, portals, particles)
      - gameLogic.ts (Difficulty settings, rank calculations)
      - random.ts (Deterministic Linear Congruential PRNG)
      - sounds.ts (Web Audio API sound generator)
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - list_dir inspection across root, components, and utils
  notes: ""

configuration:
  value:
    - tsconfig.json (TypeScript compiler config targeting ES2020)
    - vite.config.ts (Vite configuration with @vitejs/plugin-react)
    - metadata.json (Application metadata and permissions)
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - tsconfig.json
    - vite.config.ts
    - metadata.json
  notes: ""

build_process:
  value: "npm run build executes vite build to compile static assets into dist/"
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - package.json ("scripts": { "build": "vite build" })
    - Verified compilation via compile_applet tool
  notes: ""

deployment:
  value: Static SPA deployment serving dist/ directory.
  evidence_state: INFERRED
  confidence: HIGH
  evidence:
    - package.json ("preview": "vite preview")
    - index.html
  notes: ""

repository_boundaries:
  value: Standalone client-side application with zero external network dependencies or backend API endpoints.
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - App.tsx
    - package.json
  notes: ""

known_unknowns:
  value:
    - "Production cloud hosting target or CI/CD deployment pipeline configuration"
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - Absence of .github/workflows or Dockerfile in repository
  notes: ""

confidence_summary:
  value: HIGH
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - Full static code analysis, successful build execution, and test passing confirmation
  notes: ""
