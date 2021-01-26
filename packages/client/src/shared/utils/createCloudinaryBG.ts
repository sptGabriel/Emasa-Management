/* eslint @typescript-eslint/no-var-requires: "off" */
const cloudinary = require('cloudinary-core')

const cloudinaryCore = new cloudinary.Cloudinary({
  cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
})

export const createBackgroundImage = (publicId: any) => {
  if(!publicId) return undefined
  return cloudinaryCore.url(publicId)
}
