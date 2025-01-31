import en from './en.js'

const unit = Object.create(en)

unit.год = unit.г = en.y
unit.месяц = unit.мес = en.mo
unit.неделя = unit.нед = en.w
unit.день = unit.д = en.d
unit.час = unit.ч = en.h
unit.минута = unit.мин = en.m
unit.секунда = unit.сек = en.s
unit.миллисекунда = unit.мс = en.ms
unit.микросекунда = unit.мкс = en.us
unit.наносекунда = unit.нс = en.ns

unit.group = ' '
unit.decimal = ','

export default unit
