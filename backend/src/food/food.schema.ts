import z from "zod";

export const FoodSchema = z.object({
    name: z.string().min(5, "Minimo 5 caracteres"),
    calories: z.number().positive().min(3),
    protein: z.number().positive().min(3).optional(),
    carbs: z.number().positive().min(3).optional(),
    fats: z.number().positive().min(3).optional(),
});