import clsx from 'clsx';
import React, { FC } from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {}

const Badge: FC<BadgeProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <span
      {...rest}
      className={clsx(
        `inline-flex h-5 w-5 items-center justify-center rounded-full border border-primary-200 bg-primary-100 text-xs font-medium text-primary-500`,
        className,
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
