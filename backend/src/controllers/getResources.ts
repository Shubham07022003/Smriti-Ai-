import { Resource } from "../models/Resources.model";

const getResources = async (req: any, res: any) => {
    try{
        const { folderId } = req.params;
        if (!folderId) {
            return res.status(400).json({ message: "Folder ID is required" });
        }

        const userId = req.user._id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Fetch resources for the specified folder
        const resources = await Resource.find({ folderId, userId });
        if (!resources || resources.length === 0) {
            return res.status(404).json({ message: "No resources found for this folder" });
        }
        return res.status(200).json({ message: "Resources fetched successfully", resources });
    }
    catch (error) {
        console.error("Error fetching resources:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export { getResources };