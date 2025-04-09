import {  Request, Response } from "express";

const signup = async (req: Request, res: Response) => {
    try{
       const {email,username,mobile,age} =req.body
       if (!email || !username || !mobile || !age)  {
        res.status(401).json({"msg":"Some fields are empty"}) 
        return
    }

       // create user db call 
       console.log({email,username,mobile,age})
       res.status(200).json({"msg":req.body})
    }
    catch (error) {
       // catch error.
       console.log(error)
       res.status(500).json({"msg":"Internal Server Error"})
    }
}



export default signup;