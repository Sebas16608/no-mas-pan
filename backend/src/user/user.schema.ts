import z, { object, string } from "zod";
import { Objective } from "./user.model";

export const RegisterSchema = z.object({
    username: z.string().min(3, "Minimo 3 caracteres"),
    email: z.email("Correo electrónico no válido"),
    password: z.string().min(8, "Minimo 8 caracteres"),
    objective: z.enum(Object.values(Objective) as [string, ...string[]]),
    weight: z.number(),
    height: z.number(),
});

export const LoginSchema = z.object({
    email: z.email("Correo electrónico no válido"),
    password: z.string().min(8, "Password incorrecta")
})