import loginController from "../controllers/login.controller";
import { Router } from "express";

const router = Router();

router.post("/", (req, res) => loginController.login(req, res));

export default router;