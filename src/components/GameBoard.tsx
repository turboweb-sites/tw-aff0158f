import { GameState, GRID_SIZE, CELL_SIZE } from '../types/game';

interface GameBoardProps {
  gameState: GameState;
}

export default function GameBoard({ gameState }: GameBoardProps) {
  const boardSize = GRID_SIZE * CELL_SIZE;

  return (
    <div className="relative bg-gray-800 rounded-lg shadow-inner overflow-hidden"
         style={{ width: boardSize, height: boardSize }}>
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: GRID_SIZE }).map((_, i) => (
          <div key={`h-${i}`}>
            <div
              className="absolute w-full h-px bg-gray-600"
              style={{ top: i * CELL_SIZE }}
            />
            <div
              className="absolute h-full w-px bg-gray-600"
              style={{ left: i * CELL_SIZE }}
            />
          </div>
        ))}
      </div>

      {/* Snake */}
      {gameState.snake.map((segment, index) => (
        <div
          key={index}
          className={`game-cell ${index === 0 ? 'snake-head' : 'snake-body'} ${
            index === 0 ? 'z-20' : 'z-10'
          }`}
          style={{
            left: segment.x * CELL_SIZE,
            top: segment.y * CELL_SIZE,
            width: CELL_SIZE - 2,
            height: CELL_SIZE - 2,
            opacity: gameState.gameOver ? 0.5 : 1
          }}
        />
      ))}

      {/* Food */}
      <div
        className="game-cell food z-30"
        style={{
          left: gameState.food.x * CELL_SIZE + 2,
          top: gameState.food.y * CELL_SIZE + 2,
          width: CELL_SIZE - 4,
          height: CELL_SIZE - 4
        }}
      />

      {/* Game Over Overlay */}
      {gameState.gameOver && (
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-40">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-red-500 mb-2">Game Over!</h2>
            <p className="text-xl text-gray-300 mb-4">Final Score: {gameState.score}</p>
            <p className="text-gray-400">Press SPACE to play again</p>
          </div>
        </div>
      )}

      {/* Paused Overlay */}
      {gameState.isPaused && !gameState.gameOver && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-yellow-500 mb-2">Paused</h2>
            <p className="text-gray-400">Press SPACE to continue</p>
          </div>
        </div>
      )}
    </div>
  );
}