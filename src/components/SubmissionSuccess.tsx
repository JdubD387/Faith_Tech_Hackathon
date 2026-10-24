import React from 'react';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Church,
  Printer,
  Download,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import { FormState } from '../types/form';
import { LanguageCode, TRANSLATIONS } from '../i18n/translations';

interface SubmissionSuccessProps {
  formState: FormState;
  onReset: () => void;
  language: LanguageCode;
}

export const SubmissionSuccess: React.FC<SubmissionSuccessProps> = ({
  formState,
  onReset,
  language,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const refCode = `BTW-2026-${
    formState.city ? formState.city.slice(0, 3).toUpperCase() : 'CHU'
  }-${Math.floor(1000 + Math.random() * 9000)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto my-8 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white p-8 sm:p-10 text-center relative">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl mb-4 border border-white/20 shadow-inner">
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{t.successTitle}</h2>
        <p className="text-blue-100 text-sm sm:text-base mt-2 max-w-lg mx-auto">
          {t.successSubtitle(formState.fullName, formState.churchName)}
        </p>

        <div className="inline-flex items-center gap-2 mt-5 px-4 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs font-mono font-medium tracking-wide">
          {t.confirmationRefLabel} <span className="font-bold text-white">{refCode}</span>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="p-6 sm:p-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left card: Church & Schedule */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Church className="w-4 h-4 text-blue-600" />
              {t.registeredLocationHeader}
            </h4>
            <div className="text-lg font-bold text-slate-900">{formState.churchName}</div>
            <div className="text-sm text-slate-600 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                {formState.address}, {formState.city}, {formState.state} {formState.zipCode} (
                {formState.country})
              </span>
            </div>
            <div className="text-xs text-slate-500">
              {t.sec4Title}:{' '}
              <span className="font-semibold text-slate-700">
                {formState.mapVisibility === 'public' ? t.mapPublicTitle : t.mapHiddenTitle}
              </span>
            </div>
          </div>

          {/* Right card: Schedule & Leadership */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-600" />
              {t.eventLogisticsHeader}
            </h4>
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>2026 Baptize The World Gathering</span>
            </div>
            <div className="text-sm text-slate-700 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>
                {t.arrivalTimeLabel}:{' '}
                <strong className="text-slate-900">
                  {formState.arrivalTimeHour}:{formState.arrivalTimeMinute}{' '}
                  {formState.arrivalTimeAmPm}
                </strong>
              </span>
            </div>
            <div className="text-xs text-slate-500">
              {t.coordinatorLabel}:{' '}
              <span className="font-semibold text-slate-800">
                {formState.coordinatorRole === 'someone_else'
                  ? formState.coordinatorName
                  : formState.fullName}
              </span>{' '}
              (
              {formState.coordinatorRole === 'someone_else'
                ? formState.coordinatorEmail
                : formState.email}
              )
            </div>
          </div>
        </div>

        {/* Next Steps Checklist */}
        <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            {t.whatHappensNextTitle}
          </div>
          <ul className="text-xs sm:text-sm text-slate-700 space-y-2 pl-1">
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <span>{t.nextStep1(formState.email)}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <span>{t.nextStep2}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <span>{formState.smsUpdates ? t.nextStep3SmsOn : t.nextStep3SmsOff}</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={onReset}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs sm:text-sm font-medium flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            {t.registerAnotherBtn}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors shadow-2xs"
            >
              <Printer className="w-4 h-4" />
              {t.printReceiptBtn}
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              {t.downloadPdfBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
