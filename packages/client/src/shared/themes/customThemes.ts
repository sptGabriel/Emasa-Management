import {getTheme} from './getTheme'
import {horizontalGreenTheme, verticalGreenTheme} from './greenTheme'
import {horizontalLightTheme, verticalLightTheme} from './lightTheme'
import {horizontalPinkTheme, verticalPinkTheme} from './pinkTheme'
import {horizontalPurpleTheme, verticalPurpleTheme} from './purpleTheme'
import {horizontalRedTheme, verticalRedTheme} from './redTheme'

export const getCustomTheme = (
  orientation: string,
  color: string,
  type: string,
) => {
  switch (color) {
    case '#ff4000':
      if (orientation === 'horizontal') return horizontalRedTheme(type)
      return verticalRedTheme(type)
    case '#6b0ba3':
      if (orientation === 'horizontal') return horizontalPurpleTheme(type)
      return verticalPurpleTheme(type)
    case '#a100ff':
      if (orientation === 'horizontal') return horizontalPinkTheme(type)
      return verticalPinkTheme(type)
    case '#006ba6':
      return getTheme(orientation, type)
    case '#15d63f':
      if (orientation === 'horizontal') return horizontalGreenTheme(type)
      return verticalGreenTheme(type)
    default:
      localStorage.removeItem('t-col')
      if (orientation === 'horizontal') return horizontalLightTheme
      return verticalLightTheme
  }
}
