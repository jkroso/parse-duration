'use strict'

var durationRE = /(-?(?:\d+\.?\d*|\d*\.?\d+)(?:e[-+]?\d+)?)\s*([\p{L}]*)/uig

module.exports = parse
// enable default import syntax in typescript
module.exports.default = parse

/**
 * conversion ratios
 */

parse.nanosecond =
parse.ns = 1 / 1e6

parse['µs'] =
parse['μs'] =
parse.us =
parse.microsecond = 1 / 1e3

parse.millisecond =
parse.ms = 1

parse.second =
parse.sec =
parse.s = parse.ms * 1000

parse.minute =
parse.min =
parse.m = parse.s * 60

parse.hour =
parse.hr =
parse.h = parse.m * 60

parse.day =
parse.d = parse.h * 24

parse.week =
parse.wk =
parse.w = parse.d * 7

parse.month =
parse.b =
parse.d * (365.25 / 12)

parse.year =
parse.yr =
parse.y = parse.d * 365.25

var order = [parse.year, parse.month, parse.week, parse.day, parse.hour, parse.minute, parse.second, parse.millisecond, parse.microsecond, parse.nanosecond]

/**
 * convert `str` to ms
 *
 * @param {String} str
 * @param {String} format
 * @return {Number}
 */

function parse(str='', format='ms'){
  var result = null
  // ignore commas/placeholders
  str = (str+'').replace(/(\d)[,_](\d)/g, '$1$2')
  var isNegative = str[0] === '-';
  let lastUnit = 6
  str.replace(durationRE, function(_, n, units){
    units = units!=="" && unitRatio(units.toLowerCase())
    if (units===false && lastUnit>=0) units = order[lastUnit + 1]
    if (units) {
      result = (result || 0) + Math.abs(parseFloat(n, 10)) * units
      lastUnit = order.findIndex(u=>u===units)
    }
  })

  return result && ((result / (unitRatio(format) || 1)) * (isNegative ? -1 : 1))
}

function unitRatio(str) {
  return parse[str] || parse[str.replace(/s$/, '')]
}
