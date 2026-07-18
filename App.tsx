
import React, { useState, useEffect, useCallback } from 'react';
import GameCanvas from './components/GameCanvas';
import { GameMode, GameState, ActiveMode, DifficultyLevel } from './types';
import { getRank } from './utils/gameLogic';
import { Trophy, Play, Calendar, RotateCcw, Zap, Check, Flame, Star, Shield, Sword, Ghost, GraduationCap, BookOpen } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.RANDOM);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(DifficultyLevel.MEDIUM);
  const [selectedBonusMode, setSelectedBonusMode] = useState<ActiveMode>(ActiveMode.NORMAL);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0); 
  const [dailyHighScore, setDailyHighScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('shadow_flap_highscore');
    if (saved) {
        const val = parseInt(saved, 10);
        setHighScore(val);
    } else {
        localStorage.setItem('shadow_flap_highscore', '0');
        setHighScore(0);
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
          difficulty={difficulty}
          highScore={highScore}
          onGameOver={handleGameOver} 
          onScoreUpdate={setScore}
          startingMode={selectedBonusMode}
        />
      </div>

      {gameState === GameState.MENU && (
        <div className="absolute inset-0 z-10 bg-black/85 backdrop-blur-sm px-4 py-8 overflow-y-auto flex flex-col items-center justify-start sm:justify-center min-h-full text-center animate-in fade-in duration-500">
          <div className="w-full max-w-xs sm:max-w-sm my-auto flex flex-col items-center py-4">
            <h1 className="text-5xl sm:text-6xl font-black mb-1 sm:mb-2 tracking-tighter uppercase italic">
              Shadow<span className="text-red-600">Flap</span>
            </h1>
            <p className="text-gray-400 mb-5 sm:mb-6 text-xs sm:text-sm italic opacity-75">"Identify the portals, master the chaos."</p>

            <div className="flex flex-col items-center w-full max-w-xs mb-6 sm:mb-8">
                <span className="text-[10px] font-bold text-gray-500 mb-2 sm:mb-3 uppercase tracking-widest">Select Intensity</span>
                <div className="grid grid-cols-3 gap-2 w-full">
                    <button 
                      onClick={() => setDifficulty(DifficultyLevel.EASY)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${difficulty === DifficultyLevel.EASY ? 'bg-green-600 border-green-400 scale-105 z-10' : 'bg-white/5 border-white/10 opacity-50 hover:opacity-100'}`}
                    >
                      <Shield size={18} className={difficulty === DifficultyLevel.EASY ? "text-white" : "text-green-500"} />
                      <span className="text-[10px] font-black mt-1 uppercase">Easy</span>
                    </button>
                    <button 
                      onClick={() => setDifficulty(DifficultyLevel.MEDIUM)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${difficulty === DifficultyLevel.MEDIUM ? 'bg-blue-600 border-blue-400 scale-105 z-10' : 'bg-white/5 border-white/10 opacity-50 hover:opacity-100'}`}
                    >
                      <Sword size={18} className={difficulty === DifficultyLevel.MEDIUM ? "text-white" : "text-blue-500"} />
                      <span className="text-[10px] font-black mt-1 uppercase">Mid</span>
                    </button>
                    <button 
                      onClick={() => setDifficulty(DifficultyLevel.HARD)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${difficulty === DifficultyLevel.HARD ? 'bg-red-600 border-red-400 scale-105 z-10' : 'bg-white/5 border-white/10 opacity-50 hover:opacity-100'}`}
                    >
                      <Ghost size={18} className={difficulty === DifficultyLevel.HARD ? "text-white" : "text-red-500"} />
                      <span className="text-[10px] font-black mt-1 uppercase">Hard</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-2.5 w-full max-w-xs">
              <button 
                onClick={() => startGame(GameMode.RANDOM)}
                className="group flex items-center justify-between bg-white text-black px-6 py-2.5 rounded-2xl font-bold text-base active:scale-95 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Play className="fill-current" size={18} />
                  <span>{selectedBonusMode !== ActiveMode.NORMAL ? `Start ${selectedBonusMode}` : 'Endless Run'}</span>
                </div>
                <span className="text-[10px] opacity-50 font-black tracking-widest">#{highScore}</span>
              </button>

              <button 
                onClick={() => startGame(GameMode.DAILY)}
                className="group flex items-center justify-between bg-gray-800 text-white px-6 py-2.5 rounded-2xl font-bold text-base border border-white/10 active:scale-95 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Calendar size = {18} />
                  <span>Daily Track</span>
                </div>
                <span className="text-[10px] opacity-50 font-black tracking-widest">#{dailyHighScore}</span>
              </button>

              <button 
                onClick={() => startGame(GameMode.MASTER)}
                className={`group flex items-center justify-between px-6 py-2.5 rounded-2xl font-bold text-base transition-all ${highScore >= 50 ? 'bg-red-600 text-white active:scale-95' : 'bg-gray-900 text-gray-600 border border-white/5 opacity-50 cursor-not-allowed'}`}
                disabled={highScore < 50}
              >
                <div className="flex items-center gap-3">
                  <Flame size={18} className={highScore >= 50 ? "animate-pulse" : ""} />
                  <span>Chaos Master</span>
                </div>
                <span className="text-[10px] uppercase font-black tracking-widest">{highScore >= 50 ? 'Chaos' : 'LOCKED'}</span>
              </button>

              <button 
                onClick={() => startGame(GameMode.PRACTICE)}
                className="group flex items-center justify-between bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2.5 rounded-2xl font-bold text-base border border-emerald-500/20 active:scale-95 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                <div className="flex items-center gap-3">
                  <GraduationCap size={18} className="animate-pulse text-emerald-300" />
                  <span>Practice Mode</span>
                </div>
                <span className="text-[10px] uppercase font-black tracking-widest bg-emerald-950/40 px-2 py-0.5 rounded-full text-emerald-300 font-mono">Guide</span>
              </button>
            </div>

            <div className="mt-6 flex flex-col items-center w-full max-w-xs">
                <span className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">Select Start Portal (Dev Mode)</span>
                <div className="grid grid-cols-3 gap-2 w-full">
                    <button 
                      onClick={() => toggleMode(ActiveMode.SPLIT)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center transition-all border-blue-500/50 bg-blue-500/10 ${selectedBonusMode === ActiveMode.SPLIT ? 'bg-blue-600 border-blue-400' : 'bg-black/50'}`}
                    >
                        {selectedBonusMode === ActiveMode.SPLIT && <Check size={10} className="absolute top-1 right-1" />}
                        <Zap size={18} className={selectedBonusMode === ActiveMode.SPLIT ? "text-white" : "text-blue-400"} />
                        <span className="text-[9px] font-bold mt-1 uppercase">Split</span>
                    </button>
                    <button 
                      onClick={() => toggleMode(ActiveMode.MIRROR)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center transition-all border-purple-500/50 bg-purple-500/10 ${selectedBonusMode === ActiveMode.MIRROR ? 'bg-purple-600 border-purple-400' : 'bg-black/50'}`}
                    >
                        {selectedBonusMode === ActiveMode.MIRROR && <Check size={10} className="absolute top-1 right-1" />}
                        <Zap size={18} className={selectedBonusMode === ActiveMode.MIRROR ? "text-white" : "text-purple-400"} />
                        <span className="text-[9px] font-bold mt-1 uppercase">Mirror</span>
                    </button>
                    <button 
                      onClick={() => toggleMode(ActiveMode.GRAVITY)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center transition-all border-orange-500/50 bg-orange-500/10 ${selectedBonusMode === ActiveMode.GRAVITY ? 'bg-orange-600 border-orange-400' : 'bg-black/50'}`}
                    >
                        {selectedBonusMode === ActiveMode.GRAVITY && <Check size={10} className="absolute top-1 right-1" />}
                        <Zap size={18} className={selectedBonusMode === ActiveMode.GRAVITY ? "text-white" : "text-orange-400"} />
                        <span className="text-[9px] font-bold mt-1 uppercase">Gravity</span>
                    </button>
                </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-gray-600">
               <Trophy size={14} />
               <span className="text-[10px] font-semibold uppercase tracking-widest">Global Seeded Survival</span>
            </div>
          </div>
        </div>
      )}

      {gameState === GameState.PLAYING && (
        <div className="absolute top-0 inset-x-0 z-10 flex flex-col items-center pt-12 pointer-events-none">
          <div className="bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
             <span className="text-4xl font-black tabular-nums">{score}</span>
          </div>
          <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">
             {gameMode === GameMode.PRACTICE ? "Practice & Guide" : gameMode === GameMode.DAILY ? "Today's Track" : gameMode === GameMode.MASTER ? "Chaos Track" : "Random Mode"}
          </div>
        </div>
      )}

      {gameState === GameState.PLAYING && gameMode === GameMode.PRACTICE && (
        <div className="absolute top-28 inset-x-0 z-10 flex flex-col items-center pointer-events-auto">
          <div className="mt-2 bg-emerald-950/80 backdrop-blur-md px-4 py-3 rounded-2xl border border-emerald-500/30 text-center max-w-xs sm:max-w-md mx-4 shadow-[0_0_20px_rgba(16,185,129,0.15)] animate-in fade-in duration-300">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-1">🎓 Practice Mode Active</span>
            <p className="text-[10px] text-gray-300 leading-normal max-w-[280px]">
              • Speed slowed to 60% <br />
              • Infinite lives (auto-shield active) <br />
              • White: Drop curve • Blue: Tap curve <br />
              • Green: Upcoming gap guide
            </p>
          </div>
          <button
            onClick={() => setGameState(GameState.MENU)}
            className="mt-3 px-4 py-1.5 bg-red-950/80 hover:bg-red-900 border border-red-500/40 rounded-full text-[10px] font-black uppercase tracking-wider text-red-300 active:scale-95 transition-all pointer-events-auto shadow-[0_0_10px_rgba(239,68,68,0.2)]"
          >
            End Practice & Exit
          </button>
        </div>
      )}

      {gameState === GameState.GAMEOVER && (
        <div className="absolute inset-0 z-10 bg-black/95 px-4 py-8 overflow-y-auto flex flex-col items-center justify-start sm:justify-center min-h-full text-center animate-in zoom-in duration-300">
          <div className="w-full max-w-xs sm:max-w-sm my-auto flex flex-col items-center py-4">
            <div className="flex items-center gap-2 text-red-600 font-black text-xl uppercase tracking-widest mb-4">
              <Flame size={20} />
              Run Terminated
            </div>
            
            <div className="relative mb-6 p-8 bg-white/5 rounded-3xl border border-white/10 w-full max-w-xs">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black px-4 py-0.5 rounded-full border border-white/20 text-[8px] font-bold uppercase tracking-[0.2em] text-gray-500">Performance</div>
              
              <div className="text-gray-400 uppercase text-[9px] font-bold tracking-[0.3em] mb-1">Final Score</div>
              <div className="text-7xl font-black mb-3 tabular-nums animate-pulse">{score}</div>
              
              <div className="flex items-center justify-center gap-4">
                  <div className="flex flex-col items-center">
                      <div className={`text-4xl font-black ${getRank(score).color}`}>{getRank(score).label}</div>
                      <div className="text-[8px] font-bold uppercase text-gray-600">Rank</div>
                  </div>
                  {score >= highScore && score > 0 && (
                      <div className="flex flex-col items-center text-yellow-500">
                          <Star className="fill-current" size={20} />
                          <div className="text-[8px] font-bold uppercase">Record</div>
                      </div>
                  )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 w-full max-w-xs">
               <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                  <div className="text-gray-500 uppercase text-[8px] font-bold tracking-widest mb-1">Best (Run)</div>
                  <div className="text-lg font-bold tabular-nums">{highScore}</div>
               </div>
               <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                  <div className="text-gray-500 uppercase text-[8px] font-bold tracking-widest mb-1">Best (Daily)</div>
                  <div className="text-lg font-bold tabular-nums">{dailyHighScore}</div>
               </div>
            </div>

            <div className="flex flex-col gap-2.5 w-full max-w-xs">
              <button 
                onClick={() => startGame(gameMode)}
                className="flex items-center justify-center gap-3 bg-white text-black px-6 py-3 rounded-2xl font-bold text-lg active:scale-95 hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              >
                <RotateCcw size={20} />
                Redeploy
              </button>
              <button 
                onClick={() => setGameState(GameState.MENU)}
                className="px-6 py-2.5 text-gray-500 hover:text-white font-bold uppercase text-xs tracking-[0.2em] transition-colors"
              >
                Return to Interface
              </button>
            </div>
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
