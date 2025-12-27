import { Heart, Target, Settings, Star } from 'lucide-react';
import { Button, Slider } from '../ui';
import { ScreenLayout } from '../layout/ScreenLayout';
import type { QuestionInfo, Scores } from '../../types/feedback';

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

// Get icon for each question type
function getQuestionIcon(questionId: keyof Scores) {
  const iconProps = { className: 'w-6 h-6', strokeWidth: 1.5 };

  switch (questionId) {
    case 'relationship':
      return <Heart {...iconProps} />;
    case 'goals':
      return <Target {...iconProps} />;
    case 'approach':
      return <Settings {...iconProps} />;
    case 'overall':
      return <Star {...iconProps} />;
    default:
      return null;
  }
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
  const icon = getQuestionIcon(question.id);

  return (
    <ScreenLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
    >
      <div className="flex flex-col h-full">
        {/* Question Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-neutral-400 mb-3">
            {icon && (
              <span className="text-neutral-500">{icon}</span>
            )}
            <span className="text-sm">
              질문 {questionNumber}/{totalQuestions}
            </span>
          </div>

          <h2 className="text-[var(--text-h2)] font-medium text-black whitespace-pre-line leading-[1.4]">
            {question.question}
          </h2>
        </div>

        {/* Slider */}
        <div className="flex-1 flex flex-col justify-center py-4">
          <Slider
            value={value}
            onChange={onChange}
            leftLabel={question.leftLabel}
            rightLabel={question.rightLabel}
          />
        </div>

        {/* Next Button */}
        <div className="pt-4 pb-2">
          <Button onClick={onNext} fullWidth>
            다음
          </Button>
        </div>
      </div>
    </ScreenLayout>
  );
}
