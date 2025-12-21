import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../env/postgresql-connection";
import { UserEntity } from "../entities/user.entity";

export const generateToken = (user: Omit<UserEntity, 'password'>) => {
    return jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY as string, { expiresIn: '2h' });
}