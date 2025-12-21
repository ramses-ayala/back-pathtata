import { UserEntity } from "../../entities/user.entity";
import { getEntityManager } from "../../mikroOrmInit";
import { User } from "../../models/User";


export async function emailAlreadyExists (email: string): Promise<boolean> {
    const entityManager = getEntityManager();
    const em = entityManager.fork();
    const foundUser = await em.findOne(User, { email: email });
    return foundUser ? true : false;
}

export async function findUserByEmail (email: string): Promise<UserEntity | null> {
    const entityManager = getEntityManager();
    const em = entityManager.fork();
    return await em.findOne(User, { email: email });
}

export async function registerUserRepository (user: Omit<UserEntity, 'id'>): Promise<Omit<UserEntity, 'password'>> {
    const { email, password, role } = user;

    const newUser = new User(email, password, role);
    const entityManager = getEntityManager();
    const em = entityManager.fork();
    await em.persist(newUser).flush();

    return {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role
    };
}