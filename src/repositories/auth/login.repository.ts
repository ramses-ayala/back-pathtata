import bcrypt from "bcrypt";
import { getEntityManager } from "../../mikroOrmInit";
import { User } from "../../models/User";

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