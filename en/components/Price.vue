<template>
  <div
    class="max-w-sm relative w-full mx-auto rounded-xl p-6 transition-shadow duration-200 shadow-md bg-gray-600 dark:bg-black/50 border-gray-200/10 dark:border-gray-700/40 flex flex-col"
    :class="active ? 'border-active ' : 'border'"
  >
    <div class="flex items-center justify-between">
      <div class="text-lg font-semibold text-white">{{ title }}</div>
      <div class="text-sm text-gray-400">{{ title }}</div>
    </div>

    <div class="mt-4 flex items-baseline gap-3">
      <div class="text-3xl font-extrabold text-white">{{ price }}</div>
      <div class="text-sm text-gray-400">{{ period }}</div>
    </div>

    <p class="mt-2 text-sm text-gray-400">{{ desc }}</p>

    <ul class="mt-4 space-y-3 flex-grow">
      <li v-for="(f, i) in features" :key="i" class="flex gap-3 items-start">
        <svg
          class="w-5 h-5 mt-0.5 flex-shrink-0 text-green-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M16.704 5.29a1 1 0 010 1.42l-7.07 7.07a1 1 0 01-1.415 0l-3.182-3.182a1 1 0 111.415-1.415l2.474 2.474 6.363-6.364a1 1 0 011.415 0z"
            clip-rule="evenodd"
          />
        </svg>
        <div>
          <div class="text-white">{{ f.title }}</div>
          <div v-if="f.subtitle" class="text-sm text-gray-400">
            {{ f.subtitle }}
          </div>
        </div>
      </li>
    </ul>

    <button
      @click="onClick"
      :aria-label="`Use Start ${title}`"
      class="mt-6 w-full py-2 rounded-md text-white bg-gray-500 hover:bg-gray-400 active:translate-y-0.5 transition-transform duration-150"
      :class="active ? 'start-btn' : ''"
    >
      Use Start
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: { type: String, default: "社区版" },
  price: { type: String, default: "¥0" },
  period: { type: String, default: "/month" },
  desc: { type: String, default: "社区版" },
  active: { type: Boolean, default: false },
  features: {
    type: Array as () => Array<{ title: string; subtitle?: string }>,
    default: () => [
      { title: "MCP集中管理" },
      { title: "Web仪表板" },
      { title: "容器管理" },
      { title: "同步 Dify 与 n8n（更新中）" },
      { title: "Token 校验" },
      { title: "Kubernetes 与 Docker" },
      { title: "使用文档" },
      { title: "持续更新" },
    ],
  },
  cta: { type: String, default: "#" },
});
function onClick() {
  if (!props.cta) return;
  const isExternal = /^(https?:)?\/\//.test(props.cta);
  if (isExternal) {
    window.open(props.cta, "_blank", "noopener");
  } else {
    window.location.href = props.cta;
  }
}
</script>

<style lang="scss" scoped>
.border-active {
  border-width: 3px;
  border-color: rgba(103, 58, 183, 1);
}
.start-btn {
  background: linear-gradient(
    270deg,
    rgba(98, 60, 186, 1) -0%,
    rgba(42, 97, 232, 1) 100%
  );
  border: none;
  transition: all 0.3s;
  &.button {
    color: #fff;
  }
  &:hover {
    scale: 1.1;
  }
}
</style>
