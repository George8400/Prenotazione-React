import DatePicker, {
  Calendar,
  CalendarProps,
  DatePickerProps,
  DayValue,
} from '@hassanmojab/react-modern-calendar-datepicker';
import React, { useState } from 'react';
import { localeIT } from './utils/locales';

interface CustomDatePickerProps extends CalendarProps<DayValue> {
  locale?: 'it' | 'en';
  className?: string;
}

const CustomDatePicker = ({ locale, value, className, ...props }: CustomDatePickerProps) => {
  const [selectedDay, setSelectedDay] = useState<DayValue>(value);

  const onChangeDate = (date: DayValue) => {
    if (!date) return;
    setSelectedDay(date);
    props.onChange && props.onChange(date);
  };

  return (
    <Calendar
      {...props}
      value={selectedDay}
      onChange={onChangeDate}
      calendarClassName="relative z-[1000] !w-full !max-w-md !mx-auto !mt-2"
      colorPrimary="#6D4A3F"
      locale={locale === 'it' ? localeIT : 'en'}
    />
  );
};

export default CustomDatePicker;
