export function formatAcccess(date: number) {
  const differenceInMilliSeconds = new Date().getTime() - date
  let difference: any = differenceInMilliSeconds / (1000 * 60 * 60)
  if (difference >= 24) {
    difference = new Date(date).toLocaleDateString('pt-br', {
      month: 'long',
      year: 'numeric',
      day: 'numeric',
    })
  }
  return typeof difference === 'string'
    ? difference
    : difference < 1
    ? `há ${Math.floor(difference * 60)} minutos`
    : `há ${Math.floor(difference)} ${
        Math.floor(difference) === 1 ? 'hora' : 'horas'
      }`
}
