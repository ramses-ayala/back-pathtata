import { getEntityManager } from "../../mikroOrmInit";

interface healthResponse {
    ok: boolean
    reason: unknown | null
}

export async function dataBaseHealthService (): Promise<healthResponse> {
    const entityManager = getEntityManager();
    const em = entityManager.fork();
    const con = em.getConnection();
    try {
        await con.execute('SELECT 1');
        return { ok: true, reason: null };
    } catch (error) {
        return { ok: false, reason: error };
    }
}