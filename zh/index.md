---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "MCP CAN"
  text: "mcp-can"
  tagline: MCP服务超级管理平台
  image:
    src: /global.png
    alt: MCP CAN
  actions:
    - theme: brand
      text: 快速开始
      link: "/zh/guide/quick-start"
    - theme: alt
      text: 部署
      link: "/zh/guide/welcome#快速开始"
    - theme: sample
      text: 立即体验
      link: "https://demo.mcpcan.com/"
---

<div class="grid grid-cols-1 md:grid-cols-3">
  <div class="md:col-span-1">
    <DescCard 
    title="容器化 MCP 服务部署"
    desc="通过标准化容器技术实现 MCP 服务的快速、一键部署，提升交付效率与环境兼容性。"
    :features='["容器镜像标准化封装","一键式容器实例部署","环境隔离与资源弹性分配"]'
    ></DescCard>
  </div>
  <div class="md:col-span-2 flex justify-center items-center md:justify-end">
    <ClientOnly>
      <el-image  src="/images/instance-page.png" style="width:100%" class="shadow-glow rounded-xl p-3"></el-image>
    </ClientOnly>
  </div>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 mt-10">
  <div class="md:col-span-2 order-2 md:order-1 flex justify-center items-center md:justify-start">
    <ClientOnly>
      <el-image  src="/images/mcp-protocol.png" style="width:80%" class="shadow-glow rounded-xl p-3"></el-image>
    </ClientOnly>
  </div>
  <div class="md:col-span-1 order-1 md:order-2">
    <DescCard 
    title="多协议 MCP 服务部署与协议转换能力"
    desc="通过 Stdio、SSE、Streamable HTTP 多协议适配，结合协议配置智能转换功能，实现 MCP 服务的灵活部署、多样化数据交互及跨协议场景兼容。"
    :features='["Stdio 标准输入输出协议原生适配","SSE 服务端事件实时数据推送部署","Streamable HTTP 流式通信协议支持","Stdio 协议配置→HTTP 协议配置智能转换"]'></DescCard>
  </div>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 mt-10">
  <div class="md:col-span-1">
    <DescCard 
    title="MCP 服务流量监控与可视化运维能力"
    desc="通过全方位流量采集、多维度状态监控及可视化呈现，实现 MCP 服务运行状态的实时感知、异常预警与高效运维。"
    :features='["全链路流量监控","服务核心指标可视化"]'></DescCard>
  </div>
  <div class="md:col-span-2 flex justify-center items-center md:justify-end">
    <ClientOnly>
      <el-image  src="/images/monitor-log.png" style="width:300px" class="rounded-xl"></el-image>
    </ClientOnly>
  </div>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 mt-10">
  <div class="md:col-span-2 order-2 md:order-1 flex justify-center items-center md:justify-start">
    <ClientOnly>
      <el-image  src="/images/access-type.png" style="width:60%" class="rounded-xl"></el-image>
    </ClientOnly>
  </div>
  <div class="md:col-span-1 order-1 md:order-2">
    <DescCard 
    title="多模式 MCP 服务统一管理平台"
    desc="支持直连、代理、托管三种灵活访问模式，实现跨部署环境（本地 / 远程）的 MCP 服务全生命周期统一管控，为企业提供多元化部署选择与一体化管理能力。"
    :features='["直连模式：本地 / 私有部署 MCP 服务直接接入，低延迟无中间转发","代理模式：通过平台代理节点转发请求，支持流量管控与安全隔离","托管模式：平台全托管部署与运维，企业无需关注底层基础设施"]'></DescCard>
  </div>
</div>

<div class="text-3xl text-center mb-3 font-bold mt-10" id="case">使用案例</div>
<div class="text-gray-400 mt-3 text-center mb-4">
  看看我们是如何使用这个MCPCAN提效我们的日常工作
</div>

<div class="mb-20 shadow-glow p-2 rounded-xl">
  <ClientOnly>
    <el-carousel height="auto" autoplay>
      <el-carousel-item style="height: auto;width:100%" v-for = "(item, index) in slides" :key="index">
        <el-image :src="item.url" :alt="item.alt" style="width:100%" fit="contain" />
      </el-carousel-item>
    </el-carousel>
  </ClientOnly>
</div>

