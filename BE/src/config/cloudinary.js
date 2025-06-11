import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const initCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  console.log("Cloudinary berhasil dikonfigurasi!");
  return cloudinary;
};

export default initCloudinary();