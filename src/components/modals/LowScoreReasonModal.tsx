import { useState } from 'react';
import { Modal, Button, TextArea } from '../ui';

interface LowScoreReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reason: string) => void;
  onSkip: () => void;
}

export function LowScoreReasonModal({
  isOpen,
  onClose,
  onSave,
  onSkip
}: LowScoreReasonModalProps) {
  const [reason, setReason] = useState('');

  const handleSave = () => {
    onSave(reason);
    setReason('');
  };

  const handleSkip = () => {
    onSkip();
    setReason('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="조금 더 알려주세요">
      <p className="text-neutral-500 text-sm mb-4">
        낮은 점수를 주신 이유가 있다면 알려주세요.<br />
        상담 개선에 큰 도움이 됩니다.
      </p>

      <TextArea
        value={reason}
        onChange={setReason}
        placeholder="자유롭게 적어주세요..."
        rows={4}
      />

      <div className="flex gap-3 mt-6">
        <Button onClick={handleSkip} variant="secondary" className="flex-1">
          건너뛰기
        </Button>
        <Button onClick={handleSave} className="flex-1" disabled={!reason.trim()}>
          저장
        </Button>
      </div>
    </Modal>
  );
}
