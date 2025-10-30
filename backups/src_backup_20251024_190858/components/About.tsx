import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Users, Target, Truck, Warehouse, ShieldCheck } from 'lucide-react';

const About: React.FC = () => {
  const { t } = useLanguage();

  // Safe image fallback function for better Windows/Android compatibility
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Fallback to company logo if team image fails to load
    e.currentTarget.src = '/intracosta001.png';
  };

  const teamMembers = [
    {
      name: 'Κώστας Φίλιππος',
      role: t('teamGeneralDirector'),
      image: '/team/kostas-filippos.JPG',
      department: 'leadership'
    },
    {
      name: 'Κώστα Κατερίνα',
      role: t('teamImportDepartment'),
      image: '/team/kosta-katerina.JPG',
      department: 'import'
    },
    {
      name: 'Πετρίδης Δημήτρης',
      role: t('teamImportDepartment'),
      image: '/team/petridis-dimitrios.JPG',
      department: 'import'
    },
    {
      name: 'Εμμανουηλίδου Αναστασία',
      role: t('teamImportDepartment'),
      image: '/team/emmanouilidou-anastasia.JPG',
      department: 'import'
    },
    {
      name: 'Δήμου Μαρία',
      role: t('teamImportDepartment'),
      image: '/team/dimou-maria.JPG',
      department: 'import'
    },
    {
      name: 'Γιαννακίδου Ειρήνη',
      role: t('teamImportDepartment'),
      image: '/team/giannakidou-irini.JPG',
      department: 'import'
    },
    {
      name: 'Κατερίνα Νταούλα',
      role: t('teamImportManager'),
      image: '/team/katerina-ntaoula.JPG',
      department: 'import'
    },
    {
      name: 'Πλεπλές Θεόδωρος',
      role: t('teamExportManager'),
      image: '/team/pleples-theodoros.JPG',
      department: 'export'
    },
    {
      name: 'Βαγγέλης',
      role: t('teamExportDepartment'),
      image: '/team/vaggelis.JPG',
      department: 'export'
    },
    {
      name: 'Παπαδημητρίου Δημήτριος',
      role: t('teamAccountingManager'),
      image: '/team/dimitrios-papadimitriou.JPG',
      department: 'accounting'
    },
    {
      name: 'Κουλούδη Νικολέτα',
      role: t('teamAccountingDepartment'),
      image: '/team/kouloudi-nikoleta.JPG',
      department: 'accounting'
    },
    {
      name: 'Κουλόυδη Ειρήνη',
      role: t('teamAccountingDepartment'),
      image: '/team/kouloudi-irini.JPG',
      department: 'accounting'
    },
    {
      name: 'Τσιτλακίδου Κυριακή',
      role: t('teamAccountingDepartment'),
      image: '/team/kyriaki-tsitlakidou.JPG',
      department: 'accounting'
    }
  ];

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

        {/* Team Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-full mb-4"
            >
              <Users className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-semibold text-yellow-700">{t('teamTitle')}</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('teamTitle')}</h2>
            <p className="text-gray-600">{t('teamSubtitle')}</p>
          </div>

          {/* Navigation Arrows - Desktop Only */}
          <div className="hidden md:flex justify-center items-center mb-8 gap-4">
            <button
              onClick={() => {
                const container = document.querySelector('.team-scroll-container');
                if (container) {
                  // Check if user prefers reduced motion for accessibility
                  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                  container.scrollBy({ left: -300, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
                }
              }}
              className="p-3 rounded-full bg-white border border-gray-300 hover:border-yellow-500 hover:bg-yellow-50 transition-colors duration-200 shadow-sm"
              aria-label="Προηγούμενοι μέλη ομάδας"
            >
              <svg className="w-5 h-5 text-gray-600 hover:text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <span className="text-sm text-gray-500 px-4">
              ← Χρησιμοποιήστε τα βελάκια για πλοήγηση →
            </span>
            
            <button
              onClick={() => {
                const container = document.querySelector('.team-scroll-container');
                if (container) {
                  // Check if user prefers reduced motion for accessibility
                  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                  container.scrollBy({ left: 300, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
                }
              }}
              className="p-3 rounded-full bg-white border border-gray-300 hover:border-yellow-500 hover:bg-yellow-50 transition-colors duration-200 shadow-sm"
              aria-label="Επόμενοι μέλη ομάδας"
            >
              <svg className="w-5 h-5 text-gray-600 hover:text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Team Cards Grid - Mobile Optimized */}
          <div className="relative">
            <div 
              className="overflow-x-auto pb-8 scrollbar-hide team-scroll-container" 
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                scrollSnapType: 'x mandatory'
              }}
            >
              <div 
                className="flex gap-6 px-6" 
                style={{ 
                  width: 'max-content'
                }}
              >
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="relative flex-shrink-0"
                    style={{ 
                      width: '280px', 
                      height: '360px',
                      scrollSnapAlign: 'start'
                    }}
                  >
                    <div 
                      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer group h-full flex flex-col team-card"
                      style={{ 
                        width: '280px', 
                        height: '360px',
                        padding: '20px'
                      }}
                    >
                      <div className="relative mb-4 flex-shrink-0 flex justify-center">
                        {/* Image Container - Circular on desktop, square on mobile */}
                        <div 
                          className="bg-gradient-to-br from-yellow-100 to-orange-100 border-4 border-white shadow-sm rounded-full md:rounded-full rounded-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:shadow-yellow-500/50 group-hover:scale-105"
                          style={{ 
                            width: '160px', 
                            height: '160px'
                          }}
                        >
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover object-center scale-110"
                            loading="eager"
                            onError={handleImageError}
                          />
                        </div>
                        {/* Badge for leadership/management */}
                        {(member.department === 'leadership' || 
                          member.name === 'Κατερίνα Νταούλα' || 
                          member.name === 'Πλεπλές Θεόδωρος' || 
                          member.name === 'Παπαδημητρίου Δημήτριος') && (
                          <div 
                            className="absolute top-2 right-2 bg-yellow-500 group-hover:bg-yellow-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-sm transition-colors duration-200"
                          >
                            {member.department === 'leadership' ? '⭐' : '👔'}
                          </div>
                        )}
                      </div>
                      
                      {/* Text Content - Centered and with fixed spacing */}
                      <div className="text-center flex-1 flex flex-col justify-center">
                        <h4 className="font-bold text-base text-gray-900 mb-2 group-hover:text-yellow-700 transition-colors duration-200 leading-tight break-words">
                          {member.name.split(' ').map((word, index) => (
                            <span key={index}>
                              {word}
                              {index < member.name.split(' ').length - 1 && <br />}
                            </span>
                          ))}
                        </h4>
                        <p className="text-sm text-yellow-600 font-medium group-hover:text-yellow-800 transition-colors duration-200 leading-tight break-words">
                          {member.role.split(' ').map((word, index) => (
                            <span key={index}>
                              {word}
                              {index < member.role.split(' ').length - 1 && <br />}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Scroll Indicator - Mobile Only */}
            <div className="text-center mt-6 md:hidden">
              <p className="text-sm text-gray-500">← Σύρετε για να δείτε περισσότερα / Scroll to see more →</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;