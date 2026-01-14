<template>
  <div class="card">
    <div class="card-header">
      <span class="title"
        ><slot name="title">{{ title }}</slot></span
      >
    </div>

    <div class="card-body">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: { type: String, default: "" },
  content: { type: String, default: "" },
});
</script>
<style lang="scss" scoped>
.card {
  --card-bg: linear-gradient(180deg, #ffffff 0%, #fbfbff 100%);
  --card-border: rgba(15, 23, 42, 0.04);
  --card-text: #0f172a;
  --card-subtle: rgba(15, 23, 42, 0.03);
  --glow-opacity: 0.65;
  --glow-filter: blur(18px);

  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
  border-radius: 12px;
  overflow: hidden;
  background: var(--card-bg);
  position: relative;
  transition: transform 220ms ease, box-shadow 220ms ease;
  will-change: transform;

  border: 1px solid var(--card-border);

  &::after {
    content: "";
    position: absolute;
    inset: -2px;
    z-index: -1;
    border-radius: 14px;
    background: conic-gradient(
      from 120deg at 50% 50%,
      #7c3aed,
      #06b6d4,
      #f59e0b,
      #ef4444,
      #7c3aed
    );
    opacity: 0;
    filter: var(--glow-filter);
    transition: opacity 220ms ease, transform 220ms ease;
    transform: scale(0.96);
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 14px 40px rgba(124, 58, 237, 0.12);
  }

  &:hover::after {
    opacity: var(--glow-opacity);
    transform: scale(1);
  }

  .card-header {
    padding: 18px 16px;
    font-weight: 700;
    font-size: 16px;
    color: var(--card-text);
  }

  .card-body {
    padding: 14px 16px 20px 16px;
    color: #374151;
    line-height: 1.7;
    border-top: 1px solid var(--card-subtle);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.8)
    );
    flex: 1 1 auto;
  }
}

@media (prefers-color-scheme: dark) {
  .card {
    --card-bg: linear-gradient(180deg, #0b1220 0%, #071026 100%);
    --card-border: rgba(255, 255, 255, 0.06);
    --card-text: #e6eef8;
    --card-subtle: rgba(255, 255, 255, 0.03);
    --glow-opacity: 0.45;
    --glow-filter: blur(22px);
  }

  .card .card-body {
    color: #cbd5e1;
    background: linear-gradient(
      180deg,
      rgba(10, 14, 22, 0.4),
      rgba(10, 14, 22, 0.6)
    );
  }
}

.dark .card,
.theme-dark .card {
  --card-bg: linear-gradient(180deg, #0b1220 0%, #071026 100%);
  --card-border: rgba(255, 255, 255, 0.06);
  --card-text: #e6eef8;
  --card-subtle: rgba(255, 255, 255, 0.03);
  --glow-opacity: 0.45;
  --glow-filter: blur(22px);
}

.dark .card .card-body,
.theme-dark .card .card-body {
  color: #cbd5e1;
  background: linear-gradient(
    180deg,
    rgba(10, 14, 22, 0.4),
    rgba(10, 14, 22, 0.6)
  );
}
</style>
