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
}