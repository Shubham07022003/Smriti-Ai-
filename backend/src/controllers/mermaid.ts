import { Request, Response } from "express";
import { Resource } from "../models/Resources.model";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { YoutubeTranscript } from 'youtube-transcript';
import dotenv from 'dotenv'
// Configure dotenv
dotenv.config();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

async function generateSummary(content: string): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        
        const prompt = `generate mermaid markdown for mermaid.js
        
        
        Content: ${content}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error generating AI summary:", error);
        throw new Error("Failed to generate summary");
    }
}

async function getYoutubeTranscript(url: string): Promise<string> {
    try {
        const transcript = await YoutubeTranscript.fetchTranscript(url);
        return transcript.map(item => item.text).join(' ');
    } catch (error) {
        console.error("Error fetching transcript:", error);
        throw new Error("Failed to fetch YouTube transcript");
    }
}


const updateResourceSummary = async (req: Request, res: Response) => {
    try {
        const { folderId, resourceId } = req.query;
        const userId = req.user._id;

        // Check if folderId exists
        if (!folderId) {
            return res.status(400).json({
                success: false,
                message: "Folder ID is required"
            });
        }

        // Base query to find YouTube resources in the folder
        const baseQuery = { 
            folderId,
            type: 'youtube'
        };

        // If resourceId is provided, add it to the query
        if (resourceId) {
            const singleResource = await Resource.findOne({ 
                ...baseQuery,
                _id: resourceId 
            });

            if (!singleResource) {
                return res.status(404).json({
                    success: false,
                    message: "Resource not found in the specified folder"
                });
            }

            // Process single resource
            const transcript = await getYoutubeTranscript(singleResource.url);
            const summary = await generateSummary(transcript);

            // Update single resource
           

            return res.status(200).json({
                success: true,
                message: "Summary generated and updated successfully",
                resource: summary
            });
        }

        // // If no resourceId, process all resources in folder
        // const resources = await Resource.find(baseQuery);

        // if (!resources || resources.length === 0) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "No YouTube resources found in this folder"
        //     });
        // }

        // Process all resources
        // const updatedResources = await Promise.all(
        //     resources.map(async (resource) => {
        //         try {
        //             const transcript = await getYoutubeTranscript(resource.url);
        //             const summary = await generateSummary(transcript);
        //             return await Resource.findOneAndUpdate(
        //                 { _id: resource._id },
        //                 { summary },
        //                 { new: true }
        //             );
        //         } catch (error) {
        //             console.error(`Error processing resource ${resource._id}:`, error);
        //             return resource;
        //         }
        //     })
        // );

        // return res.status(200).json({
        //     success: true,
        //     message: "Summaries generated and updated successfully",
        //     resources: updatedResources
        // });

    } catch (error) {
        console.error("Error updating resource summaries:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }
};

export { updateResourceSummary };
