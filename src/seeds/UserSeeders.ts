import { Seeder } from "@mikro-orm/seeder";
import { EntityManager } from '@mikro-orm/core';
import { User } from "../models/User";
import { users } from "../data/users";

export class UserSeeders extends Seeder {
    async run (em: EntityManager): Promise<void> {
        const myArrayUsers = [];
        try {
            await em.nativeDelete(User, {});
            for (const user of users) {
                const { email, password, role } = user;
                const newUser = new User(email, password, role);
                myArrayUsers.push(newUser);
            }
            await em.persist(myArrayUsers).flush();
        } catch (error) {
            console.error('Occurred an error creating users by seeder: ', error);
        }
    }
}