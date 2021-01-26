/* eslint-disable react-hooks/exhaustive-deps */
import {useMemo} from 'react'

export const useComponentWillMount = (func: any): void => {
  useMemo(func, [])
}
