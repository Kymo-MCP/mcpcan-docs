# MCPCAN - 企业级 MCP 服务治理平台

MCPCAN 是一个基于容器化的企业级 MCP 服务治理平台，它为企业 AI 战略落地和规模化应用提供了强大的支持。

在人工智能（AI）与大语言模型（LLM）引领的技术浪潮下，模型协作协议（Model Collaboration Protocol, MCP）服务正以前所未有的速度涌现。然而，随之而来的是服务生态的“碎片化”挑战：协议标准不一、服务接口繁杂、安全风险敞口扩大、运维管理混乱，这些已成为制约企业 AI 战略落地和规模化应用的核心痛点。

MCPCAN 平台应运而生。它不仅仅是一个服务器托管工具，更是一个**依赖容器运行环境的企业级 MCP 服务治理平台**。我们致力于提供一个集服务发现、安全网关、协议适配与全生命周期托管于一体的综合性解决方案，帮助企业驾驭 MCP 生态的复杂性，构建稳固、安全且高效的 AI 中台能力。

## 核心设计哲学

我们的设计哲学根植于企业级应用的真实需求，旨在通过三大支柱为您的 AI 基础设施赋能：

- **统一化（Unity）：构建唯一的服务真实来源**
  无论您的 MCP 服务部署在公有云、私有数据中心还是边缘节点，无论它遵循何种协议变体，MCPCAN 都能将其无缝纳入统一的资产视图。我们帮助您建立一个集中的服务目录与配置中心，消除信息孤岛，实现对所有 MCP 资源的精细化管理与高效复用。

- **安全性（Security）：注入零信任的安全基因**
  在安全问题上，我们绝不妥协。MCPCAN 将安全能力从应用层下沉至平台层，提供一个强大的安全基座。通过**隐藏后端真实端点、集中化凭证管理、基于角色的细粒度访问控制（ACL）以及不可篡改的全链路操作审计**，我们帮助您在开放协作与严格风控之间取得完美平衡，确保每一次服务调用都安全、合规、可追溯。

- **灵活性（Flexibility）：提供渐进式的架构演进路径**
  我们深知不同企业的基础设施和业务阶段千差万别。因此，MCPCAN 提供了三种渐进式的访问模式，允许您根据自身的技术储备、安全要求和运维能力自由选择，实现从轻量级的服务注册到全托管的无服务器（Serverless）架构的平滑演进，让平台适应您的业务，而非反之。

## 核心能力：三大访问模式

MCPCAN 平台通过三种设计精巧的访问模式，精准匹配您在不同场景下的业务需求。

<div class="card-group not-prose grid gap-x-4 sm:grid-cols-3">
  <Card link="./mode-direct" class="mb-4">
    <div class="flex mb-3">
        ⚙️
      <div><strong>直连模式 (Direct)</strong></div>
    </div>
    <div class="text-sm"><strong>定位：轻量级服务注册与发现中心。</strong><br/>它解决了配置混乱和团队协作效率低下的问题，为您的所有 MCP 服务提供一个统一的“地址簿”。</div>
  </Card>
  <Card link="./mode-proxy" class="mb-4">
    <div class="flex mb-3">
        🛡️
      <div><strong>代理模式 (Proxy)</strong></div>
    </div>
    <div class="text-sm"><strong>定位：企业级安全访问网关。</strong><br/>当您需要将内网服务安全地暴露给合作伙伴或外部系统时，它能提供强大的安全隔离、流量审计和集中鉴权能力。</div>
  </Card>
  <Card link="./mode-hosted" class="mb-4">
    <div class="flex mb-3">
        🚀
      <div><strong>托管模式 (Hosted)</strong></div>
    </div>
    <div class="text-sm"><strong>定位：一站式无服务器（Serverless）运行环境。</strong><br/>它能将传统的命令行（Stdio）工具或脚本一键“服务化”，极大加速 AI 工具的上线和迭代速度，让研发人员专注创新。</div>
  </Card>
</div>

## 典型应用场景

- **构建企业级 AI 服务市场**
  利用 MCPCAN 统一纳管企业内外部的各类 AI 模型服务，形成一个集中、规范的服务市场。业务部门可以像逛应用商店一样，按需发现、申请并调用所需 AI 能力，同时所有调用行为都在平台的安全审计之下。

- **赋能敏捷的 AI 应用创新**
  算法工程师或数据科学家开发的 Python/Go 工具，无需等待漫长的工程化排期。通过“托管模式”，可以直接将基于 Stdio 的脚本部署为稳定、可扩展的在线服务，供前端应用或其他业务系统直接调用，将创新想法的验证周期从数周缩短至数小时。

- **实现与生态伙伴的安全互联**
  当需要与外部供应商或合作伙伴进行数据与模型协作时，“代理模式”可作为一个安全缓冲区。它既能保护您的核心网络不受直接暴露，又能对所有跨域流量进行严格的身份验证和日志记录，满足最严苛的合规要求。

## 快速开始

立即开始使用 MCPCAN，只需几分钟即可部署搭建您的第一个 MCP 服务器管理平台。

<div class="card-group not-prose grid gap-x-4 sm:grid-cols-2">
  <Card link="https://kymo-mcp.github.io/mcpcan-deploy/">
    <div class="flex mb-3">
        🚀
      <div>HELM 快速搭建</div>
    </div>
    <div class="text-sm">跟随部署文档，五分钟内搭建你的MCP CAN管理平台；并连接你的第一个MCP服务器</div>
  </Card>
  <Card>
    <div class="flex mb-3">
        🐳
      <div>Docker 快速搭建</div>
    </div>
    <div class="text-sm">文档准备中...</div>
  </Card>
</div>

## 社区和支持

加入 MCPCAN 社区，获取更多帮助和经验分享。

<div class="card-group not-prose grid gap-x-4 sm:grid-cols-2">
  <Card link="https://github.com/Kymo-MCP/mcpcan" class="mb-4">
    <div class="flex mb-3 items-center">
      <el-icon class="mx-3 cursor-pointer">
        <i class="icon iconfont icon-GitHub"></i>
      </el-icon>
      <div>GitHub仓库</div>
    </div>
    <div class="text-sm">查看源代码、提交问题和贡献代码</div>
  </Card>
  <Card link="https://discord.gg/AHW6Bjfm4s" class="mb-4">
    <div class="flex mb-3 items-center">
      <el-icon class="mx-3 cursor-pointer">
        <i class="icon iconfont icon-icon-17"></i>
      </el-icon>
      <div>Discord 社区</div>
    </div>
    <div class="text-sm">与其他开发者交流，获取实时帮助</div>
  </Card>
  <Card link="./template" class="mb-4">
    <div class="flex mb-3 items-center">
      <el-icon class="mx-3 cursor-pointer">
        <i class="icon iconfont icon-a-aixin_shixin"></i>
      </el-icon>
      <div>Support</div>
    </div>
    <div class="text-sm">支持MCP CAN的开发和维护，帮助我们持续改进与发展</div>
  </Card>
</div>
