import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin,
  CheckCircle,
  Clock,
  Shield,
  Zap
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const companyStats = [
  { labelKey: "response", value: "< 24h", icon: Clock },
  { labelKey: "coverage", value: "Full Coverage", icon: Shield },
  { labelKey: "delivery", value: "99.5%", icon: Zap }
];

interface PremiumContactProps {
  onSubmit?: (formData: any) => Promise<void>;
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
}

export function PremiumContact({ onSubmit, contactInfo }: PremiumContactProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    gdprConsent: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('nameRequired') || 'Το όνομα είναι υποχρεωτικό';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('emailRequired') || 'Το email είναι υποχρεωτικό';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('validEmailRequired') || 'Παρακαλώ εισάγετε έγκυρο email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t('messageRequired') || 'Το μήνυμα είναι υποχρεωτικό';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('messageMinLength') || 'Το μήνυμα πρέπει να έχει τουλάχιστον 10 χαρακτήρες';
    }
    
    if (!formData.gdprConsent) {
      newErrors.gdprConsent = t('gdprConsentRequired') || 'Πρέπει να αποδεχτείτε την πολιτική απορρήτου';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getCsrfToken = () => {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? match[1] : '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default form submission to /api/contact
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'CSRF-Token': getCsrfToken(),
          },
          body: JSON.stringify(formData),
        });
        
        if (!response.ok) {
          throw new Error('Failed to send email');
        }
      }
      
      // Set submitted state without scroll manipulation
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('Form submission error:', error);
      alert(t('formSubmissionError') || 'Παρουσιάστηκε σφάλμα κατά την αποστολή του μηνύματος. Παρακαλώ δοκιμάστε ξανά.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section className="relative py-20 bg-white text-gray-900 overflow-hidden">
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gray-50/30"></div>

      <div 
        ref={containerRef}
        className="relative z-10 max-w-4xl mx-auto px-6"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-gray-900">
              {t('letsCooperate').split(' ')[0]}
            </span>
            <br />
            <span className="text-yellow-600">
              {t('letsCooperate').split(' ').slice(1).join(' ')}
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
            {t('letsCooperateDescription')}
          </p>

          {/* USP Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            {companyStats.map((stat, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-200"
              >
                <stat.icon className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-900">{stat.value}</span>
                <span className="text-sm text-gray-600">{t(stat.labelKey) || stat.labelKey}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Options - Simple 3-line layout */}
        <div className="space-y-3 mb-8">
          <a
            href="mailto:info@intracosta.com"
            className="flex items-center gap-3 text-gray-700 hover:text-yellow-600 transition-colors group"
          >
            <Mail className="w-5 h-5 text-yellow-500 group-hover:text-yellow-600" />
            <span className="text-lg">info@intracosta.com</span>
          </a>
          <a
            href="tel:+302382027111"
            className="flex items-center gap-3 text-gray-700 hover:text-yellow-600 transition-colors group"
          >
            <Phone className="w-5 h-5 text-yellow-500 group-hover:text-yellow-600" />
            <span className="text-lg">+30 23820 27111</span>
          </a>
          <a
            href="https://maps.app.goo.gl/AhQDdGwnDz4zrD2n8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-700 hover:text-yellow-600 transition-colors group"
          >
            <MapPin className="w-5 h-5 text-yellow-500 group-hover:text-yellow-600" />
            <span className="text-lg">Giannitsa, Greece</span>
          </a>
        </div>

        {/* All Email Addresses Section */}
        <div className="mb-10">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {t('allEmailAddresses') || 'Όλες οι Διευθύνσεις Email'}
            </h3>
            <p className="text-gray-600 text-sm">
              {t('clickToSendEmail') || 'Κάντε κλικ για να στείλετε email στην κατάλληλη διεύθυνση.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { email: 'info@intracosta.com', department: t('generalInfo') || 'Γενικές Πληροφορίες' },
              { email: 'export@intracosta.com', department: t('exports') || 'Εξαγωγές' },
              { email: 'import@intracosta.com', department: t('imports') || 'Εισαγωγές' },
              { email: 'account@intracosta.com', department: t('accounting') || 'Λογιστήριο' }
            ].map((item, index) => (
              <a
                key={index}
                href={`mailto:${item.email}`}
                className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-md hover:border-yellow-400 hover:bg-yellow-50 hover:shadow-md transition-all group"
              >
                <Mail className="w-5 h-5 text-yellow-500 group-hover:text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    {item.department}
                  </div>
                  <div className="text-sm text-gray-600 group-hover:text-yellow-700 break-all">
                    {item.email}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="text-center mb-8">
          <p className="text-gray-500 text-sm">{t('orUseForm') || 'ή χρησιμοποιήστε τη φόρμα για να μας στείλετε μήνυμα'}</p>
        </div>

        {/* Contact Form */}
        <div className="min-h-[600px]"> {/* Prevent layout shift */}
        {!isSubmitted ? (
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="relative">
              <label htmlFor="name" className="sr-only">
                {t('name')}
              </label>
              <input
                id="name"
                type="text"
                placeholder={t('name') || 'Όνομα'}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-4 py-4 bg-white border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-colors ${
                  errors.name ? 'border-red-400' : 'border-gray-200'
                }`}
                aria-label={t('name')}
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="email" className="sr-only">
                {t('email')}
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-4 bg-white border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-colors ${
                  errors.email ? 'border-red-400' : 'border-gray-200'
                }`}
                aria-label={t('email')}
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="message" className="sr-only">
                {t('message')}
              </label>
              <textarea
                id="message"
                placeholder={t('message') || 'Μήνυμα'}
                rows={5}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className={`w-full px-4 py-4 bg-white border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-colors resize-none ${
                  errors.message ? 'border-red-400' : 'border-gray-200'
                }`}
                aria-label={t('message')}
                aria-required="true"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className="text-red-500 text-sm mt-1" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="relative">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.gdprConsent}
                  onChange={(e) => handleInputChange('gdprConsent', e.target.checked)}
                  className="mt-1 w-3 h-3 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500 privacy-policy-checkbox"
                />
                <span className="text-xs sm:text-xs text-gray-600 flex-1 leading-relaxed privacy-policy-text">
                  {t('gdprConsentText') || 'Αποδέχομαι την'}{' '}
                  <Link to="/privacy-policy" className="text-yellow-600 hover:text-yellow-700 underline">
                    {t('privacyPolicy') || 'πολιτική απορρήτου'}
                  </Link>
                  {' '}{t('gdprConsentSuffix') || 'και συναινώ στην επεξεργασία των προσωπικών μου δεδομένων'}
                </span>
              </label>
              {errors.gdprConsent && (
                <p className="text-red-500 text-sm mt-1">{errors.gdprConsent}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-4 px-6 rounded-xl transition-all disabled:opacity-50 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Mail className="h-5 w-5" />
                    {t('sendMessage') || 'Αποστολή Μηνύματος'}
                  </>
                )}
              </span>
            </button>
          </form>
        ) : (
          <div className="text-center py-12" aria-live="polite">
            <div className="w-20 h-20 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('messageSent') || 'Το μήνυμα στάλθηκε!'}</h3>
            <p className="text-gray-600 text-lg mb-6">
              {t('thankYouMessage') || 'Σας ευχαριστούμε που επικοινωνήσατε μαζί μας. Θα επικοινωνήσουμε μαζί σας εντός 24 ωρών.'}
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: '', email: '', message: '', gdprConsent: false });
              }}
              className="px-6 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-900 hover:bg-gray-200 transition-colors shadow-sm"
            >
              {t('sendAnotherMessage') || 'Αποστολή άλλου μηνύματος'}
            </button>
          </div>
        )}
        </div> {/* End min-height container */}

        {/* GDPR Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            {t('dataUsageNotice') || 'Τα προσωπικά σας δεδομένα θα χρησιμοποιηθούν μόνο για να σας απαντήσουμε.'}{' '}
            {t('seeFull') || 'Δείτε την πλήρη'}{' '}
            <Link to="/privacy-policy" className="text-yellow-600 hover:text-yellow-700 underline">
              {t('privacyPolicy') || 'πολιτική απορρήτου'}
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}