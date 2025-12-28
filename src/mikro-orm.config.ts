import { defineConfig } from "@mikro-orm/postgresql";
import { Product } from "./models/Product";
import { config } from "./config";
import { User } from "./models/User";

export default defineConfig ({
    entities: [Product, User],
    dbName: config.database.name,
    user: config.database.user,
    password: config.database.password,
    host: config.database.host,
    port: config.database.port,
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