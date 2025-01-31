import en from './en.js'

const unit = Object.create(en)

unit.年 = en.y
unit.月 = en.mo
unit.周 = unit.星期 = en.w
unit.天 = unit.日 = en.d
unit.小时 = unit.时 = en.h
unit.分钟 = unit.分 = en.m
unit.秒 = unit.秒钟 = en.s
unit.毫秒 = en.ms
unit.微秒 = en.us
unit.纳秒 = en.ns

unit.group = ','
unit.decimal = '.'

export default unit
