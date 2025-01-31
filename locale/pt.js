import en from './en.js'

const unit = Object.create(en)

unit.ano = unit.a = en.y
unit.mês = unit.mes = en.mo
unit.semana = unit.sem = en.w
unit.dia = en.d
unit.hora = en.h
unit.minuto = en.m
unit.segundo = unit.seg = en.s
unit.milissegundo = en.ms
unit.microssegundo = en.us
unit.nanossegundo = en.ns

unit.group = '.'
unit.decimal = ','

export default unit
