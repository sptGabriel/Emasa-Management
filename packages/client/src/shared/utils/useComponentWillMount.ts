import { useMemo } from 'react'

export const useComponentWillMount = (func: any): void => {
  useMemo(func, [])
}
