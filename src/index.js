'use strict'

/**
 * pope
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

/**
 * @description get nested properties from a given
 * object using dot notation
 * @method prop
 * @param  {String} path
 * @param  {Object} obj
 * @return {Mixed}
 * @public
 */
var prop = function(path, obj) {
  if (typeof(obj) !== 'object' || typeof path !== 'string') {
    return obj;
  }
  var pathArr = path.split('.');
  for (var i = 0; i < pathArr.length; i++) {
    var p = pathArr[i];
    obj = obj.hasOwnProperty(p) ? obj[p] : null;
    if (obj === null) {
      break;
    }
  }
  return obj;
}

/**
 * @description parses a given template string and
 * replace dynamic placeholders with actual data
 * @method pope
 * @param  {String} string
 * @param  {Object} data
 * @return {String}
 * @public
 */
var pope = function (string, data, options) {
  options = options || { skipUndefined: false, throwOnUndefined: false }
  var regex = /{{2}(.+?)}{2}/g
  var result
  var formattedString = string
  while (result = regex.exec(string)){
    var item = result[1].trim()
    if(item) {
      var value = prop(item, data)
      if (value !== undefined && value !== null) {
        formattedString = formattedString.replace(result[0], value)
      } else if (options.throwOnUndefined) {
        var error = new Error('Missing value for ' + result[0])
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

module.exports = {
  pope: pope,
  prop: prop
}
