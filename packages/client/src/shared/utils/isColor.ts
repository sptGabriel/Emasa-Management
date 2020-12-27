export const isColor = (strColor: any) => {
  console.log(strColor, 'str cor')
  const s = new Option().style
  s.color = strColor
  return s.color !== ''
}
