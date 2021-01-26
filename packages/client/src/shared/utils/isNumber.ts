export function isNumber(n: any) {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0)
}
