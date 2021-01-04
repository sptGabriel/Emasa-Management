interface IHeader {
  userName: string
  userPosition: string
  tools: string
  toolsHover: string
}

export const DefaultNav: IHeader = {
  userName: 'blue',
  userPosition: 'red',
  tools: '98, 98, 98',
  toolsHover: '0, 108, 166',
}

export const HeaderRed: IHeader = {
  userName: 'blue',
  userPosition: 'red',
  tools: '98, 98, 98',
  toolsHover: '0, 108, 166',
}

export const getNavBarTheme = (color: string) => {
  if (color === '234, 84, 85') return HeaderRed
  return DefaultNav
}
