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
  return (
    <div className="w-full">
      <div className="relative">
        <div className="text-center mb-8">
          <span className="text-5xl font-light text-black tabular-nums">{value}</span>
        </div>
        
        <div className="relative h-14 flex items-center">
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-[2px] bg-neutral-200 appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-6
              [&::-webkit-slider-thumb]:h-6
              [&::-webkit-slider-thumb]:bg-black
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-moz-range-thumb]:w-6
              [&::-moz-range-thumb]:h-6
              [&::-moz-range-thumb]:bg-black
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:border-none
              [&::-moz-range-thumb]:cursor-pointer"
          />
        </div>
        
        <div className="flex justify-between mt-3">
          <span className="text-[15px] text-neutral-400">{leftLabel || min}</span>
          <span className="text-[15px] text-neutral-400">{rightLabel || max}</span>
        </div>
      </div>
    </div>
  );
}
