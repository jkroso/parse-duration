import en from './en.js'

const unit = Object.create(en)

unit.jahr = unit.jahre = unit.jahren = unit.j = en.y
unit.monat = unit.monate = unit.monaten = en.mo
unit.woche = unit.wochen = en.w
unit.tag = unit.tage = unit.tagen = unit.t = en.d
unit.stunde = unit.stunden = en.h
unit.minute = unit.minuten = en.m
unit.sekunde = unit.sekunden = en.s
unit.millisekunde = unit.millisekunden = en.ms
unit.mikrosekunde = unit.mikrosekunden = en.us
unit.nanosekunde = unit.nanosekunden = en.ns

unit.group = '.'
unit.decimal = ','

export default unit
