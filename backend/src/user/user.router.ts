import userController from "./controllers/user.controller";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => userController.getAllUsers(req, res));
router.get("/:id", (req, res) => userController.getUserById(req, res));

export default router;