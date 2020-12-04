/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
import { useState, useEffect } from 'react'
import { darkTheme, lightTheme, ITheme } from '../themes/index'

export interface IUseAppTheme {
  theme: ITheme
  setTheme({ setTheme, ...theme }: any): void
}
export const useAppTheme = (
  defaultTheme: ITheme = lightTheme
): IUseAppTheme => {
  function getInitialTheme(): ITheme {
    const savedTheme = localStorage.getItem('theme')
    if (
      savedTheme &&
      (JSON.parse(savedTheme) === 'dark' || JSON.parse(savedTheme) === 'light')
    ) {
      return JSON.parse(savedTheme) === 'dark' ? darkTheme : defaultTheme
    }
    return defaultTheme
  }
  const [theme, _setTheme] = useState(getInitialTheme)
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme.type))
  }, [theme])

  return {
    theme,
    setTheme: ({ setTheme, ...theme }: any) => {
      if (theme.type === 'dark') {
        return _setTheme(darkTheme)
      }
      return _setTheme(lightTheme)
    }
  }
}
