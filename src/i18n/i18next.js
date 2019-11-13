import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import XHR from 'i18next-xhr-backend'

import { detectorOptions } from './detector.options'

const i18n = i18next.createInstance()

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    detector: detectorOptions,
    interpolation: {
      escapeValue: false,
    },
    // use keys as fallback
    fallbackLng: false,
    backend: {
      // eslint-disable-next-line no-undef
      loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}.json`,
    },
  })

export default i18n