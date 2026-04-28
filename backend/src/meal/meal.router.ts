import mealController from "./meal.controller";
import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { validate } from "../middleware/validator";
import { MealSchema } from "./meal.schema";

const router = Router();

router.get("/:date", authenticateToken, (req, res) => mealController.getByDate(req, res));
router.post("/", authenticateToken, validate(MealSchema), (req, res) => mealController.post(req, res));
router.delete("/:id", authenticateToken, (req, res) => mealController.delete(req, res));

export default router;