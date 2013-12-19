
var duration = /(-?\d*\.?\d+(?:e[-+]?\d+)?)\s*([a-z]*)/ig

module.exports = parse

/**
 * conversion ratios
 */

parse.ms = 1
parse.seconds =
parse.second =
parse.sec =
parse.s = parse.ms * 1000
parse.minutes =
parse.minute =
parse.min =
parse.mins =
parse.m = parse.s * 60
parse.hours =
parse.hour =
parse.hr =
parse.h = parse.m * 60
parse.days =
parse.day =
parse.d = parse.h * 24
parse.weeks =
parse.week =
parse.wk =
parse.w = parse.d * 7
parse.years =
parse.year =
parse.yr =
parse.y = parse.d * 365.25

/**
 * convert `str` to ms
 *
 * @param {String} str
 * @return {Number}
 */

function parse(str){
	var result = 0
	str.replace(duration, function(_, n, units){
		result += parseFloat(n, 10) * (parse[units] || 1)
	})
	return result
}
