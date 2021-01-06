export function isJson(str: any) {
  try {
    return [null, JSON.parse(str)]
  } catch (err) {
    return [err]
  }
}
