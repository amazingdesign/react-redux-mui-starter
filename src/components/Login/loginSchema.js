import { JSONSchemaBridge } from 'uniforms-bridge-json-schema'
import { i18n } from '../../i18n'

import { createValidator } from '../../validator'

export default () => {
  const schema = {
    title: 'Login',
    type: 'object',
    properties: {
      email: {
        type: 'string',
        minLength: 1,
        label: i18n.t('E-mail'),
      },
      password: {
        type: 'string',
        minLength: 1,
        label: i18n.t('Password'),
        uniforms: {
          type: 'password',
        },
      },
    },
    required: ['email', 'password'],
  }

  const schemaValidator = createValidator(schema)

  const bridge = new JSONSchemaBridge(schema, schemaValidator)

  return bridge
}