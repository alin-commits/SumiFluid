export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const token = config.strapiChatLogToken;

  const result: Record<string, unknown> = {
    tokenPresent: Boolean(token),
    tokenLength: token ? token.length : 0,
    strapiUrl: config.public.strapiUrl,
  };

  if (token) {
    try {
      const res = await $fetch.raw(`${config.public.strapiUrl}/api/chat-logs`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: {
          data: {
            mensajes: 1,
            exito: true,
            proveedor: "debug",
            duracionMs: 1,
          },
        },
      }).catch((err) => {
        result.writeError = err?.data || err?.message || String(err);
        return null;
      });
      if (res) {
        result.writeStatus = res.status;
      }
    } catch (err: any) {
      result.unexpectedError = err?.message || String(err);
    }
  }

  return result;
});
