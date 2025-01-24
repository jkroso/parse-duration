const unit = Object.create(null)
const m = 60000, h = m * 60, d = h * 24, y = d * 365.25

unit.год = unit.г = unit.y = y
unit.месяц = unit.мес = unit.m = y / 12
unit.неделя = unit.нед = unit.w = d * 7
unit.день = unit.д = unit.d = d
unit.час = unit.ч = unit.h = h
unit.минута = unit.мин = unit.m = m
unit.секунда = unit.сек = unit.с = unit.s = 1000
unit.миллисекунда = unit.мс = unit.ms = 1
unit['микросекунда'] = unit['мкс'] = unit['μs'] = unit.us = 1e-3
unit.наносекунда = unit.нс = unit.ns = 1e-6

export default unit
