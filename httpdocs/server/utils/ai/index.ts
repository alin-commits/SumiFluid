import type { AiProvider } from "./types";
import { createGeminiProvider } from "./providers/gemini";
import { createOpenAiProvider } from "./providers/openai";

export type { AiProvider, ChatMessage } from "./types";

let cachedProvider: AiProvider | null = null;

export function getAiProvider(): AiProvider {
  if (cachedProvider) return cachedProvider;

  const config = useRuntimeConfig();
  const providerName = (config.aiProvider || "gemini").toLowerCase();

  if (providerName === "gemini") {
    if (!config.geminiApiKey) {
      throw new Error("Missing GEMINI_API_KEY env var");
    }
    cachedProvider = createGeminiProvider(
      config.geminiApiKey,
      config.geminiModel || "gemini-2.5-flash",
    );
    return cachedProvider;
  }

  if (providerName === "openai") {
    if (!config.openaiApiKey) {
      throw new Error("Missing OPENAI_API_KEY env var");
    }
    cachedProvider = createOpenAiProvider(
      config.openaiApiKey,
      config.openaiModel || "gpt-4o-mini",
    );
    return cachedProvider;
  }

  throw new Error(
    `Unknown AI_PROVIDER "${providerName}". Expected "gemini" or "openai".`,
  );
}
