'use strict'

/*
* pope
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/*
|--------------------------------------------------------------------------
| ES5
|--------------------------------------------------------------------------
|
| Since I want this module to work as it is in browsers, I have used the
| possible plain Javascript
|
*/

function uncurryThis (fn) {
  return function () {
    return Function.call.apply(fn, arguments)
  }
}

const hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty)

function isObj (obj) {
  return obj !== null && typeof (obj) === 'object'
}

/**
 * @description get nested properties from a given
 * object using dot notation
 *
 * @method prop
 *
 * @param  {Object} obj
 * @param  {String} path
 *
 * @return {Mixed}
 */
function prop (obj, path) {
  if (!isObj(obj) || typeof path !== 'string') {
    return obj
  }
  const pathArr = path.split('.')
  for (let i = 0; i < pathArr.length; i++) {
    const p = pathArr[i]
    obj = hasOwnProperty(obj, p) ? obj[p] : null
    if (obj === null) {
      break
    }
  }
  return obj
}

/**
 * @description parses a given template string and
 * replace dynamic placeholders with actual data.
 *
 * @method pope
 *
 * @param  {String} string
 * @param  {Object} data
 *
 * @return {String}
 */
function pope (string, data, options) {
  options = options || { skipUndefined: false, throwOnUndefined: false }

  const regex = /{{2}(.+?)}{2}/g
  let result
  let formattedString = string

  while ((result = regex.exec(string)) !== null) {
    const item = result[1].trim()
    if (item) {
      const value = prop(data, item)
      if (value !== undefined && value !== null) {
        formattedString = formattedString.replace(result[0], value)
      } else if (options.throwOnUndefined) {
        const error = new Error('Missing value for ' + result[0])
        error.key = item
        error.code = 'E_MISSING_KEY'
        throw error
      } else if (!options.skipUndefined) {
        formattedString = formattedString.replace(result[0], '')
      }
    }
  }
  return formattedString
}

export { pope, prop }
