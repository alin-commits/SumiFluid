// TEMPORAL: ruta de diagnóstico, eliminar tras depurar el chatbot.
export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const gaId = config.geminiApiKey;
  const model = config.geminiModel;

  const info: Record<string, unknown> = {
    aiProvider: config.aiProvider,
    geminiModel: model,
    geminiKeyPresent: !!gaId,
    geminiKeyLength: gaId ? gaId.length : 0,
    geminiKeyPreview: gaId
      ? `${gaId.slice(0, 6)}...${gaId.slice(-4)}`
      : null,
    rawEnvAiProvider: process.env.AI_PROVIDER ?? null,
    rawEnvGeminiKeyPresent: !!process.env.GEMINI_API_KEY,
    rawEnvGeminiKeyLength: process.env.GEMINI_API_KEY
      ? process.env.GEMINI_API_KEY.length
      : 0,
    rawEnvGeminiModel: process.env.GEMINI_MODEL ?? null,
    allEnvKeysContainingGemini: Object.keys(process.env).filter((k) =>
      k.toUpperCase().includes("GEMINI"),
    ),
    allEnvKeysContainingAi: Object.keys(process.env).filter((k) =>
      k.toUpperCase().includes("AI_"),
    ),
    totalEnvKeys: Object.keys(process.env).length,
    sampleEnvKeys: Object.keys(process.env).slice(0, 40),
  };

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${gaId}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: "hola" }] }],
      }),
    });
    const text = await res.text();
    info.geminiStatus = res.status;
    info.geminiResponse = text.slice(0, 1500);
  } catch (err: unknown) {
    info.fetchError = err instanceof Error ? err.message : String(err);
  }

  return info;
});
