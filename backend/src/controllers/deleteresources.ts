import { Resource } from "../models/Resources.model";

const deleteResource = async (req: any, res: any) => {

    const { resourceId } = req.params;
    const userId = req.user._id; // Assuming you have user ID from authentication middleware

    try {
        // Find the resource by ID and ensure it belongs to the authenticated user
        const resource = await Resource.findOne({ _id: resourceId, userId });

        if (!resource) {
            return res.status(404).json({ message: "Resource not found or does not belong to you." });
        }

        // Delete the resource
        await Resource.deleteOne({ _id: resourceId });

        res.status(200).json({ message: "Resource deleted successfully." });
    } catch (error) {
        console.error("Error deleting resource:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

export { deleteResource };