import jwt from "jsonwebtoken";
import { UserEntity } from "../entities/user.entity";
import { config_db } from "../config";

export const generateToken = (user: Omit<UserEntity, 'password'>) => {
    return jwt.sign({ id: user.id, email: user.email, role: user.role }, config_db.SECRET_KEY as string, { expiresIn: '2h' });
}