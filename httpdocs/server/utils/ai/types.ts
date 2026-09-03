export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AiProvider {
  /** Sends the conversation to the model and returns the assistant's reply text. */
  chat(messages: ChatMessage[], systemPrompt: string): Promise<string>;
}
