import { Lightbulb, HelpCircle, HeartHandshake, ClipboardList, ThumbsUp } from 'lucide-react';
import { Button, Checkbox, TextArea } from '../ui';
import { ScreenLayout } from '../layout/ScreenLayout';
import type { WantLess } from '../../types/feedback';
import { WANT_LESS_OPTIONS } from '../../types/feedback';

interface WantLessScreenProps {
  wantLess: WantLess;
  onWantLessChange: (key: keyof Omit<WantLess, 'other'>, value: boolean) => void;
  onOtherChange: (value: string) => void;
  onNext: () => void;
  onSkip: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

// Icons for each option
const optionIcons: Record<string, React.ReactNode> = {
  advice: <Lightbulb className="w-5 h-5" strokeWidth={1.5} />,
  questions: <HelpCircle className="w-5 h-5" strokeWidth={1.5} />,
  emotionExploration: <HeartHandshake className="w-5 h-5" strokeWidth={1.5} />,
  homework: <ClipboardList className="w-5 h-5" strokeWidth={1.5} />,
  nothing: <ThumbsUp className="w-5 h-5" strokeWidth={1.5} />
};

export function WantLessScreen({
  wantLess,
  onWantLessChange,
  onOtherChange,
  onNext,
  onSkip,
  onBack,
  currentStep,
  totalSteps
}: WantLessScreenProps) {
  const hasSelection = WANT_LESS_OPTIONS.some(opt => wantLess[opt.id as keyof Omit<WantLess, 'other'>]) || wantLess.other.trim().length > 0;

  // Separate "nothing" option from others
  const regularOptions = WANT_LESS_OPTIONS.filter(opt => opt.id !== 'nothing');
  const nothingOption = WANT_LESS_OPTIONS.find(opt => opt.id === 'nothing');

  return (
    <ScreenLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
    >
      <div className="flex flex-col h-full">
        <h2 className="text-[var(--text-h2)] font-medium text-black mb-5">
          줄였으면 하는 것이 있나요?
        </h2>

        {/* Regular Options */}
        <div className="space-y-2 mb-4">
          {regularOptions.map((option) => (
            <Checkbox
              key={option.id}
              id={`less-${option.id}`}
              label={option.label}
              checked={wantLess[option.id as keyof Omit<WantLess, 'other'>]}
              onChange={(checked) => onWantLessChange(option.id as keyof Omit<WantLess, 'other'>, checked)}
              icon={optionIcons[option.id]}
            />
          ))}
        </div>

        {/* "Nothing" Option - Highlighted */}
        {nothingOption && (
          <div className="mb-4">
            <Checkbox
              id="less-nothing"
              label={nothingOption.label}
              checked={wantLess.nothing}
              onChange={(checked) => onWantLessChange('nothing', checked)}
              icon={optionIcons.nothing}
              variant="highlight"
            />
          </div>
        )}

        {/* Other Text */}
        <TextArea
          value={wantLess.other}
          onChange={onOtherChange}
          placeholder="기타 (자유롭게)"
          rows={2}
        />

        {/* Buttons */}
        <div className="mt-auto pt-6 flex gap-3">
          <Button onClick={onSkip} variant="secondary" className="flex-1">
            건너뛰기
          </Button>
          <Button onClick={onNext} className="flex-1" disabled={!hasSelection}>
            다음
          </Button>
        </div>
      </div>
    </ScreenLayout>
  );
}
