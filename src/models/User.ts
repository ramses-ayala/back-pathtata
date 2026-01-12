import { Entity, Enum, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { v4 } from "uuid";

@Entity({ tableName: 'users' })
export class User {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4()

    @Property()
    name!: string

    @Property()
    @Unique()
    email!: string

    @Property()
    password!: string

    constructor (name: string, email: string, password: string, id?: string) {
        this.email = email;
        this.password = password;
        this.name = name;

        if (id) this.id = id;
    }
}