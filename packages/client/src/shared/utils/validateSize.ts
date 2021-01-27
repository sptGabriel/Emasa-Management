export const ValidateSize = (file: any, size: number) => {
  let FileSize = file.size / 1024 / 1024 // in MiB
  if (FileSize > size) return false
  return true
}
