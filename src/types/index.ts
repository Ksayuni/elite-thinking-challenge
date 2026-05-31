export interface Participant {
  id: string;
  full_name: string;
  dob: string;
  school: string;
  grade: string;
  al_stream: string;
  contact_no: string;
  email: string;
  round1_score: number;
  round2_score: number;
  round1_reward: string;
  round2_reward: string;
  qualified_for_round2: boolean;
  round1_completed: boolean;
  round2_completed: boolean;
  created_at: string;
}

export interface Question {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d?: string;
  correct_answer: string;
  question_order: number;
  image_url: string;
}

export interface ShuffledQuestion extends Question {
  shuffled_options: { label: string; value: string }[];
}

export interface UserQuestionAssignment {
  id: string;
  participant_id: string;
  round: number;
  question_id: string;
  question_order: number;
  shuffled_options: any;
  user_answer: string;
  is_correct: boolean;
  time_taken: number;
}

export type ALStream = 'Mathematics' | 'Biology' | 'Commerce' | 'Arts' | 'Technology';
export type Grade = '9' | '10' | '11' | '12' | '13';

export interface RegistrationData {
  full_name: string;
  dob: string;
  school: string;
  grade: Grade | '';
  al_stream: ALStream;
  contact_no: string;
  email: string;
}
