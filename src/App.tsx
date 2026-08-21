import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { QuestionView } from './components/QuestionView';
import { ProgressTracker } from './components/ProgressTracker';
import { ResultsView } from './components/ResultsView';
import { EvidenceView } from './components/EvidenceView';
import {
  ASRS_QUESTIONS,
  SCALE_OPTIONS,
  PHASE_1_INTRO_TEXT,
} from './data/asrsData';
import { AssessmentPhase, ScaleOption, UserResponse } from './types';
import {
  Play,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  Calendar,
  Layers,
  Activity,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

export default function App() {
  const [phase, setPhase] = useState<AssessmentPhase>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [activeView, setActiveView] = useState<'assessment' | 'evidence'>('assessment');

  // Start assessment
  const handleStart = useCallback(() => {
    setActiveView('assessment');
    setPhase('questioning');
    setCurrentQuestionIndex(0);
    setResponses([]);
  }, []);

  // Handle selecting an option
  const handleAnswerQuestion = useCallback(
    (option: ScaleOption) => {
      const currentQ = ASRS_QUESTIONS[currentQuestionIndex];
      if (!currentQ) return;

      const userResp: UserResponse = {
        questionId: currentQ.id,
        questionNumber: currentQ.number,
        questionText: currentQ.text,
        selectedLabel: option.label,
        selectedValue: option.value,
        symptomDomain: currentQ.symptomDomain,
      };

      const newResponses = [...responses, userResp];
      setResponses(newResponses);

      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < ASRS_QUESTIONS.length) {
        setCurrentQuestionIndex(nextIndex);
      } else {
        setPhase('completed');
      }
    },
    [currentQuestionIndex, responses]
  );

  const handleReset = () => {
    setActiveView('assessment');
    setPhase('intro');
    setCurrentQuestionIndex(0);
    setResponses([]);
  };

  const totalScore = responses.reduce((sum, r) => sum + r.selectedValue, 0);
  const currentQuestion = ASRS_QUESTIONS[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E0E0E0] flex flex-col font-sans antialiased">
      <Header
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={ASRS_QUESTIONS.length}
        phase={phase}
        activeView={activeView}
        onSelectView={setActiveView}
        onReset={handleReset}
      />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col justify-center">
        {/* Science & Evidence View */}
        {activeView === 'evidence' ? (
          <EvidenceView onBackToAssessment={() => setActiveView('assessment')} />
        ) : (
          <>
            {/* Phase: Intro */}
            {phase === 'intro' && (
              <div
                id="intro-card"
                className="bg-[#121217] border border-[#2A2A2E] rounded-3xl p-6 sm:p-12 shadow-2xl space-y-8"
              >
                {/* Header Badge & Title */}
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-400 text-xs sm:text-sm font-semibold border border-emerald-500/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    WHO Adult ADHD Self-Report Scale (ASRS-5)
                  </span>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                    Adult ADHD Self-Screening
                  </h2>
                </div>

                {/* Verbatim Warm Greeting Container */}
                <div className="bg-[#181820] border-2 border-emerald-500/30 rounded-2xl p-6 sm:p-8 space-y-6">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm sm:text-base">
                    <ShieldCheck className="w-5 h-5" />
                    <span>Guidance & Instructions</span>
                  </div>

                  <div className="space-y-4 text-base sm:text-lg text-[#E0E0E6] leading-relaxed">
                    <p>
                      Welcome. This is a short, 6-question check-in based on the World Health Organization&apos;s adult screening tool.
                    </p>
                    <p>
                      It is not a medical diagnosis, but a reliable way to see whether certain focus, energy, and habit patterns suggest it might be helpful to speak with a specialist.
                    </p>
                    <p>
                      For each question, simply reply with whichever option fits your life best over the past 6 months:
                    </p>
                  </div>

                  {/* 3 Graphical Instruction Boxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                    <div className="bg-[#121217] border border-[#2A2A2E] p-4 sm:p-5 rounded-2xl space-y-2.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 font-bold flex items-center justify-center border border-emerald-500/25">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">6 Questions</h3>
                        <p className="text-xs sm:text-sm text-[#A0A0A5] leading-relaxed mt-1">
                          Presented one at a time with dedicated focus and zero time limits.
                        </p>
                      </div>
                    </div>

                    <div className="bg-[#121217] border border-[#2A2A2E] p-4 sm:p-5 rounded-2xl space-y-2.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 font-bold flex items-center justify-center border border-emerald-500/25">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">Past 6 Months</h3>
                        <p className="text-xs sm:text-sm text-[#A0A0A5] leading-relaxed mt-1">
                          Reflect on your everyday habits, concentration, and focus over the last 6 months.
                        </p>
                      </div>
                    </div>

                    <div className="bg-[#121217] border border-[#2A2A2E] p-4 sm:p-5 rounded-2xl space-y-2.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 font-bold flex items-center justify-center border border-emerald-500/25">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">Instant Score (0–24)</h3>
                        <p className="text-xs sm:text-sm text-[#A0A0A5] leading-relaxed mt-1">
                          Calculated against the clinical threshold (14) with supportive next steps.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 5-Point Rating Scale Cards */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#A0A0A5] block">
                      5-Point Response Scale
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                      {SCALE_OPTIONS.map((opt) => (
                        <div
                          key={opt.value}
                          className="p-3.5 bg-[#121217] hover:bg-[#1A1A22] border border-[#2A2A2E] rounded-xl text-center transition-colors"
                        >
                          <div className="text-base sm:text-lg font-bold text-white">{opt.label}</div>
                          <div className="text-xs font-semibold text-emerald-400 mt-0.5">
                            {opt.value} {opt.value === 1 ? 'point' : 'points'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Evidence teaser link */}
                <div className="bg-[#181820] border border-[#2A2A2E] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#C0C0C8]">
                    <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Wondering why only 6 questions? Developed by Harvard & WHO researchers with 91%+ clinical accuracy.</span>
                  </div>
                  <button
                    id="btn-learn-evidence-intro"
                    onClick={() => setActiveView('evidence')}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer shrink-0"
                  >
                    <span>Read the Evidence</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Prompt preview and Begin Action */}
                <div className="space-y-4 pt-2">
                  <p className="text-sm sm:text-base text-[#A0A0A5] font-medium">
                    Whenever you are ready, tap below to start with Question 1:
                  </p>

                  <button
                    id="btn-start-assessment"
                    onClick={handleStart}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black text-base sm:text-lg font-bold rounded-2xl shadow-xl hover:shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-black" />
                    <span>Begin Check-in (Question 1)</span>
                  </button>
                </div>
              </div>
            )}

            {/* Phase: Questioning */}
            {phase === 'questioning' && (
              <div className="space-y-6">
                <ProgressTracker
                  currentQuestion={currentQuestionIndex + 1}
                  totalQuestions={ASRS_QUESTIONS.length}
                />

                <QuestionView
                  question={currentQuestion}
                  totalQuestions={ASRS_QUESTIONS.length}
                  onSelectOption={handleAnswerQuestion}
                />
              </div>
            )}

            {/* Phase: Completed */}
            {phase === 'completed' && (
              <ResultsView
                responses={responses}
                score={totalScore}
                onReset={handleReset}
                onViewEvidence={() => setActiveView('evidence')}
              />
            )}
          </>
        )}
      </main>

      {/* Clean, Simple Footer */}
      <footer className="border-t border-[#2A2A2E] bg-[#0A0A0B] py-4 px-4 sm:px-8 mt-auto text-center text-xs text-[#66666C]">
        Based on the World Health Organization Adult ADHD Self-Report Scale (ASRS-5) • For informational purposes only
      </footer>
    </div>
  );
}



