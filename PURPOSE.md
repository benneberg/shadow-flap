# Product Purpose & Strategy

## 1. Product Summary
Shadow Flap: Monster Chase is a silhouette arcade web game combining classic tap-to-flap mechanics with real-time transformation portals (Split, Mirror, Gravity), procedural monster dodging, seeded daily challenges, and an interactive practice mode.

## 2. Problem Statement
UNSET

## 3. Target Audience
UNSET

## 4. Value Proposition
- **Dynamic Portal Shifts:** Real-time gameplay modifiers (Split, Mirror, Gravity) that dynamically alter bird physics and control dynamics.
- **Seeded Daily Competition:** Deterministic daily tracks generated via linear congruential PRNG from calendar dates for synchronized global challenge seeds.
- **Practice Assistance:** Real-time trajectory prediction curves (drop vs flap) and obstacle gap target guidance with auto-shielding for mastering mechanics.
- **Zero Asset Latency:** Procedural 2D canvas drawing and Web Audio API synthesized sound effects and drone audio without external asset network requests.

## 5. Feature Registry

### Verified Features (Directly Executing in Codebase)
- **Game Modes:**
  - `GameMode.RANDOM`: Endless obstacle and monster survival mode with unlocking portals (`App.tsx`, `components/GameCanvas.tsx`).
  - `GameMode.DAILY`: Deterministically seeded track derived from the current calendar date (`App.tsx`, `utils/random.ts`).
  - `GameMode.MASTER`: High-difficulty chaos mode unlocked at score threshold (`App.tsx`, `components/GameCanvas.tsx`).
  - `GameMode.PRACTICE`: Guided practice mode with 60% game speed, trajectory path projections, next gap indicator, and infinite-lives auto-shield (`components/GameCanvas.tsx`).
- **Difficulty Selection:**
  - `DifficultyLevel.EASY`, `DifficultyLevel.MEDIUM`, `DifficultyLevel.HARD` configuring gravity, flap strength, obstacle speed, gap sizes, and spawn intervals (`utils/gameLogic.ts`).
- **Portal Transformations:**
  - `ActiveMode.SPLIT`: Spawns multiple controllable entities with vertical zone touch and key targeting (`components/GameCanvas.tsx`).
  - `ActiveMode.MIRROR`: Inverts bird positioning and movement symmetry (`components/GameCanvas.tsx`).
  - `ActiveMode.GRAVITY`: Reverses gravity orientation and flap trajectory (`components/GameCanvas.tsx`).
- **Obstacle & Monster System:**
  - Standard pillars with randomized gaps (`utils/drawing.ts`).
  - Rotating saw, gear, bloat, and square monsters (`utils/drawing.ts`).
  - Orbiting spider obstacles (`components/GameCanvas.tsx`, `utils/drawing.ts`).
- **Audio Synthesizer:**
  - Native Web Audio API procedural synthesis for flap, score, portal entry, collision hit, and ambient background drone (`utils/sounds.ts`).
- **Local Persistence & Ranking:**
  - LocalStorage persistence for endless high score and daily high score (`App.tsx`).
  - Rank tier grading from D, C, B, A, S, to S+ (`utils/gameLogic.ts`).
- **Unit Testing:**
  - Vitest test suite testing ranking evaluation and PRNG reproducibility (`game.test.ts`).

### Inferred Features (Simulated with Rule-Based Fallbacks / Partially Implemented)
- **Global Seeded Survival Branding:** Local date-seeded PRNG simulates daily competition without a connected multiplayer backend (`App.tsx`, `utils/random.ts`).

### Future Features (Unimplemented Backlog / TODOs)
- **Global Leaderboards:** Firebase Firestore database integration for remote cross-device daily score boards (`TODO.md`).
- **Audio Mix Control:** Settings menu with independent BGM and SFX volume sliders (`TODO.md`).
- **Adaptive Monster AI:** Target tracking and chase logic based on bird Y-position (`TODO.md`).
- **Custom Themes & Skins:** Visual skin unlocks tied to rank achievements (`TODO.md`).
