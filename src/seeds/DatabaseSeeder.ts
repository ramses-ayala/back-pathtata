import { Seeder } from "@mikro-orm/seeder";
import { EntityManager } from '@mikro-orm/core';
import { products } from "../data/products";
import { Product } from "../models/Product";

export class DatabaseSeeder extends Seeder {

    async run (em: EntityManager): Promise<void> {
        const myArrayProducts = [];
        try {
            await em.nativeDelete(Product, {});
            for (const product of products) {
                const { title, description, price, id } = product;
                const myProduct = new Product(title, description, price, id);
                myArrayProducts.push(myProduct);
            }
            await em.persist(myArrayProducts).flush();
        } catch (error) {
            console.error('Occurred an error creating products by seeder: ', error);
        }
    }
}