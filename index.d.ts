// ./index.d.ts

/**
 * convert `str` to ms
 */
type Units =
  'nanosecond' | 'ns' |
  'µs' | 'μs' | 'us' | 'microsecond' |
  'millisecond' | 'ms' |
  'second' | 'sec' | 's' |
  'minute' | 'min' | 'm' |
  'hour' | 'hr' | 'h' |
  'day' | 'd' |
  'week' | 'wk' | 'w' |
  'month' | 'b' |
  'year' | 'yr' | 'y'

export default function parse (str: string, format?: Units): number | null
