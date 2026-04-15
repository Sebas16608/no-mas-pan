import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET_KEY || "secret key";

export function generateToken(payload: object) {
    return jwt.sign(payload, SECRET, {
        expiresIn: "1h"
    })
}

export function verifyToken(token: string) {
    return jwt.verify(token, SECRET);
}