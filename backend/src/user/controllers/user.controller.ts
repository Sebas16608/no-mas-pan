import { Request, Response } from "express";
import User from "../user.model";
import { z } from "zod";

const UpdateUserSchema = z.object({
    username: z.string().min(3).optional(),
    objective: z.enum(["CUT", "BULK", "MAINTAIN"]).optional(),
    weight: z.number().positive().optional(),
    height: z.number().positive().optional(),
    calories: z.number().int().positive().optional(),
});

class UserController {
    async getUser(req: Request, res: Response) {
        try {
            const userId = req.user?.id;

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            const user = await User.findByPk(userId, {
                attributes: ["id", "username", "email", "objective", "weight", "height", "calories"]
            });

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: "Internal error" });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const userId = req.user?.id;

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            const result = UpdateUserSchema.safeParse(req.body);

            if (!result.success) {
                return res.status(400).json({
                    error: "Invalid data",
                    details: result.error.issues
                });
            }

            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            await user.update(result.data);

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: "Internal error" });
        }
    }
}

export default new UserController();