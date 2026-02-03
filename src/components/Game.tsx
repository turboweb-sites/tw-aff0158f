import { useState, useCallback, useEffect } from 'react';
import { RotateCcw, Play, Pause, Zap } from 'lucide-react';
import GameBoard from './GameBoard';
import Controls from './Controls';
import ScoreBoard from './ScoreBoard';
import useSnakeGame from '../hooks/useSnakeGame';
import { Direction } from '../types/game';

export default function Game() {
  const {
    gameState,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    changeDirection,
  } = useSnakeGame();

  const [showMobileControls, setShowMobileControls] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setShowMobileControls(isMobile);

    const handleResize = () => {
      setShowMobileControls(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState.isGameOver) return;

      const keyMap: Record<string, Direction> = {
        'ArrowUp': 'UP',
        'ArrowDown': 'DOWN',
        'ArrowLeft': 'LEFT',
        'ArrowRight': 'RIGHT',
        'w': 'UP',
        's': 'DOWN',
        'a': 'LEFT',
        'd': 'RIGHT',
      };

      if (keyMap[e.key]) {
        e.preventDefault();
        changeDirection(keyMap[e.key]);
      }

      if (e.key === ' ') {
        e.preventDefault();
        if (gameState.isPaused) {
          resumeGame();
        } else {
          pauseGame();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.isGameOver, gameState.isPaused, changeDirection, pauseGame, resumeGame]);

  const handlePlayPause = useCallback(() => {
    if (gameState.isGameOver) {
      resetGame();
      startGame();
    } else if (gameState.isPaused) {
      resumeGame();
    } else {
      pauseGame();
    }
  }, [gameState.isGameOver, gameState.isPaused, resetGame, startGame, resumeGame, pauseGame]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <span className="text-6xl">🐍</span>
          Змейка
        </h1>
        <p className="text-gray-400">Используйте стрелки или WASD для управления</p>
      </div>

      <ScoreBoard 
        score={gameState.score} 
        highScore={gameState.highScore}
        speed={gameState.speed}
      />

      <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl">
        <GameBoard gameState={gameState} />

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={handlePlayPause}
            className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all transform hover:scale-105 ${
              gameState.isGameOver
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : gameState.isPaused
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-yellow-600 hover:bg-yellow-700 text-white'
            }`}
          >
            {gameState.isGameOver ? (
              <>
                <Play size={20} />
                Новая игра
              </>
            ) : gameState.isPaused ? (
              <>
                <Play size={20} />
                Продолжить
              </>
            ) : (
              <>
                <Pause size={20} />
                Пауза
              </>
            )}
          </button>

          {!gameState.isGameOver && (
            <button
              onClick={() => {
                resetGame();
                startGame();
              }}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold flex items-center gap-2 transition-all transform hover:scale-105"
            >
              <RotateCcw size={20} />
              Сброс
            </button>
          )}
        </div>

        {showMobileControls && !gameState.isGameOver && (
          <div className="mt-6">
            <Controls onDirectionChange={changeDirection} disabled={gameState.isPaused} />
          </div>
        )}
      </div>

      {gameState.isGameOver && (
        <div className="mt-8 text-center">
          <h2 className="text-3xl font-bold text-red-500 mb-2">Игра окончена!</h2>
          <p className="text-xl text-gray-400">
            Ваш счёт: <span className="font-bold text-white">{gameState.score}</span>
          </p>
          {gameState.score === gameState.highScore && gameState.score > 0 && (
            <p className="text-lg text-yellow-500 mt-2 flex items-center justify-center gap-2">
              <Zap size={20} />
              Новый рекорд!
            </p>
          )}
        </div>
      )}

      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Съешьте красную еду, чтобы расти</p>
        <p>Избегайте столкновений со стенами и своим телом</p>
        <p className="mt-2">Нажмите пробел для паузы</p>
      </div>
    </div>
  );
}