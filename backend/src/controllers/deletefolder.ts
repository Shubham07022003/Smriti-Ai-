import { Folder } from "../models/folder.model";
import { User } from "../models/User.model"

const deleteFolder = async (req: any, res: any) => {

    const { folderId } = req.params;
    const userId = req.user._id; // Assuming you have user ID from authentication middleware

    try {
        // Find the folder by ID and ensure it belongs to the authenticated user
        const folder = await Folder.findOne({ _id: folderId, userId });

        if (!folder) {
            return res.status(404).json({ message: "Folder not found or does not belong to you." });
        }

        // Delete the folder
        await Folder.deleteOne({ _id: folderId });

        res.status(200).json({ message: "Folder deleted successfully." });
    } catch (error) {
        console.error("Error deleting folder:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

export {deleteFolder}