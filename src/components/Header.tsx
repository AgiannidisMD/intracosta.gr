import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import NAP from './SEO/NAP';
import ContactModal from './ContactModal';
import { Menu, X, Globe, Truck, ChevronDown, Search, MapPin, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isCoverageOpen, setIsCoverageOpen] = useState(false);
  const [isCountriesExpanded, setIsCountriesExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const languages = [
    { code: 'el' as const, name: 'ΕΛ', flag: '🇬🇷', fullName: 'Ελληνικά' },
    { code: 'en' as const, name: 'EN', flag: '🇬🇧', fullName: 'English' },
    { code: 'de' as const, name: 'DE', flag: '🇩🇪', fullName: 'Deutsch' }
  ];

  const menuItems = [
    { 
      key: 'home', 
      href: '#home',
      icon: null,
      description: t('homeDescription') || 'Αρχική σελίδα'
    },
    { 
      key: 'services', 
      href: '#services',
      icon: Truck,
      description: t('servicesDescription') || 'Οι υπηρεσίες μας',
      subItems: [
        { key: 'internationalTransport', label: t('internationalTransport') },
        { key: 'domesticTransport', label: t('domesticTransport') },
        { key: 'warehousing', label: t('warehousing') },
        { key: 'customs', label: t('customs') }
      ]
    },
    { 
      key: 'coverage', 
      href: '#coverage',
      icon: MapPin,
      description: t('coverageDescription') || 'Περιοχές κάλυψης',
      countries: [
        { name: 'Germany', flag: '🇩🇪', routes: 'Daily' },
        { name: 'Austria', flag: '🇦🇹', routes: '3x/Week' },
        { name: 'Netherlands', flag: '🇳🇱', routes: 'Daily' },
        { name: 'Belgium', flag: '🇧🇪', routes: '3x/Week' },
        { name: 'Poland', flag: '🇵🇱', routes: '3x/Week' },
        { name: 'Luxembourg', flag: '🇱🇺', routes: '3x/Week' },
        { name: 'Denmark', flag: '🇩🇰', routes: '2x/Week' },
        { name: 'Greece', flag: '🇬🇷', routes: 'Daily' },
        { name: 'Cyprus', flag: '🇨🇾', routes: '2x/Week' },
        // Added countries
        { name: 'France', flag: '🇫🇷', routes: '3x/Week' },
        { name: 'Italy', flag: '🇮🇹', routes: '3x/Week' },
        { name: 'Hungary', flag: '🇭🇺', routes: '2x/Week' },
        { name: 'Romania', flag: '🇷🇴', routes: '2x/Week' },
        { name: 'Slovakia', flag: '🇸🇰', routes: '2x/Week' },
        { name: 'Czechia', flag: '🇨🇿', routes: '2x/Week' },
        { name: 'Switzerland', flag: '🇨🇭', routes: '2x/Week' },
        { name: 'Liechtenstein', flag: '🇱🇮', routes: '1x/Week' }
      ]
    },
    { 
      key: 'about', 
      href: '#about',
      icon: null,
      description: t('aboutDescription') || 'Σχετικά με εμάς'
    },
    { 
      key: 'contact', 
      href: '#contact',
      icon: Phone,
      description: t('contactDescription') || 'Επικοινωνήστε μαζί μας'
    }
  ];

  // Track scroll position and active section with throttling
  useEffect(() => {
    let ticking = false;
    let lastScrollTime = 0;
    
    const handleScroll = () => {
      const now = Date.now();
      
      // More aggressive throttling for better performance (30fps)
      if (now - lastScrollTime < 33) {
        return;
      }
      lastScrollTime = now;
      
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollPos = window.scrollY;
          
          setIsScrolled(currentScrollPos > 20);
          
          // Compact logic with hysteresis to avoid jitter
          const downThreshold = 200; // enter compact only after 200px
          const upThreshold = 100;   // exit compact when near top
          const scrollDelta = prevScrollPos - currentScrollPos;

          if (currentScrollPos > downThreshold && currentScrollPos > prevScrollPos) {
            setIsCompact(true);
          } else if (currentScrollPos < upThreshold || scrollDelta > 20) {
            setIsCompact(false);
          }
          
          setPrevScrollPos(currentScrollPos);
          
          // Update active section based on scroll position (throttled)
          const sections = menuItems.map(item => item.key);
          const currentSection = sections.find(section => {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              return rect.top <= 100 && rect.bottom >= 100;
            }
            return false;
          });
          
          if (currentSection) {
            setActiveSection(currentSection);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.dropdown-container')) {
        setIsLanguageOpen(false);
        setIsCoverageOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      // Check if user prefers reduced motion for accessibility
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
    setIsMenuOpen(false);
    setIsCoverageOpen(false);
  };

  const handleGetQuote = () => {
    scrollToSection('#quote');
  };

  const handleRequestInfo = () => {
    scrollToSection('#contact');
  };

  const isActive = (key: string) => activeSection === key;

  return (
    <>
      <header role="banner">
        {/* Top Contact Bar - Hidden on mobile */}
        <div className="hidden lg:block bg-gray-800 text-white py-3">
          <div className="spacing-container">
            <div className="flex justify-between items-center text-body-sm">
              <div className="flex items-center space-x-6">
                <a href="tel:+302382027111" className="flex items-center space-x-2 hover:text-yellow-400 transition-colors">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span>+30 23820 27111</span>
              </a>
              <a href="mailto:export@intracosta.com" className="flex items-center space-x-2 hover:text-yellow-400 transition-colors">
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>export@intracosta.com</span>
              </a>
            </div>
            <div className="text-gray-300">
              {t('workingHours')}
            </div>
          </div>
        </div>
      </div>

        {/* Main Header */}
        <div className={`fixed ${isScrolled ? 'top-0' : 'top-0 lg:top-10'} left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
            : 'bg-white/90 backdrop-blur-sm'
        }`}>
          <div className="spacing-container">
            <div className={`flex justify-between items-center transition-all duration-300 ease-in-out ${
              isCompact ? 'py-2 lg:py-3' : 'py-4 lg:py-6'
            }`}>
            {/* Logo */}
              <div className="flex items-center justify-start ml-2 lg:ml-12 mr-auto">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  if (window.location.pathname !== '/') {
                    window.location.href = '/';
                  } else {
                    scrollToSection('#home');
                  }
                }}
                className="group transition-colors duration-200 focus:outline-none rounded-lg p-2"
                aria-label="Intracosta Home"
              >
                <div itemScope itemType="https://schema.org/Organization">
                  <img
                    src="/intracosta001.png"
                    alt="Intracosta Logo"
                    className="object-contain transition-all duration-500 ease-in-out group-hover:brightness-110 drop-shadow-lg hover:drop-shadow-xl"
                    style={{
                      height: isCompact ? '40px' : '72px',
                      width: isCompact ? '80px' : '144px',
                      minWidth: isCompact ? '80px' : '144px',
                      maxWidth: isCompact ? '112px' : '144px'
                    }}
                    itemProp="logo"
                  />
                  <meta itemProp="name" content="Intracosta" />
                  <meta itemProp="url" content="https://www.intracosta.gr" />
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2 flex-1" role="navigation" aria-label="Main navigation">
              {menuItems.map((item) => (
                <div key={item.key} className="relative dropdown-container">
                  {item.key === 'coverage' ? (
                    // Coverage Dropdown
                    <div className="relative">
                      <button
                        onClick={() => setIsCoverageOpen(!isCoverageOpen)}
                        onMouseEnter={() => setIsCoverageOpen(true)}
                        className={`flex items-center space-x-2 ${isCompact ? 'px-3 py-2' : 'px-5 py-3'} rounded-xl font-semibold transition-all duration-300 group relative overflow-hidden ${
                          isActive(item.key)
                            ? 'text-yellow-600'
                            : 'text-gray-700 hover:text-yellow-600'
                        }`}
                        aria-expanded={isCoverageOpen}
                        aria-haspopup="true"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12"></div>
                        {item.icon && <item.icon className="w-4 h-4" />}
                        <span className="relative z-10">{t(item.key)}</span>
                        <ChevronDown className={`w-4 h-4 transition-all duration-300 ${
                          isCoverageOpen ? 'rotate-180' : ''
                        } group-hover:scale-110`} aria-hidden="true" />
                        {/* Custom hover underline */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-300 group-hover:w-12 group-hover:shadow-lg" style={{ left: item.icon ? 'calc(50% + 8px)' : '50%' }}></div>
                        {/* Active underline */}
                        {isActive(item.key) && (
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg" style={{ left: item.icon ? 'calc(50% + 8px)' : '50%' }}></div>
                        )}
                      </button>

                      {/* Coverage Mega Menu */}
                      <div
                        className={`absolute top-full left-0 mt-3 w-[420px] bg-white rounded-2xl shadow-2xl border border-gray-100 transition-all duration-500 backdrop-blur-sm ${
                          isCoverageOpen 
                            ? 'opacity-100 visible transform translate-y-0 scale-100' 
                            : 'opacity-0 invisible transform -translate-y-4 scale-95'
                        }`}
                        onMouseLeave={() => setIsCoverageOpen(false)}
                      >
                        <div className="p-8">
                          <div className="mb-4">
                            <h3 className="font-bold text-xl text-gray-900 mb-2 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">{t('europeanRoutes')}</h3>
                            <p className="text-gray-600">{t('coverageDescription')}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                              {item.countries?.map((country) => (
                              <a
                                key={country.name}
                                href="#coverage"
                                onClick={(e) => {
                                  e.preventDefault();
                                  scrollToSection('#coverage');
                                }}
                                className="flex items-center justify-between p-4 rounded-xl hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 transition-all duration-300 group text-left hover:shadow-md hover:scale-105 border border-transparent hover:border-yellow-200"
                              >
                                <div className="flex items-center space-x-3">
                                  <span className="text-xl group-hover:scale-110 transition-transform duration-300">{country.flag}</span>
                                  <div>
                                    <div className="font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">{t(country.name)}</div>
                                  </div>
                                </div>
                                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all duration-300 rotate-[-90deg]" aria-hidden="true" />
                              </a>
                            ))}
                          </div>
                            <div className="mt-6 pt-6 border-t border-gray-100">
                              <a
                                href="#coverage"
                                onClick={(e) => {
                                  e.preventDefault();
                                  scrollToSection('#coverage');
                                }}
                                className="w-full block text-center py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
                              >
                                {t('viewAllRoutes')}
                              </a>
                            </div>
                        </div>
                      </div>
                    </div>
                  ) : item.subItems ? (
                    // Services Dropdown
                    <div className="relative">
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(item.href);
                        }}
                        className={`flex items-center space-x-2 ${isCompact ? 'px-3 py-2' : 'px-5 py-3'} rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group ${
                          isActive(item.key)
                            ? 'text-yellow-600'
                            : 'text-gray-700 hover:text-yellow-600'
                        }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12"></div>
                        {item.icon && <item.icon className="w-4 h-4" />}
                        <span className="relative z-10">{t(item.key)}</span>
                        {/* Custom hover underline */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-300 group-hover:w-12 group-hover:shadow-lg" style={{ left: item.icon ? 'calc(50% + 8px)' : '50%' }}></div>
                        {/* Active underline */}
                        {isActive(item.key) && (
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg" style={{ left: item.icon ? 'calc(50% + 8px)' : '50%' }}></div>
                        )}
                      </a>
                    </div>
                  ) : (
                    // Regular Menu Item
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href);
                      }}
                      className={`flex items-center space-x-2 ${isCompact ? 'px-3 py-2' : 'px-5 py-3'} rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group ${
                        isActive(item.key)
                          ? 'text-yellow-600'
                          : 'text-gray-700 hover:text-yellow-600'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12"></div>
                      {item.icon && <item.icon className="w-4 h-4" />}
                      <span className="relative z-10">{t(item.key)}</span>
                      {/* Custom hover underline - centered on text */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-300 group-hover:w-12 group-hover:shadow-lg" style={{ left: item.icon ? 'calc(50% + 8px)' : '50%' }}></div>
                      {/* Active underline - centered on text */}
                      {isActive(item.key) && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg" style={{ left: item.icon ? 'calc(50% + 8px)' : '50%' }}></div>
                      )}
                    </a>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Language Switcher */}
              <div className="relative dropdown-container">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className={`flex items-center space-x-2 ${isCompact ? 'px-3 py-2' : 'px-4 py-3'} text-gray-700 hover:text-gray-900 transition-all duration-300 rounded-xl hover:underline hover:decoration-yellow-500 hover:underline-offset-4 group`}
                  aria-expanded={isLanguageOpen}
                  aria-haspopup="true"
                  aria-label="Select language"
                >
                  <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-sm font-medium">
                    {languages.find(lang => lang.code === language)?.name}
                  </span>
                  <ChevronDown className={`w-3 h-3 transition-all duration-300 group-hover:scale-110 ${
                    isLanguageOpen ? 'rotate-180' : ''
                  }`} aria-hidden="true" />
                </button>
                
                {isLanguageOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 backdrop-blur-sm">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLanguageOpen(false);
                        }}
                        className={`w-full px-5 py-4 text-left text-sm flex items-center space-x-3 hover:bg-gradient-to-r hover:from-gray-50 hover:to-yellow-50 transition-all duration-300 hover:scale-105 rounded-xl mx-2 ${
                          language === lang.code ? 'bg-gradient-to-r from-yellow-50 to-orange-50 text-yellow-600 shadow-md' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-lg hover:scale-110 transition-transform duration-300">{lang.flag}</span>
                        <div>
                          <div className="font-medium">{lang.fullName}</div>
                          <div className="text-xs text-gray-500">{lang.name}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="hidden sm:flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group relative overflow-hidden whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12"></div>
                <span>{t('getQuote')}</span>
                <ChevronDown className="w-4 h-4 rotate-[-90deg] group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`lg:hidden ${isCompact ? 'p-2' : 'p-3'} text-gray-700 hover:text-gray-900 transition-all duration-300 rounded-xl hover:bg-gray-50 hover:scale-110 min-h-[48px] min-w-[48px] touch-manipulation`}
                aria-expanded={isMenuOpen}
                aria-label="Toggle mobile menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* Mobile Bottom Sheet Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <>
                {/* Backdrop */}
                <motion.div 
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMenuOpen(false)}
                />
                
                {/* Top Slide Menu */}
                <motion.div
                  className="fixed top-0 left-0 right-0 z-50 bg-white shadow-2xl lg:hidden"
                  initial={{ y: "-100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                >
                  {/* Header with close button */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <img
                        src="/intracosta001.png"
                        alt="Intracosta Logo"
                        className="h-8 w-auto"
                      />
                      <span className="font-semibold text-gray-900">Menu</span>
                    </div>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>
                  
                  <div className="px-6 py-4 max-h-[calc(100vh-80px)] overflow-y-auto">
                    <nav className="flex flex-col space-y-1" role="navigation" aria-label="Mobile navigation">
                      {menuItems.map((item) => (
                        <div key={item.key}>
                          <a
                            href={item.href}
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection(item.href);
                              setIsMenuOpen(false);
                            }}
                            className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-all duration-200 group ${
                              isActive(item.key)
                                ? 'text-yellow-600 bg-yellow-50'
                                : 'text-gray-700 hover:text-yellow-600 hover:bg-gray-50'
                            }`}
                          >
                            {item.icon && <item.icon className="w-5 h-5 flex-shrink-0" />}
                            <div className="flex-1">
                              <div className="font-medium text-base">{t(item.key)}</div>
                              <div className="text-sm text-gray-500">{item.description}</div>
                            </div>
                          </a>
                          
                          {/* Collapsible Countries Accordion */}
                          {item.key === 'coverage' && item.countries && (
                            <div className="ml-8 mt-1">
                              <button
                                onClick={() => setIsCountriesExpanded(!isCountriesExpanded)}
                                className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-600 hover:text-yellow-600 transition-colors"
                              >
                                <span>Περιοχές ({item.countries.length})</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                                  isCountriesExpanded ? 'rotate-180' : ''
                                }`} aria-hidden="true" />
                              </button>
                              <motion.div
                                initial={false}
                                animate={{
                                  height: isCountriesExpanded ? 'auto' : 0,
                                  opacity: isCountriesExpanded ? 1 : 0
                                }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="space-y-1 pt-1">
                                  {item.countries.map((country) => (
                                    <div key={country.name} className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-600 rounded hover:bg-gray-50 transition-colors">
                                      <span className="text-base">{country.flag}</span>
                                      <span>{t(country.name)}</span>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {/* Divider */}
                      <div className="border-t border-gray-200 my-4"></div>
                      
                      {/* Mobile CTA */}
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsContactModalOpen(true);
                        }}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 text-center shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                      >
                        {t('getQuote')}
                      </button>
                      
                      {/* EU Funding Logos */}
                      <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 mt-6 pt-4 border-t border-gray-200">
                        <img 
                          src="/e-bannerseuerdf730x90-1.jpg" 
                          alt="European Union Regional Development Fund" 
                          className="h-5 sm:h-6 w-auto opacity-80 max-w-[100px] sm:max-w-none"
                        />
                        <img 
                          src="/sticker-website_etpa_gr_highres-1.jpg" 
                          alt="ΕΣΠΑ 2014-2020" 
                          className="h-5 sm:h-6 w-auto opacity-80 max-w-[100px] sm:max-w-none"
                        />
                      </div>
                    </nav>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
      </header>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        onGetQuote={handleGetQuote}
        onRequestInfo={handleRequestInfo}
      />

      {/* Spacer for fixed header */}
      <div className={`transition-all duration-500 ease-in-out ${
        isCompact ? 'h-16 lg:h-20' : 'h-28 lg:h-48'
      }`}></div>
    </>
  );
};

export default Header;