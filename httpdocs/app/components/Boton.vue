<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  enlace: {
    type: String,
    default: "/",
  },
  btnSecondary: {
    type: Boolean,
    default: false,
  },
  btnGhostLight: {
    type: Boolean,
    default: false,
  },
  btnGhost: {
    type: Boolean,
    default: false,
  },
  flecha: {
    type: Boolean,
    default: false,
  },
});
const variantClass = computed(() => {
  if (props.btnSecondary) return "btn-secondary";
  if (props.btnGhost) return "btn-ghost";
  if (props.btnGhostLight) return "btn-ghost-light";
  return "btn-primary";
});
const isExternalLink = computed(() =>
  /^(tel:|mailto:|https?:\/\/)/i.test(props.enlace),
);
</script>

<template>
  <div>
    <a
      v-if="isExternalLink"
      :href="enlace"
      class="btn"
      :class="variantClass"
      target="_blank"
      rel="noopener noreferrer"
      >{{ label }}
      <Icon v-if="flecha" name="lucide:arrow-right" />
    </a>
    <NuxtLink v-else :to="enlace" class="btn" :class="variantClass"
      >{{ label }}
      <Icon v-if="flecha" name="lucide:arrow-right" />
    </NuxtLink>
  </div>
</template>

<style scoped>
.btn {
  min-width: 210px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--mono);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding: 1rem 1.6rem;
  border: 1px solid var(--ink);
  transition:
    background-color 0.3s,
    color 0.3s,
    border-color 0.3s,
    transform 0.3s;

  &:active {
    transform: scale(0.97);
  }
}

.btn-primary {
  background: var(--ink);
  color: #fff;

  &:hover {
    background: var(--accent);
    border-color: var(--accent);
  }
}

.btn-ghost {
  background: transparent;
  color: var(--ink);

  &:hover {
    background: var(--ink);
    color: #fff;
  }
}

.btn-ghost-light {
  border-color: rgba(255, 255, 255, 0.55);
  color: #fff;

  &:hover {
    background: #fff;
    color: var(--ink);
    border-color: #fff;
  }
}

.btn-secondary {
  background: var(--accent);
  color: var(--ink);
  border-color: var(--accent);

  &:hover {
    background: #fff;
    color: var(--ink);
    border-color: #fff;
  }
}
</style>
