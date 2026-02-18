import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 1. On importe les fichiers JSON que tu viens de créer
import translationFR from './locales/fr.json';
import translationEN from './locales/en.json';
import translationAR from './locales/ar.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: translationFR },
      en: { translation: translationEN },
      ar: { translation: translationAR }
    },
    lng: "fr", // Langue par défaut
    fallbackLng: "en", 
    interpolation: { escapeValue: false }
  });

// 2. Gestion automatique du sens de lecture (LRT / RTL)
i18n.on('languageChanged', (lng) => {
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
});

export default i18n;