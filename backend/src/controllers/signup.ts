import {  Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { User } from "../models/User.model";
const signup = async (req: Request, res: Response) => {
    try{
       const {email,username,mobile,age} =req.body
       if (!email || !username || !mobile || !age)  {
        res.status(401).json({"msg":"Some fields are empty"}) 
        return
    }
      const user=await User.create({
         email,
         username,
         mobile,
         age,
         password:"Default password" //redundant field. should be optional
      })
    
       const token=jwt.sign({token:user._id},process.env.JWT_SECRET as string)
       res.status(200).json({message:"User created successfully",token})
    }
    catch (error) {
       // catch error.
       console.log(error)
       res.status(500).json({message:"Internal Server Error"})
    }
}



export default signup;