import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import FoodRouter from "./food/food.router";
import MealRouter from "./meal/meal.router";

const app = express();

// MIDDLEWARE
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Rutas
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome",
        endpoints: {
            food: "/food",
            meal: "/meal"
        }
    })
})

app.use("/food", FoodRouter);
app.use("/meal", MealRouter);

export default app;