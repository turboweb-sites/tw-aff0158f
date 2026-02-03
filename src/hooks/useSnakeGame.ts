import { useState, useEffect, useRef, useCallback } from 'react';
import { GameState, Direction, Position, GameSettings } from '../types/game';

const BOARD_SIZE = 20;
const INITIAL_SPEED = 200;
const SPEED_INCREMENT = 5;

const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

const getOppositeDirection = (dir: Direction): Direction => {
  switch (dir) {
    case 'UP': return 'DOWN';
    case 'DOWN': return 'UP';
    case 'LEFT': return 'RIGHT';
    case 'RIGHT': return 'LEFT';
  }
};

const generateRandomFood = (snake: Position[]): Position => {
  let newFood: Position;
  do {
    newFood = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
  return newFood;
};

export default function useSnakeGame() {
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: generateRandomFood(INITIAL_SNAKE),
    direction: 'RIGHT',
    nextDirection: 'RIGHT',
    isGameOver: true,
    isPaused: false,
    score: 0,
    highScore: parseInt(localStorage.getItem('snakeHighScore') || '0'),
    speed: 1,
  });

  const gameLoopRef = useRef<number | null>(null);

  const moveSnake = useCallback(() => {
    setGameState(prevState => {
      if (prevState.isGameOver || prevState.isPaused) return prevState;

      const { snake, food, direction, nextDirection, score, highScore } = prevState;
      const newDirection = nextDirection;
      const newSnake = [...snake];
      const head = { ...newSnake[0] };

      // Update direction
      switch (newDirection) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // Check wall collision
      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        const newHighScore = Math.max(score, highScore);
        if (newHighScore > highScore) {
          localStorage.setItem('snakeHighScore', newHighScore.toString());
        }
        return { ...prevState, isGameOver: true, highScore: newHighScore };
      }

      // Check self collision
      if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        const newHighScore = Math.max(score, highScore);
        if (newHighScore > highScore) {
          localStorage.setItem('snakeHighScore', newHighScore.toString());
        }
        return { ...prevState, isGameOver: true, highScore: newHighScore };
      }

      newSnake.unshift(head);

      // Check food collision
      let newScore = score;
      let newFood = food;
      let newSpeed = prevState.speed;
      
      if (head.x === food.x && head.y === food.y) {
        newScore += 10;
        newFood = generateRandomFood(newSnake);
        newSpeed = Math.floor(newScore / 50) + 1;
      } else {
        newSnake.pop();
      }

      return {
        ...prevState,
        snake: newSnake,
        food: newFood,
        direction: newDirection,
        score: newScore,
        speed: newSpeed,
      };
    });
  }, []);

  const changeDirection = useCallback((newDirection: Direction) => {
    setGameState(prevState => {
      if (prevState.isGameOver || prevState.isPaused) return prevState;
      
      // Prevent going back into itself
      if (getOppositeDirection(newDirection) === prevState.direction) {
        return prevState;
      }

      return {
        ...prevState,
        nextDirection: newDirection,
      };
    });
  }, []);

  const startGame = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      isGameOver: false,
      isPaused: false,
    }));
  }, []);

  const pauseGame = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      isPaused: true,
    }));
  }, []);

  const resumeGame = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      isPaused: false,
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(prevState => ({
      snake: INITIAL_SNAKE,
      food: generateRandomFood(INITIAL_SNAKE),
      direction: 'RIGHT',
      nextDirection: 'RIGHT',
      isGameOver: true,
      isPaused: false,
      score: 0,
      highScore: prevState.highScore,
      speed: 1,
    }));
  }, []);

  useEffect(() => {
    const speed = INITIAL_SPEED - (gameState.speed - 1) * SPEED_INCREMENT;
    
    if (!gameState.isGameOver && !gameState.isPaused) {
      gameLoopRef.current = window.setInterval(moveSnake, Math.max(50, speed));
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState.isGameOver, gameState.isPaused, gameState.speed, moveSnake]);

  return {
    gameState,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    changeDirection,
  };
}