
var duration = /(-?\d*\.?\d+(?:e[-+]?\d+)?)\s*([a-zμ]*)/ig

module.exports = parse

/**
 * conversion ratios
 */

parse.nanosecond =
parse.ns = 1 / 1e6

parse.μs =
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

parse.month = parse.d * (365.25 / 12)

parse.year =
parse.yr =
parse.y = parse.d * 365.25

/**
 * dividers for the output format
 */

let ms, s, m, h, d, w;
const dividers = {
  ms: ms = 1,
  s: s = ms * 1000,
  m: m = s * 60,
  h: h = m * 60,
  d: d = h * 24,
  w: w = d * 7,
};

/**
 * convert `str` to ms
 *
 * @param {String} str
 * @param {String} format
 * @return {Number}
 */

function parse(str, format){
  format = format || 'ms'
  var result = 0
  // ignore commas
  str = str.replace(/(\d),(\d)/g, '$1$2')
  str.replace(duration, function(_, n, units){
    units = parse[units]
      || parse[units.toLowerCase().replace(/s$/, '')]
      || 1
    result += parseFloat(n, 10) * units
  })
  return result / dividers[format]
}
