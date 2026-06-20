<template>
  <!-- Contact Section (shared footer on every page) -->
  <section id="contact" class="w-full bg-amber py-12 lg:py-14 px-5 md:px-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
    <div class="flex flex-col gap-2">
      <h2 class="font-heading text-[32px] lg:text-[36px] font-bold text-on-amber">Ready to move in?</h2>
      <p class="font-body text-[15px] font-normal" style="color: rgba(13,24,41,0.67)">
        We reply within 24 hours. No commitment needed.
      </p>
    </div>
    <div class="flex flex-col lg:flex-row lg:items-center gap-3 w-full lg:w-auto">
      <a
        href="https://wa.me/"
        class="font-body text-sm font-bold text-primary bg-[#0D1829] rounded-full py-[13px] px-[22px] flex items-center justify-center gap-2 w-full lg:w-auto hover:opacity-90 transition-opacity"
      >
        WhatsApp
      </a>
      <a
        href="#"
        class="font-body text-sm font-bold text-primary rounded-full py-[13px] px-[22px] flex items-center justify-center gap-2 w-full lg:w-auto hover:opacity-80 transition-opacity"
        style="background: rgba(13,24,41,0.60)"
      >
        Line
      </a>
      <a
        href="mailto:hello@upperroom.co"
        class="font-body text-sm font-bold text-primary rounded-full py-[13px] px-[22px] flex items-center justify-center gap-2 w-full lg:w-auto hover:opacity-80 transition-opacity"
        style="background: rgba(13,24,41,0.40)"
      >
        Email
      </a>
    </div>
  </section>
</template>
