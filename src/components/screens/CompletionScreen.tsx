import { Button } from '../ui';

interface CompletionScreenProps {
  onEdit: () => void;
}

export function CompletionScreen({ onEdit }: CompletionScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white">
      <div className="w-full text-center">
        <div className="w-14 h-14 bg-black flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 className="text-[26px] font-medium text-black mb-3">
          감사합니다
        </h1>

        <p className="text-[16px] text-neutral-500 mb-8 leading-relaxed">
          피드백이 제출되었습니다<br />
          더 나은 상담을 위해 노력하겠습니다
        </p>

        <p className="text-[14px] text-neutral-400 mb-5">
          24시간 내에 수정할 수 있습니다
        </p>

        <Button onClick={onEdit} variant="secondary" fullWidth>
          수정하기
        </Button>
      </div>
    </div>
  );
}
