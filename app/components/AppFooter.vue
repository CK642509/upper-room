<script setup lang="ts">
import type {ContactMethod} from '~/types/homepage'

// Contact buttons come from the Sanity `homepage` singleton (same query the
// homepage uses — deduped per page). Falls back to the original three
// placeholder buttons when the document has none.
const {data: homepageData} = await useHomepageContent()

const FALLBACK_CONTACTS: ContactMethod[] = [
  {_key: 'whatsapp', label: 'WhatsApp', url: 'https://wa.me/'},
  {_key: 'line', label: 'Line', url: 'https://line.me/'},
  {_key: 'email', label: 'Email', url: 'mailto:hello@upperroom.co'},
]
const contacts = computed(() => {
  const methods = homepageData.value?.contactMethods
  return methods?.length ? methods : FALLBACK_CONTACTS
})

const contactHeading = computed(() => homepageData.value?.contactHeading || 'Ready to move in?')
const contactSubheading = computed(
  () => homepageData.value?.contactSubheading || 'We reply within 24 hours. No commitment needed.',
)

// The first button is solid navy and later ones fade, so however many buttons
// editors add, the row keeps its visual hierarchy.
const CONTACT_BG = ['#0D1829', 'rgba(13,24,41,0.60)', 'rgba(13,24,41,0.40)']
const contactBg = (index: number) => CONTACT_BG[Math.min(index, CONTACT_BG.length - 1)]

// Buttons with a qrImage open the QR popup instead of navigating away
// immediately; others (e.g. Email) keep the direct link.
const activeQrMethod = ref<ContactMethod | null>(null)
function onContactClick(method: ContactMethod) {
  if (method.qrImage) activeQrMethod.value = method
}
</script>

<template>
  <!-- Contact Section (shared footer on every page) -->
  <section id="contact" class="w-full bg-amber py-12 lg:py-14 px-5 md:px-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
    <div class="flex flex-col gap-2">
      <h2 class="font-heading text-[32px] lg:text-[36px] font-bold text-on-amber">{{ contactHeading }}</h2>
      <p class="font-body text-[15px] font-normal" style="color: rgba(13,24,41,0.67)">
        {{ contactSubheading }}
      </p>
    </div>
    <div class="flex flex-col lg:flex-row lg:items-center gap-3 w-full lg:w-auto">
      <component
        :is="method.qrImage ? 'button' : 'a'"
        v-for="(method, index) in contacts"
        :key="method._key"
        :type="method.qrImage ? 'button' : undefined"
        :href="method.qrImage ? undefined : method.url"
        :style="{background: contactBg(index)}"
        class="font-body text-sm font-bold text-primary rounded-full py-[13px] px-[22px] flex items-center justify-center gap-2 w-full lg:w-auto hover:opacity-80 transition-opacity"
        @click="onContactClick(method)"
      >
        {{ method.label }}
      </component>
    </div>
    <AppQrModal v-if="activeQrMethod" :method="activeQrMethod" @close="activeQrMethod = null" />
  </section>
</template>
