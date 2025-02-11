type Units = {
  y: 31557600000
  mo: 2629800000
  w: 604800000
  d: 86400000
  h: 3600000
  m: 60000
  s: 1000
  ms: 1
  us: 1e-3
  ns: 1e-6
  [key: string]: number;
} & {
  group: string;
  decimal: string;
}
declare module './locale/*.js' {
  const unit: Units;
  export default unit;
}

declare const durationRE: RegExp;

declare namespace parse {
  let unit: Units;
}

/**
 * Convert a string to milliseconds.
 *
 * @param {string} str - The string to parse.
 * @param {string} format - The format to use for conversion (default is 'ms').
 * @returns {number} - The parsed duration in milliseconds.
 */
declare function parse(str?: string, format?: string): number | null;

export default parse;
