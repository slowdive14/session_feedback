import { Button } from '../ui';

interface CompletionScreenProps {
  onEdit: () => void;
}

export function CompletionScreen({ onEdit }: CompletionScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white">
      <div className="w-full text-center">
        <div className="w-16 h-16 bg-black flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 className="text-[28px] font-medium text-black mb-4">
          감사합니다
        </h1>

        <p className="text-[17px] text-neutral-500 mb-10 leading-relaxed">
          피드백이 제출되었습니다<br />
          더 나은 상담을 위해 노력하겠습니다
        </p>

        <p className="text-[15px] text-neutral-400 mb-6">
          24시간 내에 수정할 수 있습니다
        </p>

        <Button onClick={onEdit} variant="secondary" fullWidth>
          수정하기
        </Button>
      </div>
    </div>
  );
}
