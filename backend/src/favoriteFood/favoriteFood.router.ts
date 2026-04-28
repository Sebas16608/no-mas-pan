import favoriteFoodController from "./favoriteFood.controller";
import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { validate } from "../middleware/validator";
import { z } from "zod";

const AddFavoriteSchema = z.object({
    foodId: z.number().positive(),
});

const router = Router();

router.get("/", authenticateToken, (req, res) => favoriteFoodController.getAll(req, res));
router.post("/", authenticateToken, validate(AddFavoriteSchema), (req, res) => favoriteFoodController.add(req, res));
router.delete("/:foodId", authenticateToken, (req, res) => favoriteFoodController.remove(req, res));

export default router;