import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Send, Package, User, Mail, Building, ChevronDown, ChevronUp, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { PhoneInput } from './ui/PhoneInput';
import {
  validateEmail,
  validatePhone,
  validatePostalCode,
  validateDate,
  validateWeight,
  validateDimension,
  formatPhoneNumber,
  ValidationResult
} from '../utils/formValidation';

const SUPPORTED_COUNTRIES = [
  'Germany',
  'Austria',
  'Netherlands',
  'Belgium',
  'Poland',
  'Luxembourg',
  'Denmark',
  'Greece',
  'Cyprus'
];

const FORM_STORAGE_KEY = 'intracosta_quote_form_draft';

interface FieldValidation {
  [key: string]: ValidationResult;
}

const QuoteFormEnhanced: React.FC = () => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    pickupCountry: '',
    pickupCity: '',
    pickupPostalCode: '',
    pickupCompany: '',
    deliveryCountry: '',
    deliveryCity: '',
    deliveryPostalCode: '',
    deliveryCompany: '',
    loadingDate: '',
    cargoType: '',
    cargoTypeOther: '',
    packageType: '',
    quantity: '',
    length: '',
    width: '',
    height: '',
    ldmValue: '', // NEW: LDM value field
    weight: '',
    companyName: '',
    contactPerson: '',
    email: '',
    emailConfirm: '',
    phone: '',
    vatNumber: '' // NEW: Optional VAT number
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCargoDetails, setShowCargoDetails] = useState(false);
  const [dimensionType, setDimensionType] = useState<'ldm' | 'package'>('ldm'); // NEW: Toggle between LDM and Package dimensions
  const [fieldValidation, setFieldValidation] = useState<FieldValidation>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  
  // Smart form features
  const [formProgress, setFormProgress] = useState(0);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(FORM_STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
      } catch (err) {
        console.error('Failed to load saved form data:', err);
      }
    }
  }, []);

  useEffect(() => {
    if (Object.values(formData).some(val => val !== '')) {
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  const sanitizeInput = (val: string) => val.replace(/<[^>]*>?/gm, '');
  const getCsrfToken = () => {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? match[1] : '';
  };

  // Calculate form completion percentage
  const calculateProgress = useCallback(() => {
    const requiredFields = [
      'pickupCountry', 'pickupCity', 'pickupPostalCode',
      'deliveryCountry', 'deliveryCity', 'deliveryPostalCode',
      'loadingDate', 'cargoType', 'packageType', 'quantity',
      'weight', 'companyName', 'contactPerson', 'email', 'phone'
    ];
    
    const filledFields = requiredFields.filter(field => {
      const value = formData[field as keyof typeof formData];
      return value && value.toString().trim() !== '';
    }).length;
    
    return Math.round((filledFields / requiredFields.length) * 100);
  }, [formData]);

  // Auto-save functionality
  const autoSave = useCallback(async () => {
    if (Object.values(formData).some(val => val !== '')) {
      setIsAutoSaving(true);
      try {
        localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
        setLastSaved(new Date());
        console.log('Form auto-saved at', new Date().toLocaleTimeString());
      } catch (error) {
        console.error('Auto-save failed:', error);
      } finally {
        setIsAutoSaving(false);
      }
    }
  }, [formData]);

  // Update progress when form data changes
  useEffect(() => {
    const progress = calculateProgress();
    setFormProgress(progress);
    setShowProgress(progress > 0);
  }, [formData, calculateProgress]);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      autoSave();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [autoSave]);

  // Auto-save on form data changes (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (Object.values(formData).some(val => val !== '')) {
        autoSave();
      }
    }, 2000); // 2 second delay

    return () => clearTimeout(timeoutId);
  }, [formData, autoSave]);


  const validateField = useCallback((name: string, value: string): ValidationResult => {
    switch (name) {
      case 'email':
        return validateEmail(value);
      case 'emailConfirm':
        if (!value) {
          return { isValid: false, message: 'Please confirm your email address' };
        }
        if (value !== formData.email) {
          return { isValid: false, message: 'Emails do not match. Please check both email fields carefully.' };
        }
        return { isValid: true };
      case 'phone':
        return validatePhone(value);
      case 'pickupPostalCode':
        return validatePostalCode(value, formData.pickupCountry);
      case 'deliveryPostalCode':
        return validatePostalCode(value, formData.deliveryCountry);
      case 'loadingDate':
        const dateResult = validateDate(value);
        if (dateResult.isValid && value) {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selectedDate < today) {
            return { isValid: false, message: 'Loading date cannot be in the past. Please select a future date.' };
          }
        }
        return dateResult;
      case 'weight':
        return validateWeight(value);
      case 'length':
        return validateDimension(value, 'Length');
      case 'width':
        return validateDimension(value, 'Width');
      case 'height':
        return validateDimension(value, 'Height');
      case 'ldmValue':
        if (dimensionType === 'ldm' && value.trim() === '') {
          return { isValid: false, message: t('requiredField') || 'This field is required' };
        }
        if (value.trim() !== '' && (isNaN(Number(value)) || Number(value) <= 0)) {
          return { isValid: false, message: t('invalidLdmValue') || 'Please enter a valid LDM value' };
        }
        return { isValid: true };
      case 'cargoTypeOther':
        if (formData.cargoType === 'other' && value.trim() === '') {
          return { isValid: false, message: 'Please specify the cargo type' };
        }
        return { isValid: true };
      default:
        if (value.trim() === '' && name !== 'pickupCompany' && name !== 'deliveryCompany' && name !== 'pallets' && name !== 'boxes' && name !== 'cargoTypeOther' && name !== 'vatNumber') {
          return { isValid: false, message: 'This field is required' };
        }
        return { isValid: true };
    }
  }, [formData.email, formData.pickupCountry, formData.deliveryCountry, formData.cargoType, dimensionType, t]);

  const markFieldTouched = (fieldName: string) => {
    setTouchedFields(prev => new Set(prev).add(fieldName));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let sanitizedValue = sanitizeInput(value);

    if (name === 'phone') {
      sanitizedValue = formatPhoneNumber(sanitizedValue, formData.pickupCountry || formData.deliveryCountry);
    }

    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));

    if (touchedFields.has(name) || name === 'emailConfirm') {
      const validation = validateField(name, sanitizedValue);
      setFieldValidation(prev => ({
        ...prev,
        [name]: validation
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    markFieldTouched(name);
    const validation = validateField(name, value);
    setFieldValidation(prev => ({
      ...prev,
      [name]: validation
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);

    const allFields = Object.keys(formData);
    allFields.forEach(field => markFieldTouched(field));

    const validations: FieldValidation = {};
    let hasErrors = false;

    allFields.forEach(field => {
      const validation = validateField(field, formData[field as keyof typeof formData]);
      validations[field] = validation;
      if (!validation.isValid) {
        hasErrors = true;
      }
    });

    setFieldValidation(validations);

    if (hasErrors) {
      setIsSubmitting(false);
      setSubmissionError(t('formValidationError') || 'Please correct the errors before submitting');
      // Check if user prefers reduced motion for accessibility
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      return;
    }

    try {
      // Send quote request via email
      await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'CSRF-Token': getCsrfToken(),
        },
        body: JSON.stringify(formData),
      });

      localStorage.removeItem(FORM_STORAGE_KEY);
      setIsSubmitted(true);
      // Check if user prefers reduced motion for accessibility
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    } catch (err) {
      console.error(err);
      setSubmissionError(t('submissionError') || 'Failed to submit quote. Please try again.');
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      pickupCountry: '',
      pickupCity: '',
      pickupPostalCode: '',
      pickupCompany: '',
      deliveryCountry: '',
      deliveryCity: '',
      deliveryPostalCode: '',
      deliveryCompany: '',
      loadingDate: '',
      cargoType: '',
      cargoTypeOther: '',
      packageType: '',
      quantity: '',
      length: '',
      width: '',
      height: '',
      ldmValue: '',
      weight: '',
      companyName: '',
      contactPerson: '',
      email: '',
      emailConfirm: '',
      phone: '',
      vatNumber: ''
    });
    setFieldValidation({});
    setTouchedFields(new Set());
    localStorage.removeItem(FORM_STORAGE_KEY);
  };

  const getFieldStatus = (fieldName: string) => {
    if (!touchedFields.has(fieldName)) return null;
    const validation = fieldValidation[fieldName];
    if (!validation) return null;
    return validation.isValid ? 'valid' : 'invalid';
  };

  const renderFieldIcon = (fieldName: string) => {
    const status = getFieldStatus(fieldName);
    if (status === 'valid') {
      return <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500 pointer-events-none" />;
    }
    if (status === 'invalid') {
      return <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500 pointer-events-none" />;
    }
    return null;
  };

  const getFieldClassName = (fieldName: string, baseClassName: string) => {
    const status = getFieldStatus(fieldName);
    if (status === 'valid') {
      return `${baseClassName} border-green-500 focus:ring-green-500`;
    }
    if (status === 'invalid') {
      return `${baseClassName} border-red-500 focus:ring-red-500`;
    }
    return baseClassName;
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Calculate form progress - required fields only
  const requiredFields = [
    'pickupCountry', 'pickupCity', 'pickupPostalCode',
    'deliveryCountry', 'deliveryCity', 'deliveryPostalCode',
    'loadingDate', 'cargoType', 'weight',
    'companyName', 'contactPerson', 'email', 'phone'
  ];
  
  // Add conditional required fields
  const conditionalRequiredFields = [];
  if (formData.cargoType === 'other') {
    conditionalRequiredFields.push('cargoTypeOther');
  }
  if (showCargoDetails) {
    if (dimensionType === 'ldm') {
      conditionalRequiredFields.push('ldmValue');
    } else {
      conditionalRequiredFields.push('packageType', 'quantity', 'length', 'width', 'height');
    }
  }
  
  const allRequiredFields = [...requiredFields, ...conditionalRequiredFields];
  const completedFields = allRequiredFields.filter(key => {
    const value = formData[key as keyof typeof formData];
    return value !== '';
  }).length;
  const totalFields = allRequiredFields.length;

  if (isSubmitted) {
    return (
      <section id="quote" className="py-20 bg-gradient-to-br from-gray-700 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl shadow-2xl p-12 quote-form-mobile">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-white animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('thankYou') || 'Thank You!'}</h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('quoteSuccessMessage') || "Your quote request has been sent successfully. We'll get back to you within 24 hours."}
            </p>
            <button
              onClick={resetForm}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
            >
              {t('submitAnotherQuote') || 'Submit Another Quote'}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="py-20 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            {t('quoteFormTitle')}
          </h2>
          <p className="text-xl text-gray-100">
            {t('quoteFormSubtitle')}
          </p>
        </div>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-white">
              {t('formProgress') || 'Form Progress'}
            </span>
            <span className="text-sm font-medium text-white">
              {completedFields} / {totalFields} {t('fieldsCompleted') || 'fields'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
            <div
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${Math.floor((completedFields / totalFields) * 100)}%`,
              }}
            />
          </div>
        </div>
        {submissionError && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r animate-shake">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
              <p className="text-red-700 font-medium">{submissionError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="rounded-2xl shadow-xl bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6 sm:p-10 lg:p-12 transition-all duration-300 form-section">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 form-grid">
              <div className="space-y-6">
                <div className="form-field">
                  <label htmlFor="pickupCountry" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('pickupPlace')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="pickupCountry"
                      name="pickupCountry"
                      value={formData.pickupCountry}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={getFieldClassName('pickupCountry', 'w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all min-h-[48px] text-base')}
                      required
                      aria-label={t('pickupPlace')}
                      aria-required="true"
                      aria-invalid={getFieldStatus('pickupCountry') === 'invalid'}
                      aria-describedby="pickupCountry-error"
                      autoComplete="country"
                    >
                      <option value="">{t('pickupCountry')}</option>
                      {SUPPORTED_COUNTRIES.map((country) => (
                        <option key={country} value={country}>
                          {t(country)}
                        </option>
                      ))}
                    </select>
                    {renderFieldIcon('pickupCountry')}
                  </div>
                  {touchedFields.has('pickupCountry') && fieldValidation.pickupCountry && !fieldValidation.pickupCountry.isValid && (
                    <p id="pickupCountry-error" className="text-red-600 text-sm mt-1 flex items-center error-message" role="alert">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {fieldValidation.pickupCountry.message}
                    </p>
                  )}
                </div>

                {formData.pickupCountry && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <label htmlFor="pickupCity" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('pickupCity')} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="pickupCity"
                          name="pickupCity"
                          value={formData.pickupCity}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder={t('pickupCity')}
                          className={getFieldClassName('pickupCity', 'w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all min-h-[48px] text-base')}
                          required
                          aria-label={t('pickupCity')}
                          aria-required="true"
                          aria-invalid={getFieldStatus('pickupCity') === 'invalid'}
                          autoComplete="address-level2"
                        />
                        {renderFieldIcon('pickupCity')}
                      </div>
                      {touchedFields.has('pickupCity') && fieldValidation.pickupCity && !fieldValidation.pickupCity.isValid && (
                        <p className="text-red-600 text-sm mt-1 flex items-center" role="alert">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {fieldValidation.pickupCity.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="pickupPostalCode" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('pickupPostalCode')} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="pickupPostalCode"
                          name="pickupPostalCode"
                          value={formData.pickupPostalCode}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder={t('pickupPostalCode')}
                          className={getFieldClassName('pickupPostalCode', 'w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all min-h-[48px] text-base')}
                          required
                          aria-label={t('pickupPostalCode')}
                          aria-required="true"
                          aria-invalid={getFieldStatus('pickupPostalCode') === 'invalid'}
                          autoComplete="postal-code"
                        />
                        {renderFieldIcon('pickupPostalCode')}
                      </div>
                      {touchedFields.has('pickupPostalCode') && fieldValidation.pickupPostalCode && !fieldValidation.pickupPostalCode.isValid && (
                        <p className="text-red-600 text-sm mt-1 flex items-center" role="alert">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {fieldValidation.pickupPostalCode.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="pickupCompany" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('pickupCompany')}
                      </label>
                      <input
                        type="text"
                        id="pickupCompany"
                        name="pickupCompany"
                        value={formData.pickupCompany}
                        onChange={handleInputChange}
                        placeholder={t('pickupCompany')}
                        className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all min-h-[48px] text-base"
                        aria-label={t('pickupCompany')}
                        autoComplete="organization"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="deliveryCountry" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('deliveryPlace')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="deliveryCountry"
                      name="deliveryCountry"
                      value={formData.deliveryCountry}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={getFieldClassName('deliveryCountry', 'w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all min-h-[48px] text-base')}
                      required
                      aria-label={t('deliveryPlace')}
                      aria-required="true"
                      aria-invalid={getFieldStatus('deliveryCountry') === 'invalid'}
                      autoComplete="country"
                    >
                      <option value="">{t('deliveryCountry')}</option>
                      {SUPPORTED_COUNTRIES.map((country) => (
                        <option key={country} value={country}>
                          {t(country)}
                        </option>
                      ))}
                    </select>
                    {renderFieldIcon('deliveryCountry')}
                  </div>
                  {touchedFields.has('deliveryCountry') && fieldValidation.deliveryCountry && !fieldValidation.deliveryCountry.isValid && (
                    <p className="text-red-600 text-sm mt-1 flex items-center" role="alert">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {fieldValidation.deliveryCountry.message}
                    </p>
                  )}
                </div>

                {formData.pickupCountry && formData.deliveryCountry && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <label htmlFor="deliveryCity" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('deliveryCity')} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="deliveryCity"
                          name="deliveryCity"
                          value={formData.deliveryCity}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder={t('deliveryCity')}
                          className={getFieldClassName('deliveryCity', 'w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all min-h-[48px] text-base')}
                          required
                          aria-label={t('deliveryCity')}
                          aria-required="true"
                          aria-invalid={getFieldStatus('deliveryCity') === 'invalid'}
                          autoComplete="address-level2"
                        />
                        {renderFieldIcon('deliveryCity')}
                      </div>
                      {touchedFields.has('deliveryCity') && fieldValidation.deliveryCity && !fieldValidation.deliveryCity.isValid && (
                        <p className="text-red-600 text-sm mt-1 flex items-center" role="alert">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {fieldValidation.deliveryCity.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="deliveryPostalCode" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('deliveryPostalCode')} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="deliveryPostalCode"
                          name="deliveryPostalCode"
                          value={formData.deliveryPostalCode}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder={t('deliveryPostalCode')}
                          className={getFieldClassName('deliveryPostalCode', 'w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all min-h-[48px] text-base')}
                          required
                          aria-label={t('deliveryPostalCode')}
                          aria-required="true"
                          aria-invalid={getFieldStatus('deliveryPostalCode') === 'invalid'}
                          autoComplete="postal-code"
                        />
                        {renderFieldIcon('deliveryPostalCode')}
                      </div>
                      {touchedFields.has('deliveryPostalCode') && fieldValidation.deliveryPostalCode && !fieldValidation.deliveryPostalCode.isValid && (
                        <p className="text-red-600 text-sm mt-1 flex items-center" role="alert">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {fieldValidation.deliveryPostalCode.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="deliveryCompany" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('deliveryCompany')}
                      </label>
                      <input
                        type="text"
                        id="deliveryCompany"
                        name="deliveryCompany"
                        value={formData.deliveryCompany}
                        onChange={handleInputChange}
                        placeholder={t('deliveryCompany')}
                        className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all min-h-[48px] text-base"
                        aria-label={t('deliveryCompany')}
                        autoComplete="organization"
                      />
                    </div>

                    <div>
                      <label htmlFor="loadingDate" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('loadingDate')} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          id="loadingDate"
                          name="loadingDate"
                          value={formData.loadingDate}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          min={getTodayDate()}
                          className={getFieldClassName('loadingDate', 'w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all min-h-[48px] text-base')}
                          required
                          aria-label={t('loadingDate')}
                          aria-required="true"
                          aria-invalid={getFieldStatus('loadingDate') === 'invalid'}
                        />
                        {renderFieldIcon('loadingDate')}
                      </div>
                      {touchedFields.has('loadingDate') && fieldValidation.loadingDate && !fieldValidation.loadingDate.isValid && (
                        <p className="text-red-600 text-sm mt-1 flex items-center" role="alert">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {fieldValidation.loadingDate.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="cargoType" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('cargoType')} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
                        <select
                          id="cargoType"
                          name="cargoType"
                          value={formData.cargoType}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={getFieldClassName('cargoType', 'w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all min-h-[48px] text-base')}
                          required
                          aria-label={t('cargoType')}
                          aria-required="true"
                          aria-invalid={getFieldStatus('cargoType') === 'invalid'}
                        >
                          <option value="">{t('cargoType')}</option>
                          <option value="dry">{t('cargoTypeDry')}</option>
                          <option value="controlled">{t('cargoTypeControlled')}</option>
                          <option value="adr">{t('cargoTypeAdr')}</option>
                          <option value="special">{t('cargoTypeSpecial')}</option>
                          <option value="other">{t('cargoTypeOther') || 'Άλλο'}</option>
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          {renderFieldIcon('cargoType')}
                        </div>
                      </div>
                      {touchedFields.has('cargoType') && fieldValidation.cargoType && !fieldValidation.cargoType.isValid && (
                        <p className="text-red-600 text-sm mt-1 flex items-center" role="alert">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {fieldValidation.cargoType.message}
                        </p>
                      )}
                    </div>

                    {formData.cargoType === 'other' && (
                      <div className="animate-fade-in">
                        <label htmlFor="cargoTypeOther" className="block text-sm font-semibold text-gray-700 mb-2">
                          {t('cargoTypeOtherSpecify') || 'Προσδιορίστε τον τύπο φορτίου'} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="cargoTypeOther"
                            name="cargoTypeOther"
                            value={formData.cargoTypeOther}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            placeholder={t('cargoTypeOtherPlaceholder') || 'π.χ. Υγρά χύμα, Οχήματα, κ.λπ.'}
                            className={getFieldClassName('cargoTypeOther', 'w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all min-h-[48px] text-base')}
                            required
                            aria-label={t('cargoTypeOtherSpecify') || 'Specify cargo type'}
                            aria-required="true"
                            aria-invalid={getFieldStatus('cargoTypeOther') === 'invalid'}
                            maxLength={100}
                          />
                          {renderFieldIcon('cargoTypeOther')}
                        </div>
                        {touchedFields.has('cargoTypeOther') && fieldValidation.cargoTypeOther && !fieldValidation.cargoTypeOther.isValid && (
                          <p className="text-red-600 text-sm mt-1 flex items-center" role="alert">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {fieldValidation.cargoTypeOther.message}
                          </p>
                        )}
                      </div>
                    )}

                    <div>
                      <button
                        type="button"
                        onClick={() => setShowCargoDetails(!showCargoDetails)}
                        className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-700 hover:bg-gray-100 transition-all font-medium min-h-[48px]"
                        aria-expanded={showCargoDetails}
                        aria-controls="cargo-details"
                      >
                        <span>
                          {t('cargoQuantityType') || 'Cargo Details (Optional)'}
                        </span>
                        {showCargoDetails ? (
                          <ChevronUp className="w-5 h-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-600" />
                        )}
                      </button>
                      <div
                        id="cargo-details"
                        className={`overflow-hidden transition-all duration-300 ${
                          showCargoDetails ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                        }`}
                      >
                        {showCargoDetails && (
                          <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            {/* Package Type Selection - MOVED TO TOP */}
                            <div className="mb-6">
                              <label htmlFor="packageType" className="block text-sm font-semibold text-gray-700 mb-2">
                                {t('packageType') || 'Τύπος Συσκευασίας'} <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
                                <select
                                  id="packageType"
                                  name="packageType"
                                  value={formData.packageType}
                                  onChange={handleInputChange}
                                  onBlur={handleBlur}
                                  className={getFieldClassName('packageType', 'w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all min-h-[48px] text-base')}
                                  aria-label={t('packageType') || 'Package Type'}
                                >
                                  <option value="">{t('selectPackageType') || 'Επιλέξτε τύπο συσκευασίας'}</option>
                                  <option value="pallets">{t('pallets') || 'Παλέτες'}</option>
                                  <option value="boxes">{t('boxes') || 'Τεμάχια/Κιβώτια'}</option>
                                  <option value="other">{t('otherPackage') || 'Άλλο'}</option>
                                </select>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                  {renderFieldIcon('packageType')}
                                </div>
                              </div>
                              {touchedFields.has('packageType') && fieldValidation.packageType && !fieldValidation.packageType.isValid && (
                                <p className="text-red-600 text-sm mt-1 flex items-center" role="alert">
                                  <AlertCircle className="w-4 h-4 mr-1" />
                                  {fieldValidation.packageType.message}
                                </p>
                              )}
                            </div>

                            {/* Toggle between LDM and Package Dimensions */}
                            <div className="mb-6">
                              <label className="block text-sm font-semibold text-gray-700 mb-3">
                                {t('measurementType') || 'Τύπος Μέτρησης'} <span className="text-red-500">*</span>
                              </label>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <button
                                  type="button"
                                  onClick={() => setDimensionType('ldm')}
                                  className={`flex flex-col items-center justify-center px-4 py-4 rounded-lg border-2 transition-all font-medium ${
                                    dimensionType === 'ldm'
                                      ? 'bg-yellow-500 border-yellow-500 text-white shadow-md'
                                      : 'bg-white border-gray-300 text-gray-700 hover:border-yellow-400'
                                  }`}
                                >
                                  <Package className="w-6 h-6 mb-2" />
                                  <span className="font-semibold">{t('ldmMeasurement') || 'LDM'}</span>
                                  <span className="text-xs opacity-80 mt-1">
                                    {t('ldmDescription') || 'Load Meter (μήκος φορτηγού)'}
                                  </span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDimensionType('package')}
                                  className={`flex flex-col items-center justify-center px-4 py-4 rounded-lg border-2 transition-all font-medium ${
                                    dimensionType === 'package'
                                      ? 'bg-yellow-500 border-yellow-500 text-white shadow-md'
                                      : 'bg-white border-gray-300 text-gray-700 hover:border-yellow-400'
                                  }`}
                                >
                                  <Package className="w-6 h-6 mb-2" />
                                  <span className="font-semibold">{t('packageDimensions') || 'Διαστάσεις Πακέτου'}</span>
                                  <span className="text-xs opacity-80 mt-1">
                                    {t('packageDimensionsDescription') || 'Μήκος x Πλάτος x Ύψος'}
                                  </span>
                                </button>
                              </div>
                              
                              {/* LDM Explanation */}
                              {dimensionType === 'ldm' && (
                                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                  <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                      <Package className="w-5 h-5 text-blue-600 mt-0.5" />
                                    </div>
                                    <div className="ml-3">
                                      <p className="text-sm text-blue-800">
                                        <strong>LDM (Load Meter):</strong> {t('ldmExplanation') || 'Μονάδα μέτρησης που αντιπροσωπεύει το μήκος του φορτηγού σε μέτρα. 1 LDM = 1 μέτρο μήκους φορτηγού.'}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* LDM Fields */}
                            {dimensionType === 'ldm' && (
                              <div className="space-y-4 animate-fade-in">
                                <div>
                                  <label htmlFor="ldmValue" className="block text-sm font-semibold text-gray-700 mb-2">
                                    {t('ldmValue') || 'LDM'} <span className="text-red-500">*</span>
                                  </label>
                                  <p className="text-xs text-gray-600 mb-3">
                                    {t('ldmInstructions') || 'Εισάγετε την τιμή LDM που χρειάζεστε'}
                                  </p>
                                  <div className="relative">
                                    <input
                                      type="number"
                                      step="0.1"
                                      min="0.1"
                                      id="ldmValue"
                                      name="ldmValue"
                                      value={formData.ldmValue || ''}
                                      onChange={handleInputChange}
                                      onBlur={handleBlur}
                                      placeholder={t('ldmPlaceholder') || 'π.χ. 5'}
                                      className={getFieldClassName('ldmValue', 'w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all min-h-[48px] text-base')}
                                      aria-label={t('ldmValue') || 'LDM Value'}
                                      aria-required="true"
                                      aria-invalid={getFieldStatus('ldmValue') === 'invalid'}
                                      aria-describedby="ldmValue-error"
                                    />
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                      {renderFieldIcon('ldmValue')}
                                    </div>
                                  </div>
                                  {getFieldStatus('ldmValue') === 'invalid' && (
                                    <p id="ldmValue-error" className="mt-2 text-sm text-red-600 error-message">
                                      {fieldValidation.ldmValue?.message || t('requiredField') || 'This field is required'}
                                    </p>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Package Dimensions Fields */}
                            {dimensionType === 'package' && (
                              <div className="space-y-4 animate-fade-in">
                                <div>
                                  <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 mb-2">
                                    {t('quantity') || 'Τεμάχια (Αριθμός)'}
                                  </label>
                                  <div className="relative">
                                    <input
                                      type="number"
                                      id="quantity"
                                      name="quantity"
                                      value={formData.quantity}
                                      onChange={handleInputChange}
                                      onBlur={handleBlur}
                                      placeholder={t('quantityPlaceholder') || 'π.χ. 10'}
                                      min="0"
                                      className={getFieldClassName('quantity', 'w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all min-h-[48px] text-base')}
                                      aria-label={t('quantity') || 'Quantity'}
                                    />
                                    {renderFieldIcon('quantity')}
                                  </div>
                                  {touchedFields.has('quantity') && fieldValidation.quantity && !fieldValidation.quantity.isValid && (
                                    <p className="text-red-600 text-sm mt-1 flex items-center" role="alert">
                                      <AlertCircle className="w-4 h-4 mr-1" />
                                      {fieldValidation.quantity.message}
                                    </p>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    {t('dimensions') || 'Διαστάσεις'} (m)
                                  </label>
                                  <div className="grid grid-cols-3 gap-2">
                                    <div className="relative">
                                      <input
                                        type="number"
                                        step="0.1"
                                        min="0.1"
                                        id="length"
                                        name="length"
                                        value={formData.length}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        placeholder={t('lengthPlaceholder') || 'Μήκος'}
                                        className={getFieldClassName('length', 'w-full pl-3 pr-2 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all min-h-[48px] text-base')}
                                        aria-label={t('length') || 'Length in meters'}
                                      />
                                    </div>
                                    <div className="relative">
                                      <input
                                        type="number"
                                        step="0.1"
                                        min="0.1"
                                        id="width"
                                        name="width"
                                        value={formData.width}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        placeholder={t('widthPlaceholder') || 'Πλάτος'}
                                        className={getFieldClassName('width', 'w-full pl-3 pr-2 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all min-h-[48px] text-base')}
                                        aria-label={t('width') || 'Width in meters'}
                                      />
                                    </div>
                                    <div className="relative">
                                      <input
                                        type="number"
                                        step="0.1"
                                        min="0.1"
                                        id="height"
                                        name="height"
                                        value={formData.height}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        placeholder={t('heightPlaceholder') || 'Ύψος'}
                                        className={getFieldClassName('height', 'w-full pl-3 pr-2 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all min-h-[48px] text-base')}
                                        aria-label={t('height') || 'Height in meters'}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="weight" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('weight')} (kg) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          id="weight"
                          name="weight"
                          value={formData.weight}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder={t('weight')}
                          min="1"
                          className={getFieldClassName('weight', 'w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all min-h-[48px] text-base')}
                          required
                          aria-label={t('weight')}
                          aria-required="true"
                          aria-invalid={getFieldStatus('weight') === 'invalid'}
                        />
                        {renderFieldIcon('weight')}
                      </div>
                      {touchedFields.has('weight') && fieldValidation.weight && !fieldValidation.weight.isValid && (
                        <p className="text-red-600 text-sm mt-1 flex items-center" role="alert">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {fieldValidation.weight.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('companyName')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder={t('companyName')}
                      className={getFieldClassName('companyName', 'w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all min-h-[48px] text-base')}
                      required
                      aria-label={t('companyName')}
                      aria-required="true"
                      aria-invalid={getFieldStatus('companyName') === 'invalid'}
                      autoComplete="organization"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {renderFieldIcon('companyName')}
                    </div>
                  </div>
                  {touchedFields.has('companyName') && fieldValidation.companyName && !fieldValidation.companyName.isValid && (
                    <p className="text-red-600 text-sm mt-1 flex items-center" role="alert">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {fieldValidation.companyName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contactPerson" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('contactPerson')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      id="contactPerson"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder={t('contactPerson')}
                      className={getFieldClassName('contactPerson', 'w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all min-h-[48px] text-base')}
                      required
                      aria-label={t('contactPerson')}
                      aria-required="true"
                      aria-invalid={getFieldStatus('contactPerson') === 'invalid'}
                      autoComplete="name"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {renderFieldIcon('contactPerson')}
                    </div>
                  </div>
                  {touchedFields.has('contactPerson') && fieldValidation.contactPerson && !fieldValidation.contactPerson.isValid && (
                    <p className="text-red-600 text-sm mt-1 flex items-center" role="alert">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {fieldValidation.contactPerson.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="vatNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                    ΑΦΜ / VAT Number <span className="text-gray-400 text-xs">(Προαιρετικό)</span>
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      id="vatNumber"
                      name="vatNumber"
                      value={formData.vatNumber}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="π.χ. EL123456789"
                      className={getFieldClassName('vatNumber', 'w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all min-h-[48px] text-base')}
                      aria-label="VAT Number (Optional)"
                      autoComplete="off"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {renderFieldIcon('vatNumber')}
                    </div>
                  </div>
                  {touchedFields.has('vatNumber') && fieldValidation.vatNumber && !fieldValidation.vatNumber.isValid && (
                    <p className="text-red-600 text-sm mt-1 flex items-center" role="alert">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {fieldValidation.vatNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('email')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder={t('email')}
                      className={getFieldClassName('email', 'w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all min-h-[48px] text-base')}
                      required
                      aria-label={t('email')}
                      aria-required="true"
                      aria-invalid={getFieldStatus('email') === 'invalid'}
                      autoComplete="email"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {renderFieldIcon('email')}
                    </div>
                  </div>
                  {touchedFields.has('email') && fieldValidation.email && !fieldValidation.email.isValid && (
                    <p className="text-red-600 text-sm mt-1 flex items-center" role="alert">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {fieldValidation.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="emailConfirm" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('emailConfirm') || 'Confirm Email'} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      type="email"
                      id="emailConfirm"
                      name="emailConfirm"
                      value={formData.emailConfirm}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder={t('emailConfirm') || 'Confirm your email'}
                      className={getFieldClassName('emailConfirm', 'w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all min-h-[48px] text-base')}
                      required
                      aria-label={t('emailConfirm') || 'Confirm Email'}
                      aria-required="true"
                      aria-invalid={getFieldStatus('emailConfirm') === 'invalid'}
                      autoComplete="email"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {renderFieldIcon('emailConfirm')}
                    </div>
                  </div>
                  {touchedFields.has('emailConfirm') && fieldValidation.emailConfirm && !fieldValidation.emailConfirm.isValid && (
                    <p className="text-red-600 text-sm mt-1 flex items-center" role="alert">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {fieldValidation.emailConfirm.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('phone')} <span className="text-red-500">*</span>
                  </label>
                  <PhoneInput
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(value) => {
                      setFormData(prev => ({ ...prev, phone: value }));
                      if (touchedFields.has('phone')) {
                        const validation = validateField('phone', value);
                        setFieldValidation(prev => ({ ...prev, phone: validation }));
                      }
                    }}
                    onBlur={() => {
                      markFieldTouched('phone');
                      const validation = validateField('phone', formData.phone);
                      setFieldValidation(prev => ({ ...prev, phone: validation }));
                    }}
                    placeholder={t('phone')}
                    className={getFieldClassName('phone', '')}
                    required
                    aria-label={t('phone')}
                    aria-required={true}
                    aria-invalid={getFieldStatus('phone') === 'invalid'}
                    autoComplete="tel"
                  />
                  {touchedFields.has('phone') && fieldValidation.phone && !fieldValidation.phone.isValid && (
                    <p className="text-red-600 text-sm mt-1 flex items-center" role="alert">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {fieldValidation.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full max-w-md bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-4 px-8 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center min-h-[56px] form-button"
              aria-label={t('submitQuote')}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                  {t('submitting') || 'Submitting...'}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  {t('submitQuote')}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default QuoteFormEnhanced;
