import { Play, Pause, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { GameState } from '../types/game';

interface GameControlsProps {
  gameState: GameState;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onDirectionChange: (key: string) => void;
}

export default function GameControls({
  gameState,
  onStart,
  onPause,
  onResume,
  onDirectionChange
}: GameControlsProps) {
  const handleDirectionClick = (direction: string) => {
    if (!gameState.gameOver && !gameState.isPaused) {
      onDirectionChange(direction);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Main controls */}
      <div className="flex gap-2">
        {gameState.gameOver ? (
          <button
            onClick={onStart}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            New Game
          </button>
        ) : gameState.isPaused ? (
          <button
            onClick={onResume}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-lg"
          >
            <Play className="w-5 h-5" />
            Resume
          </button>
        ) : (
          <button
            onClick={onPause}
            className="flex items-center gap-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition-colors shadow-lg"
          >
            <Pause className="w-5 h-5" />
            Pause
          </button>
        )}
      </div>

      {/* Direction controls for mobile */}
      <div className="grid grid-cols-3 gap-2 md:hidden">
        <div />
        <button
          onClick={() => handleDirectionClick('ArrowUp')}
          className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          disabled={gameState.gameOver || gameState.isPaused}
        >
          <ArrowUp className="w-6 h-6" />
        </button>
        <div />
        
        <button
          onClick={() => handleDirectionClick('ArrowLeft')}
          className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          disabled={gameState.gameOver || gameState.isPaused}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div />
        <button
          onClick={() => handleDirectionClick('ArrowRight')}
          className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          disabled={gameState.gameOver || gameState.isPaused}
        >
          <ArrowRight className="w-6 h-6" />
        </button>
        
        <div />
        <button
          onClick={() => handleDirectionClick('ArrowDown')}
          className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          disabled={gameState.gameOver || gameState.isPaused}
        >
          <ArrowDown className="w-6 h-6" />
        </button>
        <div />
      </div>
    </div>
  );
}