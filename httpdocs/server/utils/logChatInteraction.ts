interface ChatLogData {
  mensajes: number;
  exito: boolean;
  errorMensaje?: string;
  proveedor?: string;
  modelo?: string;
  duracionMs?: number;
  productoSugerido?: boolean;
  tokensEntrada?: number;
  tokensSalida?: number;
}

/**
 * Registra una interacción del chat en Strapi para el panel de estadísticas.
 * Nunca lanza: un fallo al registrar no debe romper la respuesta al usuario.
 */
export async function logChatInteraction(data: ChatLogData): Promise<void> {
  const config = useRuntimeConfig();
  const token = config.strapiChatLogToken;
  if (!token) return; // sin token configurado, el registro queda desactivado en silencio

  try {
    await $fetch(`${config.public.strapiUrl}/api/chat-logs`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: { data },
    });
  } catch (error) {
    console.error("No se pudo registrar la interacción del chat:", error);
  }
}
