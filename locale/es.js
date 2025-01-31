import en from './en.js'

const unit = Object.create(en)

unit.año = unit.a = en.y
unit.mes = en.mo
unit.semana = en.w
unit.día = en.d
unit.hora = en.h
unit.minuto = en.m
unit.segundo = en.s
unit.milisegundo = en.ms
unit.microsegundo = en.us
unit.nanosegundo = en.ns

unit.group = '.'
unit.decimal = ','

export default unit
