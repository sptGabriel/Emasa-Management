export const generateKey = (pre: any) => {
  return `${pre}_${new Date().getTime()}`
}
