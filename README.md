# Shadow Flap: Monster Chase

Shadow Flap is a high-octane silhouette arcade game built with React 19 and the Canvas API. Experience a visceral twist on traditional "flappy" mechanics with dynamic portal-based mode shifts, monster dodge-patterns, and daily competitive tracks.

![Game Screen Placeholder](https://via.placeholder.com/800x400?text=Shadow+Flap+Gameplay)

## ✨ Features
- **Dynamic Portals:** Transition between **Mirror**, **Split**, and **Gravity** modes in real-time.
- **Interactive Practice Mode:** Learn monster patterns at 60% speed with predictive gravity curves (white/blue paths), upcoming gap target guides, and infinite-lives automatic shield.
- **Three Difficulty Tiers:** Choose your intensity from **Easy**, **Medium**, to **Chaos Master**.
- **Daily Seeded Tracks:** Every player globally faces the exact same monster patterns every 24 hours.
- **Immersive Atmosphere:** High-contrast silhouette art with generative particle systems and a dark electronic drone soundtrack.
- **Skill-Based Ranking:** Progress from Rank D to the elusive Rank S+.

## 🚀 Getting Started

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run unit tests
npm run test
```

### Technologies
- **Core:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS, Lucide Icons
- **Animation:** Canvas 2D API, Particles
- **Audio:** Web Audio API Drone Synthesis
- **Testing:** Vitest

## 📖 Documentation
- [PURPOSE.md](./PURPOSE.md): Product vision and value prop.
- [ARCHITECTURE.md](./ARCHITECTURE.md): Technical deep-dive.
- [TODO.md](./TODO.md): Roadmap and Code Review.

## 🕹 Controls
- **Standard Tap/Click or Space/Up Arrow:** Flap / Upwards Thrust.
- **Advanced Targeting (Split Mode):** 
  - **Touch/Click:** Tap separate vertical screen zones (**Top**, **Middle**, or **Bottom**) to flap that specific bird.
  - **Keyboard:** Press keys **1 / Q** (Top bird), **2 / W** (Middle bird), or **3 / E** (Bottom bird) to target individual birds.
- **Back Button:** Return to Menu (GameOver screen).

---
*Identified the portals. Mastered the chaos.*
