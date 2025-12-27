// SRS 기반 4개 질문
export interface Scores {
  relationship: number;  // 관계 (이해/존중)
  goals: number;         // 주제
  approach: number;      // 방식
  overall: number;       // 전반
}

export interface LowScoreReasons {
  relationship: string;
  goals: string;
  approach: string;
  overall: string;
}

export interface WantMore {
  listening: boolean;
  concreteMethods: boolean;
  emotionTalk: boolean;
  realisticPlans: boolean;
  other: string;
}

export interface WantLess {
  advice: boolean;
  questions: boolean;
  emotionExploration: boolean;
  homework: boolean;
  nothing: boolean;  // 지금처럼 좋아요
  other: string;
}

export interface FeedbackFormState {
  // 현재 단계
  currentStep: number; // 0-9

  // URL 파라미터
  sessionNumber: number | null;
  accessToken: string;
  isEditMode: boolean;

  // 식별 정보
  clientName: string;
  isAnonymous: boolean;

  // 정량 평가 (SRS 4개 항목)
  scores: Scores;

  // 낮은 점수 이유
  lowScoreReasons: LowScoreReasons;

  // 더 원하는 것
  wantMore: WantMore;

  // 줄였으면 하는 것
  wantLess: WantLess;

  // 좋았던 점
  positiveFeedback: string;

  // 제출 상태
  isSubmitting: boolean;
  isSubmitted: boolean;

  // 모달 상태
  showLowScoreModal: boolean;
  currentLowScoreField: keyof Scores | null;
  showRemindLaterModal: boolean;
}

// 질문 정보
export interface QuestionInfo {
  id: keyof Scores;
  question: string;
  leftLabel: string;
  rightLabel: string;
  srsOriginal: string;
}

export const QUESTIONS: QuestionInfo[] = [
  {
    id: 'relationship',
    question: '오늘 충분히 이해받고 존중받았다고 느꼈나요?',
    leftLabel: '아니었다',
    rightLabel: '그랬다',
    srsOriginal: 'Relationship'
  },
  {
    id: 'goals',
    question: '오늘 다룬 주제가 나에게 중요한 것이었나요?',
    leftLabel: '아니었다',
    rightLabel: '그랬다',
    srsOriginal: 'Goals & Topics'
  },
  {
    id: 'approach',
    question: '오늘 상담이 나에게 맞는 방식으로 진행됐나요?',
    leftLabel: '안 맞았다',
    rightLabel: '잘 맞았다',
    srsOriginal: 'Approach'
  },
  {
    id: 'overall',
    question: '오늘 상담이 전반적으로 도움이 되었나요?',
    leftLabel: '아니었다',
    rightLabel: '그랬다',
    srsOriginal: 'Overall'
  }
];

// 더 원하는 것 옵션
export const WANT_MORE_OPTIONS = [
  { id: 'listening', label: '더 많이 들어주기' },
  { id: 'concreteMethods', label: '구체적인 방법 알려주기' },
  { id: 'emotionTalk', label: '감정에 대해 더 이야기하기' },
  { id: 'realisticPlans', label: '현실적인 계획 세우기' }
] as const;

// 줄였으면 하는 것 옵션
export const WANT_LESS_OPTIONS = [
  { id: 'advice', label: '조언이나 해결책 제시' },
  { id: 'questions', label: '질문 빈도' },
  { id: 'emotionExploration', label: '감정 탐색' },
  { id: 'homework', label: '과제나 숙제' },
  { id: 'nothing', label: '없음, 지금처럼 좋아요' }
] as const;

// Supabase 테이블 타입
export interface FeedbackRecord {
  id: string;
  created_at: string;
  updated_at: string;
  client_name: string | null;
  is_anonymous: boolean;
  session_number: number;
  access_token: string;
  score_relationship: number | null;
  score_goals: number | null;
  score_approach: number | null;
  score_overall: number | null;
  low_score_reason_relationship: string | null;
  low_score_reason_goals: string | null;
  low_score_reason_approach: string | null;
  low_score_reason_overall: string | null;
  want_more_listening: boolean;
  want_more_concrete_methods: boolean;
  want_more_emotion_talk: boolean;
  want_more_realistic_plans: boolean;
  want_more_other: string | null;
  want_less_advice: boolean;
  want_less_questions: boolean;
  want_less_emotion_exploration: boolean;
  want_less_homework: boolean;
  want_less_nothing: boolean;
  want_less_other: string | null;
  positive_feedback: string | null;
  is_submitted: boolean;
  submitted_at: string | null;
}
