import { BreakPointHooks, breakpointsTailwind } from '@react-hooks-library/core';
import React from 'react';

const { useGreater } = BreakPointHooks(breakpointsTailwind);

const useBreakPoint = () => {
  const greaterThanSm = useGreater('sm');
  const greaterThanMd = useGreater('md');
  const greaterThanLg = useGreater('lg');
  const greaterThanXl = useGreater('xl');
  const greaterThan2Xl = useGreater('2xl');

  return {
    greaterThanSm,
    greaterThanMd,
    greaterThanLg,
    greaterThanXl,
    greaterThan2Xl,
  };
};

export default useBreakPoint;
