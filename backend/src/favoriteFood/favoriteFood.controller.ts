import { Request, Response } from "express";
import FavoriteFood from "./favoriteFood.model";
import Food from "../food/food.model";
import { z } from "zod";

const AddFavoriteSchema = z.object({
    foodId: z.number().positive(),
});

class FavoriteFoodController {
    async getAll(req: Request, res: Response) {
        try {
            const userId = req.user?.id;

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            const favorites = await FavoriteFood.findAll({
                where: { userId },
                include: [{
                    model: Food,
                    as: "food"
                }]
            });

            return res.status(200).json(favorites);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal error" });
        }
    }

    async add(req: Request, res: Response) {
        try {
            const userId = req.user?.id;

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            const result = AddFavoriteSchema.safeParse(req.body);

            if (!result.success) {
                return res.status(400).json({
                    error: "Invalid data",
                    details: result.error.issues
                });
            }

            const { foodId } = result.data;

            const food = await Food.findByPk(foodId);
            if (!food) {
                return res.status(404).json({ error: "Food not found" });
            }

            const existingFavorite = await FavoriteFood.findOne({
                where: { userId, foodId }
            });

            if (existingFavorite) {
                return res.status(400).json({ error: "Food already in favorites" });
            }

            const favorite = await FavoriteFood.create({
                userId,
                foodId
            });

            return res.status(201).json(favorite);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "Bad request" });
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            const { foodId } = req.params;
            const foodIdNumber = Number(foodId);

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            if (isNaN(foodIdNumber)) {
                return res.status(400).json({ error: "Invalid food ID" });
            }

            const favorite = await FavoriteFood.findOne({
                where: { userId, foodId: foodIdNumber }
            });

            if (!favorite) {
                return res.status(404).json({ error: "Favorite not found" });
            }

            await favorite.destroy();

            return res.status(204).send();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal error" });
        }
    }
}

export default new FavoriteFoodController();