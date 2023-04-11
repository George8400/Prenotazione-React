import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

export type CustomListBoxItemProps<T> = {
  value: T;
  id: string;
  label: string;
};

interface CustomListBoxProps<T> {
  items: CustomListBoxItemProps<T>[];
  defaultSelected?: CustomListBoxItemProps<T> | null;
  placeholder?: string;
  resetLabel?: string;
  classNameWrapper?: string;
  children?: (item: CustomListBoxItemProps<T>, selected: boolean, active: boolean) => JSX.Element | React.ReactNode;
  onSelect?: (item: CustomListBoxItemProps<T> | null) => void;
}

export default function CustomListbox<T>({
  items,
  defaultSelected = null,
  placeholder,
  resetLabel,
  classNameWrapper = '',
  children,
  onSelect,
}: CustomListBoxProps<T>) {
  const [selected, setSelected] = useState(defaultSelected);

  const handleChangeItem = (item: CustomListBoxItemProps<T> | null) => {
    if (onSelect) {
      onSelect(item);
    }
    setSelected(item);
  };

  return (
    <Listbox value={selected} onChange={handleChangeItem}>
      <div className={'relative h-full w-full ' + classNameWrapper}>
        <Listbox.Button className="relative flex w-full cursor-pointer items-center justify-between rounded-md bg-white px-3.5 py-3 pr-2 text-left shadow-full outline-primary-500 sm:text-sm">
          <span className={'block truncate ' + (selected ? '' : 'text-gray-400')}>
            {selected ? selected.label : placeholder}
          </span>

          <span className="pointer-events-none flex items-center gap-1 pr-2">
            <ChevronDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="absolute z-20 mt-1.5 max-h-60 w-full overflow-auto rounded-lg bg-white p-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {selected && resetLabel ? (
              <Listbox.Option
                key={'reset-button'}
                className={`relative w-full cursor-pointer select-none rounded-md py-2 pl-10 pr-4  
              text-red-600 hover:bg-red-50`}
                value={null}
              >
                {resetLabel}
              </Listbox.Option>
            ) : null}

            {items.map((item, index) => {
              return (
                <Listbox.Option
                  key={item.id}
                  className={({ active }) =>
                    `relative cursor-default select-none rounded-md py-2 pl-10 pr-4 ${
                      active ? 'bg-primary-500/20 text-primary-500' : 'text-dark'
                    }`
                  }
                  value={item}
                >
                  {({ selected, active }) =>
                    children ? (
                      <> {children(item, selected, active)} </>
                    ) : (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {item.label}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-500">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )
                  }
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
