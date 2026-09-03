import type { AiProvider, ChatMessage } from "../types";

export function createOpenAiProvider(
  apiKey: string,
  model: string,
): AiProvider {
  return {
    async chat(messages: ChatMessage[], systemPrompt: string) {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
          ],
          max_tokens: 800,
          temperature: 0.4,
        }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(
          `OpenAI API error (${res.status}): ${errText.slice(0, 500)}`,
        );
      }

      const json = await res.json();
      const text = json?.choices?.[0]?.message?.content?.trim();

      if (!text) {
        throw new Error("OpenAI returned no text");
      }

      return {
        text,
        tokensEntrada: json?.usage?.prompt_tokens,
        tokensSalida: json?.usage?.completion_tokens,
      };
    },
  };
}
