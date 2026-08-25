schema:
  version: 1
  compatible_with:
    - CCC
  generated_by: Repository Bootstrap Prompt
  generated_at: 2026-08-25T03:58:13-07:00
  repository: copy-of-shadow-flap:-monster-chase

repository_type:
  value: WEB_APP
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - index.html
    - src/index.tsx or index.tsx
    - package.json dependencies (react, react-dom, vite)
  notes: "Client-side React and HTML5 Canvas web application."

repository_status:
  value: ACTIVE
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - package.json
    - App.tsx
    - components/GameCanvas.tsx
    - TODO.md
  notes: "Active development with recent commits, tests, and roadmap."

complexity:
  value: SIMPLE
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - Single frontend codebase
    - No microservices or external backend infrastructure
    - 5 utility modules and 1 main canvas component
  notes: "Single-view React SPA with Canvas-based 2D physics rendering."

primary_language:
  value: TypeScript
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - tsconfig.json
    - App.tsx
    - index.tsx
    - types.ts
    - components/GameCanvas.tsx
  notes: ""

secondary_languages:
  value:
    - HTML
    - CSS
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - index.html
  notes: "Tailwind CSS utility classes used via CDN/Vite."

primary_framework:
  value: React
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - package.json dependencies ("react": "^19.2.3")
    - index.tsx
    - App.tsx
  notes: "React 19 with HTML5 2D Canvas context."

build_system:
  value: Vite
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - vite.config.ts
    - package.json ("vite": "^6.2.0")
  notes: ""

package_manager:
  value: npm
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - package-lock.json
    - bun.lock
  notes: "Contains package-lock.json (and bun.lock)."

test_framework:
  value: Vitest
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - package.json ("vitest": "^4.1.9")
    - game.test.ts
  notes: "Unit test suite executed and passing with vitest."

workspace_or_single_repository:
  value: Single Repository
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - package.json
  notes: "Single package.json without workspace/monorepo config."

repository_maturity:
  value: PROTOTYPE
  evidence_state: INFERRED
  confidence: MEDIUM
  evidence:
    - package.json version "0.0.0"
    - TODO.md active roadmap items
  notes: "Playable prototype/early game release with active feature development."

overall_confidence:
  value: HIGH
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - Complete file tree analyzed
    - Test execution succeeded (3/3 passed)
    - Build execution succeeded
  notes: ""

evidence_summary:
  value:
    - "React 19 + TypeScript + Vite stack directly observed in package.json"
    - "Vitest test suite observed in game.test.ts and passed via npx vitest run"
    - "Vite build verified via compile_applet"
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - package.json
    - game.test.ts
    - vite.config.ts
  notes: ""

unknown_areas:
  value:
    - "Backend persistence/leaderboard infrastructure (currently UNSET / local storage only)"
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - TODO.md ("Integrate Firebase Firestore to store and display actual global scores")
  notes: ""
