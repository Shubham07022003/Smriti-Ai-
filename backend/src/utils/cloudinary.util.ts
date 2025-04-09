import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadoncloudinary = async (filePath: string) => {
    try {
        // Configure Cloudinary with your credentials
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",  // Automatically detect the resource type
            
        });
        if (!result || !result.secure_url) {
            throw new Error("Failed to upload file to Cloudinary");
        }
        fs.unlinkSync(filePath);
        return result.secure_url;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw new Error("Cloudinary upload failed");
    }
}

export { uploadoncloudinary };