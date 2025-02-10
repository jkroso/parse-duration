import en from './locale/en.js'

const durationRE = /(-?(?:\d{1,16}(?:\.\d{1,16})?|\.\d{1,16})(?:[eE][-+]?\d{1,4})?)\s?([\p{L}]{0,14})/gu

parse.unit = en

/**
 * convert `str` to ms
 *
 * @param {String} str
 * @param {String} format
 * @return {Number}
 */
export default function parse(str = '', format = 'ms') {
  // 10KB limit
  // if (str.length > 10 * 1024) throw new Error("Input exceeds maximum allowed length");

  let result = null, prevUnits

  (str + '')
    .replace(/(\d)[_ ](\d)/g, '$1$2')     // ignore placeholders
    .replaceAll(parse.unit.group, '')     // remove group separator
    .replaceAll(parse.unit.decimal, '.')  // normalize decimal separator
    .replace(durationRE, (_, n, units) => {
    // if no units, find next smallest units or fall back to format value
    // eg. 1h30 -> 1h30m
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
