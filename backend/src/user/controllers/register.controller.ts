import { Request, Response } from "express";
import { RegisterSchema } from "../user.schema";
import { generateToken } from "../../utils/jwt";
import User from "../user.model";

class RegisterController {
    async register (req: Request, res: Response) {
        try {
            const result = RegisterSchema.safeParse(req.body);
            if (!result.success)  return res.status(400).json({ error: "invalid data" });

            const email = result.data.email;

            const data = result.data;

            const userExist = await User.findOne({ where: { email }});

            if (userExist) return res.status(400).json({ error: "that user already exist" });

            const user = await User.create(data);

            const token = generateToken({
                id: user.id,
                email: user.email,  
            });

            return res.status(201).json({ user: token });
        } catch (error) {
            return res.status(400).json({ error: "bad request" });
        }
    }
}

export default new RegisterController;