interface ProgressBarProps {
  current: number;
  total: number;
  showSteps?: boolean;
}

// Define step categories
const STEP_CATEGORIES = [
  { name: '시작', steps: [0, 1] },
  { name: '평가', steps: [2, 3, 4, 5] },
  { name: '의견', steps: [6, 7, 8] },
  { name: '완료', steps: [9] }
];

function getCategoryIndex(step: number): number {
  for (let i = 0; i < STEP_CATEGORIES.length; i++) {
    if (STEP_CATEGORIES[i].steps.includes(step)) {
      return i;
    }
  }
  return 0;
}

export function ProgressBar({ current, total, showSteps = true }: ProgressBarProps) {
  const currentCategoryIndex = getCategoryIndex(current);

  return (
    <div className="w-full" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total}>
      {/* Step Indicators */}
      {showSteps && current < total && (
        <div className="flex justify-center items-center gap-3">
          {STEP_CATEGORIES.slice(0, -1).map((category, index) => (
            <div key={category.name} className="flex items-center gap-3">
              {/* Step Circle + Label */}
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    text-sm font-medium transition-all duration-300
                    ${index < currentCategoryIndex
                      ? 'bg-black text-white'
                      : index === currentCategoryIndex
                      ? 'bg-black text-white ring-4 ring-black/20'
                      : 'bg-neutral-100 text-neutral-400'
                    }
                  `}
                >
                  {index < currentCategoryIndex ? '✓' : index + 1}
                </div>
                <span
                  className={`text-xs transition-colors duration-300 ${
                    index === currentCategoryIndex
                      ? 'text-black font-semibold'
                      : index < currentCategoryIndex
                      ? 'text-neutral-600'
                      : 'text-neutral-400'
                  }`}
                >
                  {category.name}
                </span>
              </div>

              {/* Connector Line */}
              {index < STEP_CATEGORIES.length - 2 && (
                <div className={`w-8 h-0.5 -mt-5 transition-colors duration-300 ${
                  index < currentCategoryIndex ? 'bg-black' : 'bg-neutral-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
