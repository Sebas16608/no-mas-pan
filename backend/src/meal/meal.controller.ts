import Meal from "./meal.model";
import { Request, Response } from "express";

class MealController {
    async getByDate(req: Request, res: Response) {
        try {
            const { date } = req.params;
            const userId = req.user?.id;

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            if (!date) {
                return res.status(400).json({ error: "Date is required" });
            }

            const meals = await Meal.findAll({
                where: {
                    date,
                    userId
                }
            });

            return res.status(200).json(meals);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal error" });
        }
    }

    async post(req: Request, res: Response) {
        try {
            const userId = req.user?.id;

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            const { type, date, total_calories } = req.body;

            const meal = await Meal.create({
                userId,
                type,
                date,
                total_calories: total_calories || 0
            });

            return res.status(201).json(meal);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "Bad request" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const userId = req.user?.id;
            const mealId = Number(id);

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            if (isNaN(mealId)) {
                return res.status(400).json({ error: "Invalid id" });
            }

            const meal = await Meal.findOne({
                where: {
                    id: mealId,
                    userId
                }
            });

            if (!meal) {
                return res.status(404).json({ error: "Not found" });
            }

            await meal.destroy();

            return res.status(204).send();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal error" });
        }
    }
}

export default new MealController();