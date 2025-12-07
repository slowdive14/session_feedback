import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 피드백 링크 생성 (상담사용)
export async function generateFeedbackLink(sessionNumber: number): Promise<{ url: string; token: string } | null> {
  const token = crypto.randomUUID().replace(/-/g, '').substring(0, 16);

  const { error } = await supabase
    .from('feedback')
    .insert({
      session_number: sessionNumber,
      access_token: token,
      is_submitted: false
    });

  if (error) {
    console.error('Error creating feedback record:', error);
    return null;
  }

  const baseUrl = window.location.origin;
  return {
    url: `${baseUrl}/feedback?s=${sessionNumber}&t=${token}`,
    token
  };
}

// 토큰 검증
export async function validateToken(token: string): Promise<{ valid: boolean; feedback: any | null; canEdit: boolean }> {
  const { data, error } = await supabase
    .from('feedback')
    .select('*')
    .eq('access_token', token)
    .single();

  if (error || !data) {
    return { valid: false, feedback: null, canEdit: false };
  }

  // 수정 가능 여부 확인 (제출 후 24시간 이내)
  let canEdit = false;
  if (data.is_submitted && data.submitted_at) {
    const submittedAt = new Date(data.submitted_at);
    const now = new Date();
    const hoursDiff = (now.getTime() - submittedAt.getTime()) / (1000 * 60 * 60);
    canEdit = hoursDiff <= 24;
  }

  return { valid: true, feedback: data, canEdit };
}

// 피드백 저장
export async function saveFeedback(token: string, feedbackData: any): Promise<boolean> {
  const { error } = await supabase
    .from('feedback')
    .update({
      ...feedbackData,
      is_submitted: true,
      submitted_at: new Date().toISOString()
    })
    .eq('access_token', token);

  if (error) {
    console.error('Error saving feedback:', error);
    return false;
  }

  return true;
}

// 리마인더 생성 (나중에 작성하기)
export async function createReminder(token: string, sessionNumber: number): Promise<boolean> {
  const remindAt = new Date();
  remindAt.setHours(remindAt.getHours() + 24);

  const { error } = await supabase
    .from('reminders')
    .insert({
      access_token: token,
      scheduled_for: remindAt.toISOString(),
      is_sent: false
    });

  if (error) {
    console.error('Error creating reminder:', error);
    return false;
  }

  return true;
}
