import { Trophy, Zap, Gauge } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  highScore: number;
  speed: number;
}

export default function ScoreBoard({ score, highScore, speed }: ScoreBoardProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-gray-800 rounded-lg p-4 text-center">
        <div className="flex items-center justify-center gap-2 text-gray-400 mb-1">
          <Zap size={20} />
          <span className="text-sm font-medium">Счёт</span>
        </div>
        <div className="text-3xl font-bold text-white">{score}</div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 text-center">
        <div className="flex items-center justify-center gap-2 text-gray-400 mb-1">
          <Trophy size={20} />
          <span className="text-sm font-medium">Рекорд</span>
        </div>
        <div className="text-3xl font-bold text-yellow-500">{highScore}</div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 text-center">
        <div className="flex items-center justify-center gap-2 text-gray-400 mb-1">
          <Gauge size={20} />
          <span className="text-sm font-medium">Скорость</span>
        </div>
        <div className="text-3xl font-bold text-green-500">{speed}</div>
      </div>
    </div>
  );
}