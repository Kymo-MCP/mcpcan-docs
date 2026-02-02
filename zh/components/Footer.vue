<template>
  <div class="grid grid-cols-1 md:grid-cols-2">
    <div class="gap-2">
      <div class="font-bold text-lg flex items-center">
        <el-image
          src="/logo.png"
          style="width: 24px; height: 24px"
          class="mr-2"
        ></el-image>
        MCP CAN
      </div>
      <div class="my-3 text-gray-400 text-sm">
        MCPCAN 让管理和扩展多个 MCP 服务器变得简单，提供开源 和自托管选项。
      </div>
      <div class="mb-6 text-gray-400 text-sm">opensource@kymo.cn</div>
      <div class="flex mb-6">
        <el-icon class="cursor-pointer">
          <i class="icon iconfont icon-GitHub" @click="handleGitHub"></i>
        </el-icon>
        <el-icon class="mx-3 cursor-pointer" @click="handleDiscord">
          <i class="icon iconfont icon-icon-17"></i>
        </el-icon>
        <el-icon class="cursor-pointer">
          <i class="icon iconfont icon-icon-68"></i>
        </el-icon>
      </div>
    </div>

    <div class="flex justify-start md:justify-end">
      <div>
        <div>文档</div>
        <div
          class="text-gray-400 cursor-pointer text-sm my-2"
          @click="handleInstall"
        >
          安装
        </div>
      </div>
      <div class="mx-12">
        <div>社区</div>
        <div
          class="text-gray-400 cursor-pointer text-sm my-2"
          @click="handleGitHub"
        >
          Github
        </div>
        <div
          class="text-gray-400 cursor-pointer text-sm my-2"
          @click="handleDiscord"
        >
          Discord
        </div>
      </div>
      <div>
        <div>关于我们</div>
        <div
          class="text-gray-400 cursor-pointer text-sm my-2"
          @click="handleFunciton"
        >
          功能
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const handleInstall = () => {
  window.location.href = "/zh/guide/welcome#快速开始";
};
const handleGitHub = () => {
  window.open("https://github.com/Kymo-MCP/mcpcan", "_blank");
};
const handleDiscord = () => {
  window.open("https://discord.gg/AHW6Bjfm4s", "_blank");
};
const handleFunciton = () => {
  window.location.href = "/zh/guide/welcome#核心功能";
};
</script>

<style lang="scss" scoped>
.test {
  cursor: pointer;
}
</style>
