import { Request, Response, NextFunction } from "express";

export interface AppError extends Error {
    statusCode?: number;
}

export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    console.error(`[ERROR] ${err.message}`);

    res.status(statusCode).json({
        error: message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};

export const notFoundHandler = (req: Request, res: Response) => {
    res.status(404).json({ error: "Route not found" });
};

export class AppError extends Error {
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}