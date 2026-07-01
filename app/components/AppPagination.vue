<script setup lang="ts">
// Numbered pager with prev/next controls. Renders nothing when there's only a
// single page, so callers can drop it in unconditionally.
const props = defineProps<{
  /** Current page (1-based), used with v-model. */
  modelValue: number
  /** Total number of pages. */
  pageCount: number
}>()

const emit = defineEmits<{
  'update:modelValue': [page: number]
}>()

const pages = computed(() => Array.from({length: props.pageCount}, (_, i) => i + 1))

function go(page: number) {
  if (page < 1 || page > props.pageCount || page === props.modelValue) return
  emit('update:modelValue', page)
}
</script>

<template>
  <nav
    v-if="pageCount > 1"
    class="flex items-center justify-center gap-2 pt-9 max-w-full overflow-x-auto px-2"
    aria-label="Pagination"
  >
    <button
      type="button"
      class="font-body text-sm font-semibold rounded-[10px] w-10 h-10 flex items-center justify-center transition-colors bg-card text-primary hover:bg-subtle disabled:opacity-40 disabled:pointer-events-none"
      :disabled="modelValue === 1"
      aria-label="Previous page"
      @click="go(modelValue - 1)"
    >
      ←
    </button>

    <button
      v-for="page in pages"
      :key="page"
      type="button"
      class="font-body text-sm font-semibold rounded-[10px] w-10 h-10 flex items-center justify-center transition-colors"
      :class="page === modelValue
        ? 'bg-amber text-on-amber'
        : 'bg-card text-primary hover:bg-subtle'"
      :aria-current="page === modelValue ? 'page' : undefined"
      @click="go(page)"
    >
      {{ page }}
    </button>

    <button
      type="button"
      class="font-body text-sm font-semibold rounded-[10px] w-10 h-10 flex items-center justify-center transition-colors bg-card text-primary hover:bg-subtle disabled:opacity-40 disabled:pointer-events-none"
      :disabled="modelValue === pageCount"
      aria-label="Next page"
      @click="go(modelValue + 1)"
    >
      →
    </button>
  </nav>
</template>
