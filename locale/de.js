import en from './en.js'

const unit = Object.create(en)

unit.jahr = unit.jahre = unit.jahren = unit.j = en.y
unit.monat = unit.monate = unit.monaten = unit.mon = en.mo
unit.woche = unit.wochen = unit.wo = en.w
unit.tag = unit.tage = unit.tagen = unit.tg = unit.t = en.d
unit.stunde = unit.stunden = unit.std = en.h
unit.minute = unit.minuten = en.m
unit.sekunde = unit.sekunden = unit.sek = en.s
unit.millisekunde = unit.millisekunden = en.ms
unit.mikrosekunde = unit.mikrosekunden = en.us
unit.nanosekunde = unit.nanosekunden = en.ns

unit.group = '.'
unit.decimal = ','

export default unit
