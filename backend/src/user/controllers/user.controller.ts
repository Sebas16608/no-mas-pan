import { Request, Response } from "express";
import User from "../user.model";

class UserController {
    async getAllUsers (req: Request, res: Response) {
        try {
            const user = await User.findAll();
            
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: "Internal error" });
        }
    }

    async getUserById (req: Request, res: Response) {
        const { id } = req.params;
        const userId = Number(id);

        if (isNaN(userId)) return res.status(400).json({ error: "invalid id" });

        const user = await User.findByPk(userId);
        return res.status(200).json(user);
    }
}

export default new UserController;