import * as z from "zod";

const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(1000),
});

export const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema).min(1).max(20),
});

export type ChatRequestSchema = z.output<typeof chatRequestSchema>;
