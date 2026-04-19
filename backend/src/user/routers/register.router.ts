import registerController from "../controllers/register.controller";
import { Router } from "express";

const router = Router();

router.post("/", (req, res) => registerController.register(req, res));

export default router;