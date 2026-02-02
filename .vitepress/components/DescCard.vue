<template>
  <div class="max-w-md mx-auto rounded-xl p-6 text-white">
    <div
      class="w-10 h-10 rounded-full flex items-center justify-center text-xl"
    >
      {{ logo }}
    </div>
    <div class="flex-1">
      <h3 class="text-2xl font-extrabold leading-tight">{{ title }}</h3>
      <p class="mt-3 text-gray-400">{{ desc }}</p>

      <ul
        v-if="features && features.length"
        class="mt-4 space-y-2 text-gray-500 list-disc list-inside"
      >
        <li v-for="(f, i) in features" :key="i">{{ f }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  logo: { type: String, default: "" },
  title: { type: String, default: "" },
  desc: {
    type: String,
    default: "",
  },
  features: {
    type: Array as () => string[],
    default: () => [],
  },
});
</script>
<style lang="scss" scoped></style>
