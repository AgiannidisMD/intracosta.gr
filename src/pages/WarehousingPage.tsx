import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLanguage } from '../contexts/LanguageContext';
import { Warehouse, CheckCircle, ArrowRight, Box, ClipboardList, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WarehousingPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const crumbs = [
    { label: t('home'), href: '/#home' },
    { label: t('services'), href: '/#services' },
    { label: t('warehousing'), current: true }
  ];

  const features = t('services.logisticsFeatures')
    .split('\n')
    .map((feature) => feature.trim())
    .filter(Boolean);

  const serviceCards = [
    {
      title: t('services.logisticsServiceReceivingTitle'),
      description: t('services.logisticsServiceReceivingDescription'),
      Icon: Box
    },
    {
      title: t('services.logisticsServiceInventoryTitle'),
      description: t('services.logisticsServiceInventoryDescription'),
      Icon: ClipboardList
    },
    {
      title: t('services.logisticsServiceLoadingTitle'),
      description: t('services.logisticsServiceLoadingDescription'),
      Icon: Truck
    },
    {
      title: t('services.logisticsServiceCrossDockingTitle'),
      description: t('services.logisticsServiceCrossDockingDescription'),
      Icon: Warehouse
    }
  ];

  const logisticsParagraphs = (t('services.logisticsFull') || '').split('\n\n');

  const goToQuote = () => {
    navigate('/#quote');
    // After navigation, ensure focus/scroll reaches the quote form
    setTimeout(() => {
      const element = document.querySelector('#quote');
      if (element) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} className="mb-6 text-gray-300" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="p-4 bg-yellow-500 rounded-2xl">
              <Warehouse className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              {t('warehousingTitle')}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl"
          >
            {t('warehousingDesc')}
          </motion.p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="prose prose-lg max-w-none"
            >
              {logisticsParagraphs.map((paragraph, index) => (
                <div key={index} className="mb-8">
                  {paragraph.split('\n').map((line, lineIndex) => {
                    if (line.trim().startsWith('–')) {
                      return (
                        <div key={lineIndex} className="flex items-start mb-3">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                          <p className="text-gray-700 text-lg leading-relaxed">
                            {line.replace('–', '').trim()}
                          </p>
                        </div>
                      );
                    }
                    return (
                      <p key={lineIndex} className="text-gray-700 text-lg leading-relaxed mb-4">
                        {line}
                      </p>
                    );
                  })}
                </div>
              ))}
            </motion.div>

            {/* Services Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {serviceCards.map((service, index) => {
                const IconComponent = service.Icon;
                return (
                  <div key={index} className="p-6 bg-white rounded-xl border-2 border-gray-100 hover:border-yellow-200 hover:shadow-lg transition-all duration-300">
                    <div className="mb-3">
                      <IconComponent className="w-12 h-12 text-yellow-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-8 sticky top-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {t('services.featuresTitle')}
              </h3>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={goToQuote}
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {t('requestQuote')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehousingPage;
