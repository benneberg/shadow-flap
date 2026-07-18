# Shadow Flap: Development TODO & Code Review

## 🛠 Active Roadmap (Incomplete Features)
- [ ] **Global Leaderboards:** Integrate Firebase Firestore to store and display actual global scores for the Daily Track.
- [ ] **Audio Mix Control:** Add a settings menu for BGM/SFX volume sliders.
- [ ] **Adaptive Monsters:** Implement "Chase" logic for monsters where they slowly track the bird's Y-position.
- [ ] **PWA Support:** Add a web manifest and service worker for offline play and "Add to Home Screen" functionality.

## 🔍 Code Review Findings
### Performance
- **Issue:** Particle objects are created and destroyed frequently.
- **Suggestion:** Implement **Particle Pooling** in `GameCanvas.tsx` to reuse objects and reduce Garbage Collection spikes.
- **Issue:** `drawBackground` recalculates gradients every frame.
- **Suggestion:** Draw the static background once to an offscreen canvas.

### Logic
- **Issue:** Collision detection is done in the main `update` loop for every entity.
- **Suggestion:** Use a simple spatial grid for broad-phase collision detection if entity count grows beyond 100.
- **Issue:** "Daily Track" is tied to local system time.
- **Suggestion:** Fetch a server-side timestamp to prevent users from cheating by changing their system clock.

### Code Quality
- **Issue:** `GameCanvas.tsx` is becoming monolithic (>500 lines).
- **Suggestion:** Subdivide the `update` function into modular hooks: `useBirdPhysics`, `useObstacleManager`, `useCollisionDetection`.
- **Issue:** Types in `types.ts` could be more strictly unioned (e.g. `ObstacleType` should determine available properties).

## ✅ Completed Recently
- [x] **Interactive Practice Mode**: Added slow-motion (60% speed), path guides (white drop/blue jump curves), next-gap green target guidance, and infinite-lives automatic shield.
- [x] **Multi-Touch / Key Targeting**: Map vertical screen segments (Top, Mid, Bottom) or key presses (Q/W/E or 1/2/3) to individual birds in Split Mode.
- [x] Three-tier difficulty system (Easy, Mid, Chaos).
- [x] Particle system integration for flapping and scoring.
- [x] Unit tests for core utilities (`vitest`).
- [x] Dark mysterious electronic BGM synthesis.
