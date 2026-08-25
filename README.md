# Shadow Flap: Monster Chase

## Overview
Shadow Flap is a silhouette arcade game built with React 19, TypeScript, and HTML5 Canvas 2D. Players navigate through procedurally generated monster patterns, dynamic transformation portals (Split, Mirror, Gravity), three difficulty tiers, seeded daily tracks, and an interactive practice mode.

## Requirements
- Node.js (v18 or higher recommended)
- npm or bun package manager
- Modern web browser with HTML5 Canvas and Web Audio API support

## Installation
```bash
npm install
```

## Configuration
No environment variables required. Application configuration is managed via:
- `tsconfig.json` - TypeScript compiler configuration
- `vite.config.ts` - Vite bundler and plugin configuration
- `metadata.json` - Application metadata manifest

## Usage
Start the local development server:
```bash
npm run dev
```
Open your browser at the provided local URL (default: `http://localhost:3000`).

### Controls
- **Standard Flap:** Screen Tap / Left Mouse Click / Spacebar / Up Arrow
- **Split Mode Multi-Targeting (Touch):** Tap vertical zones (Top, Middle, Bottom) to command specific birds
- **Split Mode Multi-Targeting (Keyboard):**
  - Top Bird: `1` or `Q`
  - Middle Bird: `2` or `W`
  - Bottom Bird: `3` or `E`
- **Menu Return:** Click "Return to Interface" or "End Practice & Exit"

## Testing
Run unit tests with Vitest:
```bash
npm run test
```

## Build
Compile the production static distribution bundle:
```bash
npm run build
```
Build output is generated into the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

## Deployment
UNSET

## Repository Structure
```
├── App.tsx                 # Main application UI, state routing, and menus
├── index.tsx               # Application DOM mounting entry point
├── index.html              # Main HTML container
├── types.ts                # TypeScript type definitions, enums, and interfaces
├── game.test.ts            # Vitest unit tests for game logic and PRNG
├── package.json            # Package manifest and script definitions
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build and plugin setup
├── metadata.json           # Application metadata
├── components/
│   └── GameCanvas.tsx      # Core 60 FPS Canvas game loop, physics, collisions
└── utils/
    ├── drawing.ts          # Canvas rendering functions for entities and UI
    ├── gameLogic.ts        # Difficulty settings and rank calculations
    ├── random.ts           # Seeded deterministic Linear Congruential PRNG
    └── sounds.ts           # Web Audio API sound generator and synthesizer
```
