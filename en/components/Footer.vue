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
        MCP CAN Make managing and expanding multiple MCP servers simple,
        providing open source and self hosting options.
      </div>
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
        <div>docs</div>
        <div
          class="text-gray-400 cursor-pointer text-sm my-2"
          @click="handleInstall"
        >
          Install
        </div>
      </div>
      <div class="mx-12">
        <div>Community</div>
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
        <div>About</div>
        <div
          class="text-gray-400 cursor-pointer text-sm my-2"
          @click="handleFunciton"
        >
          Join us
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
