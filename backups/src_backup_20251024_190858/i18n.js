import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../public/locales/en/translation.json';
import de from '../public/locales/de/translation.json';
import el from '../public/locales/el/translation.json';

const resources = {
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
  el: {
    translation: el,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'el', // Default language
    fallbackLng: 'el',
    debug: false, // Set to false for production
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;