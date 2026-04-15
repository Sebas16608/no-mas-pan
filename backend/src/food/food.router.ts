import foodController from "./food.controller";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => foodController.getAllFood(req, res));
router.get("/:id", (req, res) => foodController.getFoodById(req, res));
router.post("/", (req, res) => foodController.post(req, res));
router.patch("/:id", (req, res) => foodController.put(req, res));
router.delete("/:id", (req, res) => foodController.delete(req, res));

export default router;