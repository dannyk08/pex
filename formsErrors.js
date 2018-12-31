const Immutable = require('immutable')

// function transformErrors(formErrors) {
//   return Immutable.Map(Object.keys(formErrors).reduce((prev, errorKey) => {
//     return { ...prev, [errorKey]: formErrors[errorKey].map(e => e + '.').join(' ').trim() }
//   }, {}))
// }

function isObj(obj) {
  return Object.prototype.toString(obj) === '[object Object]'
}

function isArray(obj) {
  return Array.isArray(obj)
}

function transformErrors(formErrors) {
  return Immutable.Map(Object.keys(formErrors).reduce((prev, errorKey) => {
    // if (isObj(formErrors[errorKey]) && !isArray(formErrors[errorKey])) {
    //   let array = Object.keys(formErrors[errorKey]).reduce((nPrev, nErrorKey) => {
    //     return [...nPrev, ...formErrors[errorKey][nErrorKey]]
    //   }, [])
    //   let set = [...new Set(array)].map(e => e + '.').join(' ').trim()
    //   return { ...prev, [errorKey]: set }
    // }
    // if (isArray(formErrors[errorKey])) {
    //   let errors = formErrors[errorKey]
    //     .filter(e => Object.keys(e).length)
    //     .map(e => {
    //       let array = Object.keys(e).reduce((nPrev, nErrorKey) => {
    //         return [...nPrev, ...e[nErrorKey]]
    //       }, [])
    //       let set = [...new Set(array)]
    //         .map(e => e + '.').join(' ').trim()
    //       return set
    //     })
    //     .join(' ').trim()

    //   return {
    //     ...prev,
    //     [errorKey]: errors
    //   }
    // }

    return { ...prev, [errorKey]: formErrors[errorKey].map(e => e + '.').join(' ').trim() }
  }, {}))
}

module.exports = {
  transformErrors
}
