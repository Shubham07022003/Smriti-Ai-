import { Request, Response } from "express";
import { Resource } from "../models/Resources.model";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { YoutubeTranscript } from 'youtube-transcript';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

interface GeneratedContent {
    summary: string;
    mermaid: string;
    questions: {
        question: string;
        options: string[];
        answer: string;
    }[];
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
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // Changed from gemini-1.5-pro

        const prompt = `Analyze this content and provide two distinct sections:

        SECTION 1 - SUMMARY:
        1. Brief summary (2-3 sentences)
        2. Key points (bullet points)
        
        SECTION 2 - MERMAID:
        Create a mermaid.js flowchart diagram. Follow these exact rules:
        1. Start with "graph TD"
        2. Each line should be a single connection
        3. Use descriptive node names
        4. Format each line as: nodeA --> nodeB
        5. Nodes with spaces must be in brackets []
        6. Keep it simple and hierarchical
        
        Example format:
        graph TD
        A[Main Topic] --> B[First Subtopic]
        A --> C[Second Subtopic]
        B --> D[Detail One]
        B --> E[Detail Two]
        C --> F[Another Detail]

         SECTION 3 - QUESTIONS:
        Generate 5 multiple choice questions. Follow this format:
        Q1: [Question]
        a) [Option 1]
        b) [Option 2]
        c) [Option 3]
        d) [Option 4]
        Answer: [Correct option]

        Content: ${content}

        Return the response in this exact format:
        ---SUMMARY---
        [Your summary content here]
        ---MERMAID---
       [Your mermaid diagram here]
         ---QUESTIONS---
        [Your questions here]`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Split response into sections with better regex
        const summaryMatch = text.match(/---SUMMARY---([\s\S]*?)---MERMAID---/);
        const mermaidMatch = text.match(/---MERMAID---([\s\S]*?)---QUESTIONS---/);
        const questionsMatch = text.match(/---QUESTIONS---([\s\S]*?)$/);

        // Format mermaid syntax properly
        let mermaidSyntax = mermaidMatch ? mermaidMatch[1].trim() : "";
        mermaidSyntax = `graph TD\n${mermaidSyntax
            .split('\n')
            .map(line => line.trim())
            .filter(line => line && !line.startsWith('```') && !line.startsWith('graph TD'))
            .map(line => {
                return line
                    .replace(/(\w+)(\s*-->)/, '[$1]$2')
                    .replace(/-->(?!\s*\[)/, '--> [')
                    .replace(/(\w+)$/, '$1]');
            })
            .join('\n')}`;

        // Parse questions with error handling
        const questionsText = questionsMatch ? questionsMatch[1].trim() : "";
        const questions = questionsText ? questionsText.split(/Q\d+:/)
            .filter(Boolean)
            .map(qBlock => {
                try {
                    const lines = qBlock.trim().split('\n');
                    return {
                        question: lines[0].trim(),
                        options: lines.slice(1, 5).map(opt => opt.substring(3).trim()),
                        answer: lines[5].replace('Answer:', '').trim()
                    };
                } catch (error) {
                    console.error("Error parsing question block:", error);
                    return null;
                }
            })
            .filter(q => q !== null) : [];

        return {
            summary: summaryMatch ? summaryMatch[1].trim() : "",
            mermaid: mermaidSyntax,
            questions
        };
    } catch (error) {
        console.error("Error generating content:", error);
        throw new Error("Failed to generate content");
    }
}

const updateResourceSummary = async (req: Request, res: Response) => {
    try {
        const { resourceId } = req.query;

        // Validate resourceId
        if (!resourceId || !mongoose.Types.ObjectId.isValid(resourceId as string)) {
            return res.status(400).json({
                success: false,
                message: "Valid resource ID is required"
            });
        }

        // Find single resource
        const singleResource = await Resource.findOne({ 
            _id: resourceId,
            type: 'youtube'
        });

        if (!singleResource) {
            return res.status(404).json({
                success: false,
                message: "YouTube resource not found"
            });
        }

        // Generate content
        const transcript = await getYoutubeTranscript(singleResource.url);
        const { summary, mermaid, questions } = await generateContent(transcript);

        // Update resource with all generated content
        const updatedResource = await Resource.findOneAndUpdate(
            { _id: resourceId },
            { 
                summary,
                mermaid_syntax: mermaid,
                questions: questions.map(q => ({
                    question: q.question,
                    options: q.options,
                    answer: q.answer
                }))
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Content generated successfully",
            resource: updatedResource
        });

    } catch (error) {
        console.error("Error updating resource:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export { updateResourceSummary };