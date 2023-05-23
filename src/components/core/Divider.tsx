import clsx from 'clsx';

interface DividerProps {
  className?: string;
  classColor?: string;
  direction?: 'horizontal' | 'vertical';
}

const Divider = ({ className, classColor, direction = 'horizontal' }: DividerProps) => {
  return (
    <div
      className={clsx('mx-auto', {
        'bg-gray-200': !classColor,
        [classColor ?? '']: classColor,
        [className ?? '']: className,
        'h-px': direction === 'horizontal',
        'w-px': direction === 'vertical',
      })}
    />
  );
};

export default Divider;
