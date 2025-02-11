
# parse-duration [![Test](https://github.com/jkroso/parse-duration/actions/workflows/test.yml/badge.svg)](https://github.com/jkroso/parse-duration/actions/workflows/test.yml)

Convert a human readable duration to ms.

[![NPM](https://nodei.co/npm/parse-duration.png?mini=true)](https://npmjs.org/package/parse-duration)

## Usage

```js
import parse from 'parse-duration'

// parse different time units
let ns = parse('1ns')       // => 1 / 1e6
let μs = parse('1μs')       // => 1 / 1000
let ms = parse('1ms')       // => 1
let s = parse('1s')         // => ms * 1000
let m = parse('1m')         // => s * 60
let h = parse('1h')         // => m * 60
let d = parse('1d')         // => h * 24
let w = parse('1w')         // => d * 7
let mo = parse('1mo')       // => y / 12
let y = parse('1y')         // => d * 365.25

// compound expressions
parse('1hr 20mins')         // => 1 * h + 20 * m
parse('1 hr 20 mins')       // => 1 * h + 20 * m

// youtube format
parse('1h20m0s')            // => 1 * h + 20 * m

// comma seperated numbers
parse('27,681 ns')          // => 27681 * ns

// noisy input
parse('duration: 1h:20min') // => 1 * h + 20 * m

// negatives
parse('-1hr 40mins')        // => -1 * h - 40 * m

// exponents
parse('2e3s')               // => 2000 * s

// custom output format
parse('1hr 20mins', 'm')    // => 80

// add units
parse.unit['μs'] = parse.unit.microsecond
parse('5μs')                // => 0.005
```

## Locales

Switch the default en locale to another language ([see /locale](/locale)).

```js
import es from 'parse-duration/locale/es.js'
import parse from 'parse-duration'

parse.unit = es

parse('1 hora 20 minutos', 'm') // 80
```


## Safety

In sensitive APIs make sure input string is reasonably short (under 100 characters).



<p align="center"><a href="https://github.com/krishnized/license">ॐ</a></p>
