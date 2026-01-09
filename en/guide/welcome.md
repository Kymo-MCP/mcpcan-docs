# MCPCAN - The Enterprise-Grade MCP Service Governance Platform

In the current technological wave led by Artificial Intelligence (AI) and Large Language Models (LLMs), Model Collaboration Protocol (MCP) services are emerging at an unprecedented rate. However, this rapid growth brings the challenge of a "fragmented" service ecosystem: inconsistent protocol standards, complex service interfaces, expanding security risks, and chaotic operational management. These issues have become core pain points restricting the implementation and large-scale application of enterprise AI strategies.

MCPCAN was created to address these challenges. It is more than just a server hosting tool; it is an **enterprise-grade MCP service governance platform that relies on a containerized runtime environment**. We are dedicated to providing a comprehensive solution that integrates service discovery, a secure gateway, protocol adaptation, and full lifecycle management. Our goal is to help enterprises navigate the complexities of the MCP ecosystem and build a stable, secure, and efficient AI middle-platform capability.

## Core Design Philosophy

Our design philosophy is rooted in the real-world needs of enterprise applications, aiming to empower your AI infrastructure through three main pillars:

- **Unity: Establishing a Single Source of Truth for Services**
  Whether your MCP services are deployed in a public cloud, a private data center, or at the edge, and regardless of the protocol variants they follow, MCPCAN can seamlessly incorporate them into a unified asset view. We help you establish a centralized service catalog and configuration center, eliminating information silos and enabling fine-grained management and efficient reuse of all MCP resources.

- **Security: Infusing a Zero-Trust Security DNA**
  We make no compromises on security. MCPCAN shifts security capabilities from the application layer down to the platform layer, providing a robust security foundation. By **hiding backend endpoints, centralizing credential management, implementing role-based fine-grained access control (ACL), and ensuring immutable, full-link operational auditing**, we help you strike the perfect balance between open collaboration and strict risk control, ensuring every service call is secure, compliant, and traceable.

- **Flexibility: Providing a Path for Progressive Architectural Evolution**
  We understand that the infrastructure and business stages of different enterprises vary greatly. Therefore, MCPCAN offers three progressive access modes, allowing you to freely choose the most suitable path based on your technical reserves, security requirements, and operational capabilities. This enables a smooth evolution from lightweight service registration to a fully-managed, serverless architecture, letting the platform adapt to your business, not the other way around.

## Core Capabilities: The Three Access Modes

MCPCAN provides three meticulously designed access modes to precisely match your business needs in different scenarios.

<div class="card-group not-prose grid gap-x-4 sm:grid-cols-3">
  <Card link="./mode-direct" class="mb-4">
    <div class="flex mb-3">
        ⚙️
      <div><strong>Direct Mode</strong></div>
    </div>
    <div class="text-sm"><strong>Role: A lightweight service registration and discovery center.</strong><br/>It solves the problems of configuration chaos and inefficient team collaboration by providing a unified "address book" for all your MCP services.</div>
  </Card>
  <Card link="./mode-proxy" class="mb-4">
    <div class="flex mb-3">
        🛡️
      <div><strong>Proxy Mode</strong></div>
    </div>
    <div class="text-sm"><strong>Role: An enterprise-grade secure access gateway.</strong><br/>When you need to securely expose internal services to partners or external systems, it provides powerful security isolation, traffic auditing, and centralized authentication capabilities.</div>
  </Card>
  <Card link="./mode-hosted" class="mb-4">
    <div class="flex mb-3">
        🚀
      <div><strong>Hosted Mode</strong></div>
    </div>
    <div class="text-sm"><strong>Role: An all-in-one Serverless runtime environment.</strong><br/>It can "servitize" traditional command-line (Stdio) tools or scripts with a single click, dramatically accelerating the launch and iteration of AI tools and allowing developers to focus on innovation.</div>
  </Card>
</div>

## Typical Application Scenarios

- **Building an Enterprise-Grade AI Service Marketplace**
  Use MCPCAN to uniformly manage various internal and external AI model services, creating a centralized and standardized service marketplace. Business departments can discover, request, and invoke AI capabilities on-demand, much like browsing an app store, while all call activities are under the platform's security audit.

- **Empowering Agile AI Application Innovation**
  Python/Go tools developed by algorithm engineers or data scientists no longer need to wait for lengthy engineering schedules. Through "Hosted Mode," Stdio-based scripts can be directly deployed as stable, scalable online services for frontend applications or other business systems to call, reducing the validation cycle for innovative ideas from weeks to hours.

- **Achieving Secure Interconnection with Ecosystem Partners**
  When data and model collaboration with external suppliers or partners is required, "Proxy Mode" can act as a security buffer. It protects your core network from direct exposure while strictly authenticating and logging all cross-domain traffic to meet the most stringent compliance requirements.

## Quick Start

Get started with MCPCAN now and set up your first MCP server management platform in just a few minutes.

<div class="card-group not-prose grid gap-x-4 sm:grid-cols-2">
  <Card link="https://kymo-mcp.github.io/mcpcan-deploy/">
    <div class="flex mb-3">
        🚀
      <div>Quick Setup with HELM</div>
    </div>
    <div class="text-sm">Follow the deployment documentation to set up your MCPCAN management platform in five minutes and connect your first MCP server.</div>
  </Card>
  <Card>
    <div class="flex mb-3">
        🐳
      <div>Quick Setup with Docker</div>
    </div>
    <div class="text-sm">Documentation in preparation...</div>
  </Card>
</div>

## Community and Support

Join the MCPCAN community for more help and to share experiences.

<div class="card-group not-prose grid gap-x-4 sm:grid-cols-2">
  <Card link="https://github.com/Kymo-MCP/mcpcan" class="mb-4">
    <div class="flex mb-3 items-center">
      <el-icon class="mx-3 cursor-pointer">
        <i class="icon iconfont icon-GitHub"></i>
      </el-icon>
      <div>GitHub Repository</div>
    </div>
    <div class="text-sm">View the source code, submit issues, and contribute code.</div>
  </Card>
  <Card link="https://discord.gg/AHW6Bjfm4s" class="mb-4">
    <div class="flex mb-3 items-center">
      <el-icon class="mx-3 cursor-pointer">
        <i class="icon iconfont icon-icon-17"></i>
      </el-icon>
      <div>Discord Community</div>
    </div>
    <div class="text-sm">Communicate with other developers and get real-time help.</div>
  </Card>
  <Card link="./template" class="mb-4">
    <div class="flex mb-3 items-center">
      <el-icon class="mx-3 cursor-pointer">
        <i class="icon iconfont icon-a-aixin_shixin"></i>
      </el-icon>
      <div>Support</div>
    </div>
    <div class="text-sm">Support the development and maintenance of MCPCAN to help us continuously improve and grow.</div>
  </Card>
</div>
