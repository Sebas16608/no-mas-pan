import Food from "./food.model";
import { Request, Response } from "express";

class FoodController {
    async getAllFood (req: Request, res: Response) {
        try {
            const food = await Food.findAll();

            return res.status(200).json(food)
        } catch (error) {
            return res.status(500).json({ error: "Internal Error Server" });
        }
    }

    async post (req: Request, res: Response) {
        try {
            const { name, calories, protein, carbs, fats, userId } = req.body;
    
            const food = await Food.create({ name, calories, protein, carbs, fats, userId });

            return res.status(201).json(food);
        } catch (error) {
            return res.status(400).json({ error: "Bad Request" });
        }
    }

    async put (req: Request, res: Response) {
        try {
            const { id } = req.params;
            const foodId = Number(id);

            if (isNaN(foodId)) return res.status(400).json({ error: "Invalid Id" });

            const food = await Food.findByPk(foodId);

            if (!food) return res.status(404).json({ error: "Not Found" });

            const { name, calories, protein, carbs, fats, userId } = req.body;

            food.name = name ?? food.name;
            food.calories = calories ?? food.calories;
            food.protein = protein ?? food.protein;
            food.carbs = carbs ?? food.carbs;
            food.fats = fats ?? food.fats;
            food.userId = userId ?? food.userId;

            await food.save();

            return res.json(food);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "Bad Request" });
        }
    }

    async delete (req: Request, res: Response) {
        try {
            const { id } = req.params;
            const foodId = Number(id);
    
            if (isNaN(foodId)) return res.status(400).json({ error: "Invalid Id" });
    
            const food = await Food.findByPk(foodId);
    
            if (!food) return res.status(404).json({ error: "not found" });
    
            await food.destroy();
    
            return res.status(204).send();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "internal error" });
        }
    }
}

export default new FoodController();