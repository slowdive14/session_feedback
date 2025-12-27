import { Ear, Wrench, Heart, CalendarCheck } from 'lucide-react';
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

// Icons for each option
const optionIcons: Record<string, React.ReactNode> = {
  listening: <Ear className="w-5 h-5" strokeWidth={1.5} />,
  concreteMethods: <Wrench className="w-5 h-5" strokeWidth={1.5} />,
  emotionTalk: <Heart className="w-5 h-5" strokeWidth={1.5} />,
  realisticPlans: <CalendarCheck className="w-5 h-5" strokeWidth={1.5} />
};

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
      <div className="flex flex-col h-full">
        <h2 className="text-[var(--text-h2)] font-medium text-black mb-5">
          더 있었으면 하는 것이 있나요?
        </h2>

        <div className="space-y-2 mb-4">
          {WANT_MORE_OPTIONS.map((option) => (
            <Checkbox
              key={option.id}
              id={option.id}
              label={option.label}
              checked={wantMore[option.id as keyof Omit<WantMore, 'other'>]}
              onChange={(checked) => onWantMoreChange(option.id as keyof Omit<WantMore, 'other'>, checked)}
              icon={optionIcons[option.id]}
            />
          ))}
        </div>

        <TextArea
          value={wantMore.other}
          onChange={onOtherChange}
          placeholder="기타 (자유롭게)"
          rows={2}
        />

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
