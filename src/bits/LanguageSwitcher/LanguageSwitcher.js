import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import LanguageSelect from '../LanguageSelect'

const LanguageSwitcher = ({ languages, ...restOfProps }) => {
  const { i18n } = useTranslation()

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
  languages: PropTypes.arrayOf(
    PropTypes.exact({
      code: PropTypes.string.isRequired,
      name: PropTypes.string,
    })
  ).isRequired,
}

export default LanguageSwitcher