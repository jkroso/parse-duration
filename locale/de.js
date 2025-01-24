const unit = Object.create(null)
const m = 60000, h = m * 60, d = h * 24, y = d * 365.25

unit.Jahr = unit.j = y
unit.Monat = unit.mon = y / 12
unit.Woche = unit.wo = d * 7
unit.Tag = unit.t = d
unit.Stunde = unit.std = unit.h = h
unit.Minute = unit.min = unit.m = m
unit.Sekunde = unit.sek = unit.s = 1000
unit.Millisekunde = unit.ms = 1
unit['µs'] = unit['μs'] = unit.Mikrosekunde = 1e-3
unit.Nanosekunde = unit.ns = 1e-6

export default unit
