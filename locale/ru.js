import en from './en.js'

const unit = Object.create(en)

unit.год = unit.года = unit.лет = unit.г = unit.л = en.y
unit.месяц = unit.месяца = unit.месяцев = unit.мес = en.mo
unit.неделя = unit.неделю = unit.недели = unit.недель = unit.нед = en.w
unit.день = unit.дня = unit.дней = unit.дн = unit.д = en.d
unit.час = unit.часа = unit.часов = unit.ч = en.h
unit.минута = unit.минуту = unit.минуты = unit.минут = unit.мин = en.m
unit.секунда = unit.секунду = unit.секунды = unit.секунд = unit.сек = unit.с = en.s
unit.миллисекунда = unit.миллисекунду = unit.миллисекунды = unit.миллисекунд = unit.мс = en.ms
unit.микросекунда = unit.микросекунду = unit.микросекунды = unit.микросекунд = unit.мкс = en.us
unit.наносекунда = unit.наносекунду = unit.наносекунды = unit.наносекунд = unit.нс = en.ns

unit.group = ' '
unit.decimal = ','

export default unit
