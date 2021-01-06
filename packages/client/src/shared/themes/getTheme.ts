import {DarkHorizontalTheme, DarkVerticalTheme} from './darkTheme'
import {LightHorizontalTheme, LightVerticalTheme} from './lightTheme'
import {SemiDarkHorizontalTheme, SemiDarkVerticalTheme} from './semiDarkTheme'

export const getTheme = (orientation: string, theme: string) => {
  switch (theme) {
    case 'light':
      if (orientation === 'horizontal') return LightHorizontalTheme
      return LightVerticalTheme
    case 'dark':
      if (orientation === 'horizontal') return DarkHorizontalTheme
      return DarkVerticalTheme
    case 'semidark':
      if (orientation === 'horizontal') return SemiDarkHorizontalTheme
      return SemiDarkVerticalTheme
    default:
      localStorage.setItem('theme-type', JSON.stringify('light'))
      if (orientation === 'horizontal') return LightHorizontalTheme
      return LightVerticalTheme
  }
}
