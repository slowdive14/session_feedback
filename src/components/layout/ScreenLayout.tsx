import { ProgressBar } from '../ui/ProgressBar';

interface ScreenLayoutProps {
  children: React.ReactNode;
  currentStep?: number;
  totalSteps?: number;
  showProgress?: boolean;
  onBack?: () => void;
}

export function ScreenLayout({
  children,
  currentStep = 0,
  totalSteps = 10,
  showProgress = true,
  onBack
}: ScreenLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {showProgress && (
        <div className="sticky top-0 bg-white z-10 px-6 pt-3 pb-2">
          <ProgressBar current={currentStep} total={totalSteps} />
          {onBack && currentStep > 0 && (
            <button
              onClick={onBack}
              className="mt-2 text-neutral-400 text-[15px] flex items-center gap-1 hover:text-black transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              이전
            </button>
          )}
        </div>
      )}

      <div className="flex-1 flex flex-col px-6 py-2">
        {children}
      </div>
    </div>
  );
}
