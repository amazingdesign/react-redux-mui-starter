import React, { useState } from 'react'
import PropTypes from 'prop-types'

import LanguageSelect from '../LanguageSelect'

const LanguageSwitcher = ({ i18n, languages, ...restOfProps }) => {
  const [currentLang, setCurrentLang] = useState(i18n.language.slice(0, 2))

  const onLanguageChange = (event) => {
    const chosenLanguage = event.target.value

    setCurrentLang(chosenLanguage)
    i18n.changeLanguage(chosenLanguage)
  }

  return (
    <LanguageSelect
      value={currentLang}
      onChange={onLanguageChange}
      languages={languages}
      {...restOfProps}
    />
  )
}

LanguageSwitcher.propTypes = {
  i18n: PropTypes.object.isRequired,
  languages: PropTypes.arrayOf(
    PropTypes.exact({
      code: PropTypes.string.isRequired,
      name: PropTypes.string,
    })
  ).isRequired,
}

export default LanguageSwitcher