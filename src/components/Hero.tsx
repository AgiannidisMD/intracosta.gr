import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useReducedMotion } from 'framer-motion';
import { Award, Shield, X, ExternalLink } from 'lucide-react';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [activePopup, setActivePopup] = useState<string | null>(null);

  // Disable parallax for better performance

  const isoInfo = {
    '9001': {
      title: 'ISO 9001:2015',
      subtitle: t('iso9001Subtitle'),
      description: t('iso9001Description'),
      benefits: [
        t('iso9001Benefit1'),
        t('iso9001Benefit2'),
        t('iso9001Benefit3'),
        t('iso9001Benefit4')
      ],
      link: 'https://www.iso.org/publication/PUB200900.html'
    },
    '39001': {
      title: 'ISO 39001:2012',
      subtitle: t('iso39001Subtitle'),
      description: t('iso39001Description'),
      benefits: [
        t('iso39001Benefit1'),
        t('iso39001Benefit2'),
        t('iso39001Benefit3'),
        t('iso39001Benefit4')
      ],
      link: 'https://www.iso.org/standard/44958.html'
    }
  };

  const scrollToQuote = () => {
    const element = document.querySelector('#quote');
    if (element) {
      element.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-mt-20 spacing-section-xl">
      {/* Static background for better performance */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80" />
      
      {/* Static background elements - no animations for better performance */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-500/10 rounded-full blur-xl" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl" />
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-orange-500/10 rounded-full blur-xl" />
      </div>

      {/* Content with minimal animations for better performance */}
      <div className="relative z-10 spacing-container-lg text-center">
        <div className="flex flex-col items-center justify-center min-h-screen visual-hierarchy-lg">
          <div className="mb-8 sm:mb-12">
            <img
              src="/intracosta-logo.svg"
              alt={t('logoAlt')}
              className="w-64 sm:w-80 md:w-[400px] lg:w-[500px] h-auto mx-auto hero-logo"
              width={1228}
              height={534}
              loading="eager"
            />
          </div>
          
          <div className="mb-10 sm:mb-12">
            <h1 className="text-heading-2 sm:text-heading-1 text-gray-200 max-w-3xl mx-auto leading-relaxed px-4">
              {t('heroTitle')}
            </h1>
          </div>
          
          <div className="mb-12">
            <a
              href="#quote"
              onClick={(e) => {
                e.preventDefault();
                scrollToQuote();
              }}
              className="inline-flex items-center border-2 border-yellow-500 bg-yellow-500 text-white hover:bg-white hover:text-yellow-500 button-spacing-lg text-body-lg font-semibold transition-colors duration-300 shadow-2xl touch-manipulation focus-ring"
            >
              <span className="mr-3 text-xl sm:text-2xl">→</span>
{t('letsCooperate')}
            </a>
          </div>

          {/* ISO Certifications - Static for better performance */}
          <div className="mt-16 sm:mt-20">
            <p className="text-gray-300 text-caption font-medium mb-6 tracking-wide uppercase">
              {t('certifiedServices')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-10">
              {/* ISO 9001 - Quality Management */}
              <div className="group relative">
                <button
                  onClick={() => setActivePopup('9001')}
                  className="flex items-center gap-4 bg-gradient-to-r from-white/15 to-white/5 backdrop-blur-md rounded-2xl card-spacing border border-white/20 shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 hover:border-yellow-400/40 hover:scale-105 cursor-pointer focus-ring"
                >
                  <div className="relative">
                    <Award className="w-8 h-8 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full hidden sm:block"></div>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-bold text-lg tracking-tight">ISO 9001</div>
                    <div className="text-gray-300 text-xs font-medium">Quality Management</div>
                  </div>
                </button>
              </div>

              {/* ISO 39001 - Road Traffic Safety */}
              <div className="group relative">
                <button
                  onClick={() => setActivePopup('39001')}
                  className="flex items-center gap-4 bg-gradient-to-r from-white/15 to-white/5 backdrop-blur-md rounded-2xl card-spacing border border-white/20 shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 hover:border-yellow-400/40 hover:scale-105 cursor-pointer focus-ring"
                >
                  <div className="relative">
                    <Shield className="w-8 h-8 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full hidden sm:block"></div>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-bold text-lg tracking-tight">ISO 39001</div>
                    <div className="text-gray-300 text-xs font-medium">Road Traffic Safety</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ISO Information Popup */}
      {activePopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  {activePopup === '9001' ? (
                    <Award className="w-10 h-10 text-yellow-500" />
                  ) : (
                    <Shield className="w-10 h-10 text-green-500" />
                  )}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {isoInfo[activePopup as keyof typeof isoInfo].title}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {isoInfo[activePopup as keyof typeof isoInfo].subtitle}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActivePopup(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  {isoInfo[activePopup as keyof typeof isoInfo].description}
                </p>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('benefits')}:</h3>
                  <ul className="space-y-2">
                    {isoInfo[activePopup as keyof typeof isoInfo].benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* External Link */}
                <div className="pt-4 border-t border-gray-200">
                  <a
                    href={isoInfo[activePopup as keyof typeof isoInfo].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t('learnMoreIso')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
