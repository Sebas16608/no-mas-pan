import z, { minLength } from "zod";
import { da } from "zod/locales";

export const FoodSchema = z.object({
    body: z.object({
        name: z.string().min(5, "Minimo 5 caracteres"),
        calories: z.number().positive().min(3, "Minimo 3 caracteres"),
        protein: z.number().positive().min(3, "Minimo 3 caracteres"),
        carbs:  z.number().positive().min(3, "Minimo 3 caracteres"),
        fats: z.number().positive().min(3, "Minimo 3 caracteres"),
    })
});


export const data = {
    name: "comida",
    calories: 150,
    protein: 150,
    carbs: 150,
    fats: 150,
}

try {
    const validData = FoodSchema.parse(data);
    console.log(validData);
} catch (error) {
    console.error(error);
}