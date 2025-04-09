import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
export function tokenMiddleware(req:Request, res:Response, next:NextFunction) {
    const token:JwtPayload=jwt.decode(req.headers.authorization?.slice(7) as string) as JwtPayload
    if (!token) {
        res.status(401).json({
            "msg":"Invalid Token"
        })
        return
    }
    req.email=token.email
    next()
}