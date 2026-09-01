import { contactSchema } from "~~/shared/schemas/contact";

// Rate limiting - Map para almacenar intentos por IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Configuración del rate limit
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hora en milisegundos
const MAX_REQUESTS = 3; // Máximo 3 mensajes por hora

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    // Primera solicitud o ventana expirada
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false; // Límite excedido
  }

  // Incrementar contador
  record.count++;
  return true;
}

// Limpiar registros antiguos cada hora
setInterval(
  () => {
    const now = Date.now();

    for (const [ip, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) {
        rateLimitMap.delete(ip);
      }
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
  // Obtener IP del cliente
  const ip =
    event.node.req.headers["x-forwarded-for"] ||
    event.node.req.headers["x-real-ip"] ||
    event.node.req.socket.remoteAddress ||
    "unknown";

  const clientIp: string = Array.isArray(ip)
    ? (ip[0] ?? "unknown")
    : ip.split(",")[0]?.trim() || "unknown";

  // Verificar rate limit
  if (!checkRateLimit(clientIp)) {
    throw createError({
      statusCode: 429,
      message:
        "Demasiados mensajes enviados. Por favor, inténtalo de nuevo más tarde.",
    });
  }

  const body = await readBody(event);
  const result = contactSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: "Datos inválidos",
      data: result.error.flatten(),
    });
  }

  const { asunto, nombre, email, telefono, mensaje, website } = result.data;

  // Verificar honeypot - si está lleno, es un bot
  if (website && website.length > 0) {
    console.log(`Bot detectado desde IP: ${clientIp}`);

    // Retornar éxito falso para no alertar al bot
    return { success: true };
  }

  const asuntoSeguro = escaparHtml(asunto);
  const nombreSeguro = escaparHtml(nombre);
  const emailSeguro = escaparHtml(email);
  const telefonoSeguro = escaparHtml(telefono);
  const mensajeSeguro = escaparHtml(mensaje).replace(/\n/g, "<br>");

  const { sendMail } = useNodeMailer();

  try {
    const resultado = await sendMail({
      to: process.env.CONTACT_EMAIL,
      from: `"Sumifluid:" <${process.env.CONTACT_EMAIL}>`,
      replyTo: email,
      subject: `Nuevo mensaje Sumifluid: ${asunto}`,
      text: `Asunto: ${asunto}
Nombre: ${nombre}
Email: ${email}
Teléfono: ${telefono}

Mensaje:
${mensaje}`,
      html: `
        <h3>Nuevo mensaje de contacto</h3>
        <p><strong>Asunto:</strong> ${asuntoSeguro}</p>
        <p><strong>Nombre:</strong> ${nombreSeguro}</p>
        <p><strong>Email:</strong> ${emailSeguro}</p>
        <p><strong>Teléfono:</strong> ${telefonoSeguro}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensajeSeguro}</p>
      `,
    });

    if (!resultado.accepted || resultado.accepted.length === 0) {
      throw new Error("El email no pudo ser enviado");
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error al enviar email:", error);

    throw createError({
      statusCode: 500,
      message: error?.message || "Error desconocido al enviar email",
    });
  }
});