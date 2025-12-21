import { defineConfig } from "@mikro-orm/postgresql";
import { Product } from "./models/Product";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./env/postgresql-connection";
import { User } from "./models/User";

export default defineConfig ({
    entities: [Product, User],
    dbName: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    migrations: {
        path: './migrations'
    },
    seeder: {
        path: './dist/seeds',
        pathTs: './src/seeds',
        defaultSeeder: 'DatabaseSeeder',
        glob: '!(*.d).{js,ts}'
    }
})