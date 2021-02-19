export const monthShortNames = [
  'Jan',
  'Fev',
  'Mar',
  'Abril',
  'Maio',
  'Jun',
  'Jul',
  'Agos',
  'Set',
  'Out',
  'Nov',
  'Dez',
]

export function shortDateFormat(d: any, additional?: number) {
  let t = new Date(d)
  if (additional) t.setDate(t.getDate() + additional)
  const shortName = monthShortNames[t.getMonth()]
  return additional
    ? `${t.getDate()} ${shortName}`
    : `${t.getDate()} ${shortName}`
}
