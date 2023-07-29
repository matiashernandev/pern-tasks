import { z } from "zod"

export const createTaskSchema = z.object({
  title: z
    .string({
      required_error: "El título es requerido.",
      invalid_type_error: "El título debería ser un texto.",
    })
    .min(1)
    .max(255),
  description: z
    .string({
      required_error: "La descripción es requerida.",
      invalid_type_error: "La descripción debería ser un texto.",
    })
    .min(1)
    .max(255)
    .nullable()
    .optional(),
})
export const updateTaskSchema = z.object({
  title: z
    .string({
      required_error: "El título es requerido.",
      invalid_type_error: "El título debería ser un texto.",
    })
    .min(1)
    .max(255)
    .optional(),
  description: z
    .string({
      required_error: "La descripción es requerida.",
      invalid_type_error: "La descripción debería ser un texto.",
    })
    .min(1)
    .max(255)
    .nullable()
    .optional(),
})
