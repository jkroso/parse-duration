import en from './locale/en.js'

const durationRE = /((?:\d+(?:\.\d+)?|\.\d+)(?:[eE][-+]?\d+)?)\s*([\p{L}]{0,14})/gu

parse.unit = en

// group/placeholder cleanup regex — rebuilt only when the locale strings change
let groupRE, placeholder = null, group

/**
 * look up a unit name, ignoring case and a trailing plural `s`
 *
 * @param {object} unit
 * @param {string} name
 * @return {number|undefined}
 */
const lookupUnit = (unit, name) => {
  name = String(name).toLowerCase()
  return unit[name] ?? (name.endsWith('s') ? unit[name.slice(0, -1)] : undefined)
}

/**
 * convert `str` to ms
 *
 * @param {string} str
 * @param {string} format
 * @return {number|null}
 */
export default function parse(str = '', format = 'ms') {
  let result = null, prevUnits, unit = parse.unit

  if (unit.placeholder !== placeholder || unit.group !== group)
    groupRE = new RegExp(`(\\d)[${(placeholder = unit.placeholder) ?? ''}${(group = unit.group) ?? ''}](\\d)`, 'g')

  str = String(str)
  let s = str.replace(groupRE, '$1$2') // clean up group separators / placeholders
  if (unit.decimal !== '.') s = s.replaceAll(unit.decimal, '.') // normalize decimal separator

  durationRE.lastIndex = 0
  for (let m; (m = durationRE.exec(s));) {
    let units = m[2]
    // if no units, find next smallest units or fall back to format value
    // eg. 1h30 -> 1h30m
    if (!units) {
      if (prevUnits) {
        for (const u in unit) if (unit[u] < prevUnits) { units = u; break }
      }
      else units = format
    }

    prevUnits = units = lookupUnit(unit, units)

    if (typeof units == 'number') result = (result || 0) + m[1] * units
  }

  return result && ((result / (lookupUnit(unit, format) || 1)) * (str.trimStart()[0] === '-' ? -1 : 1))
}
