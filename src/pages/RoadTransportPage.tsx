import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import Breadcrumbs from '../components/Breadcrumbs';
import { Truck, CheckCircle, ArrowRight, MapPin } from 'lucide-react';

const RoadTransportPage: React.FC = () => {
  const { t } = useLanguage();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const crumbs = [
    { label: t('home'), href: '/#home' },
    { label: t('services'), href: '/#services' },
    { label: t('services.roadTransportTitle'), current: true }
  ];

  const features = t('services.roadTransportFeatures')
    .split('\n')
    .map((feature) => feature.trim())
    .filter(Boolean);
  const coverage = t('services.roadTransportCoverageList');

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
              <Truck className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              {t('services.roadTransportTitle')}
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl"
          >
            {t('services.roadTransportSummary')}
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
              {(t('services.roadTransportFull') || '').split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 text-lg leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.pexels.com/photos/4481326/pexels-photo-4481326.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Road Transport"
                className="w-full h-96 object-cover"
                width={1200}
                height={900}
                loading="lazy"
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

              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2 text-gray-700 mb-2">
                  <MapPin className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold">{t('coverageTitle')}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {coverage}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadTransportPage;
