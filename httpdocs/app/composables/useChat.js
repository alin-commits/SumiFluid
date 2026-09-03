const isOpen = ref(false);
const messages = ref([
  {
    role: "assistant",
    content:
      "¡Hola! Soy el asistente de Sumifluid. Puedo ayudarte a orientarte por nuestro catálogo de hidráulica, neumática, estanqueidad y vacío. ¿En qué puedo ayudarte?",
  },
]);
const isSending = ref(false);
const error = ref(null);

export function useChat() {
  function toggle() {
    isOpen.value = !isOpen.value;
  }

  async function sendMessage(text) {
    const content = text.trim();
    if (!content || isSending.value) return;

    error.value = null;
    messages.value.push({ role: "user", content });
    isSending.value = true;

    try {
      const { reply } = await $fetch("/api/chat", {
        method: "POST",
        body: {
          messages: messages.value.slice(-20).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        },
      });
      messages.value.push({ role: "assistant", content: reply });
    } catch (err) {
      error.value =
        err?.data?.message ||
        "No se pudo enviar el mensaje. Inténtalo de nuevo.";
    } finally {
      isSending.value = false;
    }
  }

  return { isOpen, messages, isSending, error, toggle, sendMessage };
}
