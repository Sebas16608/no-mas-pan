import { Request, Response } from "express";
import User from "../user.model";
import { LoginSchema } from "../user.schema";
import bcrypt from "bcrypt";
import { generateToken, generateRefreshToken } from "../../utils/jwt";

class LoginController {
    async login(req: Request, res: Response) {
        try {
            const result = LoginSchema.safeParse(req.body);

            if (!result.success) {
                return res.status(400).json({ error: "Invalid data" });
            }

            const { email, password } = result.data;

            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                return res.status(401).json({ error: "Invalid credentials" });
            }

            const accessToken = generateToken({ id: user.id!, email: user.email });
            const refreshToken = generateRefreshToken({ id: user.id!, email: user.email });

            return res.status(200).json({
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

export default new LoginController();