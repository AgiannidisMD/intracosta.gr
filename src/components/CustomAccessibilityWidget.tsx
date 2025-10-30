import React, { useState, useEffect } from 'react';
import { 
  Accessibility, 
  Settings, 
  X, 
  Type, 
  Contrast, 
  Eye, 
  Volume2, 
  Keyboard, 
  RotateCcw,
  Plus,
  Minus,
  Moon,
  Palette,
  Languages,
  Zap,
  Focus,
  Link2,
  Maximize2
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AccessibilitySettings {
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  highContrast: boolean;
  grayscale: boolean;
  reducedMotion: boolean;
  focusIndicators: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  colorBlind: boolean;
  dyslexia: boolean;
  darkMode: boolean;
  focusMode: boolean;
  underlineLinks: boolean;
  readableFont: boolean;
}

const CustomAccessibilityWidget: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'quick' | 'advanced'>('quick');
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 100,
    lineHeight: 100,
    letterSpacing: 0,
    highContrast: false,
    grayscale: false,
    reducedMotion: false,
    focusIndicators: true,
    screenReader: false,
    keyboardNavigation: true,
    colorBlind: false,
    dyslexia: false,
    darkMode: false,
    focusMode: false,
    underlineLinks: false,
    readableFont: false,
  });

  // Apply accessibility settings
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // Font size
    root.style.fontSize = `${settings.fontSize}%`;
    
    // Line height
    body.style.lineHeight = `${settings.lineHeight}%`;
    
    // Letter spacing
    body.style.letterSpacing = `${settings.letterSpacing}px`;
    
    // High contrast
    body.classList.toggle('custom-high-contrast', settings.highContrast);
    
    // Grayscale
    body.style.filter = settings.grayscale ? 'grayscale(100%)' : 'none';
    
    // Reduced motion
    body.classList.toggle('reduced-motion', settings.reducedMotion);
    
    // Focus indicators
    body.classList.toggle('enhanced-focus', settings.focusIndicators);
    
    // Screen reader optimizations
    body.classList.toggle('screen-reader-optimized', settings.screenReader);
    
    // Keyboard navigation
    body.classList.toggle('keyboard-navigation', settings.keyboardNavigation);
    
    // Color blind support
    body.classList.toggle('color-blind-friendly', settings.colorBlind);
    
    // Dyslexia support
    body.classList.toggle('dyslexia-friendly', settings.dyslexia);
    
    // Dark mode
    body.classList.toggle('dark-mode', settings.darkMode);
    
    // Focus mode (highlight interactive elements)
    body.classList.toggle('focus-mode', settings.focusMode);
    
    // Underline links
    body.classList.toggle('underline-links', settings.underlineLinks);
    
    // Readable font
    body.classList.toggle('readable-font', settings.readableFont);

    // Cleanup function to reset styles when component unmounts
    return () => {
      root.style.fontSize = '';
      body.style.lineHeight = '';
      body.style.letterSpacing = '';
      body.style.filter = '';
      body.classList.remove(
        'custom-high-contrast',
        'reduced-motion', 
        'enhanced-focus',
        'screen-reader-optimized',
        'keyboard-navigation',
        'color-blind-friendly',
        'dyslexia-friendly',
        'dark-mode',
        'focus-mode',
        'underline-links',
        'readable-font'
      );
    };
  }, [settings]);

  const updateSetting = (key: keyof AccessibilitySettings, value: boolean | number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    const root = document.documentElement;
    const body = document.body;
    
    // Reset all styles immediately
    root.style.fontSize = '100%';
    body.style.lineHeight = '';
    body.style.letterSpacing = '';
    body.style.filter = 'none';
    body.classList.remove(
      'custom-high-contrast',
      'reduced-motion', 
      'enhanced-focus',
      'screen-reader-optimized',
      'keyboard-navigation',
      'color-blind-friendly',
      'dyslexia-friendly',
      'dark-mode',
      'focus-mode',
      'underline-links',
      'readable-font'
    );
    
    // Reset state
    setSettings({
      fontSize: 100,
      lineHeight: 100,
      letterSpacing: 0,
      highContrast: false,
      grayscale: false,
      reducedMotion: false,
      focusIndicators: true,
      screenReader: false,
      keyboardNavigation: true,
      colorBlind: false,
      dyslexia: false,
      darkMode: false,
      focusMode: false,
      underlineLinks: false,
      readableFont: false,
    });
  };

  // Quick preset profiles
  const applyProfile = (profileName: string) => {
    const profiles = {
      dyslexia: {
        fontSize: 120,
        lineHeight: 160,
        letterSpacing: 1,
        dyslexia: true,
        readableFont: true,
        underlineLinks: true,
        darkMode: true,
      },
      lowVision: {
        fontSize: 150,
        lineHeight: 140,
        letterSpacing: 0.5,
        highContrast: true,
        underlineLinks: true,
        focusIndicators: true,
      },
      motorControl: {
        focusIndicators: true,
        keyboardNavigation: true,
        reducedMotion: true,
        underlineLinks: true,
      },
      reading: {
        fontSize: 110,
        lineHeight: 150,
        letterSpacing: 0.5,
        focusMode: true,
        darkMode: true,
      },
    };

    const profile = profiles[profileName as keyof typeof profiles];
    if (profile) {
      setSettings(prev => ({ ...prev, ...profile }));
    }
  };

  const toggleLanguage = () => {
    const languages = ['el', 'en', 'de'] as const;
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  const getLanguageName = (lang: string) => {
    const names = { el: 'Ελληνικά', en: 'English', de: 'Deutsch' };
    return names[lang as keyof typeof names] || lang;
  };

  return (
    <>
      {/* Widget Button - Mobile Optimized */}
      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-yellow-300 touch-manipulation"
          aria-label={t('accessibilitySettings')}
        >
          <Accessibility className="w-5 h-5 sm:w-6 sm:h-6" />
          
          {/* Tooltip - Hidden on mobile */}
          <div className="hidden sm:block absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {t('accessibilitySettings')}
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
          </div>
        </button>
      </div>

      {/* Widget Panel - Mobile Optimized */}
      {isOpen && (
        <div className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-20 sm:right-auto z-50">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full sm:w-96 max-h-[85vh] sm:max-h-[85vh] overflow-hidden flex flex-col">
            {/* Header - Mobile Optimized */}
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-3 sm:p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <Accessibility className="w-5 h-5 sm:w-6 sm:h-6" />
                <div>
                  <h3 className="font-bold text-base sm:text-lg">{t('accessibilitySettings')}</h3>
                  <p className="text-yellow-100 text-xs sm:text-sm">{t('customizeExperience')}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors touch-manipulation"
                aria-label={t('closeSettings')}
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-0 border-b border-gray-200 bg-gray-50 flex-shrink-0">
              <button
                onClick={() => setActiveTab('quick')}
                className={`flex-1 py-2 px-3 text-xs sm:text-sm font-medium transition-colors ${activeTab === 'quick' ? 'border-b-2 border-yellow-500 text-yellow-600 bg-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {t('quick')}
              </button>
              <button
                onClick={() => setActiveTab('advanced')}
                className={`flex-1 py-2 px-3 text-xs sm:text-sm font-medium transition-colors ${activeTab === 'advanced' ? 'border-b-2 border-yellow-500 text-yellow-600 bg-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {t('advanced')}
              </button>
            </div>

            {/* Content - Mobile Optimized */}
            <div className="overflow-y-auto flex-1">
              {activeTab === 'quick' ? (
                <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                  {/* Quick Presets */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2 text-sm">
                      <Zap className="w-4 h-4" />
                      {t('quickProfiles')}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => applyProfile('dyslexia')}
                        className="p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors text-xs sm:text-sm font-medium text-yellow-900 border border-yellow-200"
                      >
                        {t('dyslexiaFriendly')}
                      </button>
                      <button
                        onClick={() => applyProfile('lowVision')}
                        className="p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors text-xs sm:text-sm font-medium text-yellow-900 border border-yellow-200"
                      >
                        {t('lowVision')}
                      </button>
                      <button
                        onClick={() => applyProfile('motorControl')}
                        className="p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-xs sm:text-sm font-medium text-orange-900 border border-orange-200"
                      >
                        {t('motorControl')}
                      </button>
                      <button
                        onClick={() => applyProfile('reading')}
                        className="p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-xs sm:text-sm font-medium text-orange-900 border border-orange-200"
                      >
                        {t('readingMode')}
                      </button>
                    </div>
                  </div>

                  <hr className="my-2" />

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2 text-sm">
                      <Settings className="w-4 h-4" />
                      {t('quickActions')}
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-xs sm:text-sm touch-manipulation"
                      >
                        <Languages className="w-4 h-4" />
                        {t('language')}: {getLanguageName(language)}
                      </button>
                      
                      <button
                        onClick={resetSettings}
                        className="flex items-center gap-2 p-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors text-xs sm:text-sm font-medium touch-manipulation"
                      >
                        <RotateCcw className="w-4 h-4" />
                        {t('resetAllAccessibility')}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                  {/* Font Size */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700">
                      <Type className="w-4 h-4" />
                      {t('increaseFontSize')}: {settings.fontSize}%
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateSetting('fontSize', Math.max(50, settings.fontSize - 10))}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors touch-manipulation min-w-[40px] min-h-[40px] flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${((settings.fontSize - 50) / 100) * 100}%` }}
                        ></div>
                      </div>
                      <button
                        onClick={() => updateSetting('fontSize', Math.min(200, settings.fontSize + 10))}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors touch-manipulation min-w-[40px] min-h-[40px] flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Line Height */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700">
                      <Maximize2 className="w-4 h-4" />
                      {t('lineHeight')}: {settings.lineHeight}%
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateSetting('lineHeight', Math.max(80, settings.lineHeight - 10))}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors touch-manipulation min-w-[40px] min-h-[40px] flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${((settings.lineHeight - 80) / 120) * 100}%` }}
                        ></div>
                      </div>
                      <button
                        onClick={() => updateSetting('lineHeight', Math.min(200, settings.lineHeight + 10))}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors touch-manipulation min-w-[40px] min-h-[40px] flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Letter Spacing */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700">
                      <Type className="w-4 h-4" />
                      {t('letterSpacing')}: {settings.letterSpacing}px
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateSetting('letterSpacing', Math.max(0, settings.letterSpacing - 0.5))}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors touch-manipulation min-w-[40px] min-h-[40px] flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(settings.letterSpacing / 2) * 100}%` }}
                        ></div>
                      </div>
                      <button
                        onClick={() => updateSetting('letterSpacing', Math.min(2, settings.letterSpacing + 0.5))}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors touch-manipulation min-w-[40px] min-h-[40px] flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <hr className="my-2" />

                  {/* Visual Adjustments */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">{t('visualAdjustmentsSection')}</h4>
                    {[
                      { key: 'highContrast', label: t('enableHighContrast'), icon: Contrast },
                      { key: 'grayscale', label: t('enableGrayscale'), icon: Eye },
                      { key: 'darkMode', label: t('darkMode'), icon: Moon },
                      { key: 'colorBlind', label: t('colorBlindFriendly'), icon: Palette },
                      { key: 'dyslexia', label: t('dyslexiaFontLabel'), icon: Type },
                      { key: 'readableFont', label: t('readableFont'), icon: Type },
                      { key: 'underlineLinks', label: t('underlineLinksLabel'), icon: Link2 },
                    ].map(({ key, label, icon: Icon }) => (
                      <label key={key} className="flex items-center justify-between p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer touch-manipulation">
                        <div className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5 text-gray-600" />
                          <span className="text-xs sm:text-sm font-medium text-gray-700">{label}</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings[key as keyof AccessibilitySettings] as boolean}
                          onChange={(e) => updateSetting(key as keyof AccessibilitySettings, e.target.checked)}
                          className="w-4 h-4 text-yellow-500 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2"
                        />
                      </label>
                    ))}
                  </div>

                  <hr className="my-2" />

                  {/* Navigation */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">{t('navigationInteraction')}</h4>
                    {[
                      { key: 'focusIndicators', label: t('enhancedFocus'), icon: Focus },
                      { key: 'keyboardNavigation', label: t('keyboardNavigation'), icon: Keyboard },
                      { key: 'focusMode', label: t('focusMode'), icon: Focus },
                      { key: 'screenReader', label: t('screenReaderOptimized'), icon: Volume2 },
                      { key: 'reducedMotion', label: t('reduceMotion'), icon: RotateCcw },
                    ].map(({ key, label, icon: Icon }) => (
                      <label key={key} className="flex items-center justify-between p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer touch-manipulation">
                        <div className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5 text-gray-600" />
                          <span className="text-xs sm:text-sm font-medium text-gray-700">{label}</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings[key as keyof AccessibilitySettings] as boolean}
                          onChange={(e) => updateSetting(key as keyof AccessibilitySettings, e.target.checked)}
                          className="w-4 h-4 text-yellow-500 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer - Mobile Optimized */}
            <div className="bg-gray-50 px-3 sm:px-4 py-2 border-t border-gray-200 flex-shrink-0">
              <p className="text-xs text-gray-500 text-center">
                {t('accessibilityFeaturesForEveryone')}
              </p>
              <p className="text-xs text-gray-400 text-center mt-1">
                Build Stolos Official
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default CustomAccessibilityWidget;
