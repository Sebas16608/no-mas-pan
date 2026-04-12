import { number } from "zod";
import MealItem from "./mealitem.model";
import { Request, Response } from "express";
import { time } from "node:console";

class MealItemController {
    async post (req: Request, res: Response) {
        try {
            const { mealId, foodId, quantity, calories_calculated } = req.body;

            const item = await MealItem.create({ mealId, foodId, quantity, calories_calculated })

            return res.status(201).json(item);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "bad request" });
        }
    }

    async put (req: Request, res: Response) {
        try {
            const { id } = req.params;
            const itemId = Number(id);
    
            if (isNaN(itemId)) return res.status(400).json({ error: "Invalid Id" });
    
            const item = await MealItem.findByPk(itemId);
            if (!item) return res.status(404).json({ error: "not found" });
    
            const { mealId, foodId, quantity, calories_calculated } = req.body;
    
            item.mealId = mealId ?? item.mealId;
            item.foodId = foodId ?? item.foodId;
            item.quantity = quantity ?? item.quantity;
            item.calories_calculated = calories_calculated ?? item.calories_calculated;
    
            await item.save();
    
            res.json(item);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "bad request" });
        }
    }

    async delete (req: Request, res: Response) {
        try {
            const { id } = req.params;
            const itemId = Number(id);
    
            if (isNaN(itemId)) return res.status(400).json({ error: "invalid id" });
    
            const item = await MealItem.findByPk(itemId);
    
            if (!item) return res.status(404).json({ error: "not found" });
    
            await item.destroy();
            return res.status(204).send();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "internal error" });
        }
    }
}