import React, { useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { User, Shield, Terminal } from 'lucide-react';

interface TranscriptConsoleProps {
  messages: ChatMessage[];
  onSubmitCustomInput?: (text: string) => void;
  isCompleted: boolean;
  phase: 'intro' | 'questioning' | 'completed';
}

export const TranscriptConsole: React.FC<TranscriptConsoleProps> = ({
  messages,
  onSubmitCustomInput,
  isCompleted,
  phase,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = React.useState('');

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !onSubmitCustomInput) return;
    onSubmitCustomInput(inputValue.trim());
    setInputValue('');
  };

  return (
    <div
      id="psychometric-transcript"
      className="bg-[#0A0A0B] border border-[#2A2A2E] rounded-xl overflow-hidden shadow-2xl flex flex-col h-[480px]"
    >
      {/* Console Header */}
      <div className="bg-[#0F0F12] px-4 py-3 border-b border-[#2A2A2E] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono text-[#A0A0A5] tracking-[0.2em] uppercase">
            Administration Protocol Log
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.7)]"></span>
          <span className="text-[10px] font-mono text-[#88888C] uppercase tracking-wider">
            {phase === 'intro' ? 'Standby' : phase === 'questioning' ? 'Recording' : 'Complete'}
          </span>
        </div>
      </div>

      {/* Messages Feed */}
      <div
        ref={scrollRef}
        className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 font-mono text-xs text-[#E0E0E0]"
      >
        {messages.map((msg) => {
          const isAdmin = msg.sender === 'administrator';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isAdmin ? 'items-start' : 'items-start justify-end'}`}
            >
              {isAdmin && (
                <div className="w-6 h-6 rounded bg-[#16161B] border border-[#2A2A2E] text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Shield className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-lg px-4 py-3 whitespace-pre-wrap leading-relaxed ${
                  isAdmin
                    ? msg.scoreHighlight
                      ? 'bg-[#0E1713] text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.1)]'
                      : 'bg-[#121217] text-[#D4D4D8] border border-[#2A2A2E]'
                    : 'bg-[#1A1A22] text-[#F4F4F5] border border-[#3A3A42]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-[#66666C] mb-1.5 font-mono uppercase tracking-wider">
                  <span className={isAdmin ? 'text-emerald-400/80 font-medium' : 'text-[#A0A0A5] font-medium'}>
                    {isAdmin ? 'Psychometric Administrator' : 'Participant / Respondent'}
                  </span>
                  <span className="text-[#55555C] ml-3">{msg.timestamp}</span>
                </div>
                <div className="text-xs font-sans sm:font-mono">{msg.text}</div>
              </div>

              {!isAdmin && (
                <div className="w-6 h-6 rounded bg-[#1E1E28] border border-[#3A3A42] text-[#A0A0A5] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Input bar */}
      {onSubmitCustomInput && !isCompleted && (
        <form
          onSubmit={handleSubmit}
          className="p-3 bg-[#0F0F12] border-t border-[#2A2A2E] flex gap-2"
        >
          <input
            id="protocol-input-field"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              phase === 'intro'
                ? 'Type "Start" or click Begin...'
                : 'Type response ("0", "1", "Never", "Often")...'
            }
            className="flex-1 bg-[#121217] border border-[#2A2A2E] rounded px-3 py-2 text-xs font-mono text-[#F0F0F5] placeholder-[#55555C] focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40"
          />
          <button
            id="btn-send-protocol"
            type="submit"
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
};

