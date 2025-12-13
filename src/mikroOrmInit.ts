import { MikroORM, EntityManager } from "@mikro-orm/core";

import config from "./mikro-orm.config";

let orm: MikroORM;

export function getEntityManager (): EntityManager {
    if (!orm) throw new Error ('BD is not initialized yet, call initDB first');
    return orm.em;
}

export async function initDB () {
    try {
        orm = await MikroORM.init(config);
    } catch (error) {
        console.error('Ocurred an error initiating DB !!! ', error);
    }
    return orm;
}