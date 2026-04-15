import mealController from "./meal.controller";
import { Router } from "express";

const router = Router();

router.get("/:date", (req, res) => mealController.getByDate(req, res));
router.post("/", (req, res) => mealController.post(req, res));
router.delete("/:id", (req, res) => mealController.delete(req, res));

export default router;