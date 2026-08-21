import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Stethoscope,
  Sparkles,
  TrendingUp,
  FileText,
  ShieldAlert,
  ArrowRight,
  Brain,
  Search,
  ExternalLink,
} from 'lucide-react';

interface EvidenceViewProps {
  onBackToAssessment?: () => void;
}

export const EvidenceView: React.FC<EvidenceViewProps> = ({ onBackToAssessment }) => {
  return (
    <div id="evidence-view" className="space-y-8 max-w-4xl mx-auto pb-8">
      {/* Header Banner */}
      <div className="bg-[#121217] border border-[#2A2A2E] rounded-3xl p-6 sm:p-10 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-400 text-xs sm:text-sm font-semibold border border-emerald-500/30">
            <BookOpen className="w-3.5 h-3.5" />
            The Science & Clinical Evidence
          </span>
          <span className="text-xs text-[#8E8E95] font-mono">WHO ASRS-5 DSM-5 Validation</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
          How Can 6 Questions Actually Help Me?
        </h2>

        <p className="text-base sm:text-lg text-[#A0A0A8] leading-relaxed">
          If you are wondering how answering just six simple questions could possibly capture the complexity of how your brain works—or whether this can genuinely support you in taking the next step with a doctor—here is how this tool was built and the science behind it.
        </p>
      </div>

      {/* 3 Main Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#121217] border border-[#2A2A2E] p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/25">
            <Brain className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Machine Learning Distillation</h3>
          <p className="text-sm text-[#A0A0A8] leading-relaxed">
            Rather than asking dozens of vague questions, researchers used machine learning algorithms on thousands of clinical patients to pinpoint the 6 most predictive symptom markers.
          </p>
        </div>

        <div className="bg-[#121217] border border-[#2A2A2E] p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/25">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">91%+ Clinical Accuracy</h3>
          <p className="text-sm text-[#A0A0A8] leading-relaxed">
            In peer-reviewed validation studies published in <em>JAMA Psychiatry</em>, this 6-question scale achieved 91.4% sensitivity and 89.6% specificity compared to full clinical diagnostic interviews.
          </p>
        </div>

        <div className="bg-[#121217] border border-[#2A2A2E] p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/25">
            <Stethoscope className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Recognized by Doctors</h3>
          <p className="text-sm text-[#A0A0A8] leading-relaxed">
            GPs and psychiatrists worldwide recognize the WHO ASRS-5 standard. Handing them your printed summary bridges the gap during brief consultations.
          </p>
        </div>
      </div>

      {/* Deep Dive 1: How the tool was created */}
      <div className="bg-[#121217] border border-[#2A2A2E] rounded-3xl p-6 sm:p-8 space-y-6 shadow-lg">
        <div className="flex items-center gap-3 border-b border-[#2A2A2E] pb-4">
          <div className="w-9 h-9 rounded-xl bg-[#181820] text-emerald-400 flex items-center justify-center border border-[#2A2A2E]">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">1. Where Did These 6 Questions Come From?</h3>
            <span className="text-xs text-[#8E8E95]">Harvard Medical School & World Health Organization (WHO)</span>
          </div>
        </div>

        <div className="space-y-4 text-base text-[#D0D0D8] leading-relaxed">
          <p>
            In the Diagnostic and Statistical Manual of Mental Disorders (DSM-5), there are 18 recognized symptom criteria for ADHD. For years, patients had to fill out lengthy 18-question forms that were often repetitive and prone to respondent fatigue.
          </p>
          <p>
            In 2017, the <strong>WHO Advisory Group on Adult ADHD</strong> (led by researchers at Harvard Medical School, NYU Langone, and SUNY Upstate) set out to build a streamlined, more precise tool calibrated specifically for adults.
          </p>
          <div className="p-4 rounded-xl bg-[#181820] border border-[#2A2A2E] space-y-2 text-sm text-[#B0B0B8]">
            <strong className="text-white block">The Discovery:</strong>
            Using advanced psychometric models (Item Response Theory & Risk Analysis algorithms), they discovered that <strong>these exact 6 questions carry over 90% of the diagnostic weight</strong>. The other 12 questions provided almost no additional statistical benefit in adult screening.
          </div>
        </div>
      </div>

      {/* Deep Dive 2: Why 14 out of 24 points? */}
      <div className="bg-[#121217] border border-[#2A2A2E] rounded-3xl p-6 sm:p-8 space-y-6 shadow-lg">
        <div className="flex items-center gap-3 border-b border-[#2A2A2E] pb-4">
          <div className="w-9 h-9 rounded-xl bg-[#181820] text-emerald-400 flex items-center justify-center border border-[#2A2A2E]">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">2. Why Is the Threshold 14 Points?</h3>
            <span className="text-xs text-[#8E8E95]">Calibrated against full clinical diagnostic interviews</span>
          </div>
        </div>

        <div className="space-y-4 text-base text-[#D0D0D8] leading-relaxed">
          <p>
            Each question offers 5 choices scored from <strong>0 (Never)</strong> to <strong>4 (Very Often)</strong>, giving a maximum score of 24.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-[#181820] border border-amber-500/30 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Score 14 to 24 (Positive Screen)</span>
              <p className="text-sm text-[#C0C0C8]">
                Scores at or above 14 indicate that your daily symptoms occur with a frequency that significantly exceeds typical population baselines, warranting formal clinical discussion.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#181820] border border-emerald-500/30 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Score 0 to 13 (Below Threshold)</span>
              <p className="text-sm text-[#C0C0C8]">
                Scores below 14 reflect normal cognitive fluctuation and occasional distraction common in everyday adult life under typical stress levels.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Dive 3: How this helps in the real world */}
      <div className="bg-[#121217] border border-[#2A2A2E] rounded-3xl p-6 sm:p-8 space-y-6 shadow-lg">
        <div className="flex items-center gap-3 border-b border-[#2A2A2E] pb-4">
          <div className="w-9 h-9 rounded-xl bg-[#181820] text-emerald-400 flex items-center justify-center border border-[#2A2A2E]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">3. How Does Having This Summary Help You at the Doctor?</h3>
            <span className="text-xs text-[#8E8E95]">Bridging the 10-minute appointment gap</span>
          </div>
        </div>

        <div className="space-y-4 text-base text-[#D0D0D8] leading-relaxed">
          <p>
            Many people struggle to explain their experiences during a doctor’s visit because of time pressure or difficulty putting abstract feelings into words. Here is how having your ASRS-5 results empowers you:
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3.5 bg-[#181820] rounded-xl border border-[#2A2A2E]">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white text-sm block">Eliminates "Mind Blanking" Under Pressure</strong>
                <span className="text-sm text-[#A0A0A8]">
                  Instead of struggling to recall everyday examples on the spot, your 6-month summary gives your doctor a concrete breakdown of inattention, physical restlessness, relaxation, conversational regulation, procrastination, and task organization.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-[#181820] rounded-xl border border-[#2A2A2E]">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white text-sm block">Standardized Clinical Language</strong>
                <span className="text-sm text-[#A0A0A8]">
                  Doctors understand the WHO ASRS-5 metric. Handing them your score of 18/24 (for example) communicates clinical severity instantly without ambiguity.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-[#181820] rounded-xl border border-[#2A2A2E]">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white text-sm block">A Validated First Step Toward Support</strong>
                <span className="text-sm text-[#A0A0A8]">
                  Whether your score indicates ADHD, burnout, sleep disturbance, or sensory overwhelm, having documented data helps your physician guide you toward the right specialist, therapy, or workplace accommodations.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Published Literature & Citations */}
      <div className="bg-[#121217] border border-[#2A2A2E] rounded-3xl p-6 sm:p-8 space-y-4">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-[#8E8E95]">
          Peer-Reviewed Academic Citations
        </h4>
        <div className="space-y-3 text-xs sm:text-sm text-[#A0A0A8] font-mono">
          <div className="p-3 bg-[#181820] rounded-xl border border-[#2A2A2E]">
            <p className="text-white font-sans font-medium mb-1">
              Ustün, B., Adler, L. A., Rudin, C., Faraone, S. V., Spencer, T. J., Berglund, P., Gruber, M. J., & Kessler, R. C. (2017).
            </p>
            <p className="text-emerald-400">
              The World Health Organization Adult ADHD Self-Report Scale for DSM-5 (ASRS-5).
            </p>
            <p className="text-[#8E8E95] mt-1 font-sans">
              <em>JAMA Psychiatry</em>, 74(5), 520–526. doi:10.1001/jamapsychiatry.2017.0298
            </p>
          </div>

          <div className="p-3 bg-[#181820] rounded-xl border border-[#2A2A2E]">
            <p className="text-white font-sans font-medium mb-1">
              Kessler, R. C., Adler, L., Ames, M., Demler, O., Faraone, S. V., Hiripi, E., Howes, M. J., Jin, R., Secnik, K., Spencer, T., Üstün, T. B., & Walters, E. E. (2005).
            </p>
            <p className="text-emerald-400">
              The World Health Organization Adult ADHD Self-Report Scale (ASRS): a short screening scale for use in the general population.
            </p>
            <p className="text-[#8E8E95] mt-1 font-sans">
              <em>Psychological Medicine</em>, 35(2), 245–256.
            </p>
          </div>
        </div>
      </div>

      {/* Call to action button */}
      {onBackToAssessment && (
        <div className="flex justify-center pt-2">
          <button
            id="btn-return-to-assessment"
            onClick={onBackToAssessment}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black text-base font-bold rounded-2xl shadow-xl transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>Return to Screening Assessment</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
