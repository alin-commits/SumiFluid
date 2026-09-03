export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResult {
  text: string;
  tokensEntrada?: number;
  tokensSalida?: number;
}

export interface AiProvider {
  /** Sends the conversation to the model and returns the assistant's reply and token usage. */
  chat(messages: ChatMessage[], systemPrompt: string): Promise<ChatResult>;
}
