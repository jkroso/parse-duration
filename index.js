import en from './locale/en.js'

const durationRE = /(\d+(?::\d+){1,2}(?:\.\d*)?|(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][-+]?\d+)?)\s*([\p{L}]{0,14})/gu

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
 * next smaller unit than `v`, eg. h -> m
 *
 * @param {object} unit
 * @param {number} v
 * @return {number|undefined}
 */
const smaller = (unit, v) => { for (const u in unit) if (unit[u] < v) return unit[u] }

/**
 * convert `str` to ms
 *
 * @param {string} str
 * @param {string} format
 * @return {number|null}
 */
export default function parse(str = '', format = 'ms') {
  let result = null, prev, unit = parse.unit

  if (unit.placeholder !== placeholder || unit.group !== group)
    groupRE = new RegExp(`(\\d)[${(placeholder = unit.placeholder) ?? ''}${(group = unit.group) ?? ''}](?=\\d)`, 'g')

  str = String(str)
  let s = str.replace(groupRE, '$1') // clean up group separators / placeholders
  if (unit.decimal !== '.') s = s.replaceAll(unit.decimal, '.') // normalize decimal separator

  durationRE.lastIndex = 0
  for (let m; (m = durationRE.exec(s));) {
    const segs = m[1].split(':')
    // if no units: clock ends in seconds, else find next smallest units or fall back to format value
    // eg. 1:30:00 -> 1h30m0s, 1:30 -> 1m30s, 1h30 -> 1h30m
    let v = m[2] ? lookupUnit(unit, m[2])
      : segs.length > 1 ? 1000 * 60 ** (segs.length - 1)
      : prev ? smaller(unit, prev) : lookupUnit(unit, format)

    // clock segments descend through units, eg. 1:30 h -> 1h30m
    for (const seg of segs) {
      if (typeof v == 'number') result = (result || 0) + seg * v
      prev = v, v = smaller(unit, v)
    }
  }

  return result && ((result / (lookupUnit(unit, format) || 1)) * (str.trimStart()[0] === '-' ? -1 : 1))
}
