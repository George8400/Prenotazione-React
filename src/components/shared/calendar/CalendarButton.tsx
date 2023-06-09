import { useEffect, useRef, useState } from 'react';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, CalendarProps, DayValue, Locale } from '@hassanmojab/react-modern-calendar-datepicker';
import { CalendarIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Input from '../../core/Input';
import { Transition } from '@headlessui/react';
import { utilsDate } from '../search-sidebar/utils/utils';
import { localeIT } from './utils/locales';

interface CalendarButtonProps extends CalendarProps<DayValue> {
  label?: string;
  placeholder?: string;
  locale?: 'it' | 'en';
  className?: string;
  disabled?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const CalendarButton = ({
  label,
  value,
  locale = 'en',
  disabled,
  className,
  placeholder,
  onOpen,
  onClose,
  ...props
}: CalendarButtonProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDay, setSelectedDay] = useState<DayValue>(value);

  const ref = useRef<HTMLDivElement>(null);

  const onChangeDate = (date: DayValue) => {
    if (!date) return;
    setSelectedDay(date);
    setShowCalendar(false);
    props.onChange && props.onChange(date);
  };

  useEffect(() => {
    if (showCalendar) {
      onOpen && onOpen();
    } else {
      onClose && onClose();
    }
  }, [showCalendar]);

  useEffect(() => {
    if (ref.current) {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setShowCalendar(false);
        }
      };

      document.addEventListener('mouseup', handleClickOutside);
      return () => {
        document.removeEventListener('mouseup', handleClickOutside);
      };
    }
  }, [ref]);

  return (
    <div ref={ref} className={clsx('w-full', className)}>
      <label
        className={clsx('mb-2 block text-xs font-normal text-gray-700', {
          hidden: !label,
        })}
      >
        {label}
      </label>

      <Input
        readOnly
        placeholder={placeholder}
        value={utilsDate.formatDayValueToString(selectedDay) || ''}
        disabled={disabled}
        Icon={CalendarIcon}
        className="!cursor-pointer"
        onClick={() => setShowCalendar(!showCalendar)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setShowCalendar(!showCalendar);
          }
        }}
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
          calendarClassName="relative z-[1000] !w-full !max-w-md !mx-auto !mt-2"
          colorPrimary="#6D4A3F"
          locale={locale === 'it' ? localeIT : 'en'}
        />
      </Transition>
    </div>
  );
};

export default CalendarButton;
