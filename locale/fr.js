const unit = Object.create(null)
const m = 60000, h = m * 60, d = h * 24, y = d * 365.25

unit.année = unit.an = unit.a = y
unit.mois = unit.mo = y / 12
unit.semaine = unit.sem = d * 7
unit.jour = unit.j = d
unit.heure = unit.h = h
unit.minute = unit.min = unit.m = m
unit.seconde = unit.sec = unit.s = 1000
unit.milliseconde = unit.ms = 1
unit['µs'] = unit['μs'] = unit.microseconde = 1e-3
unit.nanoseconde = unit.ns = 1e-6

export default unit
