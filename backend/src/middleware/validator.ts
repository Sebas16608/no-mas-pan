import { Request } from "express";
import { validationResult, body } from "express-validator";

export const userValidationRules = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El nombre de username es obligatorio")
    .isLength({ min: 3 })
    .withMessage("Debe tener al menos 3 caracteres"),

  body("email")
    .isEmail()
    .withMessage("Debe ser un correo electronico valido")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),

  body("objective").trim().notEmpty().withMessage("El objetivo es obligatorio"),

  body("weight")
    .isFloat({ min: 1 })
    .withMessage("El peso debe ser un número válido mayor a 0"),

  body("height")
    .isFloat({ min: 1 })
    .withMessage("La altura debe ser un número válido mayor a 0"),
];
