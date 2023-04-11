import { DayValue } from '@hassanmojab/react-modern-calendar-datepicker';

const formatDayValueToString = (date: DayValue) => {
  if (!date) return null;

  return date.day + '/' + date.month + '/' + date.year;
};

const formatDateToDayValue = (date: Date) => {
  if (!date) return null;

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
};

const formatStringToDayValue = (date: string) => {
  if (!date) return null;

  const [day, month, year] = date.split('/');

  return {
    year: parseInt(year),
    month: parseInt(month),
    day: parseInt(day),
  } as DayValue;
};

export const utilsDate = {
  formatDayValueToString,
  formatDateToDayValue,
  formatStringToDayValue,
};
