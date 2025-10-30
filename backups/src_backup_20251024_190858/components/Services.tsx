import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Truck, Warehouse, ArrowRight, Ship, Package } from 'lucide-react';
import { motion } from 'framer-motion';

const Services: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Truck className="w-12 h-12" aria-hidden="true" />,
      title: t('services.roadTransportTitle'),
      description: t('services.roadTransportSummary'),
      color: 'bg-gray-700',
      hoverColor: 'hover:bg-gray-800',
      link: '/road-transport'
    },
    {
      icon: <Ship className="w-12 h-12" />,
      title: t('services.intermodalTitle'),
      description: t('services.intermodalSummary'),
      color: 'bg-gray-700',
      hoverColor: 'hover:bg-gray-800',
      link: '/intermodal-transport'
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
      icon: <Warehouse className="w-12 h-12" />,
      title: t('services.logisticsTitle'),
      description: t('services.logisticsSummary'),
      color: 'bg-gray-700',
      hoverColor: 'hover:bg-gray-800',
      link: '/logistics-services'
    }
  ];

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 px-4">
            {t('servicesTitle')}
          </h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`group rounded-xl ${service.color} hover:${service.hoverColor} transition-all duration-300 hover:-translate-y-2 overflow-hidden w-full shadow-lg hover:shadow-2xl`}
              initial={{ opacity: 0, y: 20, scale: 1 }}
              whileInView={{ opacity: 1, y: 0, scale: 1.03 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className="p-6 sm:p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-yellow-500 mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 px-2">{service.title}</h3>
                <p className="text-white mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base px-2">{service.description}</p>
                {service.link && (
                  <Link
                    to={service.link}
                    className="inline-flex items-center text-white hover:text-yellow-400 font-semibold transition-colors min-h-[44px] touch-manipulation px-4 py-2 rounded-lg"
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