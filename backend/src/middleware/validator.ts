import { Request, Response, NextFunction } from "express";

const isEmpty = (value: any) => {
    return typeof value !== "string" || value.trim() === "";
}

export function validateUser (req: Request, res: Response, next: NextFunction) {
    const { username, email, password, objective, weight, height } = req.body;
    const errors: any = {}

    if (typeof username !== "string" || username.trim().length < 3) {
        errors.username = "El username tiene que ser mayor a 3 digitos"
    }
}