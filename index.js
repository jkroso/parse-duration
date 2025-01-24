import unit from './locale/en.js'

let durationRE = /(-?(?:\d+\.?\d*|\d*\.?\d+)(?:e[-+]?\d+)?)\s*([\p{L}]*)/uig

parse.unit = unit

/**
 * convert `str` to ms
 *
 * @param {String} str
 * @param {String} format
 * @return {Number}
 */

function parse(str = '', format = 'ms') {
  let result = null, prevUnits
  // ignore commas/placeholders
  str = (str + '').replace(/(\d)[,_](\d)/g, '$1$2')
  str.replace(durationRE, function (_, n, units) {
    // if no units, find next smallest units or fall back to format value (ms)
    if (!units) {
      if (prevUnits) {
        for (var u in parse.unit) if (parse.unit[u] < prevUnits) { units = u; break }
      }
      else units = format
    }
    else units = units.toLowerCase()

    units = parse.unit[units] || parse.unit[units.replace(/s$/, '')]

    if (units) result = (result || 0) + Math.abs(parseFloat(n, 10)) * units, prevUnits = units
  })

  return result && ((result / (parse.unit[format] || 1)) * (str[0] === '-' ? -1 : 1))
}

export default parse
