import React from 'react';
import {
  X,
  CheckCircle2,
  Church,
  MapPin,
  Clock,
  UserCheck,
  Eye,
  EyeOff,
  ShieldCheck,
  Mail,
  Phone,
  FileCheck,
} from 'lucide-react';
import { FormState } from '../types/form';
import { LanguageCode, TRANSLATIONS } from '../i18n/translations';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formState: FormState;
  onConfirmSubmit: () => void;
  language: LanguageCode;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  formState,
  onConfirmSubmit,
  language,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const isComplete = Boolean(
    formState.fullName &&
      formState.email &&
      formState.phone &&
      formState.churchName &&
      formState.address &&
      formState.city &&
      formState.state &&
      formState.zipCode &&
      formState.denomination &&
      formState.arrivalTimeHour &&
      formState.coordinatorRole &&
      formState.mapVisibility &&
      formState.privacyConsent &&
      formState.finalConfirmation
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{t.reviewModalTitle}</h3>
              <p className="text-xs text-slate-500">{t.reviewModalSubtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-700">
          {/* Church & Contact Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Church className="w-3.5 h-3.5 text-blue-600" />
                {t.sec2Title}
              </div>
              <div className="font-bold text-slate-900 text-base">
                {formState.churchName || '-'}
              </div>
              <div className="text-xs text-slate-600 flex items-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  {formState.address
                    ? `${formState.address}, ${formState.city}, ${formState.state} ${formState.zipCode}`
                    : '-'}
                </span>
              </div>
              <div className="text-xs text-slate-500">
                {t.denominationLabel}:{' '}
                <span className="font-medium text-slate-800">
                  {formState.denomination || '-'}
                </span>
              </div>
              {formState.website && (
                <div className="text-xs text-blue-600 truncate">{formState.website}</div>
              )}
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                {t.sec1Title}
              </div>
              <div className="font-bold text-slate-900 text-base">
                {formState.fullName || '-'}
              </div>
              <div className="text-xs text-slate-600 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{formState.email || '-'}</span>
              </div>
              <div className="text-xs text-slate-600 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{formState.phone || '-'}</span>
              </div>
            </div>
          </div>

          {/* Logistics, Coordinator & Map */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <div className="text-xs text-slate-500 flex items-center gap-1 mb-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                {t.arrivalTimeLabel}
              </div>
              <div className="font-bold text-slate-900 text-sm">
                {formState.arrivalTimeHour
                  ? `${formState.arrivalTimeHour}:${formState.arrivalTimeMinute || '00'} ${
                      formState.arrivalTimeAmPm || 'AM'
                    }`
                  : '-'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <div className="text-xs text-slate-500 flex items-center gap-1 mb-1 font-medium">
                <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                {t.coordinatorLabel}
              </div>
              <div className="font-bold text-slate-900 text-sm">
                {formState.coordinatorRole === 'self'
                  ? t.coordSelfTitle
                  : formState.coordinatorRole === 'someone_else'
                  ? `${formState.coordinatorName || t.coordOtherTitle}`
                  : '-'}
              </div>
              {formState.coordinatorRole === 'someone_else' && (
                <div className="text-[11px] text-slate-500 truncate mt-0.5">
                  {formState.coordinatorEmail}
                </div>
              )}
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <div className="text-xs text-slate-500 flex items-center gap-1 mb-1 font-medium">
                {formState.mapVisibility === 'public' ? (
                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5 text-slate-600" />
                )}
                {t.sec4Title}
              </div>
              <div className="font-bold text-slate-900 text-sm">
                {formState.mapVisibility === 'public'
                  ? t.mapPublicTitle
                  : formState.mapVisibility === 'hidden'
                  ? t.mapHiddenTitle
                  : '-'}
              </div>
            </div>
          </div>

          {/* Consents & Commitments Summary */}
          <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 space-y-2">
            <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              {t.sec5Title}
            </div>
            <ul className="text-xs text-slate-700 space-y-1.5 pl-1">
              <li className="flex items-center gap-2">
                <CheckCircle2
                  className={`w-4 h-4 ${
                    formState.privacyConsent ? 'text-emerald-600' : 'text-rose-500'
                  }`}
                />
                <span>
                  <strong>{t.dataProcessingConsentTitle}:</strong>{' '}
                  {formState.privacyConsent ? '✓' : '-'}
                </span>
              </li>
              <li className="flex items-center gap-2 text-slate-500">
                <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold flex items-center justify-center">
                  i
                </span>
                <span>
                  <strong>{t.commitmentsDeferredTitle}:</strong> {t.commitmentsDeferredBadge}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
          >
            {t.editMoreBtn}
          </button>

          <button
            type="button"
            onClick={onConfirmSubmit}
            disabled={!isComplete}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm ${
              isComplete
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/25 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{t.confirmRegisterBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
