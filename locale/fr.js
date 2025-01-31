import en from './en.js'

const unit = Object.create(en)

unit.année = unit.an = unit.a = en.y
unit.mois = en.mo
unit.semaine = unit.sem = en.w
unit.jour = unit.j = en.d
unit.heure = en.h
unit.minute = en.m
unit.seconde = en.s
unit.milliseconde = en.ms
unit.microseconde = en.us
unit.nanoseconde = en.ns

unit.group = ' '
unit.decimal = ','

export default unit
