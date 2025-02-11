import en from './locale/en.js'

const durationRE = /((?:\d{1,16}(?:\.\d{1,16})?|\.\d{1,16})(?:[eE][-+]?\d{1,4})?)\s?([\p{L}]{0,14})/gu

parse.unit = en

/**
 * convert `str` to ms
 *
 * @param {string} str
 * @param {string} format
 * @return {number}
 */
export default function parse(str = '', format = 'ms') {
  let result = null, prevUnits

  String(str)
    .replace(new RegExp(`(\\d)[${parse.unit.placeholder}${parse.unit.group}](\\d)`, 'g'), '$1$2')  // clean up group separators / placeholders
    .replace(parse.unit.decimal, '.') // normalize decimal separator
    .replace(durationRE, (_, n, units) => {
    // if no units, find next smallest units or fall back to format value
    // eg. 1h30 -> 1h30m
    if (!units) {
      if (prevUnits) {
        for (const u in parse.unit) if (parse.unit[u] < prevUnits) { units = u; break }
      }
      else units = format
    }
    else units = units.toLowerCase()

    prevUnits = units = parse.unit[units] || parse.unit[units.replace(/s$/, '')]

    if (units) result = (result || 0) + n * units
  })

  return result && ((result / (parse.unit[format] || 1)) * (str[0] === '-' ? -1 : 1))
}
