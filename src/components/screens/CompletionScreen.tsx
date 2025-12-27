import { useEffect, useState } from 'react';
import { Button } from '../ui';

interface CompletionScreenProps {
  onEdit: () => void;
}

export function CompletionScreen({ onEdit }: CompletionScreenProps) {
  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setShowCheck(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col px-6 bg-white md:bg-neutral-50">
      <div className="flex-1 flex flex-col w-full max-w-sm mx-auto md:bg-white md:rounded-2xl md:shadow-lg md:my-8 md:p-8">
        <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
          {/* Animated Checkmark */}
          <div
            className={`
              w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mb-8
              transition-all duration-500 ease-out
              ${showCheck ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}
            `}
          >
            <svg
              className={`w-12 h-12 text-emerald-500 transition-all duration-300 delay-200 ${
                showCheck ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M20 6L9 17l-5-5"
                className={`transition-all duration-500 delay-300 ${
                  showCheck ? 'stroke-dashoffset-0' : ''
                }`}
                style={{
                  strokeDasharray: 30,
                  strokeDashoffset: showCheck ? 0 : 30,
                  transition: 'stroke-dashoffset 0.5s ease-out 0.3s'
                }}
              />
            </svg>
          </div>

          {/* Thank You Message */}
          <h1
            className={`
              text-[var(--text-h1)] font-medium text-black mb-3 tracking-tight
              transition-all duration-500 delay-200
              ${showCheck ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}
          >
            감사합니다
          </h1>

          <p
            className={`
              text-[var(--text-body)] text-neutral-500 leading-relaxed
              transition-all duration-500 delay-300
              ${showCheck ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}
          >
            피드백이 제출되었습니다<br />
            더 나은 상담을 위해 노력하겠습니다
          </p>

          {/* Success Badge */}
          <div
            className={`
              mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600
              transition-all duration-500 delay-400
              ${showCheck ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-sm font-medium">제출 완료</span>
          </div>
        </div>

        {/* Edit Option */}
        <div
          className={`
            pb-8 transition-all duration-500 delay-500
            ${showCheck ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
        >
          <p className="text-[var(--text-caption)] text-neutral-400 text-center mb-4">
            24시간 내에 수정할 수 있습니다
          </p>
          <Button onClick={onEdit} variant="secondary" fullWidth>
            수정하기
          </Button>
        </div>
      </div>
    </div>
  );
}
