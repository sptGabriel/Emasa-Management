export const isColor = (strColor: any) => {
  const s = new Option().style
  s.color = strColor
  return s.color !== ''
}
