import MealItem from "./mealitem.model";
import { Request, Response } from "express";
import { z } from "zod";

const MealItemSchema = z.object({
    mealId: z.number().positive(),
    foodId: z.number().positive(),
    quantity: z.number().positive(),
});

class MealItemController {
    async post(req: Request, res: Response) {
        try {
            const result = MealItemSchema.safeParse(req.body);

            if (!result.success) {
                return res.status(400).json({
                    error: "Invalid data",
                    details: result.error.issues
                });
            }

            const { mealId, foodId, quantity } = result.data;

            const item = await MealItem.create({ mealId, foodId, quantity });

            return res.status(201).json(item);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "Bad request" });
        }
    }

    async put(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const itemId = Number(id);

            if (isNaN(itemId)) {
                return res.status(400).json({ error: "Invalid ID" });
            }

            const item = await MealItem.findByPk(itemId);
            if (!item) {
                return res.status(404).json({ error: "Not found" });
            }

            const { mealId, foodId, quantity } = req.body;

            if (mealId) item.mealId = mealId;
            if (foodId) item.foodId = foodId;
            if (quantity) item.quantity = quantity;

            await item.save();

            return res.json(item);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "Bad request" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const itemId = Number(id);

            if (isNaN(itemId)) {
                return res.status(400).json({ error: "Invalid ID" });
            }

            const item = await MealItem.findByPk(itemId);

            if (!item) {
                return res.status(404).json({ error: "Not found" });
            }

            await item.destroy();
            return res.status(204).send();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal error" });
        }
    }
}

export default new MealItemController();