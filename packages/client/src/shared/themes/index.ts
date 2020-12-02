/* eslint-disable prettier/prettier */
type colors = {
  primary: string
  secondary: string
  background: string
  text: string
}
export type ITheme = {
  type: string
  colors: colors
}

export const lightTheme: ITheme = {
  type: 'light',
  colors: {
    primary: '#fff',
    secondary: '#2a2d34',
    background: '#FFF',
    text: '#333'
  }
}

export const darkTheme: ITheme = {
  type: 'dark',
  colors: {
    primary: '#fff',
    secondary: '#2a2d34',
    background: '#FFF',
    text: '#333'
  }
}
