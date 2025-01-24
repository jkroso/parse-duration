const unit = Object.create(null)
const m = 60000, h = m * 60, d = h * 24, y = d * 365.25

unit.年 = unit.年間 = y
unit.月 = unit.ヶ月 = y / 12
unit.週 = unit.週間 = d * 7
unit.日 = unit.d = d
unit.時間 = unit.時 = unit.h = h
unit.分 = unit.分間 = unit.m = m
unit.秒 = unit.秒間 = unit.s = 1000
unit.ミリ秒 = unit.ms = 1
unit['マイクロ秒'] = unit['μs'] = 1e-3
unit.ナノ秒 = unit.ns = 1e-6

export default unit
