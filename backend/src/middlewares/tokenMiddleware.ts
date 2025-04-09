import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
export async function tokenMiddleware(req:Request, res:Response, next:NextFunction) {
    //const token:JwtPayload=jwt.verify(req.headers.authorization?.slice(7) as string) as JwtPayload
    const token:string=req.headers['backendtoken'] as string
    const decoded:JwtPayload=jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload
    if (!decoded.token) {
        res.status(401).json({
            "msg":"Invalid Token"
        })
        return
    }
    req.user = { _id: decoded.token };
    next()
}