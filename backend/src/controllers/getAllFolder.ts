import { Folder } from "../models/folder.model";

const getAllFolders = async (req: any, res: any) => {

    try {

    const userId = req.user._id; 
    console.log("userId",userId);
    
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const folders = await Folder.find({ userId });
    // if (!folders || folders.length === 0) {
    //     return res.status(404).json({ message: "No folders found for this user" });
    // }
    return res.status(200).json({ message: "Folders fetched successfully", folders });
}
    catch (error) {
        console.error("Error fetching folders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export { getAllFolders };