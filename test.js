const Immutable = require('immutable');
const assert = require('assert');
const { transformErrors } = require('./formsErrors')

it('should be concatenate errors to a single string separated by a dot', () => {
  const errors = {
    name: ['This field is required', 'Another error'],
    age: ['Only numeric characters are allowed'],
  }

  const error = {
    name: 'This field is required. Another error.',
    age: 'Only numeric characters are allowed.'
  }

  const results = transformErrors(errors)
  const matchedResults = results.equals(Immutable.Map(error))

  console.log(JSON.stringify(results))
  console.log(JSON.stringify(error))
  console.log(JSON.stringify(matchedResults))

  assert.equal(true, matchedResults)
})

// it('should flatten errors array into a single string on parent node', () => {
//   const errors = {
//     name: {
//       first: ['Only alphanumeric characters are allowed'],
//       last: ['Only alphanumeric characters are allowed'],
//     },
//     names: [{}, {
//       first: ['Only alphanumeric characters are allowed'],
//       last: ['Only alphanumeric characters are allowed'],
//     }, {}],
//   }

//   const error = {
//     name: 'Only alphanumeric characters are allowed.',
//     names: 'Only alphanumeric characters are allowed.',
//   }

//   const results = transformErrors(errors)
//   const matchedResults = results.equals(Immutable.Map(error))

//   console.log('__results__ :',JSON.stringify(results))
//   // console.log('__error__ :',JSON.stringify(error))
//   console.log('__matchedResults__ :',JSON.stringify(matchedResults))

//   assert.equal(true, matchedResults)
// })

// it('should tranform errors', () => {
//   // example error object returned from API converted to Immutable.Map
//   const errors = Immutable.fromJS({
//     name: ['This field is required'],
//     age: ['This field is required', 'Only numeric characters are allowed'],
//     urls: [{}, {}, {
//       site: {
//         code: ['This site code is invalid'],
//         id: ['Unsupported id'],
//       }
//     }],
//     url: {
//       site: {
//         code: ['This site code is invalid'],
//         id: ['Unsupported id'],
//       }
//     },
//     tags: [{}, {
//       non_field_errors: ['Only alphanumeric characters are allowed'],
//       another_error: ['Only alphanumeric characters are allowed'],
//       third_error: ['Third error']
//     }, {}, {
//       non_field_errors: [
//         'Minumum length of 10 characters is required',
//         'Only alphanumeric characters are allowed',
//       ],
//     }],
//     tag: {
//       nested: {
//         non_field_errors: ['Only alphanumeric characters are allowed'],
//       },
//     },
//   });

//   // in this specific case,
//   // errors for `url` and `urls` keys should be nested
//   // see expected object below
//   const result = transformErrors();

//   assert.deepEqual(result.toJS(), {
//     name: 'This field is required.',
//     age: 'This field is required. Only numeric characters are allowed.',
//     urls: [{}, {}, {
//       site: {
//         code: 'This site code is invalid.',
//         id: 'Unsupported id.',
//       },
//     }],
//     url: {
//       site: {
//         code: 'This site code is invalid.',
//         id: 'Unsupported id.',
//       },
//     },
//     tags: 'Only alphanumeric characters are allowed. Third error. ' +
//       'Minumum length of 10 characters is required.',
//     tag: 'Only alphanumeric characters are allowed.',
//   });
// });
