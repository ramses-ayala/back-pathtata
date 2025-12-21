import { Request, Response } from "express";
import { UserRole } from "../entities/user.entity";

export const isAdmin = (req: Request, res: Response, next: Function) => {
    if (req.user && req.user.role !== UserRole.ADMIN) {
        res.status(403).json({
            error: 'Forbidden'
        })
        return;
    }
    next();
}