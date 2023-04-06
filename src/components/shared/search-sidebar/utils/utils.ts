import { DayValue } from '@hassanmojab/react-modern-calendar-datepicker';
import moment from 'moment';

export const formatDate = (date: DayValue) => {
  if (!date) return null;

  return moment(date.day + '-' + date.month + '-' + date.year, 'DD-MM-YYYY').format('DD-MM-YYYY');
};
