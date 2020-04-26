'use strict'

let t = require('tape')
let parse = require('./')

let {ns, h, b, s, ms, d, y, m} = parse

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
	t.equal(parse('1d'), 24*60*60*1000)
	t.equal(parse('1day'), 24*60*60*1000)
	t.equal(parse('1days'), 24*60*60*1000)

	t.end()
})
t('w, wk, wks, week, weeks', t => {
	t.equal(parse('1w'), 24*60*60*7*1000)
	t.equal(parse('1wk'), 24*60*60*7*1000)
	t.equal(parse('1wks'), 24*60*60*7*1000)
	t.equal(parse('1week'), 24*60*60*7*1000)
	t.equal(parse('1weeks'), 24*60*60*7*1000)

	t.end()
})
t('b, month, months', t => {
	t.equal(parse('1b'), 24*60*60*1000*365.25/12)
	t.equal(parse('1month'), 24*60*60*1000*365.25/12)
	t.equal(parse('1months'), 24*60*60*1000*365.25/12)

	t.end()
})
t('y, yr, yrs, year, years', t => {
	t.equal(parse('1y'), 24*60*60*1000*365.25)
	t.equal(parse('1yr'), 24*60*60*1000*365.25)
	t.equal(parse('1yrs'), 24*60*60*1000*365.25)
	t.equal(parse('1year'), 24*60*60*1000*365.25)
	t.equal(parse('1years'), 24*60*60*1000*365.25)

	t.end()
})

t('μs, ns', t => {
	t.equal(parse('1ns'), 1 / 1e6)
	t.equal(parse('1µs'), 1 / 1000)
	t.equal(parse('1μs'), 1 / 1000)
	t.equal(parse('1us'), 1 / 1000)

	t.end()
})

t('combined', t => {

	t.equal(parse('1hr 20mins'), 1 * h + 20 * m)

	t.equal(parse('1 hr 20 mins'), 1 * h + 20 * m)

	t.equal(parse('27,681 ns'), 27681 * ns)

	t.equal(parse('running length: 1hour:20mins'), 1* h + 20 * m)

	t.equal(parse('2hr -40mins'), 1 * h + 20 * m)

	t.equal(parse('2e3s'), 2000 * s)


	t.end()
})

t('edge cases', t => {
	t.equal(parse('1y.2b.5days.12hours.34sec.20ms'), 1 * y + .2 * b + .5 * d + .12 * h + .34 * s + .20 * ms)

	t.equal(parse('-1y.2b.5days 12hours,34sec,20ms'), -1*y + .2*b + .5*d + 12*h + 34*s + 20*ms)

	t.end()
})

t('invalid', t => {
	t.equal(parse('abc'), null)
	t.equal(parse(), null)
	t.equal(parse('I have 2 mangoes and 5 apples'), null)

	t.end()
})

t('format', t => {
	t.equal(parse('1hr 20mins', 'm'), parse('1hr 20mins') / 1000 / 60)

	t.end()
})
