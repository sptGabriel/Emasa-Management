export function ensure<T>(argument: T | undefined | null): any {
  if (argument === undefined || argument === null) return false
  return argument
}
