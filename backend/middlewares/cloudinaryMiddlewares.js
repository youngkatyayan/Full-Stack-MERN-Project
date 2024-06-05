import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
// import { upload } from "../routes/userRegis.js";
dotenv.config();


cloudinary.config({ 
  cloud_name: 'dciebjpeq', 
  api_key: '954626436695326', 
  api_secret: 'k_xSctKAAXwULfc2sglWUKVQVDc' 
});
console.log("cloudinary config",cloudinary.config())

export const uploadFile = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto"
    });
    console.log("File uploaded successfully:", result.url);
    return result;
  } catch (error) {
    console.error("Error uploading file:", error);
    fs.unlinkSync(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully.");
      }
    });
  }
};

