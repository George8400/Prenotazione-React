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
        className={clsx('mb-2 block text-xs font-normal text-gray-700', {
          hidden: !label,
        })}
      >
        {label}
      </label>
      <div
        className={clsx('relative flex w-full items-center overflow-hidden rounded-md shadow-full', props.className)}
      >
        <input
          {...props}
          className={clsx('min-w-full rounded-md px-3.5 py-3 text-sm outline-primary-500', props.className)}
        />

        {Icon ? <Icon onClick={props.onClick as any} className="absolute right-3.5 h-4 w-4 text-dark" /> : null}
      </div>
    </div>
  );
};

export default Input;
