import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Truck, Warehouse, ArrowRight, Ship, Package } from 'lucide-react';
import { motion } from 'framer-motion';

const Services: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Ship className="w-12 h-12" aria-hidden="true" />,
      title: t('internationalTransportTitle'),
      description: t('internationalTransportDesc'),
      color: 'bg-gray-700',
      hoverColor: 'hover:bg-gray-800',
      link: '/international-transport'
    },
    {
      icon: <Truck className="w-12 h-12" aria-hidden="true" />,
      title: t('nationalTransportTitle'),
      description: t('nationalTransportDesc'),
      color: 'bg-gray-700',
      hoverColor: 'hover:bg-gray-800',
      link: '/domestic-transport'
    },
    {
      icon: <Package className="w-12 h-12" aria-hidden="true" />,
      title: t('services.specialTransportTitle'),
      description: t('services.specialTransportSummary'),
      color: 'bg-gray-700',
      hoverColor: 'hover:bg-gray-800',
      link: '/special-transport'
    },
    {
      icon: <Warehouse className="w-12 h-12" aria-hidden="true" />,
      title: t('warehousingTitle'),
      description: t('warehousingDesc'),
      color: 'bg-gray-700',
      hoverColor: 'hover:bg-gray-800',
      link: '/warehousing'
    }
  ];

  return (
    <section id="services" className="spacing-section-lg bg-white">
      <div className="spacing-container">
        <div className="text-center mb-16 sm:mb-20 visual-hierarchy">
          <h2 className="text-heading-2 sm:text-heading-1 text-gray-900 mb-6 px-4">
            {t('servicesTitle')}
          </h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-10 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`group rounded-xl ${service.color} ${service.hoverColor} transition-all duration-300 hover:-translate-y-2 overflow-hidden w-full shadow-lg hover:shadow-2xl`}
              initial={{ opacity: 0, y: 20, scale: 1 }}
              whileInView={{ opacity: 1, y: 0, scale: 1.03 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className="p-4 sm:p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-yellow-500 mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 px-2">{service.title}</h3>
                <p className="text-white mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base px-2">{service.description}</p>
                {service.link && (
                  <Link
                    to={service.link}
                    className="inline-flex items-center text-white hover:text-yellow-400 font-semibold transition-colors px-3 py-2 rounded-lg touch-manipulation focus-ring"
                  >
                    {t('learnMore')}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;