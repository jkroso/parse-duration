import en from './en.js'

const unit = Object.create(en)

unit.年 = unit.年間 = en.y
unit.月 = unit.ヶ月 = en.mo
unit.週 = unit.週間 = en.w
unit.日 = en.d
unit.時間 = unit.時 = en.h
unit.分 = unit.分間 = en.m
unit.秒 = unit.秒間 = en.s
unit.ミリ秒 = en.ms
unit.マイクロ秒 = en.us
unit.ナノ秒 = en.ns

unit.group = ','
unit.decimal = '.'

export default unit
