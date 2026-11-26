'use strict'

import t from 'tape'
import parse from './index.js'
import es from './locale/es.js'
import en from './locale/en.js'
import de from './locale/de.js'
import ru from './locale/ru.js'
import fr from './locale/fr.js'
import ja from './locale/ja.js'
import zh from './locale/zh.js'
import id from './locale/id.js'

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
	t.equal(parse(' -1hr 40mins'), -1 * h - 40 * m)
	t.equal(parse('  -1h'), -1 * h)
	t.equal(parse('\t-30m'), -30 * m)
	t.equal(parse('2e3s'), 2000 * s)
	t.end()
})

t('whitespace between value and unit', t => {
	t.equal(parse('5  s'), 5 * s)
	t.equal(parse('10   m'), 10 * m)
	t.equal(parse('2\t\th'), 2 * h)
	t.end()
})

t('edge cases', t => {
	t.equal(parse('1y.2mo.5days.12hours.34sec.20ms'), 1 * y + .2 * mo + .5 * d + .12 * h + .34 * s + .20 * ms)
	t.equal(parse('-1y.2mth.5days 12hours,34sec,20ms'), -1 * y - .2 * mo - .5 * d - 12 * h - 34 * s - 20 * ms)
	t.end()
})

t('trailing decimal point with no fraction digits', t => {
	// a bare `.` right after the integer part must not swallow the unit
	// that follows it, e.g. "5. seconds" should behave like "5 seconds"
	t.equal(parse('5. seconds'), 5 * s)
	t.equal(parse('5.seconds'), 5 * s)
	t.equal(parse('5. secs'), parse('5 secs'))
	t.equal(parse('-5. secs'), -5 * s)
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

t('invalid: unit config keys', t => {
	t.equal(parse('1group'), null)
	t.equal(parse('1decimal'), null)
	t.equal(parse('1placeholder'), null)

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

t('format is matched like an input unit', t => {
	// upper-case, exactly as accepted on the input side (`parse('2MIN')`)
	t.equal(parse('2h', 'M'), 120)
	t.equal(parse('2h', 'MIN'), 120)
	t.equal(parse('2h', 'Hours'), 2)

	// plural, matching `unit.endsWith('s')` handling on the input side
	t.equal(parse('2h', 'mins'), 120)
	t.equal(parse('2h', 'hrs'), 2)
	t.equal(parse('2h', 'seconds'), 7200)

	// an unknown format still falls back to ms
	t.equal(parse('2h', 'bogus'), 7200000)

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

t('clock format', t => {
	// [h:]m:ss, last segment is seconds, as ffmpeg time duration [-][HH:]MM:SS[.m...]
	t.equal(parse('1:30:00'), 1 * h + 30 * m)
	t.equal(parse('1:30:00', 's'), 5400)
	t.equal(parse('1:30'), 1 * m + 30 * s)
	t.equal(parse('0:30'), 30 * s)
	t.equal(parse('1:00'), 1 * m)
	t.equal(parse('00:00'), 0)
	t.equal(parse('90:00'), 90 * m)
	t.equal(parse('1:30.5'), 90.5 * s)
	t.equal(parse('1:02:03.004'), h + 2 * m + 3 * s + 4 * ms)
	t.equal(parse('-1:30'), -90 * s)
	// units name the first segment, the rest descend
	t.equal(parse('1:30 h'), 1 * h + 30 * m)
	t.equal(parse('1:30min'), 1 * m + 30 * s)
	t.equal(parse('1:12 days'), 1 * d + 12 * h)
	// combined with units
	t.equal(parse('2d 1:30:00'), 2 * d + 1 * h + 30 * m)
	t.equal(parse('duration: 1:30:00'), 1 * h + 30 * m)
	t.equal(parse('running length: 1hour:20mins'), 1 * h + 20 * m)
	parse.unit = de
	t.equal(parse('1:30,5'), 90.5 * s)
	parse.unit = en
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
	parse.unit = en
	t.end()
})

t('locale plural forms', t => {
	parse.unit = de
	t.equal(parse('1 Stunde 30 Minuten', 'm'), 90)
	t.equal(parse('2 Jahre'), 2 * y)
	t.equal(parse('in 2 Jahren'), 2 * y)
	t.equal(parse('3 Monate'), 3 * mo)
	t.equal(parse('vor 3 Monaten'), 3 * mo)
	t.equal(parse('2 Wochen', 'd'), 14)
	t.equal(parse('3 Tage'), 3 * d)
	t.equal(parse('vor 3 Tagen'), 3 * d)
	t.equal(parse('2 Stunden'), 2 * h)
	t.equal(parse('10 Sekunden'), 10 * s)
	t.equal(parse('5 Millisekunden'), 5)
	t.equal(parse('5 Mikrosekunden'), 5e-3)
	t.equal(parse('5 Nanosekunden'), 5 * ns)

	parse.unit = ru
	t.equal(parse('1 час 30 минут', 'm'), 90)
	t.equal(parse('2 года'), 2 * y)
	t.equal(parse('5 лет'), 5 * y)
	t.equal(parse('2 месяца'), 2 * mo)
	t.equal(parse('5 месяцев'), 5 * mo)
	t.equal(parse('1 неделю', 'd'), 7)
	t.equal(parse('2 недели', 'd'), 14)
	t.equal(parse('5 недель', 'd'), 35)
	t.equal(parse('2 дня'), 2 * d)
	t.equal(parse('5 дней'), 5 * d)
	t.equal(parse('2 часа'), 2 * h)
	t.equal(parse('5 часов'), 5 * h)
	t.equal(parse('1 минуту'), m)
	t.equal(parse('2 минуты'), 2 * m)
	t.equal(parse('1 секунду'), s)
	t.equal(parse('2 секунды'), 2 * s)
	t.equal(parse('10 секунд'), 10 * s)
	t.equal(parse('5 миллисекунд'), 5)
	t.equal(parse('2 микросекунды'), 2e-3)
	t.equal(parse('5 наносекунд'), 5 * ns)

	parse.unit = es
	t.equal(parse('2 meses'), 2 * mo)

	parse.unit = en
	t.end()
})

t('locale counter forms', t => {
	parse.unit = ja
	t.equal(parse('3日間'), 3 * d)
	t.equal(parse('3ヶ月間'), 3 * mo)
	t.equal(parse('3か月'), 3 * mo)
	t.equal(parse('3か月間'), 3 * mo)
	t.equal(parse('3カ月'), 3 * mo)
	t.equal(parse('3カ月間'), 3 * mo)
	t.equal(parse('3ヵ月'), 3 * mo)
	t.equal(parse('3ヵ月間'), 3 * mo)
	t.equal(parse('1年3か月'), y + 3 * mo)
	t.equal(parse('1日12時間', 'h'), 36)

	parse.unit = zh
	t.equal(parse('3个月'), 3 * mo)
	t.equal(parse('1年3个月'), y + 3 * mo)
	t.equal(parse('2个星期', 'd'), 14)
	t.equal(parse('2个小时30分钟', 'm'), 150)

	parse.unit = en
	t.end()
})

t('locale short forms', t => {
	// short unit names that Intl.NumberFormat prints with unitDisplay: 'short'
	parse.unit = de
	t.equal(parse('3 Mon.'), 3 * mo)
	t.equal(parse('2 Wo.', 'd'), 14)
	t.equal(parse('3 Tg.'), 3 * d)
	t.equal(parse('1,5 Std.', 'm'), 90)
	t.equal(parse('1 Std. 30 Min.', 'm'), 90)
	t.equal(parse('10 Sek.'), 10 * s)

	parse.unit = ru
	t.equal(parse('5 л.'), 5 * y)
	t.equal(parse('3 дн.'), 3 * d)
	t.equal(parse('10 с'), 10 * s)
	t.equal(parse('1 ч 30 мин 15 с', 's'), 5415)

	parse.unit = es
	t.equal(parse('2 sem.', 'd'), 14)

	parse.unit = id
	t.equal(parse('5 md'), 5)
	t.equal(parse('5 ndtk'), 5 * ns)

	parse.unit = en
	t.end()
})

t('locale separators', t => {
	parse.unit = en
	t.equal(parse('3.14 seconds'), 3140)
	t.equal(parse('1,23,456.789 seconds'), 123456789)
	t.equal(parse('1,23,456.789s'), 123456789)
	t.equal(parse('30,000.65 seconds'), 30000650)
	// separators between single digits must all be removed
	t.equal(parse('1_2_3s'), 123000)
	t.equal(parse('1,2,3s'), 123000)

	parse.unit = de
	t.equal(parse('3,14 seconds'), 3140)
	t.equal(parse('123.456,789 seconds'), 123456789)
	t.equal(parse('30.000,65 seconds'), 30000650)
	t.equal(parse('30 000,65 seconds'), 30000650)
	t.equal(parse('30_000,65 seconds'), 30000650)
	t.equal(parse('1.2.3,5s'), 123500)
	// every component's decimal separator must be normalized, not just the first
	t.equal(parse('1,5 s 1,5 s'), 3000)
	t.equal(parse('2,5h 3,5h'), 21600000)

	// fr: no-break space, narrow no-break space (what Intl.NumberFormat('fr') prints), plain space
	parse.unit = fr
	t.equal(parse('10\u00A0000 secondes'), 10000 * 1000)
	t.equal(parse('10\u202F000 secondes'), 10000 * 1000)
	t.equal(parse('12\u202F345,5 secondes'), 12345500)
	t.equal(parse('1\u202F234\u202F567,25 ms'), 1234567.25)
	t.equal(parse('10 000 secondes'), 10000 * 1000)
	// a narrow no-break space between a number and its unit is still allowed
	t.equal(parse('5\u202Fh'), 5 * 3600000)

	parse.unit = en
	t.end()
})

t('custom locale without group/placeholder', t => {
	const unit = Object.create(null)
	unit.s = 1000
	unit.decimal = '.'
	parse.unit = unit
	t.equal(parse('1u2s'), 2000) // letters from a leaked 'undefined' must not merge digits
	parse.unit = en
	t.end()
})

t('numbers with long digit runs are not split into separate matches', t => {
	t.equal(parse('0.30000000000000004s'), 0.30000000000000004 * 1000)
	t.equal(parse('0.12345678901234567s'), 0.12345678901234567 * 1000)
	t.equal(parse('12345678901234567ms'), 12345678901234567)
	t.end()
})


t('unit guessing follows descending locale unit order', t => {
	const unit = { h: 3600000, m: 60000, s: 1000, tick: 500, ticks: 500, ms: 1, decimal: '.' }
	parse.unit = unit
	try {
		t.equal(parse('1h30'), 5400000)
		t.equal(parse('1:30'), 90000)
		t.equal(parse('1:30 h'), 5400000)
		t.equal(parse('1h30', 'm'), 90)
		t.equal(parse('1s2'), 2000)
		t.equal(parse('1tick2'), 502)
		t.equal(parse('1ms2'), 1) // no smaller unit is available
		t.equal(parse('1h30m'), 5400000) // explicit units keep their meaning
	} finally { parse.unit = en }
	t.end()
})
