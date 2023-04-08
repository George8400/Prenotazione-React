import { UserIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import React, { useMemo } from 'react';

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  Icon?: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
  label?: string;
  classNameWrapper?: string;
}

const Input = ({ Icon, label, classNameWrapper = '', ...props }: InputProps) => {
  return (
    <div className={'w-full ' + classNameWrapper}>
      <label
        className={clsx('block text-xs font-normal text-gray-700 mb-2', {
          hidden: !label,
        })}
      >
        {label}
      </label>
      <div
        className={clsx('relative shadow-full rounded-md overflow-hidden flex items-center w-full', props.className)}
      >
        <input
          {...props}
          className={clsx('min-w-full rounded-md outline-primary-500 py-3 px-3.5 text-sm', props.className)}
        />

        {Icon ? <Icon onClick={props.onClick as any} className="absolute right-3.5 w-4 h-4 text-dark" /> : null}
      </div>
    </div>
  );
};

export default Input;
