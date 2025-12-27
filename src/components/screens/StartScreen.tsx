import { MessageCircle, Clock } from 'lucide-react';
import { Button } from '../ui';

interface StartScreenProps {
  onStart: () => void;
  onRemindLater: () => void;
}

export function StartScreen({ onStart, onRemindLater }: StartScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white md:bg-neutral-50">
      <div className="w-full max-w-sm md:bg-white md:rounded-2xl md:shadow-lg md:p-8">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center">
            <MessageCircle className="w-10 h-10 text-neutral-600" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-[var(--text-h1)] font-medium text-black mb-3 tracking-tight text-center">
          오늘 상담은 어떠셨나요?
        </h1>

        {/* Description */}
        <p className="text-[var(--text-body)] text-neutral-500 mb-8 leading-relaxed text-center">
          솔직한 피드백이 상담 과정을<br />
          더 효과적으로 만듭니다
        </p>

        {/* Info Card */}
        <div className="bg-neutral-50 rounded-xl p-4 mb-6 md:bg-neutral-100">
          <p className="text-[var(--text-caption)] text-neutral-500 text-center">
            피드백은 상담 개선 목적으로만 사용됩니다
          </p>
        </div>

        {/* Estimated Time */}
        <div className="flex items-center justify-center gap-1.5 mb-6 text-neutral-400">
          <Clock className="w-4 h-4" />
          <span className="text-[var(--text-caption)]">약 2분 소요</span>
        </div>

        {/* Start Button */}
        <Button onClick={onStart} fullWidth>
          시작하기
        </Button>

        {/* Remind Later */}
        <div className="mt-6 text-center">
          <button
            onClick={onRemindLater}
            className="text-neutral-400 text-[15px] hover:text-black transition-colors inline-flex items-center gap-1"
          >
            나중에 작성하기
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mt-0.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
