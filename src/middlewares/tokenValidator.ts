import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../env/postgresql-connection";
import { emailAlreadyExists, findUserByEmail } from "../repositories/auth/register.repository";
import { UserEntity } from "../entities/user.entity";

export const tokenValidator = async (req: Request, res: Response ,next: Function) => {
    const auth = req.header('Authorization');
    const token = auth?.split(' ')[1] as string;

    if (!token) {
        res.status(401).json({
            error: 'Token is not provided'
        });
        return;
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY as string) as Omit<UserEntity, 'password'>;
        const userFound = await findUserByEmail(decoded.email);

        if (!userFound) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        (req as any).user = userFound;
        next();
    } catch (error) {
        console.error('Not authorized: ', error);
        res.status(403).json({
            error: 'Not authorized'
        });
    }
}