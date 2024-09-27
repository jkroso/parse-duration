// ./index.d.ts

declare namespace parse {
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
}

type Parse = {
  (input: string, format?: parse.Units): number | null;
  [key: string]: number;
} & {
  default: Parse
}

declare const parse: Parse;

export = parse;
