import userController from "./controllers/user.controller";
import { Router } from "express";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.get("/", authenticateToken, (req, res) => userController.getUser(req, res));
router.patch("/", authenticateToken, (req, res) => userController.updateUser(req, res));

export default router;