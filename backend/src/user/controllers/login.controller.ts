import { Request, Response } from "express";
import User from "../user.model";
import { LoginSchema } from "../user.schema";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt";

class LogginController {
    async login (req: Request, res: Response) {
        try {
            const result = LoginSchema.safeParse(req.body);
    
            if (!result.success) return res.status(400).json({ error: "invalid data" });
    
            const email = result.data.email;
            const password = result.data.password;
    
            const user = await User.findOne({ where: { email }});
            if (!user) return res.status(404).json({ error: "user not found" });
    
            const validPassword = bcrypt.compare(password, user.password);
    
            if (!validPassword) return res.status(401).json({ erro: "Invalid credentials" });
    
            const token = {
                generateToken: {
                    id: user.id,
                    email: user.email
                }
            }
        } catch (error) {
            return res.status(400).json({ error: "bad request" });
        }

    }
}

export default new LogginController;