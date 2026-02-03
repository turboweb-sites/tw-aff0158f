export interface Position {
  x: number;
  y: number;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface GameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  nextDirection: Direction;
  isGameOver: boolean;
  isPaused: boolean;
  score: number;
  highScore: number;
  speed: number;
}

export interface GameSettings {
  boardSize: number;
  initialSpeed: number;
  speedIncrement: number;
}