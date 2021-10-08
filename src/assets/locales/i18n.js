import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import locales from "@assets/locales";
import Backend from "i18next-http-backend";
// import LanguageDetector from 'i18next-browser-languagedetector'; //OPTIONAL

i18n
  .use(Backend)
  // .use(LanguageDetector) // OPTIONAL
  .use(initReactI18next)
  .init({
    //  Set default language
    lng: "vi",
    //  language to use if translations in user language are not available
    fallbackLng: "en",
    debug: false,
    resources: locales,
    //  default namespace used if not passed to 'translation function'
    ns: ["translation"],
    defaultNS: "translation",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
