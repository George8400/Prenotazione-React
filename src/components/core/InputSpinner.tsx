import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import React from 'react';

interface InputSpinnerProps {
  value?: number;
  min?: number;
  max?: number;
  className?: string;
  disabledIncrement?: boolean;
  disabledDecrement?: boolean;
  onChange: (value: number) => void;
}

const InputSpinner = ({
  onChange,
  value,
  className,
  max = 999999,
  disabledDecrement,
  disabledIncrement,
  min = 0,
}: InputSpinnerProps) => {
  const [inputValue, setInputValue] = React.useState(value || 0);

  const [disabledIncrementValue, setDisabledIncrementValue] = React.useState(false);
  const [disabledDecrementValue, setDisabledDecrementValue] = React.useState(false);

  React.useEffect(() => {
    if (inputValue === max) {
      setDisabledIncrementValue(true);
    } else {
      setDisabledIncrementValue(false);
    }
  }, [inputValue, max]);

  React.useEffect(() => {
    if (inputValue === min) {
      setDisabledDecrementValue(true);
    } else {
      setDisabledDecrementValue(false);
    }
  }, [inputValue, min]);

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
        disabled={disabledDecrementValue || disabledDecrement}
        className={`h-8 w-8 rounded-full bg-primary-500 p-1 text-center text-white hover:enabled:bg-primary-400 active:enabled:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50 `}
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
        disabled={disabledIncrementValue || disabledIncrement}
        className={`h-8 w-8 rounded-full bg-primary-500 p-1 text-center text-white hover:enabled:bg-primary-400 active:enabled:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50`}
        onClick={incrementValue}
      >
        {/* <PlusIcon className="h-full w-full text-gray-800" aria-hidden="true" /> */}+
      </button>
    </div>
  );
};

export default InputSpinner;
