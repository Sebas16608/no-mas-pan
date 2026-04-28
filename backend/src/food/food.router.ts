import foodController from "./food.controller";
import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { validate } from "../middleware/validator";
import { FoodSchema } from "./food.schema";

const router = Router();

router.get("/", (req, res) => foodController.getAllFood(req, res));
router.get("/:id", (req, res) => foodController.getFoodById(req, res));
router.post("/", authenticateToken, validate(FoodSchema), (req, res) => foodController.post(req, res));
router.patch("/:id", authenticateToken, validate(FoodSchema), (req, res) => foodController.put(req, res));
router.delete("/:id", authenticateToken, (req, res) => foodController.delete(req, res));

export default router;