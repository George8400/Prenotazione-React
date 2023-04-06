import React, { Fragment, useCallback, useMemo, useState } from 'react';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, { Calendar, CalendarProps, DayValue, Locale } from '@hassanmojab/react-modern-calendar-datepicker';
import { CalendarIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Input from '../../core/Input';
import CustomPopover from '../../core/CustomPopover';
import { Transition } from '@headlessui/react';

interface CalendarButtonProps extends CalendarProps<DayValue> {
  label?: string;
  placeholder?: string;
  locale?: 'it' | 'en';
  className?: string;
}

const CalendarButton = ({ label, value, locale = 'en', className, placeholder, ...props }: CalendarButtonProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDay, setSelectedDay] = useState<DayValue>(value);

  const formatDate = (date: DayValue) => {
    if (!date) return '';

    return date.day + '-' + date.month + '-' + date.year;
  };

  const onChangeDate = (date: DayValue) => {
    if (!date) return;
    setSelectedDay(date);
    setShowCalendar(false);
    props.onChange && props.onChange(date);
  };

  return (
    <div className={clsx('w-full', className)}>
      <label
        className={clsx('block text-xs font-normal text-gray-700 mb-2', {
          hidden: !label,
        })}
      >
        {label}
      </label>

      <Input
        readOnly
        placeholder={placeholder}
        value={formatDate(selectedDay)}
        Icon={CalendarIcon}
        className="!cursor-pointer"
        onClick={() => setShowCalendar(!showCalendar)}
      />

      <Transition
        show={showCalendar}
        as={'div'}
        enter="ease-in-out duration-500 ease-out"
        enterFrom="h-0 opacity-0 overflow-hidden"
        enterTo="h-96 opacity-100 overflow-visible"
        leave="ease-in-out duration-500 ease-out"
        leaveFrom="h-96 opacity-100 overflow-hidden"
        leaveTo="h-0 opacity-0 overflow-hidden"
      >
        <Calendar
          {...props}
          value={selectedDay}
          onChange={onChangeDate}
          calendarClassName="relative z-[1000] !w-full !max-w-full !mt-2"
          colorPrimary="#6D4A3F"
          locale={locale === 'it' ? (customLocaleIT as Locale) : 'en'}
        />
      </Transition>
    </div>
  );
};

export default CalendarButton;

const customLocaleIT: Locale = {
  // months list by order
  months: [
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre',
  ],

  // week days by order
  weekDays: [
    {
      name: 'Lunedì', // used for accessibility
      short: 'L', // displayed at the top of days' rows
      isWeekend: true, // is it a formal weekend or not?
    },
    {
      name: 'Martedì',
      short: 'M',
    },
    {
      name: 'Mercoledì',
      short: 'M',
    },
    {
      name: 'Giovedì',
      short: 'G',
    },
    {
      name: 'Venerdì',
      short: 'V',
    },
    {
      name: 'Sabato',
      short: 'S',
    },
    {
      name: 'Domenica',
      short: 'D',
      isWeekend: true,
    },
  ],

  // just play around with this number between 0 and 6
  weekStartingIndex: 0,

  // return a { year: number, month: number, day: number } object
  getToday(gregorainTodayObject) {
    return gregorainTodayObject;
  },

  // return a native JavaScript date here
  toNativeDate(date) {
    return new Date(date.year, date.month - 1, date.day);
  },

  // return a number for date's month length
  getMonthLength(date) {
    return new Date(date.year, date.month, 0).getDate();
  },

  // return a transformed digit to your locale
  transformDigit(digit) {
    return digit;
  },

  // texts in the date picker
  nextMonth: 'Prossimo Mese',
  previousMonth: 'Mese Precedente',
  openMonthSelector: 'Apri Selettore Mese',
  openYearSelector: 'Apri Selettore Anno',
  closeMonthSelector: 'Chiudi Selettore Mese',
  closeYearSelector: 'Chiudi Selettore Anno',
  defaultPlaceholder: 'Seleziona...',

  // for input range value
  from: 'da',
  to: 'a',

  // used for input value when multi dates are selected
  digitSeparator: ',',

  // if your provide -2 for example, year will be 2 digited
  yearLetterSkip: 0,

  // is your language rtl or ltr?
  isRtl: false,
};
