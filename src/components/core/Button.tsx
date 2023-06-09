import React, { FC } from 'react';
import clsx from 'clsx';

interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  border?: 'full' | 'default';
  children?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ variant = 'primary', size = 'medium', border = 'default', children, ...props }) => {
  return (
    <button
      {...props}
      className={clsx(
        'relative border border-transparent hover:bg-opacity-95',
        props.className,
        'disabled:cursor-not-allowed disabled:opacity-50',
        {
          'w-full': !props.className,
          'bg-primary-500 text-white': variant === 'primary',
          'bg-secondary-500 text-primary-500': variant === 'secondary',
          ' !border-primary-500 bg-white text-primary-500': variant === 'outline',
          'px-3.5 py-1 text-sm': size === 'small',
          'px-6 py-1.5 text-base': size === 'medium',
          'px-8 py-2 text-lg': size === 'large',
          'rounded-full': border === 'full',
          'rounded-md': border === 'default',
        },
      )}
    >
      {children}
    </button>
  );
};

export default Button;
