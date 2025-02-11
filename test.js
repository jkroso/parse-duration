'use strict'

import t from 'tape'
import parse from './index.js'
import es from './locale/es.js'
import en from './locale/en.js'
import de from './locale/de.js'

let { ns, h, mo, s, ms, d, y, m } = parse.unit

t('ms, millisecond, milliseconds', t => {
	t.equal(parse('100ms'), 100)
	t.equal(parse('10millisecond'), 10)
	t.equal(parse('20 milliseconds'), 20)

	t.end()
})
t('s, sec, secs, second, seconds', t => {
	t.equal(parse('2s'), 2000)
	t.equal(parse('.5sec'), 500)
	t.equal(parse('+0. secs'), 0)
	t.equal(parse('-.2 second'), -200)
	t.equal(parse('+1e-2seconds'), 10)

	t.end()
})
t('m, min, mins, minute, minutes', t => {
	t.equal(parse('.25m'), 15000)
	t.equal(parse('1min'), 60000)
	t.equal(parse('1 mins'), 60000)
	t.equal(parse('1 minute'), 60000)
	t.equal(parse('10 minutes'), 600000)

	t.end()
})
t('h, hr, hrs, hour, hours', t => {
	t.equal(parse('.5h'), 1800000)
	t.equal(parse('.5hr'), 1800000)
	t.equal(parse('.5hrs'), 1800000)
	t.equal(parse('.5hour'), 1800000)
	t.equal(parse('.5hours'), 1800000)

	t.end()
})
t('d, day, days', t => {
	t.equal(parse('1d'), 24 * 60 * 60 * 1000)
	t.equal(parse('1day'), 24 * 60 * 60 * 1000)
	t.equal(parse('1days'), 24 * 60 * 60 * 1000)

	t.end()
})
t('w, wk, wks, week, weeks', t => {
	t.equal(parse('1w'), 24 * 60 * 60 * 7 * 1000)
	t.equal(parse('1wk'), 24 * 60 * 60 * 7 * 1000)
	t.equal(parse('1wks'), 24 * 60 * 60 * 7 * 1000)
	t.equal(parse('1week'), 24 * 60 * 60 * 7 * 1000)
	t.equal(parse('1weeks'), 24 * 60 * 60 * 7 * 1000)

	t.end()
})
t('mth, month, months', t => {
	t.equal(parse('1mth'), 24 * 60 * 60 * 1000 * 365.25 / 12)
	t.equal(parse('1mo'), 24 * 60 * 60 * 1000 * 365.25 / 12)
	t.equal(parse('1month'), 24 * 60 * 60 * 1000 * 365.25 / 12)
	t.equal(parse('1months'), 24 * 60 * 60 * 1000 * 365.25 / 12)

	t.end()
})
t('y, yr, yrs, year, years', t => {
	t.equal(parse('1y'), 24 * 60 * 60 * 1000 * 365.25)
	t.equal(parse('1yr'), 24 * 60 * 60 * 1000 * 365.25)
	t.equal(parse('1yrs'), 24 * 60 * 60 * 1000 * 365.25)
	t.equal(parse('1year'), 24 * 60 * 60 * 1000 * 365.25)
	t.equal(parse('1years'), 24 * 60 * 60 * 1000 * 365.25)

	t.end()
})

t('μs, ns, extend units', t => {
	t.equal(parse('1ns'), 1 / 1e6)
	t.equal(parse('1µs'), 1 / 1000)
	t.equal(parse('1us'), 1 / 1000)

	// not standard µs
	parse.unit.μs = parse.unit.µs
	t.equal(parse('1μs'), 1 / 1000)

	t.end()
})

t('combined', t => {
	t.equal(parse('01h20m00s'), 1 * h + 20 * m)
	t.equal(parse('1hr 20mins'), 1 * h + 20 * m)
	t.equal(parse('1 hr 20 mins'), 1 * h + 20 * m)
	t.equal(parse('27,681 ns'), 27681 * ns)
	t.equal(parse('27_681 ns'), 27681 * ns)
	t.equal(parse('running length: 1hour:20mins'), 1 * h + 20 * m)
	t.equal(parse('2hr -40mins'), 2 * h + 40 * m)
	t.equal(parse('-1hr 40mins'), -1 * h - 40 * m)
	t.equal(parse('2e3s'), 2000 * s)
	t.end()
})

t('edge cases', t => {
	t.equal(parse('1y.2mo.5days.12hours.34sec.20ms'), 1 * y + .2 * mo + .5 * d + .12 * h + .34 * s + .20 * ms)
	t.equal(parse('-1y.2mth.5days 12hours,34sec,20ms'), -1 * y - .2 * mo - .5 * d - 12 * h - 34 * s - 20 * ms)
	t.end()
})

t('invalid', t => {
	t.equal(parse('abc'), null)
	t.equal(parse(), null)
	t.equal(parse('I have 2 mangoes and 5 apples'), null)
	t.end()
})

t('invalid: prototype names', t => {
	t.equal(parse('2call 3apply'), null)
	t.equal(parse('1arguments'), null)
	t.equal(parse('1arguments'), null)
	t.equal(parse('1constructor'), null)
	t.equal(parse('1call'), null)
	t.equal(parse('1name'), null)

	t.end()
})

t('no-units', t => {
	t.equal(parse(1), 1)
	t.equal(parse(`1`), 1)
	t.equal(parse(`20`), 20)
	t.end()
})

t('format', t => {
	t.equal(parse('1hr 20mins', 'm'), parse('1hr 20mins') / 1000 / 60)
	t.equal(parse('10 seconds', 's'), 10)
	t.equal(parse('10s', 'second'), 10)

	t.end()
})

t('unicode support', t => {
	parse.unit['сек'] = parse.unit['s'] // ru seconds
	t.equal(parse('5сек'), 5000)
	t.end()
})

t('unit guessing', t => {
	t.equal(parse('2m30'), 150000)
	t.equal(parse('3d 1h 15'), 3 * d + h + 15 * m)
	t.end()
})

t('upper-case characters', t => {
	t.equal(parse('1 MINUTE'), 60000)
	t.equal(parse('1MS'), 1)
	t.end()
})

t('locales', t => {
	parse.unit = es
	t.equal(parse('1 hora 20 minutos', 'm'), 80)
	t.end()
})

t('locale separators', t => {
	parse.unit = en
	t.equal(parse('3.14 seconds'), 3140)
	t.equal(parse('1,23,456.789 seconds'), 123456789)
	t.equal(parse('1,23,456.789s'), 123456789)
	t.equal(parse('30,000.65 seconds'), 30000650)

	parse.unit = de
	t.equal(parse('3,14 seconds'), 3140)
	t.equal(parse('123.456,789 seconds'), 123456789)
	t.equal(parse('30.000,65 seconds'), 30000650)
	t.equal(parse('30 000,65 seconds'), 30000650)
	t.equal(parse('30_000,65 seconds'), 30000650)
	t.end()
})
