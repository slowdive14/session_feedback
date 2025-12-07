import { Button, Slider } from '../ui';
import { ScreenLayout } from '../layout/ScreenLayout';
import type { QuestionInfo } from '../../types/feedback';

interface QuestionScreenProps {
  question: QuestionInfo;
  questionNumber: number;
  totalQuestions: number;
  value: number;
  onChange: (value: number) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export function QuestionScreen({
  question,
  questionNumber,
  totalQuestions,
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: QuestionScreenProps) {
  return (
    <ScreenLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
    >
      <div>
        <div className="text-base text-neutral-400 mb-1">
          질문 {questionNumber}/{totalQuestions}
        </div>

        <h2 className="text-[24px] font-medium text-black mb-8 whitespace-pre-line leading-[1.4]">
          {question.question}
        </h2>

        <div className="mb-8">
          <Slider
            value={value}
            onChange={onChange}
            leftLabel={question.leftLabel}
            rightLabel={question.rightLabel}
          />
        </div>

        <Button onClick={onNext} fullWidth>
          다음
        </Button>
      </div>
    </ScreenLayout>
  );
}
