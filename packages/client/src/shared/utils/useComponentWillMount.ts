/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMemo } from "react";

export const useComponentWillMount = (func: any) => {
  useMemo(func, []);
};
