import { DayValue } from '@hassanmojab/react-modern-calendar-datepicker';

const formatDayValueToString = (date: DayValue) => {
  if (!date) return null;

  return date.day + '/' + date.month + '/' + date.year;
};

const formatDateToDayValue = (date: Date | null) => {
  if (!date) return null;

  const instanceOfDate = new Date(date);

  return {
    year: instanceOfDate.getFullYear(),
    month: instanceOfDate.getMonth() + 1,
    day: instanceOfDate.getDate(),
  };
};

const formatDayValueToDate = (date: DayValue) => {
  if (!date) return null;

  return new Date(date.year, date.month - 1, date.day);
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
  formatDayValueToDate,
};
