const Immutable = require('immutable')

function transformErrors(formErrors) {
  return Immutable.Map(Object.keys(formErrors).reduce((prev, errorKey) => {
    return { ...prev, [errorKey]: formErrors[errorKey].map(e => e + '.').join(' ').trim() }
  }, {}))
}

module.exports = {
  transformErrors
}
