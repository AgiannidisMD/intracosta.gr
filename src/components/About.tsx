import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Users, Target, Truck, Warehouse, ShieldCheck } from 'lucide-react';
import TeamCarousel from './TeamCarousel';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.pexels.com/photos/4481326/pexels-photo-4481326.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt={t('aboutTruckAlt')}
              className="rounded-xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-yellow-500 text-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold">25+</div>
              <div className="text-sm font-medium">Years of Excellence</div>
            </div>
          </motion.div>

          {/* Content Section */}
          <div>
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              {t('aboutTitle')}
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-yellow-500 mb-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            ></motion.div>
            
            <motion.p 
              className="text-lg text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('aboutIntracostaSummary')}
            </motion.p>

            {/* Highlights Title */}
            <motion.h3 
              className="text-2xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t('aboutHighlightsTitle')}
            </motion.h3>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: <Truck className="w-8 h-8 text-yellow-500" />,
                  title: t('aboutHighlight1Title'),
                  description: t('aboutHighlight1Desc')
                },
                {
                  icon: <Warehouse className="w-8 h-8 text-yellow-500" />,
                  title: t('aboutHighlight2Title'),
                  description: t('aboutHighlight2Desc')
                },
                {
                  icon: <ShieldCheck className="w-8 h-8 text-yellow-500" />,
                  title: t('aboutHighlight3Title'),
                  description: t('aboutHighlight3Desc')
                },
                {
                  icon: <Users className="w-8 h-8 text-yellow-500" />,
                  title: t('aboutHighlight4Title'),
                  description: t('aboutHighlight4Desc')
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-4 bg-gray-50 rounded-xl shadow hover:shadow-md transition"
                >
                  <div className="mb-2">{item.icon}</div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-16 relative"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-yellow-500/5 rounded-2xl"></div>
          
          {/* Content Container */}
          <div className="relative p-8 md:p-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-yellow-100 hover:shadow-2xl transition-all duration-300">
            {/* Top Icon Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-full mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Target className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-semibold text-yellow-700">{t('missionTitle')}</span>
            </motion.div>

            {/* Mission Text */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <p className="text-gray-800 text-xl md:text-2xl leading-relaxed font-medium">
                {t('missionText')}
              </p>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl -z-10"></div>
            
            {/* Bottom Accent Line */}
            <motion.div 
              className="mt-8 h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            ></motion.div>
          </div>
        </motion.div>

        {/* Team Section - New Carousel Style */}
        <div className="mt-20">
          <TeamCarousel />
        </div>
      </div>
    </section>
  );
};

export default About;