<!-- <div class="text-3xl text-center mb-3 font-bold" id="price">定价</div>
<div class="text-gray-400 mt-3 text-center mb-4">
  免费开始构建，然后随着用户和团队的增长而扩展
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <PriceCard
    v-for = "(card,index) in priceCardList"
    :key="index"
    v-bind="{...card}"
  />
</div> -->

<div class="font-bold mt-40" id="community">
  <div class="text-3xl text-center mb-3">快速部署你的MCP服务</div>
  <div class="text-gray-500 text-center">开始使用MCPCAN来管理你的MCP</div>
  <div class="text-center mt-10 mb-40">
    <ClientOnly>
      <el-button round class="start-btn text-white dark:black" @click="handleStart">开始使用</el-button>
    </ClientOnly>
  </div>
</div>

<el-divider />

<Footer />

<script setup lang="ts">
import {ref} from 'vue'
import PriceCard from './components/Price.vue'
import Footer from './components/Footer.vue'

const slides = [
  { url: '/images/home.png', alt: '首页' },
  { url: '/images/template.png', alt: '模板' },
  { url: '/images/instance.png', alt: '实例' },
  { url: '/images/token.png', alt: '安全令牌' }
];
const priceCardList = ref([
  {
    title:'社区版',
    price:'¥0',
    period:"/month",
    desc:'开源免费，包含',
    features:[
      { title: 'MCP集中管理' },
      { title: 'Web仪表板' },
      { title: '容器管理' },
      { title: '同步 Dify 与 n8n（更新中）' },
      { title: 'Token校验' },
      { title: 'Kubernetes 与 Docker' },
      { title: '使用文档' },
      { title: '持续更新' }
    ],
    cta:'https://www.mcpcan.com'
  },
  {
    title:'企业版',
    price:'¥299',
    period:"/month",
    desc:'所有开源功能，还有',
    features:[
      { title: '用户管理' },
      { title: '权限管理' },
      { title: '空间隔离' },
      { title: '专属支持' },
      { title: '新功能优先体验' },
    ],
    cta:'https://www.mcpcan.com',
    active:true
  },
  {
    title:'定制版',
    price:'¥599',
    period:"/month",
    desc:'所有Starter功能，还有',
    features:[
      { title: '企业支持' },
      { title: '专业服务' },
      { title: '容器管理' },
    ],
    cta:'https://www.mcpcan.com'
  }
])
const handleStart = ()=>{
  window.open('https://demo.mcpcan.com' , "_blank");
}
</script>

<style style="scss" scoped>
.start-btn{
  background:linear-gradient(270deg, rgba(98, 60, 186, 1) -0%, rgba(42, 97, 232, 1) 100%);
  border:none;
  &.el-button{
    color:#fff;
  }
  &:hover{
    scale: 1.1;
  }
}
.shadow-glow{
  box-shadow: 0 10px 25px -5px rgba(59, 224, 246, 0.3), 0 8px 10px -6px rgba(59, 130, 246, 0.2);
}
</style>

<style lang="scss">
.VPFeature {
  cursor: pointer;
  transition: all 220ms ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.VPFeature:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 32px rgba(124,58,237,0.10);
}
@media (prefers-color-scheme: dark) {
  .VPFeature {
    box-shadow: 0 2px 8px rgba(0,0,0,0.10);
    background: linear-gradient(180deg, #0b1220 0%, #071026 100%);

  }
  .VPFeature:hover {
    box-shadow: 0 10px 32px rgba(124,58,237,0.18);
  }
}
.dark .VPFeature, .theme-dark .VPFeature {
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  background: linear-gradient(180deg, #0b1220 0%, #071026 100%);
  transition: all 220ms ease;

}
.dark .VPFeature:hover, .theme-dark .VPFeature:hover {
  transition: all 220ms ease;
  box-shadow: 0 10px 32px rgba(124,58,237,0.18);
}
.VPButton.sample{
  background-color: var(--vp-c-default-3);
  &:hover{
    border-color: var(--vp-c-brand);
  }
}
.dark .VPButton.sample{
  background-color: var(--c-bg-accent);
  &:hover{
    border-color: var(--vp-c-brand);
  }
}

</style>

<style>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-in-up { animation: fadeInUp 0.6s ease-out both; }
</style>
