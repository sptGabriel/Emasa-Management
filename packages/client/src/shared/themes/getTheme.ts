import {horizontalDarkTheme, verticalDarkTheme} from './darkTheme'
import {horizontalLightTheme, verticalLightTheme} from './lightTheme'
import {horizontalSemiDarkTheme, verticalSemiDarkTheme} from './semiDarkTheme'

export const getTheme = (orientation: string, theme: string) => {
  switch (theme) {
    case 'light':
      if (orientation === 'horizontal') return horizontalLightTheme
      return verticalLightTheme
    case 'dark':
      if (orientation === 'horizontal') return horizontalDarkTheme
      return verticalDarkTheme
    case 'semidark':
      if (orientation === 'horizontal') return horizontalSemiDarkTheme
      return verticalSemiDarkTheme
    default:
      localStorage.setItem('theme-type', JSON.stringify('light'))
      if (orientation === 'horizontal') return horizontalLightTheme
      return verticalLightTheme
  }
}
