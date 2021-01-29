export function formatAcccess(date: number) {
  const differenceInMilliSeconds = new Date().getTime() - date
  let difference: any = differenceInMilliSeconds / (1000 * 60)
  if (difference > 1440) {
    difference = new Date(date).toLocaleDateString('pt-br', {
      month: 'long',
      year: 'numeric',
      day: 'numeric',
    })
  }
  const currentDay = !(typeof difference === 'string')
    ? Math.floor(difference)
    : undefined
  return typeof difference === 'string'
    ? difference
    : `há ${Math.floor(difference)}`
}
