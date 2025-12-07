import { useState, useCallback } from 'react';
import type {
  FeedbackFormState,
  Scores,
  LowScoreReasons,
  WantMore,
  WantLess
} from '../types/feedback';

const initialScores: Scores = {
  relationship: 5,
  goals: 5,
  approach: 5,
  overall: 5
};

const initialLowScoreReasons: LowScoreReasons = {
  relationship: '',
  goals: '',
  approach: '',
  overall: ''
};

const initialWantMore: WantMore = {
  listening: false,
  concreteMethods: false,
  emotionTalk: false,
  realisticPlans: false,
  other: ''
};

const initialWantLess: WantLess = {
  advice: false,
  questions: false,
  emotionExploration: false,
  homework: false,
  nothing: false,
  other: ''
};

export function useFeedbackForm(sessionNumber: number | null, accessToken: string) {
  const [state, setState] = useState<FeedbackFormState>({
    currentStep: 0,
    sessionNumber,
    accessToken,
    isEditMode: false,
    clientName: '',
    isAnonymous: false,
    scores: initialScores,
    lowScoreReasons: initialLowScoreReasons,
    wantMore: initialWantMore,
    wantLess: initialWantLess,
    positiveFeedback: '',
    isSubmitting: false,
    isSubmitted: false,
    showLowScoreModal: false,
    currentLowScoreField: null,
    showRemindLaterModal: false
  });

  const setClientName = useCallback((name: string) => {
    setState(prev => ({ ...prev, clientName: name }));
  }, []);

  const setIsAnonymous = useCallback((isAnonymous: boolean) => {
    setState(prev => ({
      ...prev,
      isAnonymous,
      clientName: isAnonymous ? '' : prev.clientName
    }));
  }, []);

  const setScore = useCallback((field: keyof Scores, value: number) => {
    setState(prev => ({
      ...prev,
      scores: { ...prev.scores, [field]: value }
    }));
  }, []);

  const setLowScoreReason = useCallback((field: keyof LowScoreReasons, value: string) => {
    setState(prev => ({
      ...prev,
      lowScoreReasons: { ...prev.lowScoreReasons, [field]: value }
    }));
  }, []);

  const setWantMore = useCallback((field: keyof Omit<WantMore, 'other'>, value: boolean) => {
    setState(prev => ({
      ...prev,
      wantMore: { ...prev.wantMore, [field]: value }
    }));
  }, []);

  const setWantMoreOther = useCallback((value: string) => {
    setState(prev => ({
      ...prev,
      wantMore: { ...prev.wantMore, other: value }
    }));
  }, []);

  const setWantLess = useCallback((field: keyof Omit<WantLess, 'other'>, value: boolean) => {
    setState(prev => ({
      ...prev,
      wantLess: { ...prev.wantLess, [field]: value }
    }));
  }, []);

  const setWantLessOther = useCallback((value: string) => {
    setState(prev => ({
      ...prev,
      wantLess: { ...prev.wantLess, other: value }
    }));
  }, []);

  const setPositiveFeedback = useCallback((value: string) => {
    setState(prev => ({ ...prev, positiveFeedback: value }));
  }, []);

  const nextStep = useCallback(() => {
    setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
  }, []);

  const prevStep = useCallback(() => {
    setState(prev => ({ ...prev, currentStep: Math.max(0, prev.currentStep - 1) }));
  }, []);

  const goToStep = useCallback((step: number) => {
    setState(prev => ({ ...prev, currentStep: step }));
  }, []);

  const setShowLowScoreModal = useCallback((show: boolean, field?: keyof Scores) => {
    setState(prev => ({
      ...prev,
      showLowScoreModal: show,
      currentLowScoreField: field || null
    }));
  }, []);

  const setShowRemindLaterModal = useCallback((show: boolean) => {
    setState(prev => ({ ...prev, showRemindLaterModal: show }));
  }, []);

  const setIsSubmitting = useCallback((isSubmitting: boolean) => {
    setState(prev => ({ ...prev, isSubmitting }));
  }, []);

  const setIsSubmitted = useCallback((isSubmitted: boolean) => {
    setState(prev => ({ ...prev, isSubmitted }));
  }, []);

  // Convert form state to API payload
  const getSubmitPayload = useCallback(() => {
    return {
      client_name: state.isAnonymous ? null : state.clientName,
      is_anonymous: state.isAnonymous,
      score_relationship: state.scores.relationship,
      score_goals: state.scores.goals,
      score_approach: state.scores.approach,
      score_overall: state.scores.overall,
      low_score_reason_relationship: state.lowScoreReasons.relationship || null,
      low_score_reason_goals: state.lowScoreReasons.goals || null,
      low_score_reason_approach: state.lowScoreReasons.approach || null,
      low_score_reason_overall: state.lowScoreReasons.overall || null,
      want_more_listening: state.wantMore.listening,
      want_more_concrete_methods: state.wantMore.concreteMethods,
      want_more_emotion_talk: state.wantMore.emotionTalk,
      want_more_realistic_plans: state.wantMore.realisticPlans,
      want_more_other: state.wantMore.other || null,
      want_less_advice: state.wantLess.advice,
      want_less_questions: state.wantLess.questions,
      want_less_emotion_exploration: state.wantLess.emotionExploration,
      want_less_homework: state.wantLess.homework,
      want_less_nothing: state.wantLess.nothing,
      want_less_other: state.wantLess.other || null,
      positive_feedback: state.positiveFeedback || null
    };
  }, [state]);

  return {
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
  };
}
