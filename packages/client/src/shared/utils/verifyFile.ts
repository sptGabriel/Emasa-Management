export const verifyFile = (file: any, acceptedFileExtensions: any) => {
  const {name} = file

  let filExtenion = name.substring(name.lastIndexOf('.') + 1)

  if (acceptedFileExtensions.includes(filExtenion)) {
    return true
  }

  return false
}
