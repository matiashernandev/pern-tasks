import { z } from "zod"

export const signupSchema = z.object({
  name: z
    .string({
      required_error: "El nombre es requerido.",
      invalid_type_error: "El nombre debería ser un texto.",
    })
    .min(1)
    .max(255),

  email: z
    .string({
      required_error: "El email es requerido.",
      invalid_type_error: "El email debería ser un texto.",
    })
    .email({
      message: "El email debe ser un email válido",
    })
    .min(1)
    .max(255),

  password: z
    .string({
      required_error: "El password es requerido.",
      invalid_type_error: "El password debería ser un texto.",
    })
    .min(6)
    .max(255),
})
export const signinSchema = z.object({
  email: z
    .string({
      required_error: "El email es requerido.",
      invalid_type_error: "El email debería ser un texto.",
    })
    .email({
      message: "El email debe ser un email válido",
    })
    .min(1)
    .max(255),

  password: z
    .string({
      required_error: "El password es requerido.",
      invalid_type_error: "El password debería ser un texto.",
    })
    .min(4, {
      message: "El password debe tener al menos 4 caracteres",
    })
    .max(255),
})
