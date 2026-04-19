import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import FoodRouter from "./food/food.router";
import MealRouter from "./meal/meal.router";
import UserRouter from "./user/user.router";
import LoginRouter from "./user/routers/login.router";
import RegisterRouter from "./user/routers/register.router";

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
            meal: "/meal",
            auth: "/auth",
            user: "/user",
        }
    })
})

app.use("/food", FoodRouter);
app.use("/meal", MealRouter);
app.use("/auth/login", LoginRouter);
app.use("/auth/register", RegisterRouter);
app.use("/user", UserRouter);

export default app;