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
      <div className="flex-1 flex flex-col pt-4">
        <div className="text-base text-neutral-400 mb-2">
          질문 {questionNumber}/{totalQuestions}
        </div>

        <h2 className="text-[26px] font-medium text-black mb-12 whitespace-pre-line leading-[1.4]">
          {question.question}
        </h2>

        <div className="flex-1 flex items-center">
          <Slider
            value={value}
            onChange={onChange}
            leftLabel={question.leftLabel}
            rightLabel={question.rightLabel}
          />
        </div>
      </div>

      <div className="pt-4 pb-2">
        <Button onClick={onNext} fullWidth>
          다음
        </Button>
      </div>
    </ScreenLayout>
  );
}
