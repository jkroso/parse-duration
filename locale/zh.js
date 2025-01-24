const unit = Object.create(null)
const m = 60000, h = m * 60, d = h * 24, y = d * 365.25

unit.年 = unit.y = y
unit.月 = y / 12
unit.周 = unit.星期 = d * 7
unit.天 = unit.日 = unit.d = d
unit.小时 = unit.时 = unit.h = h
unit.分钟 = unit.分 = unit.m = m
unit.秒 = unit.秒钟 = unit.s = 1000
unit.毫秒 = unit.ms = 1
unit['微秒'] = unit['μs'] = 1e-3
unit.纳秒 = unit.ns = 1e-6

export default unit
