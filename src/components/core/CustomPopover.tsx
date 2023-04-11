import { Popover, Transition } from '@headlessui/react';
import React, { FC, Fragment } from 'react';

interface CustomPopoverProps {
  TriggerButton: React.ReactNode;
  children: React.ReactNode;
  classNameWrapper?: string;
}

const CustomPopover: FC<CustomPopoverProps> = ({ TriggerButton, children, classNameWrapper = '' }) => {
  return (
    <Popover className={'relative w-full ' + classNameWrapper}>
      <Popover.Button className={'w-full cursor-pointer rounded-md outline-primary-500'}>
        {TriggerButton}
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition duration-500 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-500 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel className="absolute inset-x-0 top-12 !z-[1000] w-full animate-fadeIn animate-duration-150">
          {children}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default CustomPopover;
