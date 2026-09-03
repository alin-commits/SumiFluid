const STORAGE_KEY = "sumifluid-presupuesto";
let hydrated = false;

export function usePresupuesto() {
  const items = useState("presupuesto-items", () => []);
  const isOpen = useState("presupuesto-open", () => false);

  if (import.meta.client && !hydrated) {
    hydrated = true;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) items.value = JSON.parse(raw);
    } catch {
      // localStorage no disponible o dato corrupto: se ignora, el carrito empieza vacío
    }
  }

  function persist() {
    if (!import.meta.client) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value));
    } catch {
      // localStorage no disponible: el carrito sigue funcionando solo en memoria
    }
  }

  function toggle() {
    isOpen.value = !isOpen.value;
  }

  function addItem(producto, cantidad = 1) {
    const existing = items.value.find((i) => i.codigo === producto.codigo);
    if (existing) {
      existing.cantidad += cantidad;
    } else {
      items.value.push({
        codigo: producto.codigo,
        nombre: producto.nombre,
        imagenUrl: producto.imagenUrl ?? null,
        enlace: producto.enlace ?? null,
        cantidad,
      });
    }
    persist();
  }

  function removeItem(codigo) {
    items.value = items.value.filter((i) => i.codigo !== codigo);
    persist();
  }

  function updateCantidad(codigo, cantidad) {
    const item = items.value.find((i) => i.codigo === codigo);
    if (item) item.cantidad = Math.max(1, Math.trunc(cantidad) || 1);
    persist();
  }

  function clear() {
    items.value = [];
    persist();
  }

  const count = computed(() =>
    items.value.reduce((sum, i) => sum + i.cantidad, 0),
  );

  async function verPdf() {
    if (!import.meta.client || !items.value.length) return;
    const blob = await $fetch("/api/presupuesto/pdf", {
      method: "POST",
      body: {
        items: items.value.map(({ codigo, nombre, cantidad }) => ({
          codigo,
          nombre,
          cantidad,
        })),
      },
      responseType: "blob",
    });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener");
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }

  return {
    items,
    isOpen,
    count,
    toggle,
    addItem,
    removeItem,
    updateCantidad,
    clear,
    verPdf,
  };
}
