const unit = Object.create(null)
const m = 60000, h = m * 60, d = h * 24, y = d * 365.25

unit.año = unit.a = y
unit.mes = unit.b = y / 12
unit.semana = unit.w = d * 7
unit.día = unit.d = d
unit.hora = unit.hr = h
unit.minuto = unit.min = unit.m = m
unit.segundo = unit.sec = unit.s = 1000
unit.milisegundo = unit.ms = 1
unit['µs'] = unit['μs'] = unit.us = unit.microsegundo = 1e-3
unit.nanosegundo = unit.ns = 1e-6

export default unit
