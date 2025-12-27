interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  leftLabel?: string;
  rightLabel?: string;
}

export function Slider({
  value,
  onChange,
  min = 1,
  max = 10,
  leftLabel,
  rightLabel
}: SliderProps) {
  // Generate tick marks
  const ticks = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  // Calculate fill percentage
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      {/* Slider Track */}
      <div className="relative px-1">
        <div className="relative h-12 flex items-center">
          {/* Background Track */}
          <div className="absolute w-full h-1.5 bg-neutral-200 rounded-full" />

          {/* Filled Track */}
          <div
            className="absolute h-1.5 bg-black rounded-full transition-all duration-150"
            style={{ width: `${percentage}%` }}
          />

          {/* Range Input */}
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="relative w-full h-1.5 bg-transparent appearance-none cursor-pointer z-10
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-7
              [&::-webkit-slider-thumb]:h-7
              [&::-webkit-slider-thumb]:bg-black
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:shadow-lg
              [&::-webkit-slider-thumb]:transition-transform
              [&::-webkit-slider-thumb]:duration-150
              [&::-webkit-slider-thumb]:hover:scale-110
              [&::-moz-range-thumb]:w-7
              [&::-moz-range-thumb]:h-7
              [&::-moz-range-thumb]:bg-black
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:border-none
              [&::-moz-range-thumb]:cursor-pointer
              [&::-moz-range-thumb]:shadow-lg
              focus-visible:outline-none"
            aria-label="점수 선택"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
          />
        </div>

        {/* Tick Marks */}
        <div className="flex justify-between">
          {ticks.map((tick) => (
            <div
              key={tick}
              className="flex flex-col items-center"
            >
              <span className={`
                w-6 h-6 flex items-center justify-center rounded-full
                text-sm tabular-nums transition-all duration-150
                ${tick === value
                  ? 'bg-black text-white font-medium'
                  : 'text-neutral-400'
                }
              `}>
                {tick}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-2 px-1">
        <span className="text-sm text-neutral-500">{leftLabel || ''}</span>
        <span className="text-sm text-neutral-500">{rightLabel || ''}</span>
      </div>
    </div>
  );
}
