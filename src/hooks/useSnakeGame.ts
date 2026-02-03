import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, Position, Direction, GRID_SIZE, INITIAL_SPEED, SPEED_INCREMENT } from '../types/game';

const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 }
];

const generateFood = (snake: Position[]): Position => {
  let food: Position;
  do {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
  } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
  return food;
};

const getOppositeDirection = (dir: Direction): Direction => {
  switch (dir) {
    case 'UP': return 'DOWN';
    case 'DOWN': return 'UP';
    case 'LEFT': return 'RIGHT';
    case 'RIGHT': return 'LEFT';
  }
};

export default function useSnakeGame() {
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: generateFood(INITIAL_SNAKE),
    direction: 'RIGHT',
    nextDirection: 'RIGHT',
    gameOver: true,
    isPaused: false,
    score: 0,
    highScore: parseInt(localStorage.getItem('snakeHighScore') || '0'),
    speed: INITIAL_SPEED
  });

  const gameInterval = useRef<number | null>(null);

  const moveSnake = useCallback(() => {
    setGameState(prevState => {
      if (prevState.gameOver || prevState.isPaused) return prevState;

      const snake = [...prevState.snake];
      const head = { ...snake[0] };
      const direction = prevState.nextDirection;

      // Move head based on direction
      switch (direction) {
        case 'UP':
          head.y = (head.y - 1 + GRID_SIZE) % GRID_SIZE;
          break;
        case 'DOWN':
          head.y = (head.y + 1) % GRID_SIZE;
          break;
        case 'LEFT':
          head.x = (head.x - 1 + GRID_SIZE) % GRID_SIZE;
          break;
        case 'RIGHT':
          head.x = (head.x + 1) % GRID_SIZE;
          break;
      }

      // Check collision with self
      if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        const newHighScore = Math.max(prevState.score, prevState.highScore);
        if (newHighScore > prevState.highScore) {
          localStorage.setItem('snakeHighScore', newHighScore.toString());
        }
        return { ...prevState, gameOver: true, highScore: newHighScore };
      }

      snake.unshift(head);

      // Check if food eaten
      let food = prevState.food;
      let score = prevState.score;
      let speed = prevState.speed;
      
      if (head.x === food.x && head.y === food.y) {
        score += 10;
        food = generateFood(snake);
        // Increase speed every 50 points
        if (score % 50 === 0) {
          speed = Math.max(50, speed - SPEED_INCREMENT);
        }
      } else {
        snake.pop();
      }

      return {
        ...prevState,
        snake,
        food,
        score,
        speed,
        direction
      };
    });
  }, []);

  const changeDirection = useCallback((key: string) => {
    const keyMap: { [key: string]: Direction } = {
      'ArrowUp': 'UP',
      'ArrowDown': 'DOWN',
      'ArrowLeft': 'LEFT',
      'ArrowRight': 'RIGHT',
      'w': 'UP',
      'W': 'UP',
      's': 'DOWN',
      'S': 'DOWN',
      'a': 'LEFT',
      'A': 'LEFT',
      'd': 'RIGHT',
      'D': 'RIGHT'
    };

    const newDirection = keyMap[key];
    if (!newDirection) return;

    setGameState(prevState => {
      if (prevState.gameOver || prevState.isPaused) return prevState;
      
      // Prevent opposite direction
      if (newDirection === getOppositeDirection(prevState.direction)) {
        return prevState;
      }

      return { ...prevState, nextDirection: newDirection };
    });
  }, []);

  const startGame = useCallback(() => {
    setGameState({
      snake: INITIAL_SNAKE,
      food: generateFood(INITIAL_SNAKE),
      direction: 'RIGHT',
      nextDirection: 'RIGHT',
      gameOver: false,
      isPaused: false,
      score: 0,
      highScore: gameState.highScore,
      speed: INITIAL_SPEED
    });
  }, [gameState.highScore]);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: true }));
  }, []);

  const resumeGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: false }));
  }, []);

  // Game loop
  useEffect(() => {
    if (gameInterval.current) {
      clearInterval(gameInterval.current);
    }

    if (!gameState.gameOver && !gameState.isPaused) {
      gameInterval.current = window.setInterval(moveSnake, gameState.speed);
    }

    return () => {
      if (gameInterval.current) {
        clearInterval(gameInterval.current);
      }
    };
  }, [gameState.gameOver, gameState.isPaused, gameState.speed, moveSnake]);

  return {
    gameState,
    startGame,
    pauseGame,
    resumeGame,
    changeDirection
  };
}