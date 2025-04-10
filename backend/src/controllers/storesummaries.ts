import { Request, Response } from "express";
import { Resource } from "../models/Resources.model";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { YoutubeTranscript } from 'youtube-transcript';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

async function generateSummary(content: string): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const prompt = `Please analyze this video transcript and provide:
        1. A brief summary
        2. Key points
        3. Main topics covered in markdown format
        4. Create a mermaid.js diagram showing the relationship between key concepts
        
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
        const { resourceId } = req.params;
        const userId = req.user._id;

        // Find the resource
        const resource = await Resource.findOne({ _id: resourceId });
        if (!resource) {
            return res.status(404).json({
                success: false,
                message: "Resource not found"
            });
        }

        // Only process YouTube videos
        if (resource.type !== 'youtube') {
            return res.status(400).json({
                success: false,
                message: "Only YouTube videos can be summarized"
            });
        }

        // Get transcript directly using URL
        const transcript = await getYoutubeTranscript(resource.url);
        const summary = await generateSummary(transcript);

        // Update the resource with the generated summary
        const updatedResource = await Resource.findOneAndUpdate(
            { _id: resourceId },
            { summary },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Summary generated and updated successfully",
            resource: updatedResource
        });

    } catch (error) {
        console.error("Error updating resource summary:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export { updateResourceSummary };