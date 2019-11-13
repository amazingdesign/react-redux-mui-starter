import Ajv from 'ajv'
import localize from 'ajv-i18n'

export const ajv = new Ajv({ allErrors: true, useDefaults: true })

export const createValidator = (schema) => {
  const validator = ajv.compile(schema)

  return model => {
    validator(model)

    if (validator.errors && validator.errors.length) {
      localize.pl(validator.errors)

      // eslint-disable-next-line no-throw-literal
      throw { details: validator.errors }
    }
  }
}

export default createValidator