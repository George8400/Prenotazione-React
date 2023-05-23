import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import React from 'react';

interface InputSpinnerProps {
  value?: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

const InputSpinner = ({ onChange, value, className, max = 999999, min = 0 }: InputSpinnerProps) => {
  const [inputValue, setInputValue] = React.useState(value || 0);

  const incrementValue = () => {
    if (inputValue < max) {
      setInputValue(inputValue + 1);
      onChange(inputValue + 1);
    }
  };

  const decrementValue = () => {
    if (inputValue > min) {
      setInputValue(inputValue - 1);
      onChange(inputValue - 1);
    }
  };

  return (
    <div className="flex items-start justify-between">
      <button
        type="button"
        className={`h-8 w-8 rounded-full bg-stone-300 p-1 text-center hover:bg-stone-400 active:bg-stone-500 `}
        onClick={decrementValue}
      >
        {/* <MinusIcon className="h-full w-full text-gray-800" aria-hidden="true" /> */}-
      </button>

      <input
        type="number"
        className="mx-0 my-auto w-8 border-none bg-transparent p-0 text-center text-sm outline-none"
        value={inputValue}
        readOnly
      />

      <button
        type="button"
        className={`h-8 w-8 rounded-full bg-stone-300 p-1 text-center hover:bg-stone-400 active:bg-stone-500 `}
        onClick={incrementValue}
      >
        {/* <PlusIcon className="h-full w-full text-gray-800" aria-hidden="true" /> */}+
      </button>
    </div>
  );
};

export default InputSpinner;
