interface IHeader {
  color: string
  svg: string
  hoverSvg: string
  text: string
}

export const DefaultNav: IHeader = {
  color: '#fff',
  svg: '#626262',
  hoverSvg: '#0079db',
  text: '#626262',
}

export const HeaderRed: IHeader = {
  color: '234, 84, 85',
  svg: '#fff',
  hoverSvg: '#fff',
  text: '#fff',
}

export const getNavBarTheme = (color: string) => {
  if (color === '234, 84, 85') return HeaderRed
  return DefaultNav
}
