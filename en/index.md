---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "MCP CAN"
  text: "mcp-can"
  tagline: MCP Service Super Management Platform
  image:
    src: /global.png
    alt: MCP CAN
  actions:
    - theme: brand
      text: Get Started
      link: /en/guide/quick-start
    - theme: alt
      text: Deploy
      link: "/en/guide/welcome#quick-start"
    - theme: sample
      text: Demo
      link: "https://demo.mcpcan.com/"
---

<div class="grid grid-cols-1 md:grid-cols-3">
  <div class="md:col-span-1">
    <DescCard 
    title="Deploy MCP Service By Container"
    desc="Implementing fast and one click deployment of MCP services through standardized container technology, improving delivery efficiency and environmental compatibility."
    :features='["Container image standardization encapsulation","One click container instance deployment","Environmental isolation and flexible allocation of resources"]'
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
      <el-image  src="/images/mcp-protocol-en.png" style="width:80%" class="shadow-glow rounded-xl p-3"></el-image>
    </ClientOnly>
  </div>
  <div class="md:col-span-1 order-1 md:order-2">
    <DescCard 
    title="Multi protocol、MCP deployment、protocol conversion"
    desc="By adapting to multiple protocols such as Stdio, SSE, and Streamable HTTP, combined with intelligent protocol configuration conversion, MCP services can be flexibly deployed, diversified data exchange, and compatible across protocol scenarios."
    :features='["Stdio standard input/output protocol","SSE  server events push to deployment","Streamable HTTP Streaming communication protocol support","Stdio Protocol Configuration Conversion HTTP Protocol"]'></DescCard>
  </div>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 mt-10">
  <div class="md:col-span-1">
    <DescCard 
    title="MCP Service traffic monitoring and visual operation and maintenance capabilities"
    desc="Real time perception, abnormal warning, and efficient operation and maintenance of MCP service operation status are achieved through comprehensive traffic collection, multi-dimensional status monitoring, and visual presentation."
    :features='["Full link traffic monitoring","Visualization of core service indicators"]'></DescCard>
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
      <el-image  src="/images/access-type-en.png" style="width:60%" class="rounded-xl"></el-image>
    </ClientOnly>
  </div>
  <div class="md:col-span-1 order-1 md:order-2">
    <DescCard 
    title="Multi mode MCP Service Unified Management Platform"
    desc="Supports three flexible access modes: direct connection, proxy, and hosting, achieving unified control over the entire lifecycle of MCP services across deployment environments (local/remote), providing enterprises with diversified deployment options and integrated management capabilities."
    :features='["Direct: Local/private deployment MCP service is directly connected, with low latency and no intermediate forwarding","PROXY:Forwarding requests through platform proxy nodes, supporting traffic control and security isolation","HOSTING：Platform fully hosted deployment and operation, enterprises do not need to focus on underlying infrastructure"]'></DescCard>
  </div>
</div>

<div class="text-3xl text-center mb-3 font-bold mt-10" id="case">Case</div>
<div class="text-gray-400 mt-3 text-center mb-4">
  Let's see how we use this MCPCAN to improve our daily work efficiency
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

<!-- <div class="text-3xl text-center mb-3 font-bold" id="price">Price</div>
<div class="text-gray-400 mt-3 text-center mb-4">
  Start building for free and expand as users and teams grow
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <PriceCard
    v-for = "(card,index) in priceCardList"
    :key="index"
    v-bind="{...card}"
  />
</div> -->

<div class="font-bold mt-40" id="community">
  <div class="text-3xl text-center mb-3">Quickly Deploy Your MCP Service</div>
  <div class="text-gray-500 text-center">Start using MCPCAN to manage your MCP</div>
  <div class="text-center mt-10 mb-40">
    <ClientOnly>
      <el-button round class="start-btn text-white dark:black" @click="handleStart">Use Start</el-button>
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
  { url: '/images/home-en.png', alt: 'HOME' },
  { url: '/images/template-en.png', alt: 'TEMPLATE' },
  { url: '/images/instance-en.png', alt: 'INSTANCE' },
  { url: '/images/token-en.png', alt: 'TOKEN' }
];
const priceCardList = ref([
  {
    title:'Community',
    price:'¥0',
    period:"/month",
    desc:'Open and Free, hold',
    features:[
      { title: 'MCP Manage' },
      { title: 'Web Dashboard' },
      { title: 'Container Manage' },
      { title: 'Synchronize Dify with n8n (under update)' },
      { title: 'Token' },
      { title: 'Kubernetes And Docker' },
      { title: 'Docs' },
      { title: 'More' }
    ],
    cta:'https://demo.mcpcan.com'
  },
  {
    title:'Enterprise',
    price:'¥299',
    period:"/month",
    desc:'Open and Free, More',
    features:[
      { title: 'User Manage' },
      { title: 'Auth Manage' },
      { title: 'Space Manage' },
      { title: 'Exclusive Support' },
      { title: 'Prioritize experiencing new features' },
    ],
    cta:'https://demo.mcpcan.com',
    active:true
  },
  {
    title:'Custom',
    price:'¥599',
    period:"/month",
    desc:'All Starter functions,More',
    features:[
      { title: 'Enterprise support' },
      { title: 'Professional Services' },
      { title: 'Container Manage' },
    ],
    cta:'https://demo.mcpcan.com'
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
