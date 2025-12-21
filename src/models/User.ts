import { Entity, Enum, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { v4 } from "uuid";
import { UserRole } from "../entities/user.entity";

@Entity({ tableName: 'users' })
export class User {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4()

    @Property()
    @Unique()
    email!: string

    @Property()
    password!: string

    @Enum(() => UserRole)
    role!: UserRole

    constructor (email: string, password: string, role: UserRole, id?: string) {
        this.email = email;
        this.password = password;
        this.role = role;

        if (id) this.id = id;
    }
}