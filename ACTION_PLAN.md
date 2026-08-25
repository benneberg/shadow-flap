schema:
  version: 1
  compatible_with:
    - CCC
  generated_by: Repository Bootstrap Prompt
  generated_at: 2026-08-25T03:58:13-07:00
  repository: copy-of-shadow-flap:-monster-chase

immediate:
  value:
    - title: "Add Lint Script to package.json"
      description: "Define a 'lint' script in package.json (e.g. 'tsc --noEmit') to enable automated lint checks."
      priority: HIGH
      expected_benefit: "Standardizes automated continuous integration checks and IDE tool validation."
      difficulty: EASY
      evidence:
        - package.json
      confidence: HIGH
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - package.json
  notes: ""

high_priority:
  value:
    - title: "Consolidate Physics Constants in gameLogic.ts"
      description: "Move practice mode speed/gravity multipliers and mode modifiers into getDifficultySettings in utils/gameLogic.ts."
      priority: HIGH
      expected_benefit: "Centralizes game tuning parameters in a single source of truth."
      difficulty: EASY
      evidence:
        - components/GameCanvas.tsx
        - utils/gameLogic.ts
      confidence: HIGH
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - components/GameCanvas.tsx
    - utils/gameLogic.ts
  notes: ""

medium_priority:
  value:
    - title: "Expand Test Coverage for Collision & Difficulty Settings"
      description: "Add unit tests in game.test.ts testing getDifficultySettings calculations and boundary detection."
      priority: MEDIUM
      expected_benefit: "Prevents regression when adjusting obstacle heights or hitboxes."
      difficulty: MEDIUM
      evidence:
        - game.test.ts
        - utils/gameLogic.ts
      confidence: HIGH
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - game.test.ts
  notes: ""

low_priority:
  value:
    - title: "Audio Volume Sliders and Mix Controls"
      description: "Add UI controls in App.tsx or a settings modal to adjust BGM and SFX volume via sounds.ts gain nodes."
      priority: LOW
      expected_benefit: "Allows players to customize sound levels or mute independently."
      difficulty: MEDIUM
      evidence:
        - TODO.md ("Audio Mix Control: Add a settings menu for BGM/SFX volume sliders")
        - utils/sounds.ts
      confidence: HIGH
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - TODO.md
  notes: ""

quick_wins:
  value:
    - title: "React Error Boundary"
      description: "Wrap GameCanvas in a React Error Boundary with a fallback restart button."
      priority: MEDIUM
      expected_benefit: "Graceful recovery if an unhandled rendering error occurs."
      difficulty: EASY
      evidence:
        - App.tsx
      confidence: HIGH
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - App.tsx
  notes: ""

long_term:
  value:
    - title: "Global Cloud Leaderboard Integration"
      description: "Integrate a cloud database (e.g. Firebase Firestore) for authentic cross-platform daily track leaderboards."
      priority: LOW
      expected_benefit: "Enables true global competition and social score sharing."
      difficulty: HARD
      evidence:
        - TODO.md ("Global Leaderboards: Integrate Firebase Firestore")
      confidence: HIGH
  evidence_state: OBSERVED
  confidence: HIGH
  evidence:
    - TODO.md
  notes: ""
