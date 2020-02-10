export const detectorOptions = {
  // order and from where user language should be detected
  order: [
    'querystring',
    'localStorage',
    'cookie',
    'path',
    'subdomain',
    'htmlTag',
    'navigator',
  ],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ['localStorage', 'cookie'],

  // languages to not persist (cookie, localStorage)
  excludeCacheFor: ['cimode'],

  // optional htmlTag with lang attribute, the default is:
  htmlTag: typeof window !== 'undefined' && window.document && window.document.documentElement,

  // only detect languages that are in the whitelist
  checkWhitelist: true,
}

export default detectorOptions