import * as z from "zod";

const sinSaltosDeLinea = (val: string) => !/[\r\n]/.test(val);

export const contactSchema = z.object({
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
  asunto: z
    .string()
    .min(3, "Selecciona un asunto")
    .max(120, "El asunto es demasiado largo")
    .refine(sinSaltosDeLinea, "Carácter no permitido"),
  mensaje: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(500, "El mensaje es demasiado largo"),
  // Producto/subcategoría desde la que se envió el formulario (opcional, no editable)
  producto: z
    .string()
    .max(120, "El producto es demasiado largo")
    .refine(sinSaltosDeLinea, "Carácter no permitido")
    .optional(),
  // Campo honeypot - debe estar vacío
  website: z.string().max(0).optional(),
});

export type ContactSchema = z.output<typeof contactSchema>;
