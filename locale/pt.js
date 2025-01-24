const unit = Object.create(null)
const m = 60000, h = m * 60, d = h * 24, y = d * 365.25

unit.ano = unit.a = y
unit.mês = unit.mes = y / 12
unit.semana = unit.sem = d * 7
unit.dia = unit.d = d
unit.hora = unit.h = h
unit.minuto = unit.min = unit.m = m
unit.segundo = unit.seg = unit.s = 1000
unit.milissegundo = unit.ms = 1
unit['µs'] = unit['μs'] = unit.microssegundo = 1e-3
unit.nanossegundo = unit.ns = 1e-6

export default unit
