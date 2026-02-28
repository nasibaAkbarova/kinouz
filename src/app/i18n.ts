import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// buyoda man i18n app ichida i18n.ts deb papka ochvoldim va tashqarida 
// shered degan papkani ichida  locales degan papka ochdim va locales si ichda
//  3 ta file ochdim uz,ru,eng ochdim va shulani i18n ga chaqirib keldim 
import uz from '../shared/locales/uz.json';
import ru from '../shared/locales/ru.json';
import eng from '../shared/locales/en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      uz: { translation: uz },
      ru: { translation: ru },
      eng: { translation: eng }
    },
    fallbackLng: 'uz',
    debug: true,
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;


// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// // import LanguageDetector from 'i18next-browser-languagedetector';

// import uz from '../shared/locales/uz.json';
// import ru from '../shared/locales/ru.json';
// import en from '../shared/locales/en.json';

// i18n
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     resources: {
//       uz: { translation: uz },
//       ru: { translation: ru },
//       en: { translation: en },
//     },
//     fallbackLng: 'uz',
//     interpolation: {
//       escapeValue: false,
//     },
//   });

// export default i18n;