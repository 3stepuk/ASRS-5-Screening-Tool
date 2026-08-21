import React from 'react';
 import { motion, AnimatePresence } from 'motion/react';
 import { QuestionItem, ScaleOption } from '../types';
 import { SCALE_OPTIONS } from '../data/asrsData';
 import { Check } from 'lucide-react';

interface QuestionViewProps {
  question: QuestionItem;
  totalQuestions: number;
  onSelectOption: (option: ScaleOption) => void;
  disabled?: boolean;
}

export const QuestionView: React.FC<QuestionViewProps> = ({
  question,
  totalQuestions,
  onSelectOption,
  disabled = false,
}) => {
  return (
    <div
      id="question-container"
      className="bg-[#121217] border border-[#2A2A2E] rounded-2xl p-6 sm:p-10 shadow-xl"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
          className="space-y-8"
        >
          {/* Header indicator */}
          <div className="flex items-center justify-between border-b border-[#2A2A2E] pb-4">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-400">
              Question {question.number} of {totalQuestions}
            </span>
            <span className="text-xs sm:text-sm text-[#A0A0A5] bg-[#1A1A22] px-3 py-1 rounded-md border border-[#2A2A2E]">
              {question.symptomDomain}
            </span>
          </div>

          {/* Large Question Title */}
          <div className="space-y-2">
            <h2
              id={`question-title-${question.number}`}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5F5F7] leading-snug tracking-tight"
            >
              {question.number}. {question.text}
            </h2>
            <p className="text-sm sm:text-base text-[#9E9EA5] pt-1">
              Select whichever option fits your life best over the past 6 months:
            </p>
          </div>

          {/* 5 Big Option Buttons */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-4">
              {SCALE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  id={`option-${question.number}-${opt.value}`}
                  type="button"
                  disabled={disabled}
                  onClick={() => onSelectOption(opt)}
                  className="flex sm:flex-col items-center justify-between sm:justify-center p-4 sm:p-6 sm:h-36 rounded-xl border-2 border-[#2A2A2E] bg-[#181820] hover:bg-[#22222E] hover:border-emerald-500 active:scale-[0.98] transition-all duration-150 cursor-pointer text-left sm:text-center focus:outline-none focus:ring-2 focus:ring-emerald-500 group disabled:opacity-50 shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-[#121217] group-hover:bg-emerald-500/20 group-hover:text-emerald-300 border border-[#2A2A2E] group-hover:border-emerald-500/50 flex items-center justify-center text-xs sm:text-sm font-bold text-[#8E8E95] sm:mb-3 transition-colors shrink-0">
                    {opt.value}
                  </div>

                  <span className="text-base sm:text-lg font-bold text-[#E5E5EA] group-hover:text-white group-hover:scale-105 transition-all text-center">
                    {opt.label}
                  </span>

                  <span className="text-xs text-[#8E8E95] sm:mt-1 hidden sm:block">
                    {opt.value === 0 ? '0 points' : `${opt.value} point${opt.value > 1 ? 's' : ''}`}
                  </span>

                  <Check className="w-5 h-5 text-emerald-400 opacity-0 group-hover:opacity-100 sm:hidden transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          {/* User helper tip */}
          <div className="pt-4 border-t border-[#2A2A2E] flex items-center justify-between text-xs sm:text-sm text-[#8E8E95]">
            <span>Tip: Tap or click one of the options above to continue.</span>
            <span>Takes ~1-2 minutes</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};


