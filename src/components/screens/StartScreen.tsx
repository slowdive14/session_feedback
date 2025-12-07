import { Button } from '../ui';

interface StartScreenProps {
  onStart: () => void;
  onRemindLater: () => void;
}

export function StartScreen({ onStart, onRemindLater }: StartScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white">
      <div className="w-full text-center">
        <h1 className="text-[28px] font-medium text-black mb-4 tracking-tight">
          오늘 상담은 어떠셨나요?
        </h1>

        <p className="text-[17px] text-neutral-500 mb-10 leading-relaxed">
          솔직한 피드백이 상담 과정을<br />
          더 효과적으로 만듭니다
        </p>

        <div className="border border-neutral-200 p-4 mb-10">
          <p className="text-[15px] text-neutral-500">
            피드백은 상담 개선 목적으로만 사용됩니다
          </p>
        </div>

        <Button onClick={onStart} fullWidth>
          시작하기
        </Button>

        <div className="mt-8">
          <button
            onClick={onRemindLater}
            className="text-neutral-400 text-[15px] hover:text-black transition-colors"
          >
            나중에 작성하기
          </button>
        </div>
      </div>
    </div>
  );
}
