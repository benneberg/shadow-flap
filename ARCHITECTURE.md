# Shadow Flap: Technical Architecture

## Tech Stack
- **Framework:** React 19 (Functional Components & Hooks).
- **Language:** TypeScript (Strict mode).
- **Build Tool:** Vite (Optimized for fast HMR and lightweight bundles).
- **Styling:** Tailwind CSS (Utility-first methodology).
- **Rendering:** Canvas 2D API (High-performance sprite and particle rendering).
- **State Persistence:** Browser LocalStorage.
- **Audio:** Web Audio API (Low-latency sound synthesis and sample playback).

## System Design

### 1. Unified Game Loop (`GameCanvas.tsx`)
The engine uses a single `requestAnimationFrame` loop.
- **Physics Engine:** Deterministic velocity-based movement with frame-rate independent scaling.
- **Entity Pool:** Centralized management of Birds, Obstacles, and Particles within React Refs to bypass React's render overhead for high-frequency updates.
- **Collision Matrix:** Hybrid AABB (for pillars) and Circle (for monsters/portals) collision detection.

### 2. Modular Rendering (`/utils/drawing.ts`)
Decoupled drawing logic. Every entity (Bird, Monster, Trail, Particle) has a pure drawing function that takes a `CanvasRenderingContext2D`. This allows for easy skinning and visual updates without touching game logic.

### 3. Seeded Randomization (`/utils/random.ts`)
Uses a linear congruential generator (LCG) or similar seeded PRNG to ensure that "Daily Tracks" are identical for all users. The seed is derived from the current calendar date string.

### 4. Audio Architecture (`/utils/sounds.ts`)
- **BGM:** Uses an Oscillator-based drone synthesis to ensure zero-latency looping and small bundle size.
- **SFX:** Buffer-based sample playback for punchy sound effects (Score, Flap, Hit).

## State Management Flow
1. **App State (`App.tsx`):** Manages high-level routing (Menu -> Playing -> GameOver).
2. **Game State (Refs):** Manages the precise positions and physics of hundreds of entities at 60fps.
3. **Data Sync:** On game completion, results are pushed back to the React state layer to handle high-score persistence and UI updates.
