import React from 'react';
import {
  User,
  Mail,
  Phone,
  Church,
  Globe,
  MapPin,
  Clock,
  Shield,
  Eye,
  EyeOff,
  UserCheck,
  CheckCircle2,
  Sparkles,
  Building,
} from 'lucide-react';
import { FormState, FieldKey } from '../types/form';
import { COUNTRIES, DENOMINATIONS } from '../data/churchData';
import { LanguageCode, TRANSLATIONS } from '../i18n/translations';

interface RegistrationFormProps {
  formState: FormState;
  onChange: (field: FieldKey, value: any) => void;
  recentHighlights: FieldKey[];
  onSubmit: () => void;
  isReadyForSubmission: boolean;
  language: LanguageCode;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  formState,
  onChange,
  recentHighlights,
  onSubmit,
  isReadyForSubmission,
  language,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const isHighlighted = (field: FieldKey) => recentHighlights.includes(field);

  const getFieldClass = (field: FieldKey) => {
    const highlighted = isHighlighted(field);
    return `w-full rounded-lg border px-3.5 py-2.5 text-slate-800 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
      highlighted
        ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-400/40 shadow-sm'
        : 'border-slate-300 bg-white hover:border-slate-400'
    }`;
  };

  const HighlightBadge: React.FC<{ field: FieldKey }> = ({ field }) => {
    if (!isHighlighted(field)) return null;
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 bg-blue-100/80 px-2 py-0.5 rounded-full animate-pulse">
        <Sparkles className="w-3 h-3" />
        {t.aiUpdatedBadge}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      {/* Form Header */}
      <div className="border-b border-slate-200 pb-5 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
              <Church className="w-3.5 h-3.5" />
              {t.formHeaderBadge}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {t.formHeaderTitle}
            </h2>
            <p className="text-sm text-slate-500 mt-1">{t.formHeaderSubtitle}</p>
          </div>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-8"
      >
        {/* Section 1: Primary Contact */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                1
              </span>
              {t.sec1Title}
            </h3>
            <span className="text-xs text-slate-400">
              {t.requiredNote} <span className="text-rose-500 font-bold">*</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  {t.fullNameLabel} <span className="text-rose-500">*</span>
                </label>
                <HighlightBadge field="fullName" />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t.fullNamePlaceholder}
                  value={formState.fullName}
                  onChange={(e) => onChange('fullName', e.target.value)}
                  className={getFieldClass('fullName')}
                />
                <User className="absolute right-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  {t.emailLabel} <span className="text-rose-500">*</span>
                </label>
                <HighlightBadge field="email" />
              </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={formState.email}
                  onChange={(e) => onChange('email', e.target.value)}
                  className={getFieldClass('email')}
                />
                <Mail className="absolute right-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  {t.phoneLabel} <span className="text-rose-500">*</span>
                </label>
                <HighlightBadge field="phone" />
              </div>
              <div className="relative">
                <input
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  value={formState.phone}
                  onChange={(e) => onChange('phone', e.target.value)}
                  className={getFieldClass('phone')}
                />
                <Phone className="absolute right-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Church Details & Location */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                2
              </span>
              {t.sec2Title}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  {t.churchNameLabel} <span className="text-rose-500">*</span>
                </label>
                <HighlightBadge field="churchName" />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t.churchNamePlaceholder}
                  value={formState.churchName}
                  onChange={(e) => onChange('churchName', e.target.value)}
                  className={getFieldClass('churchName')}
                />
                <Building className="absolute right-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  {t.countryLabel} <span className="text-rose-500">*</span>
                </label>
                <HighlightBadge field="country" />
              </div>
              <select
                value={formState.country || 'United States'}
                onChange={(e) => onChange('country', e.target.value)}
                className={getFieldClass('country')}
              >
                {formState.country && !COUNTRIES.includes(formState.country) && (
                  <option value={formState.country}>{formState.country}</option>
                )}
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  {t.denominationLabel} <span className="text-rose-500">*</span>
                </label>
                <HighlightBadge field="denomination" />
              </div>
              <select
                value={formState.denomination}
                onChange={(e) => onChange('denomination', e.target.value)}
                className={getFieldClass('denomination')}
              >
                <option value="">{t.denominationPlaceholder}</option>
                {formState.denomination && !DENOMINATIONS.includes(formState.denomination) && (
                  <option value={formState.denomination}>{formState.denomination}</option>
                )}
                {DENOMINATIONS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  {t.addressLabel} <span className="text-rose-500">*</span>
                </label>
                <HighlightBadge field="address" />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t.addressPlaceholder}
                  value={formState.address}
                  onChange={(e) => onChange('address', e.target.value)}
                  className={getFieldClass('address')}
                />
                <MapPin className="absolute right-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  {t.cityLabel} <span className="text-rose-500">*</span>
                </label>
                <HighlightBadge field="city" />
              </div>
              <input
                type="text"
                placeholder={t.cityPlaceholder}
                value={formState.city}
                onChange={(e) => onChange('city', e.target.value)}
                className={getFieldClass('city')}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                    {t.stateLabel} <span className="text-rose-500">*</span>
                  </label>
                  <HighlightBadge field="state" />
                </div>
                <input
                  type="text"
                  placeholder={t.statePlaceholder}
                  value={formState.state}
                  onChange={(e) => onChange('state', e.target.value)}
                  className={getFieldClass('state')}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                    {t.zipLabel} <span className="text-rose-500">*</span>
                  </label>
                  <HighlightBadge field="zipCode" />
                </div>
                <input
                  type="text"
                  placeholder={t.zipPlaceholder}
                  value={formState.zipCode}
                  onChange={(e) => onChange('zipCode', e.target.value)}
                  className={getFieldClass('zipCode')}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  {t.websiteLabel}{' '}
                  <span className="text-xs text-slate-400 font-normal">{t.optionalTag}</span>
                </label>
                <HighlightBadge field="website" />
              </div>
              <div className="relative">
                <input
                  type="url"
                  placeholder="https://www.gracefellowship.org"
                  value={formState.website}
                  onChange={(e) => onChange('website', e.target.value)}
                  className={getFieldClass('website')}
                />
                <Globe className="absolute right-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Event Logistics & Coordinator */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                3
              </span>
              {t.sec3Title}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Arrival Time */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  {t.arrivalTimeLabel} <span className="text-rose-500">*</span>
                </label>
                {(isHighlighted('arrivalTimeHour') ||
                  isHighlighted('arrivalTimeMinute') ||
                  isHighlighted('arrivalTimeAmPm')) && (
                  <HighlightBadge field="arrivalTimeHour" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={formState.arrivalTimeHour}
                  onChange={(e) => onChange('arrivalTimeHour', e.target.value)}
                  className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="">{t.hourPlaceholder}</option>
                  {[7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6].map((h) => (
                    <option key={h} value={String(h)}>
                      {h}
                    </option>
                  ))}
                </select>
                <span className="text-slate-400 font-bold">:</span>
                <select
                  value={formState.arrivalTimeMinute}
                  onChange={(e) => onChange('arrivalTimeMinute', e.target.value)}
                  className="w-24 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="00">00</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                </select>
                <div className="flex rounded-lg border border-slate-300 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => onChange('arrivalTimeAmPm', 'AM')}
                    className={`px-3 py-2.5 text-xs font-semibold transition-colors ${
                      formState.arrivalTimeAmPm === 'AM'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange('arrivalTimeAmPm', 'PM')}
                    className={`px-3 py-2.5 text-xs font-semibold transition-colors border-l border-slate-300 ${
                      formState.arrivalTimeAmPm === 'PM'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    PM
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {t.arrivalTimeHint}
              </p>
            </div>

            {/* Coordinator Selection */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  {t.coordinatorLabel} <span className="text-rose-500">*</span>
                </label>
                <HighlightBadge field="coordinatorRole" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onChange('coordinatorRole', 'self')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    formState.coordinatorRole === 'self'
                      ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/30 text-blue-900'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <UserCheck
                      className={`w-4 h-4 ${
                        formState.coordinatorRole === 'self' ? 'text-blue-600' : 'text-slate-400'
                      }`}
                    />
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        formState.coordinatorRole === 'self'
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {formState.coordinatorRole === 'self' && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      )}
                    </span>
                  </div>
                  <div className="text-xs font-semibold">{t.coordSelfTitle}</div>
                  <div className="text-[11px] text-slate-500">{t.coordSelfDesc}</div>
                </button>

                <button
                  type="button"
                  onClick={() => onChange('coordinatorRole', 'someone_else')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    formState.coordinatorRole === 'someone_else'
                      ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/30 text-blue-900'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <User
                      className={`w-4 h-4 ${
                        formState.coordinatorRole === 'someone_else'
                          ? 'text-blue-600'
                          : 'text-slate-400'
                      }`}
                    />
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        formState.coordinatorRole === 'someone_else'
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {formState.coordinatorRole === 'someone_else' && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      )}
                    </span>
                  </div>
                  <div className="text-xs font-semibold">{t.coordOtherTitle}</div>
                  <div className="text-[11px] text-slate-500">{t.coordOtherDesc}</div>
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Coordinator Fields when someone_else is selected */}
          {formState.coordinatorRole === 'someone_else' && (
            <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4 space-y-3 transition-all animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-900">
                <UserCheck className="w-4 h-4 text-blue-600" />
                {t.coordDetailsHeader}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-slate-700">
                      {t.coordNameLabel} <span className="text-rose-500">*</span>
                    </label>
                    <HighlightBadge field="coordinatorName" />
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. Sarah Miller"
                    value={formState.coordinatorName}
                    onChange={(e) => onChange('coordinatorName', e.target.value)}
                    className={getFieldClass('coordinatorName')}
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-slate-700">
                      {t.coordEmailLabel} <span className="text-rose-500">*</span>
                    </label>
                    <HighlightBadge field="coordinatorEmail" />
                  </div>
                  <input
                    type="email"
                    placeholder="coordinator@church.org"
                    value={formState.coordinatorEmail}
                    onChange={(e) => onChange('coordinatorEmail', e.target.value)}
                    className={getFieldClass('coordinatorEmail')}
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-slate-700">
                      {t.coordPhoneLabel} <span className="text-rose-500">*</span>
                    </label>
                    <HighlightBadge field="coordinatorPhone" />
                  </div>
                  <input
                    type="tel"
                    placeholder="(559) 555-8821"
                    value={formState.coordinatorPhone}
                    onChange={(e) => onChange('coordinatorPhone', e.target.value)}
                    className={getFieldClass('coordinatorPhone')}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 4: Map Visibility (Requires explicit user decision) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                4
              </span>
              {t.sec4Title}
              <span className="text-rose-500 text-sm">*</span>
            </h3>
            <HighlightBadge field="mapVisibility" />
          </div>
          <p className="text-xs text-slate-500">{t.sec4Subtitle}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div
              onClick={() => onChange('mapVisibility', 'public')}
              className={`cursor-pointer rounded-xl border p-4 transition-all ${
                formState.mapVisibility === 'public'
                  ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    formState.mapVisibility === 'public'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Eye className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">{t.mapPublicTitle}</span>
                    <input
                      type="radio"
                      name="mapVisibility"
                      checked={formState.mapVisibility === 'public'}
                      onChange={() => onChange('mapVisibility', 'public')}
                      className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{t.mapPublicDesc}</p>
                </div>
              </div>
            </div>

            <div
              onClick={() => onChange('mapVisibility', 'hidden')}
              className={`cursor-pointer rounded-xl border p-4 transition-all ${
                formState.mapVisibility === 'hidden'
                  ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    formState.mapVisibility === 'hidden'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <EyeOff className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">{t.mapHiddenTitle}</span>
                    <input
                      type="radio"
                      name="mapVisibility"
                      checked={formState.mapVisibility === 'hidden'}
                      onChange={() => onChange('mapVisibility', 'hidden')}
                      className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{t.mapHiddenDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Privacy & Data Use Consent (Required by AI) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                5
              </span>
              {t.sec5Title}
              <span className="text-rose-500 text-sm">*</span>
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              <Shield className="w-3.5 h-3.5" />
              {t.requiresExplicitApproval}
            </div>
          </div>

          <div
            className={`rounded-xl border p-4 transition-all ${
              formState.privacyConsent
                ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-400/20 shadow-xs'
                : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
            }`}
          >
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formState.privacyConsent}
                onChange={(e) => onChange('privacyConsent', e.target.checked)}
                className="mt-0.5 w-4.5 h-4.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
              <div className="flex-1 text-xs sm:text-sm text-slate-700 group-hover:text-slate-900 leading-relaxed">
                <span className="font-semibold text-slate-900">
                  {t.dataProcessingConsentTitle} <span className="text-rose-500">*</span>:
                </span>{' '}
                {t.dataProcessingConsentBody}
              </div>
            </label>
          </div>

          {/* Participation Commitments - Deferred to a later time */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700">
                <Shield className="w-4 h-4 text-slate-500" />
                {t.commitmentsDeferredTitle}
              </div>
              <span className="px-2.5 py-0.5 text-[11px] font-semibold bg-slate-200 text-slate-700 rounded-full">
                {t.commitmentsDeferredBadge}
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">{t.commitmentsDeferredDesc}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white border border-slate-200/80">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span>{t.commitmentItem1}</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white border border-slate-200/80">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span>{t.commitmentItem2}</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white border border-slate-200/80">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span>{t.commitmentItem3}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Optional Communication Preference */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                6
              </span>
              {t.sec6Title}
              <span className="text-xs text-slate-400 font-normal">{t.optionalTag}</span>
            </h3>
            <HighlightBadge field="smsUpdates" />
          </div>

          <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={formState.smsUpdates}
              onChange={(e) => onChange('smsUpdates', e.target.checked)}
              className="mt-0.5 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
            <div className="text-xs sm:text-sm text-slate-700">
              <span className="font-semibold text-slate-900">{t.smsAlertsTitle}</span>{' '}
              {t.smsAlertsDesc}
            </div>
          </label>
        </div>

        {/* Section 7: Final Participation Confirmation */}
        <div className="pt-2 border-t border-slate-200 space-y-4">
          <div className="rounded-xl border-2 border-blue-200 bg-blue-50/70 p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formState.finalConfirmation}
                onChange={(e) => onChange('finalConfirmation', e.target.checked)}
                className="mt-1 w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <div>
                <div className="text-sm font-bold text-blue-950">
                  {t.finalConfirmTitle} <span className="text-rose-500">*</span>
                </div>
                <p className="text-xs text-blue-900/80 mt-0.5">{t.finalConfirmDesc}</p>
              </div>
            </label>
          </div>

          <button
            type="submit"
            disabled={!isReadyForSubmission}
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-sm ${
              isReadyForSubmission
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/25 cursor-pointer ring-2 ring-blue-600/20'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            {isReadyForSubmission ? t.submitBtnReady : t.submitBtnIncomplete}
          </button>
        </div>
      </form>
    </div>
  );
};
