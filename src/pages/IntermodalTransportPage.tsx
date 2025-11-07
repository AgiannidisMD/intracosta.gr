import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import Breadcrumbs from '../components/Breadcrumbs';
import { Ship, CheckCircle, ArrowRight, Anchor, Plane } from 'lucide-react';

const IntermodalTransportPage: React.FC = () => {
  const { t } = useLanguage();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const crumbs = [
    { label: t('home'), href: '/#home' },
    { label: t('services'), href: '/#services' },
    { label: t('services.intermodalTitle'), current: true }
  ];

  const features = t('services.intermodalFeatures')
    .split('\n')
    .map((feature) => feature.trim())
    .filter(Boolean);

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
              <Ship className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              {t('services.intermodalTitle')}
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl"
          >
            {t('services.intermodalSummary')}
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
              {(t('services.intermodalFull') || '').split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 text-lg leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100">
                <Anchor className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('services.intermodalSeaTitle')}</h3>
                <p className="text-gray-600">
                  {t('services.intermodalSeaDescription')}
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-orange-50 to-white rounded-xl border border-orange-100">
                <Plane className="w-10 h-10 text-orange-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('services.intermodalAirTitle')}</h3>
                <p className="text-gray-600">
                  {t('services.intermodalAirDescription')}
                </p>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Intermodal Transport"
                className="w-full h-96 object-cover"
              />
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
                <a
                  href="/#contact"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {t('requestQuote')}
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntermodalTransportPage;

