import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Send, MapPin, Package, Calendar, User, Mail, Phone, Building, ChevronDown, ChevronUp, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
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

// Supported countries list
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

const QuoteForm: React.FC = () => {
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
    pallets: '',
    boxes: '',
    length: '',
    width: '',
    height: '',
    weight: '',
    companyName: '',
    contactPerson: '',
    email: '',
    emailConfirm: '',
    phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCargoDetails, setShowCargoDetails] = useState(false);
  const [fieldValidation, setFieldValidation] = useState<FieldValidation>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [submissionError, setSubmissionError] = useState<string | null>(null);

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

  const validateField = useCallback((name: string, value: string): ValidationResult => {
    switch (name) {
      case 'email':
        return validateEmail(value);
      case 'emailConfirm':
        if (value !== formData.email) {
          return { isValid: false, message: 'Emails do not match' };
        }
        return { isValid: true };
      case 'phone':
        return validatePhone(value, formData.pickupCountry || formData.deliveryCountry);
      case 'pickupPostalCode':
        return validatePostalCode(value, formData.pickupCountry);
      case 'deliveryPostalCode':
        return validatePostalCode(value, formData.deliveryCountry);
      case 'loadingDate':
        return validateDate(value);
      case 'weight':
        return validateWeight(value);
      case 'length':
        return validateDimension(value, 'Length');
      case 'width':
        return validateDimension(value, 'Width');
      case 'height':
        return validateDimension(value, 'Height');
      default:
        if (value.trim() === '') {
          return { isValid: false, message: 'This field is required' };
        }
        return { isValid: true };
    }
  }, [formData.email, formData.pickupCountry, formData.deliveryCountry]);

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

    if (touchedFields.has(name)) {
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
    e.stopPropagation();
    
    // Save current scroll position
    const scrollPosition = window.scrollY;
    
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
      setSubmissionError('Please correct the errors before submitting');
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
      
      // Restore scroll position immediately before state update
      window.scrollTo({ top: scrollPosition, behavior: 'instant' });
      
      setIsSubmitted(true);
      
      // Ensure scroll position is maintained after React re-render
      requestAnimationFrame(() => {
        window.scrollTo({ top: scrollPosition, behavior: 'instant' });
      });
    } catch (err) {
      console.error(err);
      setSubmissionError('Failed to submit quote. Please try again.');
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
      pallets: '',
      boxes: '',
      length: '',
      width: '',
      height: '',
      weight: '',
      companyName: '',
      contactPerson: '',
      email: '',
      emailConfirm: '',
      phone: ''
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
      return <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />;
    }
    if (status === 'invalid') {
      return <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />;
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

  const completedFields = Object.entries(formData).filter(([key, value]) => {
    if (key === 'emailConfirm') return true;
    return value !== '';
  }).length;
  const totalFields = Object.keys(formData).length - 1;

  if (isSubmitted) {
    return (
      <section id="quote" className="py-20 bg-gradient-to-br from-gray-700 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl shadow-2xl p-12">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('thankYou') || 'Thank You!'}</h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('quoteSuccessMessage') || "Your quote request has been sent successfully. We'll get back to you within 24 hours."}
            </p>
            <button
              onClick={resetForm}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
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
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
              <p className="text-red-700 font-medium">{submissionError}</p>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="rounded-2xl shadow-xl bg-gradient-to-br from-white via-gray-50 to-gray-100 p-10 lg:p-12 transition-all duration-300 overflow-visible">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left Column: Cargo Details */}
              <div>
                <div className="flex flex-col gap-4">
                {/* Pickup Details */}
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('pickupPlace')}
                </label>
                <div className="relative">
                  <select
                    name="pickupCountry"
                    value={formData.pickupCountry}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={getFieldClassName('pickupCountry', 'w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all min-h-[48px]')}
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
                  <p id="pickupCountry-error" className="text-red-500 text-sm mt-1" role="alert">
                    {fieldValidation.pickupCountry.message}
                  </p>
                )}
                {formData.pickupCountry && (
                  <>
                    <input
                      type="text"
                      name="pickupCity"
                      value={formData.pickupCity}
                      onChange={handleInputChange}
                      placeholder={t('pickupCity')}
                      className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent mt-3"
                      required
                    />
                    <input
                      type="text"
                      name="pickupPostalCode"
                      value={formData.pickupPostalCode}
                      onChange={handleInputChange}
                      placeholder={t('pickupPostalCode')}
                      className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent mt-3"
                      required
                    />
                    <input
                      type="text"
                      name="pickupCompany"
                      value={formData.pickupCompany}
                      onChange={handleInputChange}
                      placeholder={t('pickupCompany')}
                      className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent mt-3"
                    />
                  </>
                )}

                {/* Delivery Details */}
                <label className="block text-sm font-medium text-gray-700 mb-1 mt-6">
                  {t('deliveryPlace')}
                </label>
                <select
                  name="deliveryCountry"
                  value={formData.deliveryCountry}
                  onChange={handleInputChange}
                  className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  required
                >
                  <option value="">{t('deliveryCountry')}</option>
                  {SUPPORTED_COUNTRIES.map((country) => (
                    <option key={country} value={country}>
                      {t(country)}
                    </option>
                  ))}
                </select>
                {formData.pickupCountry && formData.deliveryCountry && (
                  <>
                    <input
                      type="text"
                      name="deliveryCity"
                      value={formData.deliveryCity}
                      onChange={handleInputChange}
                      placeholder={t('deliveryCity')}
                      className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent mt-3"
                      required
                    />
                    <input
                      type="text"
                      name="deliveryPostalCode"
                      value={formData.deliveryPostalCode}
                      onChange={handleInputChange}
                      placeholder={t('deliveryPostalCode')}
                      className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent mt-3"
                      required
                    />
                    <input
                      type="text"
                      name="deliveryCompany"
                      value={formData.deliveryCompany}
                      onChange={handleInputChange}
                      placeholder={t('deliveryCompany')}
                      className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent mt-3"
                    />

                    {/* Loading Date */}
                    <label className="block text-sm font-medium text-gray-700 mb-1 mt-6">
                      {t('loadingDate')}
                    </label>
                    <input
                      type="date"
                      name="loadingDate"
                      value={formData.loadingDate}
                      onChange={handleInputChange}
                      className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required
                    />

                    {/* Cargo Type */}
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('cargoType')}
                    </label>
                    <div className="relative">
                      <select
                        name="cargoType"
                        value={formData.cargoType}
                        onChange={handleInputChange}
                        title="Επιλέξτε τον τύπο φορτίου"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none"
                        required
                      >
                        <option value="">{t('cargoType')}</option>
                        <option value="dry">{t('cargoTypeDry')}</option>
                        <option value="controlled">{t('cargoTypeControlled')}</option>
                        <option value="adr">{t('cargoTypeAdr')}</option>
                        <option value="special">{t('cargoTypeSpecial')}</option>
                      </select>
                      <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>

                    {/* Λεπτομέρειες Ποσότητας & Τύπου */}
                    <button
                      type="button"
                      onClick={() => setShowCargoDetails(!showCargoDetails)}
                      className="flex items-center justify-between w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition mt-4"
                    >
                      <span>
                        {t('cargoQuantityType') !== 'cargoQuantityType'
                          ? t('cargoQuantityType')
                          : 'Λεπτομέρειες Ποσότητας & Τύπου'}
                      </span>
                      {showCargoDetails ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                    <div
                      className={`transition-all duration-300 ${showCargoDetails ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'} overflow-hidden`}
                    >
                      {showCargoDetails && (
                        <div className="space-y-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('pallets')}
                          </label>
                          <input
                            type="number"
                            name="pallets"
                            value={formData.pallets}
                            onChange={handleInputChange}
                            placeholder={t('palletsPlaceholder')}
                            className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          />

                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('boxes')}
                          </label>
                          <input
                            type="number"
                            name="boxes"
                            value={formData.boxes}
                            onChange={handleInputChange}
                            placeholder={t('boxesPlaceholder')}
                            className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          />

                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('dimensions')}
                          </label>
                          <div className="flex space-x-2">
                            <input
                              type="number"
                              step="0.1"
                              min="0.1"
                              name="length"
                              value={formData.length}
                              onChange={handleInputChange}
                              placeholder={t('lengthPlaceholder')}
                              className="w-1/3 pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              required
                            />
                            <input
                              type="number"
                              step="0.1"
                              min="0.1"
                              name="width"
                              value={formData.width}
                              onChange={handleInputChange}
                              placeholder={t('widthPlaceholder')}
                              className="w-1/3 pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              required
                            />
                            <input
                              type="number"
                              step="0.1"
                              min="0.1"
                              name="height"
                              value={formData.height}
                              onChange={handleInputChange}
                              placeholder={t('heightPlaceholder')}
                              className="w-1/3 pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              required
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">
                      {t('weight')}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        placeholder={t('weight')}
                        title="Βάρος σε κιλά (π.χ. 1000)"
                        className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </>
                )}
                </div>
              </div>
              {/* Right Column: Contact Details */}
              <div>
                <div className="flex flex-col gap-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('companyName')}
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder={t('companyName')}
                      title="Όνομα εταιρείας"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <label className="block text-sm font-medium text-gray-700 mb-1 mt-6">
                    {t('contactPerson')}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      placeholder={t('contactPerson')}
                      title="Όνομα υπεύθυνου επικοινωνίας"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <label className="block text-sm font-medium text-gray-700 mb-1 mt-6">
                    {t('email')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('email')}
                      title="π.χ. example@mail.com"
                      className={`w-full pl-12 pr-4 py-3 border ${
                        formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                      required
                    />
                  </div>
                  {formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                    <p className="text-red-500 text-xs mt-1">{t('invalidEmail')}</p>
                  )}

                  <label className="block text-sm font-medium text-gray-700 mb-1 mt-6">
                    {t('phone')}
                  </label>
                  <PhoneInput
                    name="phone"
                    value={formData.phone}
                    onChange={(value, countryCode) => {
                      setFormData(prev => ({ ...prev, phone: value }));
                    }}
                    placeholder={t('phone')}
                    required
                    aria-label={t('phone')}
                    aria-required="true"
                    autoComplete="tel"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Summary Before Submit */}
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="font-semibold mb-2">{t('summaryTitle')}</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              {Object.entries(formData).map(([key, value]) => (
                <li key={key}>
                  <span className="font-medium">{t(key)}:</span> {value || '-'}
                </li>
              ))}
            </ul>
          </div>
          {/* Submit Button centered below the grid, outside the two columns */}
          <div className="mt-8 flex justify-center lg:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full max-w-xs bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 disabled:bg-gray-400 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
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

export default QuoteForm;