schema:
  version: 1
  compatible_with:
    - CCC
  generated_by: Repository Bootstrap Prompt
  generated_at: 2026-08-25T03:58:13-07:00
  repository: copy-of-shadow-flap:-monster-chase

correctness:
  value:
    - issue: "Strict Mode AudioContext Lifecycle"
      severity: LOW
      evidence:
        - "utils/sounds.ts initializes AudioContext lazily on user action"
      impact: "May throw warning if invoked before user interaction on strict iOS/WebKit browsers."
      recommendation: "Ensure sound play is strictly guarded behind AudioContext.state === 'running' or resume() on first touch."
      confidence: HIGH
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - utils/sounds.ts
  notes: ""

security:
  value:
    - issue: "Client-Side LocalStorage Score Modification"
      severity: LOW
      evidence:
        - "App.tsx reads and writes 'shadow_flap_highscore' directly to window.localStorage"
      impact: "Users can manually edit high scores via browser developer tools."
      recommendation: "If global competitive leaderboards are introduced, authenticate and compute scores server-side."
      confidence: HIGH
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - App.tsx
  notes: ""

dependencies:
  value:
    - issue: "Minimal and Modern Dependencies"
      severity: INFO
      evidence:
        - "package.json uses React 19, Vite 6, Vitest 4, Lucide React"
      impact: "No obsolete or bloated dependencies detected."
      recommendation: "Keep lockfile updated regularly."
      confidence: HIGH
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - package.json
  notes: ""

performance:
  value:
    - issue: "Unthrottled Canvas RequestAnimationFrame Loop"
      severity: INFO
      evidence:
        - "components/GameCanvas.tsx manages entity pool via React refs avoiding component re-renders"
      impact: "Consistent 60 FPS execution on modern hardware."
      recommendation: "Maintain ref-based entity architecture for any future visual additions."
      confidence: HIGH
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - components/GameCanvas.tsx
  notes: ""

maintainability:
  value:
    - issue: "Large Component File GameCanvas.tsx"
      severity: MEDIUM
      evidence:
        - "components/GameCanvas.tsx is ~680 lines combining physics, collisions, inputs, and frame lifecycle"
      impact: "Increased cognitive overhead when adding new game mechanics."
      recommendation: "Extract collision checks and particle updating into specialized helper functions."
      confidence: HIGH
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - components/GameCanvas.tsx
  notes: ""

code_quality:
  value:
    - issue: "Missing Lint Script in Package Manifest"
      severity: LOW
      evidence:
        - "package.json does not define a 'lint' script"
      impact: "Automated linting commands fail if invoked without custom flags."
      recommendation: "Add eslint or tsc --noEmit check under 'lint' script in package.json."
      confidence: HIGH
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - package.json
  notes: ""

technical_debt:
  value:
    - issue: "Hardcoded Physics Constants and Multipliers in GameCanvas"
      severity: LOW
      evidence:
        - "components/GameCanvas.tsx contains inline multipliers for Practice Mode physics"
      impact: "Physics tuning is spread between gameLogic.ts and GameCanvas.tsx."
      recommendation: "Consolidate all mode-based physics modifiers directly inside getDifficultySettings in utils/gameLogic.ts."
      confidence: HIGH
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - components/GameCanvas.tsx
    - utils/gameLogic.ts
  notes: ""

observability:
  value:
    - issue: "No Client Telemetry or Error Logging"
      severity: INFO
      evidence:
        - "Client relies on standard console errors"
      impact: "Runtime errors on unsupported browser hardware are unlogged."
      recommendation: "Add simple error boundary around GameCanvas."
      confidence: HIGH
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - index.tsx
    - App.tsx
  notes: ""

testing:
  value:
    - issue: "Good Unit Test Coverage for Logic, Missing Component/Canvas Tests"
      severity: LOW
      evidence:
        - "game.test.ts verifies rank logic and PRNG reproducibility (3/3 passing)"
      impact: "Canvas rendering and physics collision handling are tested manually."
      recommendation: "Add unit tests for collision detection functions and difficulty settings."
      confidence: HIGH
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - game.test.ts
  notes: ""

documentation:
  value:
    - issue: "Up-to-Date Roadmap and Documentation"
      severity: INFO
      evidence:
        - "README.md and TODO.md accurately reflect current features including Practice mode and controls"
      impact: "Clear developer and player guidance."
      recommendation: "Continue maintaining TODO.md as features land."
      confidence: HIGH
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - README.md
    - TODO.md
  notes: ""

cicd:
  value:
    - issue: "No CI/CD Workflow Files Present"
      severity: INFO
      evidence:
        - "No .github/workflows directory present in repository"
      impact: "Tests and builds must be run locally or within the hosting platform."
      recommendation: "Add a simple GitHub Actions workflow running 'vitest run' and 'vite build' on PRs."
      confidence: HIGH
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - Root directory listing
  notes: ""
