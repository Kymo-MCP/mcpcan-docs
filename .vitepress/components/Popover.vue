<template>
  <el-popover :title="props.title" placement="top" width="auto" effect="dark">
    <template #reference>
      <el-icon class="cursor-pointer"><Warning /></el-icon>
    </template>
    <div>
      <el-image
        :src="props.src"
        :style="{
          width: `${Number(props.width) || 200}px`, // 转为数字，默认 200
          height: `${Number(props.height) || 200}px`,
        }"
      ></el-image>
    </div>
  </el-popover>
</template>

<script setup>
import { Warning } from "@element-plus/icons-vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
  width: {
    type: [String, Number],
    required: false,
    default: 200,
  },
  height: {
    type: [String, Number],
    required: false,
    default: 200,
  },
});
</script>
