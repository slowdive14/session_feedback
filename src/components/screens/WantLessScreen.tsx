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

  return (
    <ScreenLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
    >
      <div>
        <h2 className="text-[24px] font-medium text-black mb-5">
          줄였으면 하는 것이<br />있나요?
        </h2>

        <div className="space-y-2 mb-4">
          {WANT_LESS_OPTIONS.map((option) => (
            <Checkbox
              key={option.id}
              id={`less-${option.id}`}
              label={option.label}
              checked={wantLess[option.id as keyof Omit<WantLess, 'other'>]}
              onChange={(checked) => onWantLessChange(option.id as keyof Omit<WantLess, 'other'>, checked)}
            />
          ))}
        </div>

        <TextArea
          value={wantLess.other}
          onChange={onOtherChange}
          placeholder="기타 (자유롭게)"
          rows={2}
        />

        <div className="mt-6 flex gap-3">
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
