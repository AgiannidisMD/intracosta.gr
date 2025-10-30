import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Breadcrumbs from '../components/Breadcrumbs';

const TermsOfServicePage: React.FC = () => {
  const { t } = useLanguage();

  const crumbs = [
    { label: t('home'), href: '/#home' },
    { label: 'Policies', href: '#policies' },
    { label: t('termsOfService'), current: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <Breadcrumbs items={crumbs} className="mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            {t('termsOfService')}
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">{t('termsLastUpdated')}: January 2024</p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('termsAcceptanceTitle')}</h2>
            <p className="text-gray-700 mb-6">{t('termsAcceptanceText')}</p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('termsServicesTitle')}</h2>
            <p className="text-gray-700 mb-6">{t('termsServicesText')}</p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('termsUseWebsiteTitle')}</h2>
            <p className="text-gray-700 mb-6">{t('termsUseWebsiteText')}</p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('termsQuoteRequestsTitle')}</h2>
            <p className="text-gray-700 mb-6">{t('termsQuoteRequestsText')}</p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('termsLiabilityTitle')}</h2>
            <p className="text-gray-700 mb-6">{t('termsLiabilityText')}</p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('termsContactTitle')}</h2>
            <p className="text-gray-700">
              {t('termsContactText')}
              <br />
              {t('contactTitleEmail')}: info@intracosta.com
              <br />
              {t('contactTitlePhone')}: +30 23820 27111
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;