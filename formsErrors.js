const Immutable = require('immutable')

function errorListReducer(prev, errorKey, obj) {
  // is recursive obj
  if (!isArray(obj[errorKey])) {
    let what = Object.keys(obj)
      .reduce((objPrev, objErrorKey) => {
        console.log('__obj[objErrorKey]__', JSON.stringify(obj[objErrorKey]), isArray(obj[objErrorKey]));

        if (!isArray(obj[objErrorKey])) {
          let something = Object.keys(obj[objErrorKey])
            .reduce((oObjPrev, oObjErrorKey) => ([...oObjPrev, ...obj[objErrorKey][oObjErrorKey]]), [])
          return { ...objPrev, [objErrorKey]: [...new Set(something)].map(e => e + '.').join(' ') }
        } else {
          return ''
        }
      }, {})
    return what
  }
  if (isArray(obj[errorKey])) {
    if (isObj(obj[errorKey][0])) {
      // console.log('__OBJ__', JSON.stringify(obj[errorKey][0]));
    }

    if (isString(obj[errorKey][0])) {
      return arrayReduceStrings(prev, errorKey, obj)
    }
  }
}

function transformErrors(formErrors) {
  return Immutable.Map(Object.keys(formErrors)
    .reduce((prev, errorKey) => errorListReducer(prev, errorKey, formErrors), {}))
}

function arrayReduceStrings(prev, errorKey, obj) {
  return { ...prev, [errorKey]: [...new Set(obj[errorKey])].map(e => e + '.').join(' ') }
}

function arrayReduceLiterals() {
  // 
}

function isString(obj) {
  return typeof obj === 'string'
}

function isObj(obj) {
  return Object.prototype.toString(obj) === '[object Object]'
}

function isArray(obj) {
  return Array.isArray(obj)
}

module.exports = {
  transformErrors
}
