import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";

@Entity({ tableName: 'products' })
export class Product {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4()

    @Property()
    title!: string

    @Property()
    description!: string

    @Property()
    price!: number

    constructor (title: string, description: string, price: number, id?: string) {
        this.title = title;
        this.description = description;
        this.price = price;

        if (id) this.id = id;
    }
}