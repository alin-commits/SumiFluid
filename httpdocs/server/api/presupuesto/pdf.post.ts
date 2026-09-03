import { presupuestoPdfSchema } from "~~/shared/schemas/presupuesto";
import { buildPresupuestoPdf } from "~~/server/utils/presupuestoPdf";

// Rate limiting - Map para almacenar intentos por IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hora
const MAX_REQUESTS = 20; // solo genera un PDF, sin enviar nada: límite más permisivo

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

setInterval(
  () => {
    const now = Date.now();
    for (const [ip, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) rateLimitMap.delete(ip);
    }
  },
  60 * 60 * 1000,
);

export default defineEventHandler(async (event) => {
  const ip =
    event.node.req.headers["x-forwarded-for"] ||
    event.node.req.headers["x-real-ip"] ||
    event.node.req.socket.remoteAddress ||
    "unknown";

  const clientIp: string = Array.isArray(ip)
    ? (ip[0] ?? "unknown")
    : ip.split(",")[0]?.trim() || "unknown";

  if (!checkRateLimit(clientIp)) {
    throw createError({
      statusCode: 429,
      message: "Demasiadas solicitudes. Por favor, inténtalo de nuevo más tarde.",
    });
  }

  const body = await readBody(event);
  const result = presupuestoPdfSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: "Datos inválidos",
      data: result.error.flatten(),
    });
  }

  const pdfBuffer = await buildPresupuestoPdf({ items: result.data.items });

  setResponseHeaders(event, {
    "Content-Type": "application/pdf",
    "Content-Disposition": 'inline; filename="presupuesto-sumifluid.pdf"',
  });

  return pdfBuffer;
});
