import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  StartScreen,
  IdentificationScreen,
  QuestionScreen,
  WantMoreScreen,
  WantLessScreen,
  PositiveFeedbackScreen,
  CompletionScreen,
  ErrorScreen
} from '../components/screens';
import { LowScoreReasonModal, RemindLaterModal } from '../components/modals';
import { useFeedbackForm } from '../hooks/useFeedbackForm';
import { QUESTIONS } from '../types/feedback';
import { validateToken, saveFeedback, createReminder } from '../lib/supabase';

// Step 매핑
// 0: Start
// 1: Identification
// 2-5: Questions (4개)
// 6: WantMore
// 7: WantLess
// 8: PositiveFeedback
// 9: Completion

const TOTAL_STEPS = 10;

export function FeedbackPage() {
  const [searchParams] = useSearchParams();
  const sessionNumber = parseInt(searchParams.get('s') || '0') || null;
  const accessToken = searchParams.get('t') || '';

  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    state,
    setClientName,
    setIsAnonymous,
    setScore,
    setLowScoreReason,
    setWantMore,
    setWantMoreOther,
    setWantLess,
    setWantLessOther,
    setPositiveFeedback,
    nextStep,
    prevStep,
    goToStep,
    setShowLowScoreModal,
    setShowRemindLaterModal,
    setIsSubmitting,
    setIsSubmitted,
    getSubmitPayload
  } = useFeedbackForm(sessionNumber, accessToken);

  // Token validation
  useEffect(() => {
    async function validate() {
      if (!accessToken) {
        setErrorMessage('유효하지 않은 링크입니다.');
        setIsValidating(false);
        return;
      }

      const result = await validateToken(accessToken);

      if (!result.valid) {
        setErrorMessage('유효하지 않은 링크이거나 만료된 링크입니다.');
        setIsValidating(false);
        return;
      }

      // Already submitted and can't edit
      if (result.feedback?.is_submitted && !result.canEdit) {
        setErrorMessage('이미 제출된 피드백입니다. 수정 가능 시간(24시간)이 지났습니다.');
        setIsValidating(false);
        return;
      }

      // Already submitted but can edit
      if (result.feedback?.is_submitted && result.canEdit) {
        // Load existing data for editing
        // TODO: Pre-fill form with existing data
      }

      setIsValid(true);
      setIsValidating(false);
    }

    validate();
  }, [accessToken]);

  // Handle question next with low score check
  const handleQuestionNext = (questionIndex: number) => {
    const questionId = QUESTIONS[questionIndex].id;
    const score = state.scores[questionId];

    if (score <= 5) {
      setShowLowScoreModal(true, questionId);
    } else {
      nextStep();
    }
  };

  // Handle low score modal save
  const handleLowScoreReasonSave = (reason: string) => {
    if (state.currentLowScoreField) {
      setLowScoreReason(state.currentLowScoreField, reason);
    }
    setShowLowScoreModal(false);
    nextStep();
  };

  // Handle low score modal skip
  const handleLowScoreReasonSkip = () => {
    setShowLowScoreModal(false);
    nextStep();
  };

  // Handle remind later
  const handleRemindLater = async () => {
    if (!sessionNumber || !accessToken) return;

    const success = await createReminder(accessToken, sessionNumber);
    setShowRemindLaterModal(false);

    if (success) {
      // Show success message or close
      alert('24시간 후에 다시 링크를 보내드릴게요.');
    }
  };

  // Handle submit
  const handleSubmit = async () => {
    setIsSubmitting(true);

    const payload = getSubmitPayload();
    const success = await saveFeedback(accessToken, payload);

    if (success) {
      setIsSubmitted(true);
      goToStep(9); // Go to completion screen
    } else {
      alert('제출에 실패했습니다. 다시 시도해주세요.');
    }

    setIsSubmitting(false);
  };

  // Handle edit from completion screen
  const handleEdit = () => {
    goToStep(1); // Go back to identification
  };

  // Loading state
  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[var(--text-secondary)]">확인 중...</div>
      </div>
    );
  }

  // Error state
  if (!isValid) {
    return <ErrorScreen message={errorMessage} />;
  }

  // Render current step
  const renderStep = () => {
    switch (state.currentStep) {
      case 0:
        return (
          <StartScreen
            onStart={nextStep}
            onRemindLater={() => setShowRemindLaterModal(true)}
          />
        );

      case 1:
        return (
          <IdentificationScreen
            clientName={state.clientName}
            isAnonymous={state.isAnonymous}
            onNameChange={setClientName}
            onAnonymousChange={setIsAnonymous}
            onNext={nextStep}
            onBack={prevStep}
            currentStep={state.currentStep}
            totalSteps={TOTAL_STEPS}
          />
        );

      case 2:
      case 3:
      case 4:
      case 5:
        const questionIndex = state.currentStep - 2;
        const question = QUESTIONS[questionIndex];
        return (
          <QuestionScreen
            question={question}
            questionNumber={questionIndex + 1}
            totalQuestions={QUESTIONS.length}
            value={state.scores[question.id]}
            onChange={(value) => setScore(question.id, value)}
            onNext={() => handleQuestionNext(questionIndex)}
            onBack={prevStep}
            currentStep={state.currentStep}
            totalSteps={TOTAL_STEPS}
          />
        );

      case 6:
        return (
          <WantMoreScreen
            wantMore={state.wantMore}
            onWantMoreChange={setWantMore}
            onOtherChange={setWantMoreOther}
            onNext={nextStep}
            onSkip={nextStep}
            onBack={prevStep}
            currentStep={state.currentStep}
            totalSteps={TOTAL_STEPS}
          />
        );

      case 7:
        return (
          <WantLessScreen
            wantLess={state.wantLess}
            onWantLessChange={setWantLess}
            onOtherChange={setWantLessOther}
            onNext={nextStep}
            onSkip={nextStep}
            onBack={prevStep}
            currentStep={state.currentStep}
            totalSteps={TOTAL_STEPS}
          />
        );

      case 8:
        return (
          <PositiveFeedbackScreen
            positiveFeedback={state.positiveFeedback}
            onFeedbackChange={setPositiveFeedback}
            onSubmit={handleSubmit}
            onSkip={handleSubmit}
            onBack={prevStep}
            currentStep={state.currentStep}
            totalSteps={TOTAL_STEPS}
            isSubmitting={state.isSubmitting}
          />
        );

      case 9:
        return <CompletionScreen onEdit={handleEdit} />;

      default:
        return <ErrorScreen message="알 수 없는 단계입니다." />;
    }
  };

  return (
    <>
      {renderStep()}

      {/* Low Score Reason Modal */}
      <LowScoreReasonModal
        isOpen={state.showLowScoreModal}
        onClose={() => setShowLowScoreModal(false)}
        onSave={handleLowScoreReasonSave}
        onSkip={handleLowScoreReasonSkip}
      />

      {/* Remind Later Modal */}
      <RemindLaterModal
        isOpen={state.showRemindLaterModal}
        onClose={() => setShowRemindLaterModal(false)}
        onConfirm={handleRemindLater}
      />
    </>
  );
}
