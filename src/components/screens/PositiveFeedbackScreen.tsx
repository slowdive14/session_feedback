import { Button, TextArea } from '../ui';
import { ScreenLayout } from '../layout/ScreenLayout';

interface PositiveFeedbackScreenProps {
  positiveFeedback: string;
  onFeedbackChange: (value: string) => void;
  onSubmit: () => void;
  onSkip: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
}

export function PositiveFeedbackScreen({
  positiveFeedback,
  onFeedbackChange,
  onSubmit,
  onSkip,
  onBack,
  currentStep,
  totalSteps,
  isSubmitting
}: PositiveFeedbackScreenProps) {
  const hasContent = positiveFeedback.trim().length > 0;

  return (
    <ScreenLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
    >
      <div className="flex-1 flex flex-col pt-4">
        <h2 className="text-[26px] font-medium text-black mb-2">
          마지막으로,
        </h2>
        <p className="text-[17px] text-neutral-500 mb-8 leading-relaxed">
          오늘 상담에서 좋았던 점이 있다면<br />
          자유롭게 적어주세요
        </p>

        <TextArea
          value={positiveFeedback}
          onChange={onFeedbackChange}
          placeholder="상담자에게 전하고 싶은 말..."
          rows={5}
        />
      </div>

      <div className="pt-4 pb-2 flex gap-3">
        <Button onClick={onSkip} variant="secondary" className="flex-1" disabled={isSubmitting}>
          건너뛰기
        </Button>
        <Button onClick={onSubmit} className="flex-1" disabled={!hasContent || isSubmitting}>
          {isSubmitting ? '제출 중...' : '제출하기'}
        </Button>
      </div>
    </ScreenLayout>
  );
}
