let durationRE = /(-?(?:\d+\.?\d*|\d*\.?\d+)(?:e[-+]?\d+)?)\s*([\p{L}]*)/uig


/**
 * conversion ratios
 */

parse.year =
  parse.yr =
  parse.y = 60000 * 60 * 24 * 365.25

parse.month =
  parse.b = 60000 * 60 * 24 * (365.25 / 12)

parse.week =
  parse.wk =
  parse.w = 60000 * 60 * 24 * 7

parse.day =
  parse.d = 60000 * 60 * 24

parse.hour =
  parse.hr =
  parse.h = 60000 * 60

parse.minute =
  parse.min =
  parse.m = 60000

parse.second =
  parse.sec =
  parse.s = 1000

parse.millisecond =
  parse.millisec =
  parse.ms = 1

parse['µs'] =
  parse['μs'] =
  parse.us =
  parse.microsecond = 1 / 1e3

parse.nanosecond =
  parse.ns = 1 / 1e6


/**
 * convert `str` to ms
 *
 * @param {String} str
 * @param {String} format
 * @return {Number}
 */

function parse(str = '', format = 'ms') {
  var result = null, prevUnits
  // ignore commas/placeholders
  str = (str + '').replace(/(\d)[,_](\d)/g, '$1$2')
  str.replace(durationRE, function (_, n, units) {
    // if no units, find next smallest units or fall back to format value (ms)
    if (!units) {
      if (prevUnits) {
        for (var u in parse) if (parse[u] < prevUnits) { units = u; break }
      }
      else units = format
    }
    else units = units.toLowerCase()
    units = parse[units] || parse[units.replace(/s$/, '')]
    if (units) result = (result || 0) + Math.abs(parseFloat(n, 10)) * units, prevUnits = units
  })

  return result && ((result / (parse[format] || 1)) * (str[0] === '-' ? -1 : 1))
}

export default parse
