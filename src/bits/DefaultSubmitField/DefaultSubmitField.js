import React from 'react'
import PropTypes from 'prop-types'

import { Button } from '@material-ui/core'

import { useTranslation } from 'react-i18next'

const DefaultSubmitField = (props) => {
  const { t } = useTranslation()

  return (
    <Button
      style={{ margin: '1rem 0' }}
      type={'submit'}
      variant={'contained'}
      color={'primary'}
      fullWidth={true}
      {...props}
    >
      {t('LOGIN')}
    </Button>
  )
}

DefaultSubmitField.propTypes = {}

export default DefaultSubmitField