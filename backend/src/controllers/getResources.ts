import { Resource } from "../models/Resources.model";
import { Folder } from "../models/folder.model";
import mongoose from 'mongoose';

// const getResources = async (req: any, res: any) => {
//     try {
//         // Change from params to query
//         const { folderId } = req.query;
        
//         if (!folderId || !mongoose.Types.ObjectId.isValid(folderId)) {
//             return res.status(400).json({ 
//                 success: false,
//                 message: "Valid folder ID is required" 
//             });
//         }

//         const userId = req.user._id;
//         if (!userId) {
//             return res.status(401).json({ 
//                 success: false,
//                 message: "Unauthorized" 
//             });
//         }

//         // Check if folder exists
//         const folder = await Folder.findOne({ _id: folderId, userId });
//         if (!folder) {
//             return res.status(404).json({ 
//                 success: false,
//                 message: "Folder not found" 
//             });
//         }

//         // Fetch resources
//         const resources = await Resource.find({ folderId, userId });

//         return res.status(200).json({
//             success: true,
//             message: resources.length ? "Resources retrieved successfully" : "No resources found in folder",
//             resources: resources,
//             count: resources.length
//         });

//     } catch (error) {
//         console.error("Error fetching resources:", error);
//         return res.status(500).json({ 
//             success: false,
//             message: "Internal server error",
//             error: error instanceof Error ? error.message : "Unknown error"
//         });
//     }
// };

// export { getResources };
//************************************* */




const getResources = async (req: any, res: any) => {
    try {
        const { folderId } = req.query;
        
        if (!folderId || !mongoose.Types.ObjectId.isValid(folderId)) {
            return res.status(400).json({ 
                success: false,
                message: "Valid folder ID is required" 
            });
        }

        // Only check for folderId initially to debug
        const resources = await Resource.find({ folderId });
        console.log("Found resources:", resources); // Add logging

        return res.status(200).json({
            success: true,
            message: resources.length ? "Resources retrieved successfully" : "No resources found in folder",
            resources,
            count: resources.length
        });

    } catch (error) {
        console.error("Error fetching resources:", error);
        return res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
};

export { getResources };