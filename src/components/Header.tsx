import React from 'react';
import { RotateCcw, BookOpen, ClipboardList } from 'lucide-react';

interface HeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  phase: 'intro' | 'questioning' | 'completed';
  activeView: 'assessment' | 'evidence';
  onSelectView: (view: 'assessment' | 'evidence') => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentQuestion,
  totalQuestions,
  phase,
  activeView,
  onSelectView,
  onReset,
}) => {
  return (
    <header
      id="psychometric-header"
      className="border-b border-[#2A2A2E] bg-[#0F0F12] sticky top-0 z-30 px-4 sm:px-8 py-3.5"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base sm:text-lg font-bold text-[#F0F0F5] tracking-tight">
              WHO Adult ADHD Screening (ASRS-5)
            </h1>
            <p className="text-xs text-[#9E9EA5] mt-0.5">
              Standardized 6-Question Clinical Self-Assessment
            </p>
          </div>
        </div>

        {/* Navigation Tabs and Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-2.5">
          <div className="inline-flex bg-[#16161B] p-1 rounded-xl border border-[#2A2A2E]">
            <button
              id="nav-tab-assessment"
              onClick={() => onSelectView('assessment')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeView === 'assessment'
                  ? 'bg-emerald-500 text-black shadow-sm'
                  : 'text-[#A0A0A5] hover:text-white hover:bg-[#202028]'
              }`}
            >
              <ClipboardList className="w-3.5 h-3.5" />
              <span>Assessment</span>
            </button>

            <button
              id="nav-tab-evidence"
              onClick={() => onSelectView('evidence')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeView === 'evidence'
                  ? 'bg-emerald-500 text-black shadow-sm'
                  : 'text-[#A0A0A5] hover:text-white hover:bg-[#202028]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Science & Evidence</span>
            </button>
          </div>

          {phase === 'questioning' && activeView === 'assessment' && (
            <div
              id="progress-indicator"
              className="text-xs font-semibold text-emerald-400 px-3 py-1.5 bg-[#16161B] rounded-lg border border-[#2A2A2E] hidden md:block"
            >
              Q{currentQuestion} of {totalQuestions}
            </div>
          )}

          {phase !== 'intro' && (
            <button
              id="btn-reset-session"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#C4C4C8] hover:text-white bg-[#16161B] hover:bg-[#202028] rounded-xl border border-[#2A2A2E] hover:border-[#3A3A42] transition-colors cursor-pointer"
              title="Start over"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Start Over</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};



