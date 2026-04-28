import { Request, Response } from "express";
import Progress from "./progress.model";
import { z } from "zod";

const ProgressUpdateSchema = z.object({
    date: z.string(),
    weight: z.number().positive().optional(),
    body_fat: z.number().min(0).max(100).optional(),
});

class ProgressController {
    async getAll(req: Request, res: Response) {
        try {
            const userId = req.user?.id;

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            const progress = await Progress.findAll({
                where: { userId },
                order: [["date", "DESC"]]
            });

            return res.status(200).json(progress);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal error" });
        }
    }

    async getByDate(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            const { date } = req.params;

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            const progress = await Progress.findOne({
                where: { userId, date }
            });

            if (!progress) {
                return res.status(404).json({ error: "Progress not found" });
            }

            return res.status(200).json(progress);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal error" });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const userId = req.user?.id;

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            const result = ProgressUpdateSchema.safeParse(req.body);

            if (!result.success) {
                return res.status(400).json({
                    error: "Invalid data",
                    details: result.error.issues
                });
            }

            const { date, weight, body_fat } = result.data;

            const existingProgress = await Progress.findOne({
                where: { userId, date }
            });

            if (existingProgress) {
                await existingProgress.update({ weight, body_fat });
                return res.status(200).json(existingProgress);
            }

            const progress = await Progress.create({
                userId,
                date,
                weight,
                body_fat
            });

            return res.status(201).json(progress);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "Bad request" });
        }
    }
}

export default new ProgressController();