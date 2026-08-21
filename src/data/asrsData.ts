import { QuestionItem, ScaleOption } from '../types';

export const SCALE_OPTIONS: ScaleOption[] = [
  { label: 'Never', value: 0 },
  { label: 'Rarely', value: 1 },
  { label: 'Sometimes', value: 2 },
  { label: 'Often', value: 3 },
  { label: 'Very Often', value: 4 },
];

export const ASRS_QUESTIONS: QuestionItem[] = [
  {
    id: 1,
    number: 1,
    text: 'How often do you have difficulty concentrating on what people are saying to you, even when they are speaking directly to you?',
    symptomDomain: 'Inattention / Focus',
  },
  {
    id: 2,
    number: 2,
    text: 'How often do you leave your seat in meetings or in other situations where you are expected to stay seated?',
    symptomDomain: 'Hyperactivity / Motor Restlessness',
  },
  {
    id: 3,
    number: 3,
    text: 'How often do you have difficulty unwinding and relaxing when you have time to yourself?',
    symptomDomain: 'Hyperactivity / Internal Restlessness',
  },
  {
    id: 4,
    number: 4,
    text: "When you are in a conversation, how often do you find yourself finishing other people's sentences before they can finish them themselves?",
    symptomDomain: 'Impulsivity / Verbal Regulation',
  },
  {
    id: 5,
    number: 5,
    text: 'How often do you put things off until the last minute?',
    symptomDomain: 'Executive Function / Procrastination',
  },
  {
    id: 6,
    number: 6,
    text: 'How often do you depend on others to keep your life in order and look after the details?',
    symptomDomain: 'Executive Function / Organization',
  },
];

export const INITIAL_GREETING_PARAGRAPHS = [
  'Welcome. This is a short, 6-question check-in based on the World Health Organization’s adult screening tool.',
  'It is not a medical diagnosis, but a reliable way to see whether certain focus, energy, and habit patterns suggest it might be helpful to speak with a specialist.',
  'For each question, simply reply with whichever option fits your life best over the past 6 months:',
];

export const PHASE_1_INTRO_TEXT = `Welcome. This is a short, 6-question check-in based on the World Health Organization's adult screening tool.

It is not a medical diagnosis, but a reliable way to see whether certain focus, energy, and habit patterns suggest it might be helpful to speak with a specialist.

For each question, simply reply with whichever option fits your life best over the past 6 months:
• Never (0)
• Rarely (1)
• Sometimes (2)
• Often (3)
• Very Often (4)`;

export function getQuestionText(qNum: number): string {
  const item = ASRS_QUESTIONS.find((q) => q.number === qNum);
  if (!item) return '';
  return `${item.number}. ${item.text}`;
}

export interface StandardizedSummary {
  headline: string;
  scoreText: string;
  whatThisMeans: string;
  nextSteps: string;
  fullVerbatim: string;
}

export function getStandardizedResult(score: number): StandardizedSummary {
  if (score >= 14) {
    return {
      headline: 'Thank you for completing the questions.',
      scoreText: `Your Score: ${score} out of 24`,
      whatThisMeans:
        'Your answers show a strong pattern of focus and executive functioning traits that frequently align with adult ADHD.',
      nextSteps:
        'This is not a diagnosis on its own, but crossing this threshold (14 or higher) suggests that exploring these patterns with a qualified professional—such as your GP or a neurodevelopmental specialist—would be a worthwhile and validating next step to understand how your brain works.',
      fullVerbatim: `Thank you for completing the questions.\n\nYour Score: ${score} out of 24\n\nWhat this means:\nYour answers show a strong pattern of focus and executive functioning traits that frequently align with adult ADHD.\n\nNext steps to consider:\nThis is not a diagnosis on its own, but crossing this threshold (14 or higher) suggests that exploring these patterns with a qualified professional—such as your GP or a neurodevelopmental specialist—would be a worthwhile and validating next step to understand how your brain works.`,
    };
  }

  return {
    headline: 'Thank you for completing the questions.',
    scoreText: `Your Score: ${score} out of 24`,
    whatThisMeans:
      'Your answers fall within the typical range for everyday distraction and restlessness seen in the general population.',
    nextSteps:
      'While your score falls below the standard screening threshold for ADHD, everyone experiences stress and cognitive load differently. If you are experiencing ongoing friction or fatigue in daily life, discussing it with a GP or professional is always a valid choice.',
    fullVerbatim: `Thank you for completing the questions.\n\nYour Score: ${score} out of 24\n\nWhat this means:\nYour answers fall within the typical range for everyday distraction and restlessness seen in the general population.\n\nNext steps to consider:\nWhile your score falls below the standard screening threshold for ADHD, everyone experiences stress and cognitive load differently. If you are experiencing ongoing friction or fatigue in daily life, discussing it with a GP or professional is always a valid choice.`,
  };
}

export function getStandardizedResultText(score: number): string {
  return getStandardizedResult(score).fullVerbatim;
}
