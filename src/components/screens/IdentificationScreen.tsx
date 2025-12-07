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
      <div>
        <h2 className="text-[26px] font-medium text-black mb-6">
          성함을 알려주세요
        </h2>

        <div className="space-y-3">
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

        <p className="mt-3 text-[15px] text-neutral-400">
          익명 선택 시 상담자는 피드백 내용만 확인할 수 있습니다
        </p>

        <div className="mt-6">
          <Button onClick={onNext} fullWidth disabled={!canProceed}>
            다음
          </Button>
        </div>
      </div>
    </ScreenLayout>
  );
}
