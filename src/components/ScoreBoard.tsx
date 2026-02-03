import { Trophy, Zap, Target } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  highScore: number;
  speed: number;
}

export default function ScoreBoard({ score, highScore, speed }: ScoreBoardProps) {
  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-md">
      <div className="bg-gray-800/50 backdrop-blur rounded-lg p-3 text-center">
        <div className="flex items-center justify-center gap-2 text-green-400 mb-1">
          <Target className="w-4 h-4" />
          <span className="text-sm font-semibold">Score</span>
        </div>
        <p className="text-2xl font-bold">{score}</p>
      </div>
      
      <div className="bg-gray-800/50 backdrop-blur rounded-lg p-3 text-center">
        <div className="flex items-center justify-center gap-2 text-yellow-400 mb-1">
          <Trophy className="w-4 h-4" />
          <span className="text-sm font-semibold">Best</span>
        </div>
        <p className="text-2xl font-bold">{highScore}</p>
      </div>
      
      <div className="bg-gray-800/50 backdrop-blur rounded-lg p-3 text-center">
        <div className="flex items-center justify-center gap-2 text-blue-400 mb-1">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-semibold">Speed</span>
        </div>
        <p className="text-2xl font-bold">{speed}</p>
      </div>
    </div>
  );
}