import { NextFunction, Request, Response } from "express";

export function tokenMiddleware(req:Request, res:Response, next:NextFunction) {
    if (!req.auth?.userId) {
        res.status(401).json({
            "msg":"Invalid Token"
        })
        return
    }
    next()
}