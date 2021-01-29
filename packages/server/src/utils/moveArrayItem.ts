interface moveArray {
  array: any[]
  fromIndex: number
  toIndex: number
}
export function moveArrayItem({array, fromIndex, toIndex}: moveArray) {
  const arr = [...array]
  arr.splice(toIndex, 0, ...arr.splice(fromIndex, 1))
  return arr
}