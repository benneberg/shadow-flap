
import React, { useRef, useEffect, useCallback } from 'react';
import { GameMode, GameState, Obstacle, MonsterType, ActiveMode, DifficultyLevel, GameSettings, Particle } from '../types';
import { SeededRandom, getDailySeed } from '../utils/random';
import { drawBird, drawMonster, drawPillar, drawBackground, drawTrail, drawPortal, drawParticles } from '../utils/drawing';
import { sounds } from '../utils/sounds';

interface GameCanvasProps {
  mode: GameMode;
  state: GameState;
  difficulty: DifficultyLevel;
  highScore: number;
  onGameOver: (score: number) => void;
  onScoreUpdate: (score: number) => void;
  startingMode?: ActiveMode;
}

interface BirdEntity {
  x: number;
  y: number;
  vel: number;
  active: boolean;
  trail: {x: number, y: number, alpha: number, scale: number}[];
  creationMode: ActiveMode; // Individual mode to keep color consistent
}

const GameCanvas: React.FC<GameCanvasProps> = ({ mode, state, difficulty, highScore: savedHighScore, onGameOver, onScoreUpdate, startingMode = ActiveMode.NORMAL }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  
  const birds = useRef<BirdEntity[]>([]);
  const activeMode = useRef<ActiveMode>(ActiveMode.NORMAL);
  const obstacles = useRef<Obstacle[]>([]);
  const particles = useRef<Particle[]>([]);
  const scoredGroups = useRef<Set<string>>(new Set());
  const score = useRef(0);
  const worldOffset = useRef(0);
  const lastSpawn = useRef(0);
  const lastPortalScore = useRef(0);
  const invincibilityFrames = useRef(0);
  const shakeIntensity = useRef(0);
  const glitchTime = useRef(0);
  const seededRandom = useRef<SeededRandom | null>(null);
  const hasForcedPortalSpawned = useRef(false);

  const getDifficultySettings = (diff: DifficultyLevel): GameSettings => {
    switch (diff) {
      case DifficultyLevel.EASY:
        return { gravity: 0.22, flapStrength: -4.8, speed: 1.8, gapSize: 220, spawnInterval: 500 };
      case DifficultyLevel.HARD:
        return { gravity: 0.35, flapStrength: -6.0, speed: 3.2, gapSize: 140, spawnInterval: 320 };
      case DifficultyLevel.MEDIUM:
      default:
        return { gravity: 0.28, flapStrength: -5.4, speed: 2.5, gapSize: 170, spawnInterval: 420 };
    }
  };

  const settings = getDifficultySettings(difficulty);
  const GRAVITY = settings.gravity;
  const FLAP = settings.flapStrength;
  const SPEED = settings.speed; 
  const BIRD_RADIUS = 16;
  const SPAWN_INTERVAL = settings.spawnInterval;

  const emitParticles = useCallback((x: number, y: number, count: number, color: string) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      particles.current.push({
        id: Math.random().toString(36).substr(2, 9),
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: Math.random() * 0.5 + 0.5,
        size: Math.random() * 3 + 1,
        color
      });
    }
  }, []);

  const getBirdColor = (mode: ActiveMode) => {
    if (mode === ActiveMode.SPLIT) return '#3b82f6';
    if (mode === ActiveMode.MIRROR) return '#a855f7';
    if (mode === ActiveMode.GRAVITY) return '#f97316';
    return '#ffffff';
  };

  const initGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    activeMode.current = ActiveMode.NORMAL;
    const startX = canvas.width * 0.25;
    const startY = canvas.height / 2;

    birds.current = [{
      x: startX,
      y: startY,
      vel: 0,
      active: true,
      trail: [],
      creationMode: ActiveMode.NORMAL
    }];
    
    obstacles.current = [];
    scoredGroups.current = new Set();
    score.current = 0;
    worldOffset.current = 0;
    lastSpawn.current = -SPAWN_INTERVAL;
    lastPortalScore.current = 0;
    invincibilityFrames.current = 0;
    hasForcedPortalSpawned.current = false;
    onScoreUpdate(0);

    if (mode === GameMode.DAILY) {
      seededRandom.current = new SeededRandom(getDailySeed());
    } else {
      seededRandom.current = null;
    }
  }, [mode, onScoreUpdate]);

  const flap = useCallback((e: React.PointerEvent | PointerEvent) => {
    if (state === GameState.PLAYING) {
      if (e.cancelable) e.preventDefault();
      
      const currentFlap = activeMode.current === ActiveMode.GRAVITY ? -FLAP : FLAP;
      birds.current.forEach(bird => {
        if (bird.active) {
          bird.vel = currentFlap;
          emitParticles(bird.x, bird.y, 3, getBirdColor(bird.creationMode));
        }
      });
      sounds.playFlap();
    }
  }, [state]);

  useEffect(() => {
    if (state === GameState.PLAYING) {
      initGame();
      sounds.playBgm();
    } else {
      sounds.stopBgm();
    }
  }, [state, initGame]);

  const spawnObstacle = (canvasWidth: number, canvasHeight: number) => {
    const rng = seededRandom.current ? seededRandom.current.next() : Math.random();
    let newObstacles: Obstacle[] = [];
    const monsterTypes: MonsterType[] = ['saw', 'gear', 'bloat', 'square'];
    const chosenType = monsterTypes[Math.floor(rng * monsterTypes.length)];
    const groupId = 'grp_' + Math.random().toString(36).substr(2, 9);

    if (startingMode !== ActiveMode.NORMAL && !hasForcedPortalSpawned.current) {
        hasForcedPortalSpawned.current = true;
        newObstacles.push({
            id: 'forced_portal', groupId: 'forced_grp', type: 'portal', portalType: startingMode,
            x: canvasWidth + 100, y: canvasHeight / 2, width: 150, height: 150,
            speedX: 0, speedY: 0, phase: 0, rotation: 0, passed: false
        });
        obstacles.current.push(...newObstacles);
        return;
    }

    const PORTAL_FREQ = mode === GameMode.MASTER ? 4 : 6;
    const currentThresh = Math.floor(score.current / PORTAL_FREQ);
    const lastThresh = Math.floor(lastPortalScore.current / PORTAL_FREQ);
    
    if (currentThresh > lastThresh && score.current > 0) {
      lastPortalScore.current = score.current;
      const savedHighScore = parseInt(localStorage.getItem('shadow_flap_highscore') || '0');
      
      // Portals now unlocked MUCH earlier for testing and discovery
      let availableModes: ActiveMode[] = [ActiveMode.NORMAL];
      
      if (mode === GameMode.MASTER || mode === GameMode.DAILY) {
          availableModes = [ActiveMode.SPLIT, ActiveMode.MIRROR, ActiveMode.GRAVITY, ActiveMode.NORMAL];
      } else {
          if (savedHighScore >= 150) availableModes = [ActiveMode.SPLIT, ActiveMode.MIRROR, ActiveMode.GRAVITY, ActiveMode.NORMAL];
          else if (savedHighScore >= 50) availableModes = [ActiveMode.SPLIT, ActiveMode.MIRROR, ActiveMode.NORMAL];
          else availableModes = [ActiveMode.SPLIT, ActiveMode.NORMAL];
      }

      const filteredModes = availableModes.filter(m => m !== activeMode.current);
      const portalToSpawn = filteredModes.length > 0 
        ? filteredModes[Math.floor(rng * filteredModes.length)] 
        : availableModes[Math.floor(rng * availableModes.length)];

      newObstacles.push({
          id: groupId + '_portal', groupId, type: 'portal', portalType: portalToSpawn,
          x: canvasWidth + 250, y: 150 + (rng * (canvasHeight - 300)), width: 160, height: 160,
          speedX: 0, speedY: 0, phase: 0, rotation: 0, passed: false
      });
      obstacles.current.push(...newObstacles);
      return;
    }

    if (rng < 0.15) {
      newObstacles.push({
        id: groupId, groupId, type: 'monster', monsterType: 'square',
        x: canvasWidth + 200, y: canvasHeight / 2, width: 250, height: 250,
        speedX: 0, speedY: 1, phase: 0, rotation: 0, passed: false
      });
    } else if (rng < 0.3) {
      const gapY = 250 + (rng * (canvasHeight - 500));
      const gapSize = settings.gapSize - (Math.min(score.current, 500) * 0.1);
      newObstacles.push({
        id: groupId + '_t', groupId, type: 'pillar', x: canvasWidth, y: 0, width: 80, height: gapY - gapSize / 2,
        speedX: 0, speedY: 0, phase: 0, rotation: 0, passed: false
      });
      newObstacles.push({
        id: groupId + '_b', groupId, type: 'pillar', x: canvasWidth, y: gapY + gapSize / 2, width: 80, height: canvasHeight - (gapY + gapSize / 2),
        speedX: 0, speedY: 0, phase: 0, rotation: 0, passed: false
      });
    } else if (rng < 0.45) {
      for (let i = 0; i < 4; i++) {
        newObstacles.push({
          id: groupId + i, groupId, type: 'monster', monsterType: chosenType,
          x: canvasWidth + (i * 100), y: 100, width: 80, height: 80,
          speedX: 0, speedY: 0, rotation: 0, passed: false, phase: i * 0.5
        });
        newObstacles.push({
          id: groupId + i + 'b', groupId, type: 'monster', monsterType: chosenType,
          x: canvasWidth + (i * 100), y: canvasHeight - 100, width: 80, height: 80,
          speedX: 0, speedY: 0, rotation: 0, passed: false, phase: i * 0.5
        });
      }
    } else if (rng < 0.6) {
      const centerX = canvasWidth + 200;
      const centerY = 300 + (rng * (canvasHeight - 600));
      for (let i = 0; i < 3; i++) {
        newObstacles.push({
          id: groupId + i, groupId, type: 'monster', monsterType: chosenType,
          x: centerX, y: centerY, width: 70, height: 70,
          speedX: 0, speedY: 0, rotation: 0, passed: false,
          orbitCenter: { x: centerX, y: centerY },
          orbitRadius: 100, orbitAngle: (i / 3) * Math.PI * 2,
          orbitSpeed: 0.05, phase: 0
        });
      }
    } else if (rng < 0.75) {
      newObstacles.push({
        id: groupId, groupId, type: 'spider', monsterType: 'bloat',
        x: canvasWidth + 100, y: 0, width: 90, height: 90,
        speedX: 0, speedY: 2.5, rotation: 0, passed: false, phase: 0
      });
    } else {
      const cx = canvasWidth + 200;
      const cy = canvasHeight / 2;
      for (let i = 0; i < 4; i++) {
        newObstacles.push({
          id: groupId + i, groupId, type: 'monster', monsterType: chosenType,
          x: cx, y: cy, width: 70, height: 70,
          speedX: 0, speedY: 0, rotation: 0, passed: false,
          orbitCenter: { x: cx, y: cy },
          orbitRadius: 180, orbitAngle: (i / 4) * Math.PI * 2,
          orbitSpeed: 0.0005, isPulsing: true, phase: i
        });
      }
    }

    obstacles.current.push(...newObstacles);
  };

  const update = () => {
    const canvas = canvasRef.current;
    if (!canvas || state !== GameState.PLAYING) return;

    worldOffset.current += SPEED;
    if (invincibilityFrames.current > 0) invincibilityFrames.current--;
    if (shakeIntensity.current > 0) shakeIntensity.current *= 0.9;

    // Update Particles
    particles.current.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.02;
    });
    particles.current = particles.current.filter(p => p.life > 0);

    // Bird Updates
    const curGravity = activeMode.current === ActiveMode.GRAVITY ? -GRAVITY : GRAVITY;
    birds.current.forEach(bird => {
      if (!bird.active) return;
      
      bird.vel += curGravity;
      bird.y += bird.vel;

      const inflation = Math.max(1, 1 - (bird.vel * 0.08));
      bird.trail.unshift({ x: bird.x, y: bird.y, alpha: 0.4, scale: inflation });
      if (bird.trail.length > 20) bird.trail.pop();
      bird.trail.forEach(p => p.alpha -= 0.02);

      // ROOF COLLISION: Tightened boundary
      if (bird.y < 0) {
        if (activeMode.current !== ActiveMode.NORMAL) {
          // Instead of immediate reset, give a chance if multiple birds exist
          handleCollision(bird);
          if (bird.active) { // If it was protected by armor
            bird.y = 50;
            bird.vel = 1;
          }
        } else {
          bird.active = false;
        }
      }

      // FLOOR COLLISION
      if (bird.y > canvas.height) {
          if (activeMode.current !== ActiveMode.NORMAL) {
              handleCollision(bird);
              if (bird.active) {
                bird.y = canvas.height / 2;
                bird.vel = -2;
              }
          } else {
              bird.active = false;
          }
      }
    });

    const activeBirds = birds.current.filter(b => b.active);
    if (activeBirds.length === 0) {
      sounds.playHit();
      onGameOver(score.current);
      return;
    }

    if (worldOffset.current - lastSpawn.current > SPAWN_INTERVAL) {
      spawnObstacle(canvas.width, canvas.height);
      lastSpawn.current = worldOffset.current;
    }

    const leadBird = activeBirds.reduce((prev, curr) => (curr.x > prev.x ? curr : prev), activeBirds[0]);

    obstacles.current.forEach(obs => {
      obs.x -= SPEED;
      
      if (obs.orbitCenter) {
        obs.orbitAngle! += obs.orbitSpeed!;
        obs.orbitCenter.x -= SPEED;
        const currentRadius = obs.isPulsing ? obs.orbitRadius! + Math.sin(worldOffset.current * 0.01) * 180 : obs.orbitRadius!;
        obs.x = obs.orbitCenter.x + Math.cos(obs.orbitAngle!) * currentRadius;
        obs.y = obs.orbitCenter.y + Math.sin(obs.orbitAngle!) * currentRadius;
        obs.rotation += 0.04;
      } else if (obs.type === 'spider') {
        obs.y = (canvas.height / 2) + Math.sin((worldOffset.current * 0.012)) * (canvas.height * 0.4);
      } else if (obs.groupId.startsWith('grp') && obs.y < 200 && obs.type === 'monster') { 
        obs.y = 80 + Math.sin(worldOffset.current * 0.02 + obs.phase) * 60;
      } else if (obs.groupId.startsWith('grp') && obs.y > canvas.height - 200 && obs.type === 'monster') {
        obs.y = canvas.height - 80 - Math.sin(worldOffset.current * 0.02 + obs.phase) * 60;
      }

      if (!obs.passed && obs.x < leadBird.x) {
        obs.passed = true;
        if (!scoredGroups.current.has(obs.groupId)) {
          scoredGroups.current.add(obs.groupId);
          score.current += 1;
          onScoreUpdate(score.current);
          sounds.playScore();
          emitParticles(leadBird.x, leadBird.y, 8, '#ffea00');
        }
      }

      activeBirds.forEach(bird => {
        if (invincibilityFrames.current > 0 && obs.type !== 'portal') return;

        const inflationScale = Math.max(1, 1 - (bird.vel * 0.08));
        const effectiveBirdR = BIRD_RADIUS * inflationScale;
        const dx = bird.x - obs.x;
        const dy = bird.y - obs.y;
        const distSq = dx*dx + dy*dy;

        if (obs.type === 'pillar') {
            if (bird.x + effectiveBirdR > obs.x && bird.x - effectiveBirdR < obs.x + obs.width &&
                bird.y + effectiveBirdR > obs.y && bird.y - effectiveBirdR < obs.y + obs.height) {
                handleCollision(bird);
            }
        } else if (obs.type === 'portal') {
            if (Math.sqrt(distSq) < effectiveBirdR + (obs.width / 2)) {
                activeMode.current = obs.portalType!;
                obs.passed = true;
                obs.x = -3000;
                emitParticles(bird.x, bird.y, 25, getBirdColor(obs.portalType!));
                
                if (activeMode.current === ActiveMode.SPLIT) {
                    const baseBird = birds.current.find(b => b.active) || bird;
                    // REFINED SPLIT: Balanced spread
                    birds.current = [
                        { ...baseBird, y: baseBird.y - 180, active: true, trail: [], creationMode: ActiveMode.SPLIT },
                        { ...baseBird, x: baseBird.x + 60, active: true, trail: [], creationMode: ActiveMode.SPLIT },
                        { ...baseBird, y: baseBird.y + 180, active: true, trail: [], creationMode: ActiveMode.SPLIT }
                    ];
                } else {
                    // Update current birds to the new mode color/visuals
                    birds.current.forEach(b => {
                        if (b.active) b.creationMode = activeMode.current;
                    });
                    
                    if (activeMode.current === ActiveMode.NORMAL && birds.current.length > 1) {
                        const mainBird = birds.current.find(b => b.active) || bird;
                        birds.current = [{ ...mainBird, active: true, trail: [], creationMode: ActiveMode.NORMAL }];
                    }
                }
            }
        } else {
            const combinedR = effectiveBirdR + (obs.width / 2) - 10;
            if (distSq < combinedR * combinedR) {
                handleCollision(bird);
            }
        }
      });
    });

    obstacles.current = obstacles.current.filter(obs => obs.x + 1000 > 0);
  };

  const handleCollision = (bird: BirdEntity) => {
      emitParticles(bird.x, bird.y, 20, (activeMode.current === ActiveMode.NORMAL ? '#ff4444' : getBirdColor(bird.creationMode)));
      shakeIntensity.current = 15;
      glitchTime.current = 10;
      if (activeMode.current === ActiveMode.SPLIT) {
          bird.active = false;
          sounds.playHit();
          const remainingCount = birds.current.filter(b => b.active).length;
          // Only flip to normal when NO MORE split birds are left
          if (remainingCount === 0) {
              activeMode.current = ActiveMode.NORMAL;
          } else if (remainingCount === 1) {
              // Optionally stay blue until specifically changed by a portal
              // We'll keep the visual blue but revert gameplay rules if needed
              activeMode.current = ActiveMode.NORMAL; 
              // BUT: The survivor's creationMode is still SPLIT, so it stays blue.
          }
      } else if (activeMode.current === ActiveMode.NORMAL) {
          bird.active = false;
      } else {
          // Mirror or Gravity armor
          activeMode.current = ActiveMode.NORMAL;
          invincibilityFrames.current = 120;
          sounds.playHit();
          bird.vel = 0;
          bird.creationMode = ActiveMode.NORMAL; // Snap to normal color
      }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    ctx.save();
    if (activeMode.current === ActiveMode.MIRROR) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
    }

    if (shakeIntensity.current > 0.5) {
        const sx = (Math.random() - 0.5) * shakeIntensity.current;
        const sy = (Math.random() - 0.5) * shakeIntensity.current;
        ctx.translate(sx, sy);
    }

    if (glitchTime.current > 0) {
        glitchTime.current--;
        // Chromatic aberration / scanline glitch
        if (Math.random() > 0.5) {
            ctx.fillStyle = '#ff00ff22';
            ctx.fillRect(0, Math.random() * canvas.height, canvas.width, 2);
            ctx.fillStyle = '#00ffff22';
            ctx.fillRect(Math.random() * 10 - 5, 0, canvas.width, canvas.height);
        }
    }

    drawBackground(ctx, canvas.width, canvas.height, worldOffset.current);
    
    // Particles
    drawParticles(ctx, particles.current);
    
    birds.current.forEach(bird => {
      if (bird.active || bird.trail.length > 0) {
        // Use bird's creationMode for trail color to prevent black flashing
        drawTrail(ctx, bird.trail, BIRD_RADIUS, bird.creationMode);
      }
    });

    obstacles.current.forEach(obs => {
      if (obs.type === 'pillar') {
        drawPillar(ctx, obs.x, obs.y, obs.width, obs.height, obs.y === 0);
      } else if (obs.type === 'portal') {
        drawPortal(ctx, obs.x, obs.y, obs.width / 2, obs.portalType!);
      } else {
        const targetBird = birds.current.find(b => b.active) || birds.current[0];
        drawMonster(
            ctx, obs.x, obs.y, obs.width / 2, obs.rotation, 
            targetBird.x, targetBird.y, obs.monsterType,
            obs.type === 'spider'
        );
      }
    });

    birds.current.forEach(bird => {
      if (bird.active) {
        const opacity = (invincibilityFrames.current > 0 && Math.floor(Date.now() / 100) % 2 === 0) ? 0.3 : 1.0;
        // Use bird's individual creationMode instead of global activeMode to keep color consistent
        drawBird(ctx, bird.x, bird.y, BIRD_RADIUS, bird.vel, bird.creationMode, opacity);
      }
    });

    ctx.restore();

    requestRef.current = requestAnimationFrame(() => {
        update();
        draw();
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (state === GameState.PLAYING) initGame();
    };
    window.addEventListener('resize', resize);
    resize();
    requestRef.current = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(requestRef.current);
    };
  }, [state, initGame]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full block touch-none cursor-pointer"
      onPointerDown={flap}
    />
  );
};

export default GameCanvas;
