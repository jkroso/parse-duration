import en from './en.js'

const unit = Object.create(en)

unit.jahr = unit.j = en.y
unit.monat = en.mo
unit.woche = en.w
unit.tag = unit.t = en.d
unit.stunde = en.h
unit.minute = en.m
unit.sekunde = en.s
unit.millisekunde = en.ms
unit.mikrosekunde = en.us
unit.nanosekunde = en.ns

unit.group = '.'
unit.decimal = ','

export default unit
