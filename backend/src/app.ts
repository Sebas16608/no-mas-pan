import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import FoodRouter from "./food/food.router";
import MealRouter from "./meal/meal.router";
import UserRouter from "./user/user.router";
import LoginRouter from "./user/routers/login.router";
import RegisterRouter from "./user/routers/register.router";
import ProgressRouter from "./progress/progress.router";
import FavoriteFoodRouter from "./favoriteFood/favoriteFood.router";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome",
        endpoints: {
            food: "/food",
            meal: "/meal",
            auth: "/auth",
            user: "/user",
            progress: "/progress",
            favorites: "/favorites",
        }
    })
})

app.use("/food", FoodRouter);
app.use("/meal", MealRouter);
app.use("/auth/login", LoginRouter);
app.use("/auth/register", RegisterRouter);
app.use("/user", UserRouter);
app.use("/progress", ProgressRouter);
app.use("/favorites", FavoriteFoodRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;