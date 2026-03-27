import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

// MIDDLEWARE
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Rutas
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome",
    })
})

export default app;