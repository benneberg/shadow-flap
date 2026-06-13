
import React, { useState, useEffect, useCallback } from 'react';
import GameCanvas from './components/GameCanvas';
import { GameMode, GameState, ActiveMode } from './types';
import { Trophy, Play, Calendar, RotateCcw, Zap, Check, Flame, Star } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.RANDOM);
  const [selectedBonusMode, setSelectedBonusMode] = useState<ActiveMode>(ActiveMode.NORMAL);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(1500); 
  const [dailyHighScore, setDailyHighScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('shadow_flap_highscore');
    if (saved) {
        const val = parseInt(saved, 10);
        setHighScore(Math.max(1500, val));
    } else {
        localStorage.setItem('shadow_flap_highscore', '1500');
        setHighScore(1500);
    }
    
    const dailyKey = `daily_${new Date().toDateString()}`;
    const dailyData = localStorage.getItem(dailyKey);
    if (dailyData) setDailyHighScore(parseInt(dailyData, 10));
  }, []);

  const handleGameOver = useCallback((finalScore: number) => {
    setGameState(GameState.GAMEOVER);
    
    if (gameMode === GameMode.RANDOM || gameMode === GameMode.MASTER) {
      if (finalScore > highScore) {
        setHighScore(finalScore);
        localStorage.setItem('shadow_flap_highscore', finalScore.toString());
      }
    } else {
      const dailyKey = `daily_${new Date().toDateString()}`;
      if (finalScore > dailyHighScore) {
        setDailyHighScore(finalScore);
        localStorage.setItem(dailyKey, finalScore.toString());
      }
    }
  }, [gameMode, highScore, dailyHighScore]);

  const getRank = (s: number) => {
      if (s >= 5000) return { label: 'S+', color: 'text-yellow-400' };
      if (s >= 2500) return { label: 'S', color: 'text-red-500' };
      if (s >= 1000) return { label: 'A', color: 'text-purple-500' };
      if (s >= 500) return { label: 'B', color: 'text-blue-500' };
      if (s >= 200) return { label: 'C', color: 'text-green-500' };
      return { label: 'D', color: 'text-gray-400' };
  };

  const startGame = (mode: GameMode) => {
    setGameMode(mode);
    setGameState(GameState.PLAYING);
    setScore(0);
  };

  const toggleMode = (mode: ActiveMode) => {
    if (selectedBonusMode === mode) {
      setSelectedBonusMode(ActiveMode.NORMAL);
    } else {
      setSelectedBonusMode(mode);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black font-sans text-white">
      <div className="absolute inset-0 z-0">
        <GameCanvas 
          mode={gameMode} 
          state={gameState} 
          onGameOver={handleGameOver} 
          onScoreUpdate={setScore}
          startingMode={selectedBonusMode}
        />
      </div>

      {gameState === GameState.MENU && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm p-6 text-center animate-in fade-in duration-500">
          <h1 className="text-6xl font-black mb-2 tracking-tighter uppercase italic">
            Shadow<span className="text-red-600">Flap</span>
          </h1>
          <p className="text-gray-400 mb-8 text-lg italic opacity-75">"Identify the portals, master the chaos."</p>

          <div className="grid grid-cols-1 gap-3 w-full max-w-xs">
            <button 
              onClick={() => startGame(GameMode.RANDOM)}
              className="group flex items-center justify-between bg-white text-black px-6 py-3 rounded-2xl font-bold text-lg active:scale-95 transition-all"
            >
              <div className="flex items-center gap-3">
                <Play className="fill-current" size={20} />
                <span>{selectedBonusMode !== ActiveMode.NORMAL ? `Start ${selectedBonusMode}` : 'Endless Run'}</span>
              </div>
              <span className="text-[10px] opacity-50 font-black tracking-widest">#{highScore}</span>
            </button>

            <button 
              onClick={() => startGame(GameMode.DAILY)}
              className="group flex items-center justify-between bg-gray-800 text-white px-6 py-3 rounded-2xl font-bold text-lg border border-white/10 active:scale-95 transition-all"
            >
              <div className="flex items-center gap-3">
                <Calendar size={20} />
                <span>Daily Track</span>
              </div>
              <span className="text-[10px] opacity-50 font-black tracking-widest">#{dailyHighScore}</span>
            </button>

            <button 
              onClick={() => startGame(GameMode.MASTER)}
              className={`group flex items-center justify-between px-6 py-3 rounded-2xl font-bold text-lg transition-all ${highScore >= 1500 ? 'bg-red-600 text-white active:scale-95' : 'bg-gray-900 text-gray-600 border border-white/5 opacity-50 cursor-not-allowed'}`}
              disabled={highScore < 1500}
            >
              <div className="flex items-center gap-3">
                <Flame size={20} className={highScore >= 1500 ? "animate-pulse" : ""} />
                <span>Chaos Master</span>
              </div>
              <span className="text-[10px] uppercase font-black tracking-widest">{highScore >= 1500 ? 'Chaos' : 'LOCKED'}</span>
            </button>
          </div>

          <div className="mt-8 flex flex-col items-center w-full max-w-xs">
              <span className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">Select Start Portal (Dev Mode)</span>
              <div className="grid grid-cols-3 gap-2 w-full">
                  <button 
                    onClick={() => toggleMode(ActiveMode.SPLIT)}
                    className={`p-3 rounded-xl border flex flex-col items-center transition-all ${highScore >= 100 ? 'border-blue-500/50 bg-blue-500/10' : 'border-white/10 opacity-30 bg-black/50 pointer-events-none'} ${selectedBonusMode === ActiveMode.SPLIT ? 'bg-blue-600 border-blue-400' : 'bg-black/50'}`}
                  >
                      {selectedBonusMode === ActiveMode.SPLIT && <Check size={12} className="absolute top-1 right-1" />}
                      <Zap size={20} className={selectedBonusMode === ActiveMode.SPLIT ? "text-white" : "text-blue-400"} />
                      <span className="text-[9px] font-bold mt-1 uppercase">Split</span>
                  </button>
                  <button 
                    onClick={() => toggleMode(ActiveMode.MIRROR)}
                    className={`p-3 rounded-xl border flex flex-col items-center transition-all ${highScore >= 500 ? 'border-purple-500/50 bg-purple-500/10' : 'border-white/10 opacity-30 bg-black/50 pointer-events-none'} ${selectedBonusMode === ActiveMode.MIRROR ? 'bg-purple-600 border-purple-400' : 'bg-black/50'}`}
                  >
                      {selectedBonusMode === ActiveMode.MIRROR && <Check size={12} className="absolute top-1 right-1" />}
                      <Zap size={20} className={selectedBonusMode === ActiveMode.MIRROR ? "text-white" : "text-purple-400"} />
                      <span className="text-[9px] font-bold mt-1 uppercase">Mirror</span>
                  </button>
                  <button 
                    onClick={() => toggleMode(ActiveMode.GRAVITY)}
                    className={`p-3 rounded-xl border flex flex-col items-center transition-all ${highScore >= 1000 ? 'border-orange-500/50 bg-orange-500/10' : 'border-white/10 opacity-30 bg-black/50 pointer-events-none'} ${selectedBonusMode === ActiveMode.GRAVITY ? 'bg-orange-600 border-orange-400' : 'bg-black/50'}`}
                  >
                      {selectedBonusMode === ActiveMode.GRAVITY && <Check size={12} className="absolute top-1 right-1" />}
                      <Zap size={20} className={selectedBonusMode === ActiveMode.GRAVITY ? "text-white" : "text-orange-400"} />
                      <span className="text-[9px] font-bold mt-1 uppercase">Gravity</span>
                  </button>
              </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-gray-600">
             <Trophy size={14} />
             <span className="text-[10px] font-semibold uppercase tracking-widest">Global Seeded Survival</span>
          </div>
        </div>
      )}

      {gameState === GameState.PLAYING && (
        <div className="absolute top-0 inset-x-0 z-10 flex flex-col items-center pt-12 pointer-events-none">
          <div className="bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
             <span className="text-4xl font-black tabular-nums">{score}</span>
          </div>
          <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">
             {gameMode === GameMode.DAILY ? "Today's Track" : gameMode === GameMode.MASTER ? "Chaos Track" : "Random Mode"}
          </div>
        </div>
      )}

      {gameState === GameState.GAMEOVER && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/95 p-8 text-center animate-in zoom-in duration-300">
          <div className="flex items-center gap-2 text-red-600 font-black text-xl uppercase tracking-widest mb-4">
            <Flame size={20} />
            Run Terminated
          </div>
          
          <div className="relative mb-8 p-12 bg-white/5 rounded-3xl border border-white/10 w-full max-w-xs">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black px-4 py-1 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Performance</div>
            
            <div className="text-gray-400 uppercase text-[10px] font-bold tracking-[0.3em] mb-2">Final Score</div>
            <div className="text-8xl font-black mb-4 tabular-nums animate-pulse">{score}</div>
            
            <div className="flex items-center justify-center gap-4">
                <div className="flex flex-col items-center">
                    <div className={`text-5xl font-black ${getRank(score).color}`}>{getRank(score).label}</div>
                    <div className="text-[8px] font-bold uppercase text-gray-600">Rank</div>
                </div>
                {score >= highScore && score > 0 && (
                    <div className="flex flex-col items-center text-yellow-500">
                        <Star className="fill-current" size={24} />
                        <div className="text-[8px] font-bold uppercase">Record</div>
                    </div>
                )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-12 w-full max-w-xs">
             <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="text-gray-500 uppercase text-[8px] font-bold tracking-widest mb-1">Best (Run)</div>
                <div className="text-xl font-bold tabular-nums">{highScore}</div>
             </div>
             <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="text-gray-500 uppercase text-[8px] font-bold tracking-widest mb-1">Best (Daily)</div>
                <div className="text-xl font-bold tabular-nums">{dailyHighScore}</div>
             </div>
          </div>

          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button 
              onClick={() => startGame(gameMode)}
              className="flex items-center justify-center gap-3 bg-white text-black px-6 py-4 rounded-2xl font-bold text-xl active:scale-95 hover:bg-gray-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <RotateCcw size={24} />
              Redeploy
            </button>
            <button 
              onClick={() => setGameState(GameState.MENU)}
              className="px-6 py-3 text-gray-500 font-bold uppercase text-xs tracking-[0.2em] hover:text-white transition-colors"
            >
              Return to Interface
            </button>
          </div>
        </div>
      )}

      {gameState === GameState.PLAYING && score === 0 && (
          <div className="absolute bottom-24 inset-x-0 flex flex-col items-center animate-pulse pointer-events-none opacity-50">
             <div className="w-12 h-12 border-4 border-white rounded-full flex items-center justify-center mb-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
             </div>
             <span className="text-xs font-bold uppercase tracking-widest">Tap to Flap</span>
          </div>
      )}
    </div>
  );
};

export default App;
