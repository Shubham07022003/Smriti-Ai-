import { Request, Response } from "express";
import { Result } from "../models/Result.model";
import { User } from "../models/User.model";

const getUser = async (req: Request, res: Response) => {
    try{
        const userId=req.user._id
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return
        }

        // Fetch resources for the specified folder
        const userInfo = await User.findOne({
            _id:userId
        })
        const resultInfo = await Result.find({
            userId
        }).populate("userId")
        res.status(200).json({ message: "User fetched successfully",userInfo, resultInfo });
        return
    }
    catch (error) {
        console.error("Error fetching resources:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export { getUser };