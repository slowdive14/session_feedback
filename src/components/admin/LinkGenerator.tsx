import { useState } from 'react';
import { Button, TextInput } from '../ui';
import { generateFeedbackLink } from '../../lib/supabase';

export function LinkGenerator() {
  const [sessionNumber, setSessionNumber] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    const num = parseInt(sessionNumber);
    if (isNaN(num) || num < 1) {
      setError('유효한 회기 번호를 입력해주세요');
      return;
    }

    setIsLoading(true);
    setError('');

    const result = await generateFeedbackLink(num);

    if (result) {
      setGeneratedUrl(result.url);
    } else {
      setError('링크 생성에 실패했습니다. 다시 시도해주세요.');
    }

    setIsLoading(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = generatedUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenSMS = async () => {
    // 링크를 클립보드에 복사
    try {
      await navigator.clipboard.writeText(generatedUrl);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = generatedUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    // SMS 앱 열기
    const message = `오늘 상담은 어떠셨나요?\n솔직한 피드백이 상담 과정을 더 효과적으로 만들어요.\n${generatedUrl}`;
    const smsUrl = `sms:?body=${encodeURIComponent(message)}`;
    window.location.href = smsUrl;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[var(--surface)]">
      <div className="max-w-sm w-full bg-white rounded-2xl p-6 shadow-lg">
        <h1 className="text-xl font-semibold text-[var(--text-primary)] mb-6 text-center">
          피드백 링크 생성
        </h1>

        {/* Session number input */}
        <div className="mb-4">
          <label className="block text-sm text-[var(--text-secondary)] mb-2">
            회기 번호
          </label>
          <TextInput
            type="number"
            value={sessionNumber}
            onChange={setSessionNumber}
            placeholder="예: 5"
          />
        </div>

        {/* Error message */}
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        {/* Generate button */}
        <Button onClick={handleGenerate} fullWidth disabled={isLoading || !sessionNumber}>
          {isLoading ? '생성 중...' : '링크 생성'}
        </Button>

        {/* Generated URL */}
        {generatedUrl && (
          <div className="mt-6 pt-6 border-t border-[var(--border)]">
            <p className="text-sm text-[var(--text-secondary)] mb-2">
              생성된 링크:
            </p>
            <div className="bg-[var(--surface)] rounded-xl p-3 mb-4 break-all">
              <code className="text-sm text-[var(--text-primary)]">
                {generatedUrl}
              </code>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleCopy} variant="secondary" className="flex-1">
                {copied ? '복사됨!' : '복사'}
              </Button>
              <Button onClick={handleOpenSMS} className="flex-1">
                문자 앱 열기
              </Button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 pt-6 border-t border-[var(--border)]">
          <p className="text-xs text-[var(--text-secondary)]">
            💡 세션 종료 후 30분~2시간 이내 발송을 권장합니다
          </p>
        </div>
      </div>
    </div>
  );
}
