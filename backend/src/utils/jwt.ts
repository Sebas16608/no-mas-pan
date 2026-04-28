import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret-key";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh-secret-key";

export interface TokenPayload {
    id: number;
    email: string;
}

export function generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, SECRET, {
        expiresIn: "1h"
    });
}

export function generateRefreshToken(payload: TokenPayload): string {
    return jwt.sign(payload, REFRESH_SECRET, {
        expiresIn: "7d"
    });
}

export function verifyToken(token: string): TokenPayload {
    return jwt.verify(token, SECRET) as TokenPayload;
}

export function verifyRefreshToken(token: string): TokenPayload | null {
    try {
        return jwt.verify(token, REFRESH_SECRET) as TokenPayload;
    } catch {
        return null;
    }
}