import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import FoodRouter from "./food/food.router";

const app = express();

// MIDDLEWARE
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Rutas
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome",
        endpoints: "/food",
    })
})

app.use("/food", FoodRouter);

export default app;