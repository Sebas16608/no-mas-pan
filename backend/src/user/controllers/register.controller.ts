import { Request, Response } from "express";
import { RegisterSchema } from "../user.schema";
import { generateToken } from "../../utils/jwt";
import User from "../user.model";
import bcrypt from "bcrypt";

class RegisterController {
    async register (req: Request, res: Response) {
        try {
            const result = RegisterSchema.safeParse(req.body);
            if (!result.success)  return res.status(400).json({ error: "invalid data" });

            const email = result.data.email;
            const password = result.data.password;

            const userExist = await User.findOne({ where: { email }});

            if (userExist) return res.status(400).json({ error: "that user already exist" });

            const user = await User.create({ email, password });

            const token = generateToken({
                id: user.id,
                email: user.email,
            })
        } catch (error) {
            return res.status(400).json({ error: "bad request" });
        }
    }
}