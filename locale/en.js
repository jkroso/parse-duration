const unit = Object.create(null)
const m = 60000, h = m * 60, d = h * 24, y = d * 365.25

unit.year = y
unit.yr = y
unit.y = y

unit.month = y / 12
unit.b = y / 12

unit.week = d * 7
unit.wk = d * 7
unit.w = d * 7

unit.day = d
unit.d = d

unit.hour = h
unit.hr = h
unit.h = h

unit.minute = m
unit.min = m
unit.m = m

unit.second = 1000
unit.sec = 1000
unit.s = 1000

unit.millisecond = 1
unit.millisec = 1
unit.ms = 1

unit['µs'] = 1e-3
unit['μs'] = 1e-3
unit.us = 1e-3
unit.microsecond = 1e-3

unit.nanosecond = 1e-6
unit.ns = 1e-6

export default unit
