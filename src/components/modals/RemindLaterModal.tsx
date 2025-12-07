import { Modal, Button } from '../ui';

interface RemindLaterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function RemindLaterModal({
  isOpen,
  onClose,
  onConfirm
}: RemindLaterModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="나중에 작성하기">
      <p className="text-neutral-500 text-sm mb-6">
        24시간 후에 다시 링크를 보내드릴게요.<br />
        편한 시간에 작성해 주세요.
      </p>

      <div className="flex gap-3">
        <Button onClick={onClose} variant="secondary" className="flex-1">
          취소
        </Button>
        <Button onClick={onConfirm} className="flex-1">
          확인
        </Button>
      </div>
    </Modal>
  );
}
