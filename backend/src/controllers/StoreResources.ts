import { Resource } from "../models/Resources.model";
import { Folder } from "../models/folder.model";
import { User } from "../models/User.model";
import { uploadoncloudinary } from "../utils/cloudinary.util";
import fs from 'fs';
import path from 'path';

const StoreResources = async (req: any, res: any) => {
    try {
        console.log(req.body);
        
        const { type, title, folderId ,url} = req.body ;

        if (!type || !title || !folderId || !url) {
            return res.status(400).json({ message: "Type, title, and folder ID are required" });
        }

        const userId = req.user._id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const folder = await Folder.findOne({ _id: folderId, userId });
        if (!folder) {
            return res.status(404).json({ message: "Folder not found" });
        }

       
      
        if (type === 'youtube') {
            

            const resource = new Resource({
                type,
                title,
                url,
                folderId,
                userId
            });

            await resource.save();
            return res.status(201).json({ message: "YouTube resource stored successfully", resource });
        }

        return res.status(400).json({ message: "Unsupported resource type" });

    } catch (error) {
        console.error("Error storing resource:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export { StoreResources };