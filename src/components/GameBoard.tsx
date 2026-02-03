import { GameState, Position } from '../types/game';

interface GameBoardProps {
  gameState: GameState;
}

export default function GameBoard({ gameState }: GameBoardProps) {
  const { snake, food, isGameOver, isPaused } = gameState;
  const boardSize = 20;

  const isSnakeHead = (pos: Position) => 
    snake[0].x === pos.x && snake[0].y === pos.y;

  const isSnakeBody = (pos: Position) => 
    snake.some((segment, index) => index > 0 && segment.x === pos.x && segment.y === pos.y);

  const isFood = (pos: Position) => 
    food.x === pos.x && food.y === pos.y;

  const getCellClass = (pos: Position) => {
    if (isSnakeHead(pos)) {
      return 'bg-snake-head shadow-lg snake-head';
    }
    if (isSnakeBody(pos)) {
      const index = snake.findIndex(segment => segment.x === pos.x && segment.y === pos.y);
      const opacity = 1 - (index / snake.length) * 0.3;
      return `bg-snake-body shadow-md`;
    }
    if (isFood(pos)) {
      return 'bg-food food-pulse shadow-lg';
    }
    return 'bg-cell';
  };

  const getCellStyle = (pos: Position) => {
    if (isSnakeBody(pos)) {
      const index = snake.findIndex(segment => segment.x === pos.x && segment.y === pos.y);
      const opacity = 1 - (index / snake.length) * 0.3;
      return { opacity };
    }
    return {};
  };

  return (
    <div className={`relative ${isGameOver ? 'opacity-50' : ''} ${isPaused ? 'opacity-75' : ''}`}>
      <div 
        className="grid gap-[2px] bg-board p-4 rounded-lg mx-auto"
        style={{
          gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
          width: 'fit-content'
        }}
      >
        {Array.from({ length: boardSize }, (_, y) =>
          Array.from({ length: boardSize }, (_, x) => {
            const pos = { x, y };
            return (
              <div
                key={`${x}-${y}`}
                className={`game-cell aspect-square rounded-sm ${getCellClass(pos)}`}
                style={{
                  width: '20px',
                  height: '20px',
                  ...getCellStyle(pos)
                }}
              />
            );
          })
        )}
      </div>

      {isPaused && !isGameOver && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/80 text-white px-8 py-4 rounded-lg text-2xl font-bold">
            ПАУЗА
          </div>
        </div>
      )}
    </div>
  );
}