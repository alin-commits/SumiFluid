import * as z from "zod";

const sinSaltosDeLinea = (val: string) => !/[\r\n]/.test(val);

export const presupuestoItemSchema = z.object({
  codigo: z.string().min(1).max(60).refine(sinSaltosDeLinea, "Carácter no permitido"),
  nombre: z.string().min(1).max(160).refine(sinSaltosDeLinea, "Carácter no permitido"),
  cantidad: z.number().int().min(1, "Cantidad mínima 1").max(9999, "Cantidad demasiado alta"),
});

export const presupuestoSchema = z.object({
  items: z
    .array(presupuestoItemSchema)
    .min(1, "Añade al menos un producto")
    .max(50, "Demasiados productos en una sola solicitud"),
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(80, "El nombre es demasiado largo")
    .refine(sinSaltosDeLinea, "Carácter no permitido"),
  email: z
    .email("Correo electrónico no válido")
    .max(50, "El correo es demasiado largo")
    .refine(sinSaltosDeLinea, "Carácter no permitido"),
  telefono: z.string().regex(/^\+?[0-9\s\-()]{7,20}$/, "Teléfono no válido"),
  notas: z
    .string()
    .max(500, "Las notas son demasiado largas")
    .optional()
    .or(z.literal("")),
  // Campo honeypot - debe estar vacío
  website: z.string().max(0).optional(),
});

export const presupuestoPdfSchema = z.object({
  items: z
    .array(presupuestoItemSchema)
    .min(1, "Añade al menos un producto")
    .max(50, "Demasiados productos en una sola solicitud"),
});

export type PresupuestoSchema = z.output<typeof presupuestoSchema>;
