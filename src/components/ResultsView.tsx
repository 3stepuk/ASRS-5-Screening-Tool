import React, { useState } from 'react';
import { UserResponse } from '../types';
import { getStandardizedResult } from '../data/asrsData';
import {
  Check,
  Copy,
  RotateCcw,
  Printer,
  AlertCircle,
  CheckCircle2,
  Compass,
  BarChart3,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Cell,
  CartesianGrid,
  LabelList,
} from 'recharts';

interface ResultsViewProps {
  responses: UserResponse[];
  score: number;
  onReset: () => void;
  onViewEvidence?: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  responses,
  score,
  onReset,
  onViewEvidence,
}) => {
  const [copied, setCopied] = useState(false);
  const result = getStandardizedResult(score);
  const isAboveThreshold = score >= 14;

  const handleCopyReport = async () => {
    const reportText = `--- WHO Adult ADHD Self-Report Scale (ASRS-5) Summary ---
${result.headline}

${result.scoreText}

What this means:
${result.whatThisMeans}

Next steps to consider:
${result.nextSteps}

-------------------------------------------------------
Your 6 Responses:
${responses
  .map(
    (r) =>
      `Question ${r.questionNumber} (${r.symptomDomain}): ${r.questionText}\nResponse: ${r.selectedLabel} (${r.selectedValue} point${r.selectedValue === 1 ? '' : 's'})\n`
  )
  .join('\n')}
-------------------------------------------------------`;

    try {
      await navigator.clipboard.writeText(reportText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Recharts Data for Score vs Threshold Comparison
  const comparisonData = [
    {
      name: 'Your Score',
      score: score,
      color: isAboveThreshold ? '#f59e0b' : '#10b981',
      description: isAboveThreshold ? 'At or above threshold' : 'Below cutoff',
    },
    {
      name: 'Clinical Threshold',
      score: 14,
      color: '#eab308',
      description: 'Standard Screening Cutoff',
    },
    {
      name: 'Max Score',
      score: 24,
      color: '#475569',
      description: 'Highest possible score',
    },
  ];

  // Recharts Data for 6-Question Item Breakdown
  const itemBreakdownData = responses.map((r) => {
    // Short label for axis
    const shortNames: Record<number, string> = {
      1: 'Q1: Focus',
      2: 'Q2: Sitting',
      3: 'Q3: Unwinding',
      4: 'Q4: Sentences',
      5: 'Q5: Delaying',
      6: 'Q6: Details',
    };
    return {
      name: shortNames[r.questionNumber] || `Q${r.questionNumber}`,
      fullQuestion: r.questionText,
      domain: r.symptomDomain,
      points: r.selectedValue,
      label: r.selectedLabel,
    };
  });

  return (
    <div id="results-view" className="space-y-8">
      {/* Primary Guidance & Summary Card */}
      <div
        id="standardized-result-card"
        className="bg-[#121217] border border-[#2A2A2E] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8"
      >
        {/* Header with Title and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#2A2A2E]">
          <div className="space-y-2">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-400 block">
              ASRS-5 Check-in Summary
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              {result.headline}
            </h2>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="text-2xl sm:text-3xl font-black text-white">
                {score} <span className="text-lg font-normal text-[#8E8E95]">/ 24 points</span>
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                  isAboveThreshold
                    ? 'bg-amber-950/60 text-amber-300 border border-amber-500/40'
                    : 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {isAboveThreshold ? (
                  <AlertCircle className="w-4 h-4" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
                {isAboveThreshold ? 'Score ≥ 14 (Threshold Met)' : 'Score ≤ 13 (Below Threshold)'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
            <button
              id="btn-copy-report"
              onClick={handleCopyReport}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-[#D0D0D5] hover:text-white bg-[#1A1A22] hover:bg-[#252530] rounded-xl border border-[#2A2A2E] hover:border-[#3A3A42] transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#8E8E95]" />
                  <span>Copy Summary</span>
                </>
              )}
            </button>
            <button
              id="btn-print-report"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-[#D0D0D5] hover:text-white bg-[#1A1A22] hover:bg-[#252530] rounded-xl border border-[#2A2A2E] hover:border-[#3A3A42] transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#8E8E95]" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Visual Score Meter */}
        <div className="py-2 space-y-2.5">
          <div className="flex justify-between text-xs sm:text-sm font-medium text-[#A0A0A5]">
            <span>0</span>
            <span className="text-amber-400 font-bold">Standard Screening Threshold: 14 / 24</span>
            <span>24</span>
          </div>

          <div className="relative w-full bg-[#1A1A22] rounded-full h-4 overflow-hidden border border-[#2A2A2E]">
            {/* Cutoff marker line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-amber-400 z-10"
              style={{ left: `${(14 / 24) * 100}%` }}
              title="Threshold: 14"
            />
            {/* User progress fill */}
            <div
              className={`h-full transition-all duration-700 ease-out ${
                isAboveThreshold
                  ? 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                  : 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
              }`}
              style={{ width: `${Math.max(4, (score / 24) * 100)}%` }}
            />
          </div>
        </div>

        {/* What this means Section */}
        <div className="bg-[#181820] border border-[#2A2A2E] rounded-2xl p-6 sm:p-7 space-y-3">
          <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg">
            {isAboveThreshold ? (
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            )}
            <span>What this means</span>
          </div>
          <p className="text-base sm:text-lg text-[#EDEDF2] leading-relaxed">
            {result.whatThisMeans}
          </p>
        </div>

        {/* Next steps to consider Section */}
        <div className="bg-[#181820] border border-[#2A2A2E] rounded-2xl p-6 sm:p-7 space-y-3">
          <div className="flex items-center gap-2.5 text-white font-bold text-base sm:text-lg">
            <Compass className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Next steps to consider</span>
          </div>
          <p className="text-base sm:text-lg text-[#EDEDF2] leading-relaxed">
            {result.nextSteps}
          </p>
        </div>
      </div>

      {/* Visual Bar Chart Section using Recharts */}
      <div
        id="results-charts-container"
        className="bg-[#121217] border border-[#2A2A2E] rounded-3xl p-6 sm:p-8 shadow-xl space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2A2A2E] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#181820] text-emerald-400 flex items-center justify-center border border-[#2A2A2E]">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Score Comparison Chart</h3>
              <p className="text-xs sm:text-sm text-[#A0A0A8]">
                Visualizing your score against the WHO clinical threshold (14)
              </p>
            </div>
          </div>
          <div className="text-xs font-mono text-[#8E8E95] bg-[#181820] px-3 py-1.5 rounded-lg border border-[#2A2A2E]">
            Scale: 0 to 24 Points
          </div>
        </div>

        {/* Recharts Main Comparison Chart */}
        <div className="w-full h-72 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={comparisonData}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#25252D" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="#8E8E95"
                fontSize={13}
                tickLine={false}
                axisLine={{ stroke: '#2A2A2E' }}
              />
              <YAxis
                domain={[0, 24]}
                ticks={[0, 6, 12, 14, 18, 24]}
                stroke="#8E8E95"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#2A2A2E' }}
              />
              <Tooltip
                cursor={{ fill: 'rgba(255, 255, 255, 0.04)' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-[#181820] border border-[#3A3A42] p-3.5 rounded-xl shadow-2xl text-xs space-y-1">
                        <div className="font-bold text-white text-sm">{data.name}</div>
                        <div className="text-emerald-400 font-semibold">
                          Score: {data.score} / 24 points
                        </div>
                        <div className="text-[#8E8E95]">{data.description}</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine
                y={14}
                stroke="#f59e0b"
                strokeDasharray="4 4"
                strokeWidth={2}
                label={{
                  value: 'Clinical Threshold (14)',
                  position: 'top',
                  fill: '#f59e0b',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}
              />
              <Bar dataKey="score" radius={[10, 10, 0, 0]} maxBarSize={70}>
                {comparisonData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <LabelList
                  dataKey="score"
                  position="top"
                  fill="#F0F0F5"
                  fontSize={14}
                  fontWeight="bold"
                  formatter={(val: number) => `${val} pts`}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 6-Question Points Distribution */}
        <div className="space-y-4 pt-4 border-t border-[#2A2A2E]">
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white">
              Symptom Frequency Breakdown (0–4 pts per question)
            </h4>
            <p className="text-xs text-[#8E8E95]">
              Points scored on each of the 6 core executive function areas
            </p>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={itemBreakdownData}
                margin={{ top: 15, right: 20, left: 0, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#25252D" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#8E8E95"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: '#2A2A2E' }}
                />
                <YAxis
                  domain={[0, 4]}
                  ticks={[0, 1, 2, 3, 4]}
                  stroke="#8E8E95"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#2A2A2E' }}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(255, 255, 255, 0.04)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#181820] border border-[#3A3A42] p-3.5 rounded-xl shadow-2xl text-xs space-y-1.5 max-w-xs">
                          <div className="font-bold text-white text-sm">{data.domain}</div>
                          <div className="text-[#D0D0D5] text-[11px] leading-snug">{data.fullQuestion}</div>
                          <div className="text-emerald-400 font-semibold pt-1 border-t border-[#2A2A2E]">
                            Answer: {data.label} (+{data.points} pts)
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="points" fill="#10b981" radius={[8, 8, 0, 0]} maxBarSize={45}>
                  <LabelList
                    dataKey="points"
                    position="top"
                    fill="#10b981"
                    fontSize={12}
                    fontWeight="bold"
                    formatter={(val: number) => `+${val}`}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Itemized Questions & Answers */}
      <div className="bg-[#121217] border border-[#2A2A2E] rounded-2xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-[#2A2A2E] bg-[#16161B] flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-white">
            Your 6 Responses
          </h3>
          <span className="text-xs sm:text-sm text-[#A0A0A5]">All 6 questions completed</span>
        </div>

        <div className="divide-y divide-[#2A2A2E]">
          {responses.map((r) => (
            <div
              key={r.questionId}
              id={`response-item-${r.questionNumber}`}
              className="p-5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    Question {r.questionNumber}
                  </span>
                  <span className="text-xs text-[#8E8E95]">({r.symptomDomain})</span>
                </div>
                <p className="text-base sm:text-lg font-medium text-[#F0F0F5] leading-snug">
                  {r.questionText}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
                <span className="px-3.5 py-1.5 rounded-lg bg-[#181820] text-[#E0E0E5] font-semibold text-sm border border-[#2A2A2E]">
                  {r.selectedLabel}
                </span>
                <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center justify-center font-bold text-xs">
                  +{r.selectedValue}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explore the Science & Evidence Callout */}
      {onViewEvidence && (
        <div className="bg-[#181820] border border-emerald-500/30 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <BookOpen className="w-4 h-4" />
              <span>Wondering how these 6 questions work?</span>
            </div>
            <p className="text-sm text-[#D0D0D5]">
              Read how the WHO ASRS-5 was statistically validated by Harvard & WHO researchers and why doctors trust it.
            </p>
          </div>
          <button
            id="btn-view-evidence-from-results"
            onClick={onViewEvidence}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#121217] hover:bg-[#202028] text-white border border-[#2A2A2E] hover:border-emerald-500/40 rounded-xl text-sm font-semibold transition-colors cursor-pointer shrink-0"
          >
            <span>Read the Evidence</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>
        </div>
      )}

      {/* Retake Button */}
      <div className="flex justify-center pt-2">
        <button
          id="btn-restart-assessment"
          onClick={onReset}
          className="inline-flex items-center gap-2.5 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black text-base font-bold rounded-2xl shadow-xl transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Retake Check-in</span>
        </button>
      </div>
    </div>
  );
};



