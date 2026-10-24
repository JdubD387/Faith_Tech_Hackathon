import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  Mic,
  MicOff,
  HelpCircle,
  Clock,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { ChatMessage, FieldKey, FormState } from '../types/form';
import { DEMO_SAMPLES } from '../data/churchData';

interface ChatAssistantProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  completionPercentage: number;
  completedRequiredCount: number;
  totalRequiredCount: number;
  onReset: () => void;
  formState: FormState;
  onViewForm?: () => void;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({
  messages,
  onSendMessage,
  isLoading,
  completionPercentage,
  completedRequiredCount,
  totalRequiredCount,
  onReset,
  formState,
  onViewForm,
}) => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showDemos, setShowDemos] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const handleQuickReply = (reply: string) => {
    if (isLoading) return;
    onSendMessage(reply);
  };

  const toggleMic = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice dictation is simulated here as Web Speech API is not supported in this browser.');
      return;
    }

    try {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      if (!isListening) {
        setIsListening(true);
        recognition.start();
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
          setIsListening(false);
        };
        recognition.onerror = () => {
          setIsListening(false);
        };
        recognition.onend = () => {
          setIsListening(false);
        };
      } else {
        recognition.stop();
        setIsListening(false);
      }
    } catch {
      setIsListening(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 sm:px-8 sm:py-5 border-b border-slate-200 bg-slate-50/90">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
                <Bot className="w-6 h-6" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">Baptize The World Assistant</h3>
                <span className="px-2 py-0.5 text-[11px] font-bold bg-blue-100 text-blue-700 rounded-md">
                  AI Guide
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                Talk naturally — I'll extract and fill out the form for you
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onViewForm && (
              <button
                type="button"
                onClick={onViewForm}
                className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="Inspect current form"
              >
                <span>Inspect Form</span>
                <span className="px-1.5 py-0.5 rounded-full bg-blue-200 text-blue-800 text-[10px] font-bold">
                  {completedRequiredCount}/{totalRequiredCount}
                </span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowDemos(!showDemos)}
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
              title="View quick demonstration examples"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Examples</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showDemos ? 'rotate-180' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onReset}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
              title="Reset conversation and form"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Form Progress Meter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-600" />
              Registration Progress
            </span>
            <span className="text-blue-700 font-bold">
              {completedRequiredCount} of {totalRequiredCount} required details ({completionPercentage}%)
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          {/* Captured details preview pills */}
          {completedRequiredCount > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-medium text-slate-400">Captured:</span>
              {formState.fullName && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-white text-slate-700 text-[10px] font-medium border border-slate-200">
                  👤 {formState.fullName}
                </span>
              )}
              {formState.churchName && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-white text-slate-700 text-[10px] font-medium border border-slate-200">
                  ⛪ {formState.churchName}
                </span>
              )}
              {formState.city && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-white text-slate-700 text-[10px] font-medium border border-slate-200">
                  📍 {formState.city}, {formState.state}
                </span>
              )}
              {formState.arrivalTimeHour && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-white text-slate-700 text-[10px] font-medium border border-slate-200">
                  ⏰ {formState.arrivalTimeHour}:{formState.arrivalTimeMinute} {formState.arrivalTimeAmPm}
                </span>
              )}
              {formState.coordinatorRole && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-white text-slate-700 text-[10px] font-medium border border-slate-200">
                  ✓ Coordinator: {formState.coordinatorRole === 'self' ? 'Self' : (formState.coordinatorName || 'Designated')}
                </span>
              )}
              {formState.mapVisibility && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-white text-slate-700 text-[10px] font-medium border border-slate-200">
                  🗺️ {formState.mapVisibility === 'public' ? 'Public' : 'Hidden'}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Demo Samples Dropdown Drawer */}
        {showDemos && (
          <div className="mt-3 p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2 text-xs animate-fadeIn">
            <div className="font-semibold text-blue-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Try a Quick Scenario (Simulate natural user response):
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {DEMO_SAMPLES.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onSendMessage(sample.message);
                    setShowDemos(false);
                  }}
                  className="text-left p-2 bg-white rounded-lg border border-blue-200 hover:border-blue-400 hover:bg-blue-50/50 transition-colors shadow-2xs"
                >
                  <div className="font-semibold text-slate-900 text-[11px]">{sample.title}</div>
                  <div className="text-[10px] text-slate-500 line-clamp-1">{sample.message}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Messages Stream - Enlarged */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-start gap-3 max-w-[85%]">
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-4.5 h-4.5" />
                </div>
              )}

              <div>
                <div
                  className={`p-4 sm:p-5 rounded-2xl text-[15px] sm:text-base leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-sm'
                      : 'bg-slate-100/90 text-slate-800 rounded-tl-none border border-slate-200/90 shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>

                  {/* Field update tags if this message updated fields */}
                  {msg.updatedFields && msg.updatedFields.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200/70 flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Form fields synced:
                      </span>
                      {msg.updatedFields.map((f) => (
                        <span
                          key={f}
                          className="px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  className={`text-[11px] text-slate-400 mt-1.5 px-1 ${
                    msg.role === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-700 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                  <User className="w-4.5 h-4.5" />
                </div>
              )}
            </div>

            {/* Quick replies rendered below latest assistant message */}
            {msg.role === 'assistant' && msg.quickReplies && msg.quickReplies.length > 0 && (
              <div className="mt-3 ml-11 flex flex-wrap gap-2">
                {msg.quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleQuickReply(reply)}
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white border border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 active:scale-95 transition-all shadow-2xs disabled:opacity-50 cursor-pointer"
                  >
                    <span>{reply}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-3 text-slate-500 text-sm">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-xs">
              <Bot className="w-4.5 h-4.5" />
            </div>
            <div className="bg-slate-100 border border-slate-200 p-4 rounded-2xl rounded-tl-none flex items-center gap-2.5 text-slate-600 shadow-2xs">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-bounce" />
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]" />
              </div>
              <span className="text-sm font-medium">Analyzing and updating form...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area - Enlarged */}
      <div className="p-4 sm:p-5 border-t border-slate-200 bg-white">
        <form onSubmit={handleSubmit} className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleMic}
            className={`p-3 rounded-2xl border transition-colors ${
              isListening
                ? 'bg-rose-50 text-rose-600 border-rose-300 animate-pulse'
                : 'text-slate-500 hover:text-slate-800 border-slate-200 hover:bg-slate-50'
            }`}
            title={isListening ? 'Stop listening' : 'Voice dictation'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type anything (e.g. '106 E. Shields Ave., Fresno, CA 93704')..."
            className="flex-1 rounded-2xl border border-slate-300 px-5 py-3 text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-400"
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="px-5 sm:px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-base flex items-center gap-2 transition-colors cursor-pointer shadow-sm shadow-blue-500/20"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="flex items-center justify-between mt-2.5 text-xs text-slate-400 px-1">
          <span>AI automatically extracts address, times & names.</span>
          <span>Sensitive consents require explicit user confirmation.</span>
        </div>
      </div>
    </div>
  );
};
