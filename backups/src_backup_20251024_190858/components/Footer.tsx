import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import NAP from './SEO/NAP';
import { Facebook, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();


  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { key: 'home', href: '#home' },
    { key: 'services', href: '#services' },
    { key: 'coverage', href: '#coverage' },
    { key: 'about', href: '#about' },
    { key: 'contact', href: '#contact' }
  ];

  const services = [
    { key: 'internationalTransport' },
    { key: 'domesticTransport' },
    { key: 'specializedTransport' },
    { key: 'warehousingDistribution' }
  ];

  return (
    <footer className="bg-white text-gray-900" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img src="/logocorrectversion.svg" alt={t('logoAlt')} className="h-24" />
            </div>
            <div className="flex space-x-4">
              <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors" aria-label="Visit Intracosta on Facebook">
                <Facebook className="w-5 h-5 text-yellow-500" />
              </button>
              <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors" aria-label="Visit Intracosta on LinkedIn">
                <Linkedin className="w-5 h-5 text-yellow-500" />
              </button>
              <a href="https://www.instagram.com/intracosta/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors" aria-label="Visit Intracosta on Instagram">
                <Instagram className="w-5 h-5 text-yellow-500" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h3 className="text-lg font-semibold mb-6">{t('quickLinks')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="inline-block relative text-gray-700 hover:text-yellow-500 transition-all duration-300 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-0 before:bg-yellow-500 before:transition-all before:duration-300 hover:before:w-full"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Our services">
            <h3 className="text-lg font-semibold mb-6">{t('ourServices')}</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.key}>
                  <a
                    href={`#${service.key}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(`#${service.key}`);
                    }}
                    className="inline-block relative text-gray-700 hover:text-yellow-500 transition-all duration-300 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-0 before:bg-yellow-500 before:transition-all before:duration-300 hover:before:w-full"
                  >
                    {t(service.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('contactInfo')}</h3>
            <NAP variant="full" showIcons={true} />
            <div className="mt-4 space-y-1">
              <a href="mailto:export@intracosta.com" className="block text-sm text-gray-600 hover:text-yellow-500 transition-colors">export@intracosta.com</a>
              <a href="mailto:import@intracosta.com" className="block text-sm text-gray-600 hover:text-yellow-500 transition-colors">import@intracosta.com</a>
              <a href="mailto:account@intracosta.com" className="block text-sm text-gray-600 hover:text-yellow-500 transition-colors">account@intracosta.com</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-400 mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-700 text-center lg:text-left">
              <span itemScope itemType="https://schema.org/Organization">
                © 2024 <span itemProp="name">Intracosta</span>. All rights reserved.
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
                <Link
                  to="/privacy-policy"
                  className="inline-block relative text-gray-700 hover:text-yellow-500 transition-all duration-300 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-0 before:bg-yellow-500 before:transition-all before:duration-300 hover:before:w-full text-sm"
                >
                  {t('privacyPolicy')}
                </Link>
                <Link
                  to="/terms-of-service"
                  className="inline-block relative text-gray-700 hover:text-yellow-500 transition-all duration-300 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-0 before:bg-yellow-500 before:transition-all before:duration-300 hover:before:w-full text-sm"
                >
                  {t('termsOfService')}
                </Link>
              </div>
              
              {/* EU Funding Stickers */}
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 sm:ml-4 mt-4 sm:mt-0">
                <img 
                  src="/e-bannerseuerdf730x90-1.jpg" 
                  alt="European Union Regional Development Fund" 
                  className="h-6 sm:h-8 w-auto opacity-80 hover:opacity-100 transition-opacity max-w-[120px] sm:max-w-none"
                />
                <img 
                  src="/sticker-website_etpa_gr_highres-1.jpg" 
                  alt="ΕΣΠΑ 2014-2020" 
                  className="h-6 sm:h-8 w-auto opacity-80 hover:opacity-100 transition-opacity max-w-[120px] sm:max-w-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;