import { Button } from '../ui';

interface CompletionScreenProps {
  onEdit: () => void;
}

export function CompletionScreen({ onEdit }: CompletionScreenProps) {
  return (
    <div className="min-h-screen flex flex-col px-6 bg-white">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="text-[28px] font-medium text-black mb-3">
          감사합니다
        </h1>

        <p className="text-[16px] text-neutral-500 leading-relaxed">
          피드백이 제출되었습니다<br />
          더 나은 상담을 위해 노력하겠습니다
        </p>
      </div>

      <div className="pb-8">
        <p className="text-[14px] text-neutral-400 text-center mb-4">
          24시간 내에 수정할 수 있습니다
        </p>
        <Button onClick={onEdit} variant="secondary" fullWidth>
          수정하기
        </Button>
      </div>
    </div>
  );
}
