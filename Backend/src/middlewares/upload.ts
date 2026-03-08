import multer from "multer";
import cloudinary from "../config/cloudinary";
import streamifier from "streamifier";

export const uploadStream = (buffer: Buffer) => {
  return new Promise<any>((resolve, reject) => {

    const stream = cloudinary.uploader.upload_stream(
      { folder: "Chat app" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);

  });
};


const storage = multer.memoryStorage();
const upload = multer({
  storage
});

export default upload;