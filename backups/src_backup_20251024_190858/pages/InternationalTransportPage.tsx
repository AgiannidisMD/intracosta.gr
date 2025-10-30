import React, { useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLanguage } from '../contexts/LanguageContext';

const InternationalTransportPage: React.FC = () => {
  const { t } = useLanguage();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const crumbs = [
    { label: t('home'), href: '/#home' },
    { label: t('services'), href: '/#services' },
    { label: t('internationalTransport'), current: true }
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto py-8 px-4">
        <Breadcrumbs items={crumbs} className="mb-4" />
        <h1 className="text-3xl font-bold mb-4">
          {t('internationalTransportTitle')}
        </h1>
        <p className="text-gray-700">
          {t('internationalTransportDesc')}
        </p>
      </div>
    </div>
  );
};

export default InternationalTransportPage;
