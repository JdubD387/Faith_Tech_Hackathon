import React, { useState, useEffect, useMemo } from 'react';
import {
  Church,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  MessageSquare,
  FileText,
  Globe,
} from 'lucide-react';
import { FormState, FieldKey, ChatMessage, AssistantApiResponse } from './types/form';
import { INITIAL_FORM_STATE } from './data/churchData';
import { RegistrationForm } from './components/RegistrationForm';
import { ChatAssistant } from './components/ChatAssistant';
import { ReviewModal } from './components/ReviewModal';
import { SubmissionSuccess } from './components/SubmissionSuccess';
import {
  LanguageCode,
  SUPPORTED_LANGUAGES,
  TRANSLATIONS,
} from './i18n/translations';

export default function App() {
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE);
  const [recentHighlights, setRecentHighlights] = useState<FieldKey[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [viewMode, setViewMode] = useState<'chat' | 'form'>('chat');
  const [hasAutoTransitioned, setHasAutoTransitioned] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const langMeta =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  // Initial welcome message from the assistant
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: TRANSLATIONS.en.welcomeMessage,
      timestamp: new Date(),
      quickReplies: TRANSLATIONS.en.welcomeQuickReplies,
    },
  ]);

  // Handle explicit language switch by user
  const handleLanguageChange = (newLang: LanguageCode) => {
    setLanguage(newLang);
    const nextT = TRANSLATIONS[newLang] || TRANSLATIONS.en;

    setMessages((prev) => {
      // If user hasn't sent any message yet, translate the initial welcome message directly
      const hasUserSentMessage = prev.some((m) => m.role === 'user');
      if (!hasUserSentMessage) {
        return [
          {
            id: `welcome-${Date.now()}`,
            role: 'assistant',
            content: nextT.welcomeMessage,
            timestamp: new Date(),
            quickReplies: nextT.welcomeQuickReplies,
          },
        ];
      }
      return prev;
    });
  };

  // Compute active visible required fields
  const activeRequiredFields = useMemo(() => {
    const list: FieldKey[] = [
      'fullName',
      'email',
      'phone',
      'churchName',
      'country',
      'address',
      'city',
      'state',
      'zipCode',
      'denomination',
      'arrivalTimeHour',
      'coordinatorRole',
      'mapVisibility',
      'privacyConsent',
      'finalConfirmation',
    ];

    if (formState.coordinatorRole === 'someone_else') {
      list.push('coordinatorName', 'coordinatorEmail', 'coordinatorPhone');
    }

    return list;
  }, [formState.coordinatorRole]);

  // Compute completed required count
  const completedRequiredCount = useMemo(() => {
    return activeRequiredFields.filter((key) => {
      const val = formState[key];
      if (typeof val === 'boolean') return val === true;
      if (typeof val === 'string') return val.trim().length > 0;
      return Boolean(val);
    }).length;
  }, [formState, activeRequiredFields]);

  const totalRequiredCount = activeRequiredFields.length;
  const completionPercentage = Math.round((completedRequiredCount / totalRequiredCount) * 100);
  const isReadyForSubmission = completedRequiredCount === totalRequiredCount;

  // Watch for when all required fields are filled to automatically show form validation
  useEffect(() => {
    if (isReadyForSubmission && !hasAutoTransitioned && viewMode === 'chat') {
      setHasAutoTransitioned(true);
      const timer = setTimeout(() => {
        setViewMode('form');
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [isReadyForSubmission, hasAutoTransitioned, viewMode]);

  // Handle direct manual form input
  const handleFieldChange = (field: FieldKey, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Remove from recent highlights once touched manually
    setRecentHighlights((prev) => prev.filter((f) => f !== field));
  };

  // Send message to server assistant
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          formState,
          chatHistory: messages.map((m) => ({ role: m.role, content: m.content })),
          visibleFields: activeRequiredFields,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: AssistantApiResponse = await response.json();

      // If the user typed in another supported language, automatically adapt the UI language
      if (
        data.detectedLanguage &&
        SUPPORTED_LANGUAGES.some((l) => l.code === data.detectedLanguage) &&
        data.detectedLanguage !== language
      ) {
        setLanguage(data.detectedLanguage as LanguageCode);
      }

      let nextFormState = formState;

      // Apply extracted fields
      if (data.extractedFields && Object.keys(data.extractedFields).length > 0) {
        nextFormState = {
          ...formState,
          ...data.extractedFields,
        };
        setFormState(nextFormState);

        const updatedKeys = Object.keys(data.extractedFields) as FieldKey[];
        setRecentHighlights(updatedKeys);

        // Clear highlight badge after 5 seconds
        setTimeout(() => {
          setRecentHighlights((prev) => prev.filter((k) => !updatedKeys.includes(k)));
        }, 5000);
      }

      // Append assistant message
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.aiResponse || "I've updated your form. What would you like to provide next?",
        timestamp: new Date(),
        updatedFields: data.fieldHighlights as FieldKey[],
        quickReplies: data.suggestedQuickReplies || [],
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // If all required fields are filled or AI indicates ready, trigger transition to form validation
      if (data.isReadyForReview) {
        setTimeout(() => {
          setViewMode('form');
        }, 1200);
      }
    } catch (err) {
      console.error('Failed to contact registration assistant:', err);

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content:
          "I heard you! I've checked the information and updated any matching fields. Please check the form and continue whenever you're ready.",
        timestamp: new Date(),
        quickReplies: ['Yes, continue', 'What else is missing?'],
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm(t.resetConfirm)) {
      setFormState(INITIAL_FORM_STATE);
      setRecentHighlights([]);
      setIsSubmitted(false);
      setHasAutoTransitioned(false);
      setViewMode('chat');
      setMessages([
        {
          id: `welcome-${Date.now()}`,
          role: 'assistant',
          content: t.resetWelcomeMessage,
          timestamp: new Date(),
          quickReplies: t.welcomeQuickReplies,
        },
      ]);
    }
  };

  return (
    <div
      dir={langMeta.dir}
      className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans"
    >
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
              <Church className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight">
                  Baptize The World
                </span>
                <span className="hidden md:inline-flex px-2 py-0.5 text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
                  {t.badgeAiAssisted}
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">{t.eventSubtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Global Language Switcher */}
            <div className="relative flex items-center">
              <Globe className="w-4 h-4 text-blue-600 absolute left-3 pointer-events-none" />
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value as LanguageCode)}
                aria-label={t.languageLabel}
                className="pl-8 pr-7 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/70 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-colors"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.nativeName} ({l.name})
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle Switch */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setViewMode('chat')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'chat'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.navChatAssistant}</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('form')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'form'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.navValidateForm}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isReadyForSubmission
                      ? 'bg-emerald-100 text-emerald-800 font-bold'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {completedRequiredCount}/{totalRequiredCount}
                </span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowGuide(!showGuide)}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
              title={t.howItWorksTitle}
            >
              <HelpCircle className="w-4 h-4 text-blue-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Optional How It Works drawer */}
      {showGuide && (
        <div className="bg-blue-900 text-white px-4 py-4 text-xs sm:text-sm border-b border-blue-800 transition-all">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-300" />
                {t.howItWorksTitle}
              </div>
              <p className="text-blue-100 text-xs">
                {t.howItWorksStep1}
                <br />
                {t.howItWorksStep2}
                <br />
                {t.howItWorksStep3}
              </p>
            </div>
            <button
              onClick={() => setShowGuide(false)}
              className="self-end md:self-center px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
            >
              {t.closeBtn}
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isSubmitted ? (
          <SubmissionSuccess
            formState={formState}
            onReset={handleReset}
            language={language}
          />
        ) : viewMode === 'chat' ? (
          /* PRIMARY VIEW: Chat Box Focus */
          <div className="max-w-5xl mx-auto space-y-5 animate-fadeIn">
            {/* Quick banner notice */}
            <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-white border border-blue-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    {t.conversationalModeTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {t.conversationalModeDesc}
                  </p>
                </div>
              </div>

              {completedRequiredCount > 0 && (
                <button
                  type="button"
                  onClick={() => setViewMode('form')}
                  className="px-4 py-2 rounded-xl bg-white border border-blue-300 text-blue-700 hover:bg-blue-50 text-xs sm:text-sm font-semibold flex items-center gap-2 shrink-0 transition-colors shadow-2xs cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>
                    {t.inspectFormBtn} ({completedRequiredCount}/{totalRequiredCount})
                  </span>
                </button>
              )}
            </div>

            {/* Focused Chat Container - Enlarged */}
            <div className="h-[700px] sm:h-[calc(100vh-11rem)] min-h-[620px]">
              <ChatAssistant
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                completionPercentage={completionPercentage}
                completedRequiredCount={completedRequiredCount}
                totalRequiredCount={totalRequiredCount}
                onReset={handleReset}
                formState={formState}
                onViewForm={() => setViewMode('form')}
                language={language}
                onLanguageChange={handleLanguageChange}
              />
            </div>
          </div>
        ) : (
          /* VALIDATION VIEW: Actual Form to Validate */
          <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            {/* Top Validation Banner */}
            <div className="bg-gradient-to-r from-emerald-50 via-blue-50 to-white border-2 border-emerald-200 rounded-2xl p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {t.validationBannerTitle}
                      </h3>
                      <span className="px-2 py-0.5 text-[11px] font-bold bg-emerald-100 text-emerald-800 rounded-full">
                        {isReadyForSubmission
                          ? t.validationBannerReady
                          : t.validationBannerFields(completedRequiredCount, totalRequiredCount)}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      {t.validationBannerDesc}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setViewMode('chat')}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold flex items-center gap-2 shrink-0 transition-colors shadow-2xs cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  <span>{t.returnToChatBtn}</span>
                </button>
              </div>
            </div>

            {/* The Actual Registration Form */}
            <RegistrationForm
              formState={formState}
              onChange={handleFieldChange}
              recentHighlights={recentHighlights}
              onSubmit={() => {
                if (isReadyForSubmission) {
                  setIsSubmitted(true);
                } else {
                  setIsReviewOpen(true);
                }
              }}
              isReadyForSubmission={isReadyForSubmission}
              language={language}
            />

            {/* Bottom floating helper bar to jump back to chat */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>{t.wantToEditWithAi}</span>
              </div>
              <button
                type="button"
                onClick={() => setViewMode('chat')}
                className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                <span>{t.askChatAssistantBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Review Modal if needed */}
      <ReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        formState={formState}
        onConfirmSubmit={() => {
          setIsReviewOpen(false);
          setIsSubmitted(true);
        }}
        language={language}
      />
    </div>
  );
}
