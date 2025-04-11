import { Request, Response } from "express";
import { Resource } from "../models/Resources.model";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { YoutubeTranscript } from 'youtube-transcript';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

interface GeneratedContent {
    summary: string;
    mermaid: string;
}
// Add getYoutubeTranscript function definition
async function getYoutubeTranscript(url: string): Promise<string> {
    try {
        const transcript = await YoutubeTranscript.fetchTranscript(url);
        return transcript.map(item => item.text).join(' ');
    } catch (error) {
        console.error("Error fetching transcript:", error);
        throw new Error("Failed to fetch YouTube transcript");
    }
}

async function generateContent(content: string): Promise<GeneratedContent> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        
        const prompt = `Analyze this content and provide two distinct sections:

        SECTION 1 - SUMMARY:
        1. Brief summary (2-3 sentences)
        2. Key points (bullet points)
        
        SECTION 2 - MERMAID:
        Create a mermaid.js diagram showing the relationships between key concepts.
        Use this format not use \n: provide only in givem formate
        \`\`\`mermaid
        graph TD
            A[Main Topic] --> B[Subtopic 1]
            A --> C[Subtopic 2]
            B --> D[Detail 1.1]
            C --> E[Detail 2.1]
        \`\`\`

        Content: ${content}

        Return the response in this exact format:
        ---SUMMARY---
        [Your summary content here]
        ---MERMAID---
        [Your mermaid diagram here]`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Split response into summary and mermaid sections
        const summaryMatch = text.match(/---SUMMARY---([\s\S]*?)---MERMAID---/);
        const mermaidMatch = text.match(/---MERMAID---([\s\S]*?)$/);

        return {
            summary: summaryMatch ? summaryMatch[1].trim() : "",
            mermaid: mermaidMatch ? mermaidMatch[1].trim() : ""
        };
    } catch (error) {
        console.error("Error generating content:", error);
        throw new Error("Failed to generate content");
    }
}

const updateResourceSummary = async (req: Request, res: Response) => {
    try {
        const { folderId, resourceId } = req.query;

        if (!folderId) {
            return res.status(400).json({
                success: false,
                message: "Folder ID is required"
            });
        }

        const baseQuery = { 
            folderId,
            type: 'youtube'
        };

        if (resourceId) {
            const singleResource = await Resource.findOne({ 
                ...baseQuery,
                _id: resourceId 
            });

            if (!singleResource) {
                return res.status(404).json({
                    success: false,
                    message: "Resource not found in folder"
                });
            }

            const transcript = await getYoutubeTranscript(singleResource.url);
            const { summary, mermaid } = await generateContent(transcript);

            const updatedResource = await Resource.findOneAndUpdate(
                { _id: resourceId },
                { 
                    summary,
                    mermaid_syntax: mermaid 
                },
                { new: true }
            );

            return res.status(200).json({
                success: true,
                message: "Content generated successfully",
                resource: updatedResource
            });
        }

        const resources = await Resource.find(baseQuery);

        if (!resources?.length) {
            return res.status(404).json({
                success: false,
                message: "No YouTube resources found"
            });
        }

        const updatedResources = await Promise.all(
            resources.map(async (resource) => {
                try {
                    const transcript = await getYoutubeTranscript(resource.url);
                    const { summary, mermaid } = await generateContent(transcript);
                    
                    return await Resource.findOneAndUpdate(
                        { _id: resource._id },
                        { 
                            summary,
                            mermaid_syntax: mermaid 
                        },
                        { new: true }
                    );
                } catch (error) {
                    console.error(`Error processing resource ${resource._id}:`, error);
                    return resource;
                }
            })
        );

        return res.status(200).json({
            success: true,
            message: "All content generated successfully",
            resources: updatedResources
        });

    } catch (error) {
        console.error("Error updating resources:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export { updateResourceSummary };