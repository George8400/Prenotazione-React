import React, { FC } from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  border?: 'full' | 'default';
  children?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  border = 'default',
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx('w-full', props.className, {
        'bg-primary-500 text-white': variant === 'primary',
        'bg-secondary-500 text-primary-500': variant === 'secondary',
        'text-sm px-3.5 py-1': size === 'small',
        'text-base px-6 py-1.5': size === 'medium',
        'text-lg px-8 py-2': size === 'large',

        'rounded-full': border === 'full',
        'rounded-md': border === 'default',
      })}
    >
      {children}
    </button>
  );
};

export default Button;
