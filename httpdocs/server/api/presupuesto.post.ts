import { presupuestoSchema } from "~~/shared/schemas/presupuesto";
import { buildPresupuestoPdf } from "~~/server/utils/presupuestoPdf";

// Rate limiting - Map para almacenar intentos por IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hora
const MAX_REQUESTS = 5; // Máximo 5 solicitudes de presupuesto por hora

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

function escaparHtml(texto: string) {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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
      message:
        "Demasiadas solicitudes enviadas. Por favor, inténtalo de nuevo más tarde.",
    });
  }

  const body = await readBody(event);
  const result = presupuestoSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: "Datos inválidos",
      data: result.error.flatten(),
    });
  }

  const { nombre, email, telefono, notas, items, website } = result.data;

  // Verificar honeypot - si está lleno, es un bot
  if (website && website.length > 0) {
    console.log(`Bot detectado desde IP: ${clientIp}`);
    return { success: true };
  }

  const nombreSeguro = escaparHtml(nombre);
  const emailSeguro = escaparHtml(email);
  const telefonoSeguro = escaparHtml(telefono);
  const notasSeguro = notas ? escaparHtml(notas) : "";

  const itemsHtml = items
    .map(
      (item) =>
        `<tr><td>${escaparHtml(item.codigo)}</td><td>${escaparHtml(item.nombre)}</td><td>${item.cantidad}</td></tr>`,
    )
    .join("");

  const { sendMail } = useNodeMailer();

  try {
    const pdfBuffer = await buildPresupuestoPdf({ nombre, email, telefono, notas, items });

    const resultado = await sendMail({
      to: process.env.CONTACT_EMAIL,
      from: `"Sumifluid:" <${process.env.CONTACT_EMAIL}>`,
      replyTo: email,
      subject: `Nueva solicitud de presupuesto: ${nombre}`,
      text: `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}${notas ? `\nNotas: ${notas}` : ""}\n\nProductos:\n${items.map((i) => `- ${i.codigo} — ${i.nombre} (x${i.cantidad})`).join("\n")}`,
      html: `
        <h3>Nueva solicitud de presupuesto</h3>
        <p><strong>Nombre:</strong> ${nombreSeguro}</p>
        <p><strong>Email:</strong> ${emailSeguro}</p>
        <p><strong>Teléfono:</strong> ${telefonoSeguro}</p>
        ${notasSeguro ? `<p><strong>Notas:</strong> ${notasSeguro}</p>` : ""}
        <table border="1" cellpadding="6" cellspacing="0">
          <thead><tr><th>Código</th><th>Artículo</th><th>Cantidad</th></tr></thead>
          <tbody>${itemsHtml}</tbody>
        </table>
      `,
      attachments: [
        {
          filename: `presupuesto-${Date.now()}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (!resultado.accepted || resultado.accepted.length === 0) {
      throw new Error("El email no pudo ser enviado");
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error al enviar presupuesto:", error);

    throw createError({
      statusCode: 500,
      message: error?.message || "Error desconocido al enviar la solicitud",
    });
  }
});
