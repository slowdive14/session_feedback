import { Button, TextInput, Checkbox } from '../ui';
import { ScreenLayout } from '../layout/ScreenLayout';

interface IdentificationScreenProps {
  clientName: string;
  isAnonymous: boolean;
  onNameChange: (name: string) => void;
  onAnonymousChange: (isAnonymous: boolean) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export function IdentificationScreen({
  clientName,
  isAnonymous,
  onNameChange,
  onAnonymousChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: IdentificationScreenProps) {
  const canProceed = isAnonymous || clientName.trim().length > 0;

  return (
    <ScreenLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
    >
      <div className="flex-1 flex flex-col pt-4">
        <h2 className="text-[26px] font-medium text-black mb-8">
          성함을 알려주세요
        </h2>

        <div className="space-y-4">
          <TextInput
            value={clientName}
            onChange={onNameChange}
            placeholder="이름 입력"
            disabled={isAnonymous}
          />

          <Checkbox
            id="anonymous"
            label="익명으로 작성하기"
            checked={isAnonymous}
            onChange={onAnonymousChange}
          />
        </div>

        <p className="mt-4 text-[15px] text-neutral-400">
          익명 선택 시 상담자는 피드백 내용만 확인할 수 있습니다
        </p>
      </div>

      <div className="pt-4 pb-2">
        <Button onClick={onNext} fullWidth disabled={!canProceed}>
          다음
        </Button>
      </div>
    </ScreenLayout>
  );
}
