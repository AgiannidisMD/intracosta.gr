import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Breadcrumbs from '../components/Breadcrumbs';

const PrivacyPolicyPage: React.FC = () => {
  const { t } = useLanguage();

  const effectiveDate = '01/01/2025'; // Μπορείς να το κάνεις δυναμικό αν θέλεις
  const websiteAddress = 'www.intracosta.gr';

  const crumbs = [
    { label: t('home'), href: '/#home' },
    { label: 'Policies', href: '#policies' },
    { label: t('privacyPolicy'), current: true }
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto py-8 px-4">
      <Breadcrumbs items={crumbs} className="mb-4" />
      <h1 className="text-3xl font-bold mb-4">{t('privacyPolicyTitle')}</h1>
      <p className="text-sm text-gray-600 mb-6">
        {t('privacyPolicyEffectiveDate')}: {effectiveDate}
      </p>
      <p className="mb-4">
        {t('privacyPolicyIntroduction').replace('[website]', websiteAddress)}
      </p>

      <h2 className="text-2xl font-semibold mb-3">{t('privacyPolicyInfoWeCollectTitle')}</h2>
      <p className="mb-4">{t('privacyPolicyInfoWeCollectText')}</p>

      <h2 className="text-2xl font-semibold mb-3">{t('privacyPolicyHowWeUseInfoTitle')}</h2>
      <p className="mb-4">{t('privacyPolicyHowWeUseInfoText')}</p>

      <h2 className="text-2xl font-semibold mb-3">{t('privacyPolicyDataStorageTitle')}</h2>
      <p className="mb-4">{t('privacyPolicyDataStorageText')}</p>

      <h2 className="text-2xl font-semibold mb-3">{t('privacyPolicyDataSharingTitle')}</h2>
      <p className="mb-4">{t('privacyPolicyDataSharingText')}</p>

      <h2 className="text-2xl font-semibold mb-3">{t('privacyPolicyYourRightsTitle')}</h2>
      <p className="mb-4">{t('privacyPolicyYourRightsText')}</p>

      <h2 className="text-2xl font-semibold mb-3">{t('privacyPolicyCookiesSectionTitle')}</h2>
      <p className="mb-4">{t('privacyPolicyCookiesSectionText')}</p>

      <h2 className="text-2xl font-semibold mb-3">{t('privacyPolicyChangesTitle')}</h2>
      <p className="mb-4">{t('privacyPolicyChangesText')}</p>

      <h2 className="text-2xl font-semibold mb-3">{t('privacyPolicyContactUsTitle')}</h2>
      <p>{t('contactTitleAddress')}: {t('addressText')}</p>
      <p>{t('contactTitleEmail')}: {t('emailLabel')} - export@intracosta.gr</p>
      <p>{t('contactTitlePhone')}: {t('phoneLabel')} - +30 23820 27112</p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;