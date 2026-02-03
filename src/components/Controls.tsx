import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Direction } from '../types/game';

interface ControlsProps {
  onDirectionChange: (direction: Direction) => void;
  disabled: boolean;
}

export default function Controls({ onDirectionChange, disabled }: ControlsProps) {
  const buttonClass = `p-4 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 
    text-white rounded-lg transition-all transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed`;

  return (
    <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
      <div />
      <button
        className={buttonClass}
        onClick={() => onDirectionChange('UP')}
        disabled={disabled}
        aria-label="Вверх"
      >
        <ChevronUp size={24} />
      </button>
      <div />
      
      <button
        className={buttonClass}
        onClick={() => onDirectionChange('LEFT')}
        disabled={disabled}
        aria-label="Влево"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className={buttonClass}
        onClick={() => onDirectionChange('DOWN')}
        disabled={disabled}
        aria-label="Вниз"
      >
        <ChevronDown size={24} />
      </button>
      <button
        className={buttonClass}
        onClick={() => onDirectionChange('RIGHT')}
        disabled={disabled}
        aria-label="Вправо"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}