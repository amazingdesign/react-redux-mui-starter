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
    },
    required: ['email'],
  }

  const schemaValidator = createValidator(schema)

  const bridge = new JSONSchemaBridge(schema, schemaValidator)

  return bridge
}