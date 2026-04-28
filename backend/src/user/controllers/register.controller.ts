import { Request, Response } from "express";
import { RegisterSchema } from "../user.schema";
import { generateToken, generateRefreshToken } from "../../utils/jwt";
import User from "../user.model";

class RegisterController {
    async register(req: Request, res: Response) {
        try {
            const result = RegisterSchema.safeParse(req.body);
            if (!result.success) {
                return res.status(400).json({
                    error: "Invalid data",
                    details: result.error.issues
                });
            }

            const { email } = result.data;

            const userExist = await User.findOne({ where: { email } });

            if (userExist) {
                return res.status(400).json({ error: "User already exists" });
            }

            const user = await User.create(result.data);

            const accessToken = generateToken({ id: user.id!, email: user.email });
            const refreshToken = generateRefreshToken({ id: user.id!, email: user.email });

            return res.status(201).json({
                accessToken,
                refreshToken,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            });
        } catch (error) {
            return res.status(400).json({ error: "Bad request" });
        }
    }
}

export default new RegisterController();