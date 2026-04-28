import progressController from "./progress.controller";
import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { validate } from "../middleware/validator";
import { ProgressSchema } from "./progress.schema";

const router = Router();

router.get("/", authenticateToken, (req, res) => progressController.getAll(req, res));
router.get("/:date", authenticateToken, (req, res) => progressController.getByDate(req, res));
router.post("/", authenticateToken, validate(ProgressSchema), (req, res) => progressController.create(req, res));

export default router;