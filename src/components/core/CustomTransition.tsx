import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import React, { FC, Fragment } from 'react';

interface CustomTransitionProps {
  show: boolean;
  children: React.ReactNode;
  as?: React.ExoticComponent<{
    children?: React.ReactNode;
  }>;
  leaveAnimation?: boolean;
}

const CustomTransition: FC<CustomTransitionProps> = ({ children, show, as = 'span', leaveAnimation = true }) => {
  const AS = as;

  return (
    <Transition
      show={show ?? false}
      as={Fragment}
      enter="transition ease-out duration-500"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave={clsx({ leaveAnimation: 'transition ease-in duration-300' })}
      leaveFrom={clsx({ leaveAnimation: 'transform opacity-100 scale-100' })}
      leaveTo={clsx({ leaveAnimation: 'transform opacity-0 scale-95' })}
    >
      <AS>{children}</AS>
    </Transition>
  );
};

export default CustomTransition;
