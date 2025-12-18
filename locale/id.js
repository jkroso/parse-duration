import en from './en.js'

const unit = Object.create(en)

unit.tahun = unit.thn = unit.th = en.y
unit.bulan = unit.bln = en.mo
unit.minggu = unit.mgg = en.w
unit.hari = unit.hr = en.d
unit.jam = unit.j = en.h
unit.menit = unit.mnt = en.m
unit.detik = unit.dtk = unit.det = en.s
unit.milidetik = en.ms
unit.mikrodetik = en.us
unit.nanodetik = en.ns

unit.group = '.'
unit.decimal = ','
unit.placeholder = ' _'

export default unit