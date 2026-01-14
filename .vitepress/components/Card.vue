<template>
  <div class="card p-6" @click="handleJumpToDeploy">
    <slot> </slot>
  </div>
</template>

<script setup>
const props = defineProps({
  link: { type: String, default: "" },
});
const handleJumpToDeploy = () => {
  if (!props.link) return;
  try {
    const isExternal = /^(https?:)?\/\//.test(props.link);
    // 外部链接在新标签打开，站内链接在当前标签打开
    window.open(props.link, isExternal ? "_blank" : "_self");
  } catch (e) {
    location.href = props.link;
  }
};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 12px;
  border: 1px solid var(--vp-c-gray-1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: transform 220ms ease, box-shadow 220ms ease,
    border-color 220ms ease;
  will-change: transform;
  cursor: pointer;
  &:hover {
    transform: translateY(-4px);
    /* 使用完整 border 以保证在某些主题/浏览器的覆盖规则下依然生效，提供后备色 */
    border: 1px solid var(--vp-c-brand-1, #7c3aed);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.08);
  }
}
</style>
