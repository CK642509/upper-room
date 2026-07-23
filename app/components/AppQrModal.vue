<script setup lang="ts">
import type {ContactMethod} from '~/types/homepage'

const props = defineProps<{method: ContactMethod}>()
const emit = defineEmits<{close: []}>()

const imgAttrs = useSanityImageAttrs()
// Fixed square crop so LINE's square QR and WhatsApp's tall card render at the
// same on-screen size — editors frame the actual QR via the image hotspot in
// Studio, so the source photos don't need matching dimensions.
const qrAttrs = computed(() => {
  if (!props.method.qrImage) return null
  return imgAttrs(props.method.qrImage, {width: 280, height: 280, sizes: '280px'})
})

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-base/80 px-5"
      role="dialog"
      aria-modal="true"
      :aria-label="`${method.label} QR code`"
      @click.self="emit('close')"
    >
      <div class="relative w-full max-w-[340px] rounded-lg bg-card border border-subtle p-6 flex flex-col items-center gap-4">
        <button
          type="button"
          class="absolute top-4 right-4 text-secondary hover:text-primary transition-colors"
          aria-label="Close"
          @click="emit('close')"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </button>

        <h3 class="font-heading text-xl font-bold text-primary text-center">Scan to add on {{ method.label }}</h3>

        <img
          v-if="qrAttrs"
          v-bind="qrAttrs"
          :alt="method.qrImage?.alt || `${method.label} QR code`"
          width="280"
          height="280"
          class="rounded-md w-[220px] h-[220px] lg:w-[260px] lg:h-[260px] bg-primary"
        >

        <a
          :href="method.url"
          target="_blank"
          rel="noopener noreferrer"
          class="font-body text-sm font-bold text-on-amber bg-amber rounded-full py-3 px-6 w-full text-center hover:opacity-90 transition-opacity"
        >
          Open {{ method.label }} instead
        </a>
      </div>
    </div>
  </Teleport>
</template>
