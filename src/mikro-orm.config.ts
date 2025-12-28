import { defineConfig } from "@mikro-orm/postgresql";
import { Product } from "./models/Product";
import { config_db } from "./config";
import { User } from "./models/User";

export default defineConfig ({
    entities: [Product, User],
    dbName: config_db.database.name,
    user: config_db.database.user,
    password: config_db.database.password,
    host: config_db.database.host,
    port: config_db.database.port,
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