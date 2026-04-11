import Meal from "./meal.model";
import { Request, Response } from "express";

class MealController {
    async getByDate (req: Request, res: Response) {
        try {
            const date = req.params.date;
    
            if (!date) return res.status(400).json({ error: "fecha requerida" });
    
            const meal = await Meal.findAll({ where: { date }});

            return res.status(200).json(meal);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "internal error" });
        }
    }

    async post (req: Request, res: Response) {
        try {
            const { userId, type, date, total_calories } = req.body;
    
            const meal = await Meal.create({ userId, type, date, total_calories });
    
            return res.status(201).json(meal);        
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "bad request" });
        }
    }

    async delete (req: Request, res: Response) {
        try {
            const { id } = req.params;
            const mealId = Number(id);

            if (isNaN(mealId)) return res.status(400).json({ error: "invalid id" });

            const meal = await Meal.findByPk(mealId);

            if (!meal) return res.status(404).json({ error: "not found" });

            await meal.destroy();

            return res.status(204).send();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "internal error" });
        }
    }
}

export default new MealController;