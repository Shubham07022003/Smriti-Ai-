
import{Folder} from '../models/folder.model'

const createFolder = async (req: any, res: any) => {

    try{
        const { title, description } = req.body;
        if(!title) {
            return res.status(400).json({ message: "Title is required" });
        }
        if(!description) {  
            return res.status(400).json({ message: "Description is required" });
        }
        
        const userId = req.user._id; 
        if(!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Create a new folder
        const newFolder = new Folder({
            title,
            description,
            userId,
        });

        await newFolder.save();

        res.status(201).json({ message: "Folder created successfully", folder: newFolder });

    }
    catch (error) {
        console.error("Error creating folder:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export {createFolder}