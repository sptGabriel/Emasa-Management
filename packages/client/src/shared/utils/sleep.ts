export function sleep({fn, timeout}: {fn?: any; timeout: number}) {
  return new Promise<void>((resolve) =>
    setTimeout(() => (fn ? resolve(fn) : resolve()), timeout),
  )
}
