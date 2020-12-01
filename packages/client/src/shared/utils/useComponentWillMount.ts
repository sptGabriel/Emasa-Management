import { useMemo } from 'react';

export const useComponentWillMount = (func: any) => {
  useMemo(func, []);
};
