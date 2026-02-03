import { useEffect } from 'react';
import GameBoard from './GameBoard';
import GameControls from './GameControls';
import ScoreBoard from './ScoreBoard';
import useSnakeGame from '../hooks/useSnakeGame';
import { Gamepad2 } from 'lucide-react';

export default function Game() {
  const {
    gameState,
    startGame,
    pauseGame,
    resumeGame,
    changeDirection
  } = useSnakeGame();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        if (gameState.gameOver) {
          startGame();
        } else if (gameState.isPaused) {
          resumeGame();
        } else {
          pauseGame();
        }
      } else {
        changeDirection(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.gameOver, gameState.isPaused, startGame, pauseGame, resumeGame, changeDirection]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-3">
        <Gamepad2 className="w-8 h-8 text-green-500" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          Snake Game
        </h1>
      </div>
      
      <ScoreBoard 
        score={gameState.score} 
        highScore={gameState.highScore}
        speed={gameState.speed}
      />
      
      <GameBoard gameState={gameState} />
      
      <GameControls
        gameState={gameState}
        onStart={startGame}
        onPause={pauseGame}
        onResume={resumeGame}
        onDirectionChange={changeDirection}
      />
      
      <div className="text-center text-gray-400 text-sm space-y-1">
        <p>Use Arrow Keys or WASD to move</p>
        <p>Press SPACE to pause/resume</p>
      </div>
    </div>
  );
}