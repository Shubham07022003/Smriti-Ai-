import { Request, Response } from "express";
import { Resource } from "../models/Resources.model";
import mongoose from 'mongoose';

const getResourceById = async (req: Request, res: Response) => {
    try {
        const { resourceId } = req.query;

        // Validate resourceId
        if (!resourceId || !mongoose.Types.ObjectId.isValid(resourceId as string)) {
            return res.status(400).json({
                success: false,
                message: "Valid resource ID is required"
            });
        }

        // Find resource by ID
        const resource = await Resource.findById(resourceId);

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: "Resource not found"
            });
        }

        // Return the found resource
        return res.status(200).json({
            success: true,
            message: "Resource retrieved successfully",
            resource
        });

    } catch (error) {
        console.error("Error fetching resource:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
};

export { getResourceById };