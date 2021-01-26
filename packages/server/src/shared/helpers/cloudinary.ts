import dotenv from 'dotenv'
import cloudinary from 'cloudinary'
dotenv.config()

const cloudConfig = cloudinary.v2

cloudConfig.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
})

export default cloudConfig;

