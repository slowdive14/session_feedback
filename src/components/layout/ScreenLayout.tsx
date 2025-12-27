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
    <div className="min-h-screen flex flex-col bg-white md:bg-neutral-50">
      {/* Desktop/Tablet: Centered card container */}
      <div className="flex-1 flex flex-col w-full md:max-w-md lg:max-w-lg md:mx-auto md:my-8 md:bg-white md:rounded-2xl md:shadow-lg md:min-h-0 md:max-h-[90vh] md:overflow-auto">
        {/* Header with progress */}
        {showProgress && (
          <div className="sticky top-0 bg-white z-10 px-6 pt-4 pb-2 md:rounded-t-2xl">
            <ProgressBar current={currentStep} total={totalSteps} />
            {onBack && currentStep > 0 && (
              <button
                onClick={onBack}
                className="mt-3 text-neutral-400 text-[15px] flex items-center gap-1.5 hover:text-black transition-colors group"
                aria-label="이전 단계로 돌아가기"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform group-hover:-translate-x-0.5"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                이전
              </button>
            )}
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}
