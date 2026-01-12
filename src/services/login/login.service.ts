import { responseUserLogin, UserEntity } from "../../entities/user.entity";
import { getUserLogin, isPasswordCorrect } from "../../repositories/auth/login.repository";
import { emailAlreadyExists } from "../../repositories/auth/register.repository";
import { authenticateUserSchema } from "../../test/helpers/schemas";
import { generateToken } from "../../utils/generateToken";

export class EmailDoesNotExist extends Error {
    constructor (email: string) {
        super(`The email ${email} does not exist`);
    }
}

export class PasswordDoesNotMatch extends Error {
    constructor () {
        super('Password does not match');
    }
}

export async function loginUserService (user: UserEntity): Promise<EmailDoesNotExist | PasswordDoesNotMatch | responseUserLogin> {
    const { error, value } = authenticateUserSchema.validate(user);

    if (error) throw error;

    const emailExists = await emailAlreadyExists(value.email);
    
    if (!emailExists) throw new EmailDoesNotExist(value.email);

    const isCorrectPassword = await isPasswordCorrect(value.email, user.password);

    if (!isCorrectPassword) throw new PasswordDoesNotMatch();

    const infoUser = await getUserLogin(value.email);
    if (!infoUser) throw new EmailDoesNotExist(value.email);

    const token = generateToken(value);

    return {
        id: infoUser.id,
        name: infoUser.name,
        email: infoUser.email,
        token
    }
}