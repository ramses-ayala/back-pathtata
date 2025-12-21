import Joi from "joi";
import { UserEntity } from "../../entities/user.entity";
import { createUserSchema } from "../../test/helpers/schemas";
import { emailAlreadyExists, registerUserRepository } from "../../repositories/auth/register.repository";
import bcrypt from "bcrypt";

export class EmailAlreadyExistsError extends Error {
    constructor(email: string) {
        super(`The email ${email} is already registered`);
    }
}

export async function registerUserService (user: Omit<UserEntity, 'id'>): Promise<UserEntity | Joi.ValidationError> {
    const { error, value } = createUserSchema.validate(user);

    if (error) throw error;

    const emailExists = await emailAlreadyExists(value.email);
    if (emailExists) {
        throw new EmailAlreadyExistsError(value.email);
    }

    const encryptedPassword = bcrypt.hashSync(value.password, 10);
    value.password = encryptedPassword;

    return await registerUserRepository(value);
}
