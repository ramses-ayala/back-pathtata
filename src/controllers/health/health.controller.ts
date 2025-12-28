import { Request, Response } from "express";
import { dataBaseHealthService } from "../../services/health/health.service";

export const checkHealthServer = async (_: Request, res: Response) => {
    const { ok: isOk, reason } = await dataBaseHealthService();
    if (isOk) {
        res.status(200).json({ status: 'OK', uptime: process.uptime() });
    } else {
        res.status(500).json({ status: 'ERROR', message: reason });
    }
}