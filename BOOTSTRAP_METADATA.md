schema:
  version: 1
  compatible_with:
    - CCC
  generated_by: Repository Bootstrap Prompt
  generated_at: 2026-08-25T03:58:13-07:00
  repository: copy-of-shadow-flap:-monster-chase

generator:
  value: Repository Bootstrap Prompt
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - System prompt instructions
  notes: ""

schema_version:
  value: 1
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - Schema specification
  notes: ""

generation_mode:
  value: FULL_IR_GENERATION
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - Executed all 10 phases sequentially
  notes: ""

execution_mode:
  value: STATIC_AND_DYNAMIC_VERIFIED
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - Static analysis across all files
    - Dynamic execution of vitest (3/3 tests passed)
    - Dynamic execution of vite build (build succeeded)
  notes: ""

detected_languages:
  value:
    - TypeScript
    - JavaScript
    - HTML
    - CSS
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - "*.ts, *.tsx, *.html files"
    - package.json
  notes: ""

detected_frameworks:
  value:
    - React 19
    - Tailwind CSS
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - package.json
    - App.tsx
  notes: ""

detected_build_system:
  value: Vite
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - vite.config.ts
    - package.json
  notes: ""

detected_package_manager:
  value: npm
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - package-lock.json
  notes: ""

files_analysed:
  value:
    - package.json
    - tsconfig.json
    - vite.config.ts
    - metadata.json
    - index.html
    - index.tsx
    - App.tsx
    - types.ts
    - game.test.ts
    - components/GameCanvas.tsx
    - utils/drawing.ts
    - utils/gameLogic.ts
    - utils/random.ts
    - utils/sounds.ts
    - README.md
    - TODO.md
    - ARCHITECTURE.md
    - PURPOSE.md
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - Directory and file inspection
  notes: ""

evidence_coverage:
  value: 98
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - All source files inspected and executed
  notes: "0-100 scale: complete codebase visibility."

unknown_coverage:
  value: 2
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - Remote production cloud hosting / CI workflow is unconfigured in repo
  notes: "0-100 scale: minimal unknown areas."

overall_confidence:
  value: HIGH
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - Verified complete codebase, test suite passes, build compiles cleanly
  notes: ""

ccc_compatibility:
  value: true
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - Strict adherence to CCC IR YAML schema and field definitions
  notes: ""

purpose:
  value: Provide deterministic, machine-readable, and human-readable repository intelligence intermediate representation (IR) for tooling and human maintainers.
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - System prompt instructions
  notes: ""
