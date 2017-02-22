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
 * @param  {Object} obj
 * @param  {String} path
 * @return {Mixed}
 * @public
 */
var prop = function(obj, path) {
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
var pope = function (string, data) {
  var regex = /\{\{([a-z0-9\.\s*]+)\}\}/gi
  var result
  var formattedString = string
  while (result = regex.exec(string)){
    var item = result[1].trim()
    if(item) {
      var value = prop(data, item) || null
      if(!value){
        formattedString = formattedString.replace(result[0], '')
      }else{
        formattedString = formattedString.replace(result[0], value)
      }
    }
  }
  return formattedString
}

module.exports = {
  pope: pope,
  prop: prop
}
