import z from "zod";
import { MealType } from "./meal.model";

export const MealSchema = z.object({
    type: z.enum(Object.values(MealType) as [string, ...string[]]),
    date: z.string(),
    total_calories: z.number().min(3)
})