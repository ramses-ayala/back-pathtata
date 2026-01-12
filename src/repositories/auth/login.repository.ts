import bcrypt from "bcrypt";
import { getEntityManager } from "../../mikroOrmInit";
import { User } from "../../models/User";
import { UserEntity } from "../../entities/user.entity";

export async function isPasswordCorrect (email: string, password: string): Promise<boolean> {
    const entityManager = getEntityManager();
    const em = entityManager.fork();
    const foundUser = await em.findOne(User, { email });
    if (foundUser) {
        const match = await bcrypt.compare(password, foundUser.password);
        return match ? true : false;
    }

    return false;
}

export async function getUserLogin (email: string): Promise<Omit<UserEntity, 'password'> | null> {
    const entityManager = getEntityManager();
    const em = entityManager.fork();
    const foundUser = await em.findOne(User, { email });
    return foundUser;
}