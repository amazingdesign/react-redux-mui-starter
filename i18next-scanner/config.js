/* eslint-env node */

const flush = require('./flush')

module.exports = {
  input: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/i18n/**',
    '!**/node_modules/**',
  ],
  output: 'src',
  options: {
    debug: true,
    removeUnusedKeys: true,
    sort: true,
    func: {
      list: ['i18next.t', 'i18n.t', 't'],
      extensions: ['.js', '.jsx'],
    },
    lngs: ['pl'],
    defaultLng: 'en',
    defaultValue: '',
    resource: {
      loadPath: 'i18n/locales/{{lng}}.json',
      savePath: 'i18n/locales/{{lng}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
    // <Trans /> handling needs acorn peer dependency
    trans: false,
  },
  flush: flush,
}