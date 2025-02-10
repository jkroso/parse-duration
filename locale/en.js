const unit = Object.create(null)
const m = 60000, h = m * 60, d = h * 24, y = d * 365.25

unit.year = unit.yr = unit.y = y
unit.month = unit.mo = unit.mth = y / 12
unit.week = unit.wk = unit.w = d * 7
unit.day = unit.d = d
unit.hour = unit.hr = unit.h = h
unit.minute = unit.min = unit.m = m
unit.second = unit.sec = unit.s = 1000
unit.millisecond = unit.millisec = unit.ms = 1
unit.microsecond = unit.microsec =  unit.us = unit.µs = 1e-3
unit.nanosecond = unit.nanosec = unit.ns = 1e-6

unit.group = ','
unit.decimal = '.'
unit.placeholder = ' _'

export default unit
