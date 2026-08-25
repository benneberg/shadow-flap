schema:
  version: 1
  compatible_with:
    - CCC
  generated_by: Repository Bootstrap Prompt
  generated_at: 2026-08-25T03:58:13-07:00
  repository: copy-of-shadow-flap:-monster-chase

name:
  value: Copy of Shadow Flap: Monster Chase
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - metadata.json ("name": "Copy of Shadow Flap: Monster Chase")
    - package.json ("name": "copy-of-shadow-flap:-monster-chase")
  notes: ""

short_description:
  value: A high-octane silhouette arcade game where you navigate through treacherous monster patterns with dynamic portals, multiple difficulty tiers, and a daily seeded challenge track.
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - metadata.json
    - README.md
  notes: ""

category:
  value: Web Arcade Game
  evidence_state: INFERRED
  confidence: HIGH
  evidence:
    - App.tsx
    - components/GameCanvas.tsx
    - README.md
  notes: ""

repository_type:
  value: WEB_APP
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - index.html
    - index.tsx
    - App.tsx
    - package.json
  notes: ""

repository_status:
  value: ACTIVE
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - package.json
    - TODO.md
    - game.test.ts
  notes: ""

complexity:
  value: SIMPLE
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - Single frontend client
    - HTML5 Canvas 2D engine
    - Minimal external dependencies
  notes: ""

primary_technologies:
  value:
    - TypeScript
    - React 19
    - Vite 6
    - HTML5 Canvas
    - Web Audio API (Synthesizer)
    - Lucide React
    - Vitest
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - package.json
    - components/GameCanvas.tsx
    - utils/sounds.ts
  notes: ""

problem_solved:
  value: Provides a browser-based silhouette reaction arcade experience with procedural dynamic transformation portals and seeded daily competition.
  evidence_state: INFERRED
  confidence: HIGH
  evidence:
    - README.md
    - metadata.json
    - App.tsx
  notes: ""

target_audience:
  value: UNSET
  evidence_state: UNSET
  confidence: NONE
  evidence: []
  notes: "Target audience demographics not explicitly defined in repository files."

primary_users:
  value: Web browser players seeking arcade/reaction games.
  evidence_state: INFERRED
  confidence: MEDIUM
  evidence:
    - index.html
    - App.tsx
    - README.md
  notes: ""

unique_characteristics:
  value:
    - "Dynamic real-time transformation portals (Split, Mirror, Gravity)"
    - "Seeded deterministic PRNG daily track ensuring identical challenges worldwide"
    - "Practice mode featuring predictive physics trajectory guides and auto-shielding"
    - "Web Audio API procedural sound synthesis without external audio asset downloads"
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - components/GameCanvas.tsx
    - utils/random.ts
    - utils/sounds.ts
    - README.md
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

current_state:
  value: Fully functional client-side game featuring Endless, Daily, Chaos Master, and Practice modes with passing unit test suite and local storage high scores.
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - App.tsx
    - components/GameCanvas.tsx
    - game.test.ts
    - README.md
  notes: ""

key_risks:
  value:
    - "High scores stored in localStorage without server validation or persistence"
    - "Single component GameCanvas.tsx holds significant rendering and physics logic"
    - "Audio oscillator creation on browsers with strict autoplay policies"
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - App.tsx
    - components/GameCanvas.tsx
    - utils/sounds.ts
    - TODO.md
  notes: ""

overall_confidence:
  value: HIGH
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - Verified complete codebase and running build/test tools
  notes: ""
