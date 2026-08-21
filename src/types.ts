export interface ScaleOption {
  label: 'Never' | 'Rarely' | 'Sometimes' | 'Often' | 'Very Often';
  value: 0 | 1 | 2 | 3 | 4;
}

export interface QuestionItem {
  id: number;
  number: number;
  text: string;
  symptomDomain: string;
}

export interface UserResponse {
  questionId: number;
  questionNumber: number;
  questionText: string;
  selectedLabel: string;
  selectedValue: number;
  symptomDomain?: string;
}

export type AssessmentPhase = 'intro' | 'questioning' | 'completed';

export interface ChatMessage {
  id: string;
  sender: 'administrator' | 'respondent';
  text: string;
  timestamp: string;
  isInitialIntro?: boolean;
  scoreHighlight?: boolean;
}
