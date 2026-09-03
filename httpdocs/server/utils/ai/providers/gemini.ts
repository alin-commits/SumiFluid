import type { AiProvider, ChatMessage } from "../types";

export function createGeminiProvider(
  apiKey: string,
  model: string,
): AiProvider {
  return {
    async chat(messages: ChatMessage[], systemPrompt: string) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const contents = messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            role: "system",
            parts: [{ text: systemPrompt }],
          },
          generationConfig: {
            maxOutputTokens: 800,
            temperature: 0.4,
          },
        }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(
          `Gemini API error (${res.status}): ${errText.slice(0, 500)}`,
        );
      }

      const json = await res.json();
      const text = json?.candidates?.[0]?.content?.parts
        ?.map((p: { text?: string }) => p.text ?? "")
        .join("")
        .trim();

      if (!text) {
        const finishReason = json?.candidates?.[0]?.finishReason;
        throw new Error(
          `Gemini returned no text (finishReason: ${finishReason ?? "unknown"})`,
        );
      }

      return {
        text,
        tokensEntrada: json?.usageMetadata?.promptTokenCount,
        tokensSalida: json?.usageMetadata?.candidatesTokenCount,
      };
    },
  };
}
