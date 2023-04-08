import clsx from 'clsx';
import React, { DetailedHTMLProps, FC, HTMLAttributes, forwardRef } from 'react';

interface WrapperCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
}

const WrapperCard = forwardRef<HTMLDivElement, WrapperCardProps>((props, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={clsx(
        'bg-white w-full rounded-md shadow-full px-3 py-6 ease-in-out duration-300 h-auto ',
        props.className,
      )}
    >
      {props.children}
    </div>
  );
});

export default WrapperCard;
