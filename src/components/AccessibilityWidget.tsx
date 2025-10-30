import { useEffect, useState } from 'react';
import { Switch } from "@/components/ui/switch"
import { useLanguage } from '../contexts/LanguageContext';

export default function AccessibilityWidget() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [grayscale, setGrayscale] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [negativeContrast, setNegativeContrast] = useState(false);
  const [lightBackground, setLightBackground] = useState(false);
  const [underlineLinks, setUnderlineLinks] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  useEffect(() => {
    document.body.style.filter = grayscale ? "grayscale(100%)" : "none";
  }, [grayscale]);

  useEffect(() => {
    document.body.classList.toggle("high-contrast", highContrast);
  }, [highContrast]);

  useEffect(() => {
    document.body.classList.toggle("negative-contrast", negativeContrast);
  }, [negativeContrast]);

  useEffect(() => {
    document.body.classList.toggle("light-background", lightBackground);
  }, [lightBackground]);

  useEffect(() => {
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      const element = link as HTMLElement;
      if (underlineLinks) {
        element.style.textDecoration = "underline";
        element.style.textDecorationColor = "currentColor";
      } else {
        element.style.textDecoration = "";
        element.style.textDecorationColor = "";
      }
    });
  }, [underlineLinks]);

  useEffect(() => {
    document.body.classList.toggle("dyslexic-font", dyslexicFont);
  }, [dyslexicFont]);

  // Cleanup effect when component unmounts
  useEffect(() => {
    return () => {
      // Reset all styles when component unmounts
      document.documentElement.style.fontSize = "100%";
      document.body.style.filter = "none";
      document.body.classList.remove("high-contrast", "negative-contrast", "light-background", "dyslexic-font");
      
      const links = document.querySelectorAll("a");
      links.forEach((link) => {
        const element = link as HTMLElement;
        element.style.textDecoration = "";
        element.style.textDecorationColor = "";
      });
    };
  }, []);

  const resetAll = () => {
    setFontSize(100);
    setGrayscale(false);
    setHighContrast(false);
    setNegativeContrast(false);
    setLightBackground(false);
    setUnderlineLinks(false);
    setDyslexicFont(false);
    
    // Reset all styles immediately
    document.documentElement.style.fontSize = "100%";
    document.body.style.filter = "none";
    document.body.classList.remove("high-contrast", "negative-contrast", "light-background", "dyslexic-font");
    
    // Reset all links
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      const element = link as HTMLElement;
      element.style.textDecoration = "";
      element.style.textDecorationColor = "";
    });
  };

  return (
    <div className="accessibility-widget fixed right-2 top-32 z-[99999] md:right-4 md:bottom-4 md:top-auto md:translate-y-0 lg:right-4 lg:bottom-4 sm:right-3 sm:top-28" style={{ position: 'fixed', zIndex: 99999 }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-50 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all duration-200 group"
        aria-label={t('accessibilityToggle')}
        aria-expanded={open}
      >
        <span className="text-lg group-hover:scale-110 transition-transform duration-200">♿</span>
      </button>

      {open && (
        <div 
          className="accessibility-panel absolute right-0 top-0 mt-0 mr-12 w-72 sm:w-80 md:mt-2 md:mr-0 md:relative rounded-xl shadow-xl p-4 sm:p-6 bg-white border border-gray-100 z-[99999] max-w-[calc(100vw-2rem)]"
          role="dialog"
          aria-label={t('accessibilitySettings')}
          style={{ zIndex: 99999 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xs sm:text-sm font-bold">♿</span>
              </div>
              <div className="hidden sm:block">
                <h3 className="font-semibold text-gray-900 text-sm">{t('accessibilitySettings')}</h3>
                <p className="text-xs text-gray-500">{t('customizeExperience')}</p>
              </div>
              <div className="block sm:hidden">
                <h3 className="font-semibold text-gray-900 text-sm">{t('accessibilitySettings')}</h3>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
              aria-label={t('closeSettings')}
            >
              ×
            </button>
          </div>

          {/* Font Size Section */}
          <div className="mb-4 sm:mb-6">
            <label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3 block">{t('textSize')}</label>
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2 sm:p-3">
              <span className="text-xs sm:text-sm text-gray-600">{t('current')}: {fontSize}%</span>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button 
                  onClick={() => setFontSize((f) => Math.max(f - 10, 50))}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                  aria-label={t('decreaseFontSize')}
                >
                  −
                </button>
                <button 
                  onClick={() => setFontSize((f) => Math.min(f + 10, 200))}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                  aria-label={t('increaseFontSize')}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Visual Adjustments Section */}
          <div className="mb-4 sm:mb-6">
            <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">{t('visualAdjustments')}</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700">{t('grayscaleLabel')}</span>
                </div>
                <Switch 
                  id="grayscale-switch"
                  checked={grayscale} 
                  onCheckedChange={setGrayscale}
                  aria-label={t('enableGrayscale')}
                />
              </div>

              <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700">{t('highContrastLabel')}</span>
                </div>
                <Switch 
                  id="contrast-switch"
                  checked={highContrast} 
                  onCheckedChange={setHighContrast}
                  aria-label={t('enableHighContrast')}
                />
              </div>

              <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700">{t('negativeContrastLabel')}</span>
                </div>
                <Switch 
                  id="negative-contrast-switch"
                  checked={negativeContrast} 
                  onCheckedChange={setNegativeContrast}
                  aria-label={t('enableNegativeContrast')}
                />
              </div>

              <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700">{t('lightBackgroundLabel')}</span>
                </div>
                <Switch 
                  id="light-background-switch"
                  checked={lightBackground} 
                  onCheckedChange={setLightBackground}
                  aria-label={t('enableLightBackground')}
                />
              </div>
            </div>
          </div>

          {/* Text & Reading Section */}
          <div className="mb-4 sm:mb-6">
            <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">{t('textAndReading')}</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700">{t('underlineLinksLabel')}</span>
                </div>
                <Switch 
                  id="underline-switch"
                  checked={underlineLinks} 
                  onCheckedChange={setUnderlineLinks}
                  aria-label={t('enableUnderlineLinks')}
                />
              </div>

              <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700">{t('dyslexiaFontLabel')}</span>
                </div>
                <Switch 
                  id="dyslexic-switch"
                  checked={dyslexicFont} 
                  onCheckedChange={setDyslexicFont}
                  aria-label={t('enableDyslexicFont')}
                />
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <div className="pt-3 sm:pt-4 border-t border-gray-100">
            <button 
              onClick={resetAll} 
              className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 rounded-lg font-medium text-xs sm:text-sm transition-colors flex items-center justify-center space-x-2"
              aria-label={t('resetAllAccessibility')}
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>{t('resetAllAccessibility')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}