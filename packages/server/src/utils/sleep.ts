export function sleep(fn: any, timeout: number) {
  return new Promise(resolve => setTimeout(() => resolve(fn), timeout));
}
