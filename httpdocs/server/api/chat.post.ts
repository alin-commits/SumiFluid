import { chatRequestSchema } from "~~/shared/schemas/chat";
import { getAiProvider } from "../utils/ai";
import { buscarProductosRelevantes } from "../utils/buscarProductos";
import { logChatInteraction } from "../utils/logChatInteraction";

// Rate limiting - Map para almacenar intentos por IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hora
const MAX_REQUESTS = 20; // Máximo 20 mensajes por hora por IP

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
      if (now > record.resetTime) {
        rateLimitMap.delete(ip);
      }
    }
  },
  60 * 60 * 1000,
);

const SYSTEM_PROMPT = `Eres el asistente virtual de Sumifluid, distribuidor industrial de componentes de hidráulica, neumática, estanqueidad y vacío, con sede en Elche (Alicante) y taller propio de fabricación de latiguillos y reparación de maquinaria.

Catálogo de la empresa:
- Hidráulica: bombas, motores, centrales, cilindros, latiguillos, filtraje y más.
- Neumática: cilindros, válvulas, racordaje, tubería y automatización.
- Estanqueidad: juntas tóricas, retenes, collarines y otros elementos de sellado (+5.000 referencias).
- Vacío: bombas, eyectores, turbinas y ventosas de vacío.
- Productos: aceites, grasas, filtros y manómetros para mantenimiento industrial.

Enlaces internos útiles que puedes usar en tus respuestas:
- /contacto (formulario de contacto y presupuesto)
- /herramientas-calculo (calculadoras técnicas: área, capacidad, fuerza y velocidad de cilindros, potencia de bombas y motores)
- /hidraulica, /neumatica, /estanqueidad, /vacio, /productos (catálogo por familia)
- /blog (artículos técnicos)

Formato de tus respuestas:
- Responde siempre en español, de forma breve, clara y profesional.
- Puedes usar **negrita** para destacar términos clave, __subrayado__ para remarcar avisos importantes, y enlaces con la sintaxis [texto del enlace](/ruta-interna) cuando tenga sentido dirigir al usuario a una página del sitio.
- Cuando la respuesta implique una acción clara (pedir presupuesto, ver catálogo, usar una calculadora), incluye un enlace a la página correspondiente en vez de solo mencionarla.
- Si en el mensaje del sistema recibes un bloque "PRODUCTOS ENCONTRADOS EN EL CATÁLOGO", y alguno coincide claramente con lo que pregunta el usuario, incluye su marcador {{producto:codigo|nombre|enlace}} exactamente tal cual aparece (no lo reescribas ni lo expliques): se convierte automáticamente en una tarjeta con enlace y botón para añadirlo al presupuesto. No inventes marcadores de producto que no estén en ese bloque.
- No uses otro tipo de formato (títulos, listas numeradas, tablas, cursiva).

Instrucciones:
- Puedes explicar qué es un componente, para qué sirve y en qué familia del catálogo se encuadra.
- NUNCA inventes precios, disponibilidad de stock exacta, plazos de entrega concretos ni especificaciones técnicas precisas (presiones, medidas, tolerancias) de una referencia concreta: son datos que solo puede confirmar el equipo técnico. Si te preguntan por ello, indica que deben solicitar presupuesto o contactar directamente, con el enlace correspondiente.
- Solo menciona códigos de producto concretos si aparecen en el bloque "PRODUCTOS ENCONTRADOS EN EL CATÁLOGO" de ese turno; nunca inventes un código de referencia.
- Para presupuestos, pedidos o dudas técnicas concretas, dirige siempre al usuario al formulario de [pedir presupuesto](/contacto).
- Si preguntan algo sin relación con la empresa o sus productos, indícalo amablemente y redirige la conversación hacia en qué puedes ayudar.
- No des consejos de seguridad ni de instalación que puedan ser críticos sin remitir también a un técnico cualificado.`;

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
      message: "Demasiados mensajes. Inténtalo de nuevo en unos minutos.",
    });
  }

  const body = await readBody(event);
  const result = chatRequestSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: "Datos inválidos",
      data: result.error.flatten(),
    });
  }

  const startedAt = Date.now();
  const config = useRuntimeConfig();

  try {
    const ultimoMensaje = [...result.data.messages]
      .reverse()
      .find((m) => m.role === "user");

    let systemPrompt = SYSTEM_PROMPT;
    if (ultimoMensaje && config.public.presupuestoEnabled) {
      const productos = await buscarProductosRelevantes(
        config.public.strapiUrl,
        ultimoMensaje.content,
      );
      if (productos.length) {
        const bloque = productos
          .map(
            (p) =>
              `- Código: ${p.codigo} | Nombre: ${p.nombre} | Marcador: {{producto:${p.codigo}|${p.nombre}|${p.enlace}}}`,
          )
          .join("\n");
        systemPrompt += `\n\nPRODUCTOS ENCONTRADOS EN EL CATÁLOGO (relevantes para el último mensaje del usuario):\n${bloque}`;
      }
    }

    const provider = getAiProvider();
    const reply = await provider.chat(result.data.messages, systemPrompt);

    logChatInteraction({
      mensajes: result.data.messages.length,
      exito: true,
      proveedor: config.aiProvider,
      modelo: config.aiProvider === "openai" ? config.openaiModel : config.geminiModel,
      duracionMs: Date.now() - startedAt,
      productoSugerido: reply.includes("{{producto:"),
    });

    return { reply };
  } catch (error: unknown) {
    console.error("Error en chat AI:", error);

    logChatInteraction({
      mensajes: result.data.messages.length,
      exito: false,
      errorMensaje: error instanceof Error ? error.message.slice(0, 200) : "Error desconocido",
      proveedor: config.aiProvider,
      duracionMs: Date.now() - startedAt,
    });

    throw createError({
      statusCode: 500,
      message: "No se pudo obtener respuesta del asistente.",
    });
  }
});
