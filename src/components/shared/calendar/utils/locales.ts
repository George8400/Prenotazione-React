import { Locale } from '@hassanmojab/react-modern-calendar-datepicker';

const localeIT: Locale = {
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

export { localeIT };
