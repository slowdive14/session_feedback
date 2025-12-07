import { Button, Checkbox, TextArea } from '../ui';
import { ScreenLayout } from '../layout/ScreenLayout';
import type { WantMore } from '../../types/feedback';
import { WANT_MORE_OPTIONS } from '../../types/feedback';

interface WantMoreScreenProps {
  wantMore: WantMore;
  onWantMoreChange: (key: keyof Omit<WantMore, 'other'>, value: boolean) => void;
  onOtherChange: (value: string) => void;
  onNext: () => void;
  onSkip: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export function WantMoreScreen({
  wantMore,
  onWantMoreChange,
  onOtherChange,
  onNext,
  onSkip,
  onBack,
  currentStep,
  totalSteps
}: WantMoreScreenProps) {
  const hasSelection = WANT_MORE_OPTIONS.some(opt => wantMore[opt.id as keyof Omit<WantMore, 'other'>]) || wantMore.other.trim().length > 0;

  return (
    <ScreenLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
    >
      <div className="flex-1 flex flex-col pt-4">
        <h2 className="text-[26px] font-medium text-black mb-6">
          더 있었으면 하는 것이<br />있나요?
        </h2>

        <div className="space-y-3 mb-4">
          {WANT_MORE_OPTIONS.map((option) => (
            <Checkbox
              key={option.id}
              id={option.id}
              label={option.label}
              checked={wantMore[option.id as keyof Omit<WantMore, 'other'>]}
              onChange={(checked) => onWantMoreChange(option.id as keyof Omit<WantMore, 'other'>, checked)}
            />
          ))}
        </div>

        <TextArea
          value={wantMore.other}
          onChange={onOtherChange}
          placeholder="기타 (자유롭게)"
          rows={3}
        />
      </div>

      <div className="pt-4 pb-2 flex gap-3">
        <Button onClick={onSkip} variant="secondary" className="flex-1">
          건너뛰기
        </Button>
        <Button onClick={onNext} className="flex-1" disabled={!hasSelection}>
          다음
        </Button>
      </div>
    </ScreenLayout>
  );
}
