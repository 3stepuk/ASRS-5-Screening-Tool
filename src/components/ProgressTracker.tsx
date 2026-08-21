import React from 'react';

interface ProgressTrackerProps {
  currentQuestion: number;
  totalQuestions: number;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  currentQuestion,
  totalQuestions,
}) => {
  const percentage = Math.round((currentQuestion / totalQuestions) * 100);

  return (
    <div
      id="progress-tracker-panel"
      className="bg-[#121217] border border-[#2A2A2E] rounded-xl p-5 sm:p-6 shadow-md mb-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              id="progress-tracker-current-label"
              className="text-lg sm:text-xl font-bold text-[#F0F0F5]"
            >
              Question {currentQuestion} of {totalQuestions}
            </span>
            <span className="text-sm font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              {percentage}% Complete
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#A0A0A5] mt-1">
            Please select the response that best describes your experience over the past 6 months.
          </p>
        </div>

        {/* Step dots */}
        <div className="flex items-center gap-2 pt-1 sm:pt-0">
          {Array.from({ length: totalQuestions }).map((_, idx) => {
            const qNum = idx + 1;
            const isPast = qNum < currentQuestion;
            const isCurrent = qNum === currentQuestion;

            return (
              <div
                key={idx}
                id={`progress-step-indicator-${qNum}`}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all border ${
                  isCurrent
                    ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                    : isPast
                    ? 'bg-[#1E1E28] text-emerald-400 border-emerald-500/40'
                    : 'bg-[#18181F] text-[#66666C] border-[#2A2A2E]'
                }`}
                title={`Question ${qNum} of ${totalQuestions}`}
              >
                {qNum}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#18181F] rounded-full h-3 p-0.5 border border-[#2A2A2E] overflow-hidden flex gap-1.5">
        {Array.from({ length: totalQuestions }).map((_, idx) => {
          const qNum = idx + 1;
          const isFilled = qNum <= currentQuestion;
          const isCurrent = qNum === currentQuestion;

          return (
            <div
              key={idx}
              className={`flex-1 h-full rounded-full transition-all duration-300 ${
                isFilled
                  ? isCurrent
                    ? 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]'
                    : 'bg-emerald-600'
                  : 'bg-[#25252E]'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

