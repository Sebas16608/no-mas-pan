import z from "zod";

export const ProgressSchema = z.object({
    date: z.string(),
    weight: z.number().positive().optional(),
    body_fat: z.number().min(0).max(100).optional(),
});