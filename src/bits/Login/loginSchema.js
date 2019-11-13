import { JSONSchemaBridge } from 'uniforms-bridge-json-schema'

export default ({ i18n, createValidator }) => {
  const schema = {
    title: 'Login',
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
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