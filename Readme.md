
# parse-duration

  convert a human readable duration to ms

## Installation

With your favourite package manager:

- [packin](//github.com/jkroso/packin): `packin add parse-duration`
- [component](//github.com/component/component#installing-packages): `component install jkroso/parse-duration`
- [npm](//npmjs.org/doc/cli/npm-install.html): `npm install parse-duration`

then in your app:

```js
var parse = require('parse-duration')
```

## API

### parse(str)

  convert `str` to ms

```js
var ms = parse('1ms') // => 1
var s = parse('1s')   // => ms * 1000
var m = parse('1m')   // => s * 60
var h = parse('1h')   // => m * 60
var d = parse('1d')   // => h * 24
var w = parse('1w')   // => d * 7
var y = parse('1y')   // => d * 365.25
```

It can also handle basic compound expressions 

```js
parse('1hr 20mins') // => h + 20 * m
```

whitespace

```js
parse('1 hr 20 mins') // => h + 20 * m
```

And most other types of noise

```js
parse('running length: 1hour:20mins') // => h + 20 * m
```

You can even use negatives

```js
parse('2hr -40mins') // => h + 20 * m
```

And exponents

```js
parse('2e3s') // => 2000 * s
```

Available unit types are:

- ms
- s
- sec
- second
- seconds
- m
- mins
- min
- minute
- minutes
- h
- hr
- hour
- hours
- d
- day
- days
- y
- yr
- year
- years

And its easy to add more
