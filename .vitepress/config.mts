import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MCP CAN",
  description: "mcp-can",
  lang: "en-US",
  // 设置相对路径，用于静态资源打包
  // 使用相对路径 "./" 以支持部署到任意子路径
  head: [["link", { rel: "icon", href: "/docs/favicon.ico" }]],
  base: "/docs/",
  // remove .html extensions from built routes (clean URLs)
  cleanUrls: true,
  // lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.png",
    socialLinks: [
      { icon: "github", link: "https://github.com/Kymo-MCP/mcpcan" },
    ],
    search: {
      provider: "local",
    },
    // https://www.carbonads.net
    // carbonAds: { code: "CEBDT27Y", placement: "vuejsorg" },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025-present 青莲网络",
    },
  },
  // rewrites: {
  //   "index.md": "/zh/index.md",
  // },
  locales: {
    zh: {
      label: "简体中文",
      lang: "zh-Hans",
      description: "MCP CAN 中文文档",
      themeConfig: {
        nav: [
          { text: "首页", link: "https://www.mcpcan.com/zh/" },
          { text: "使用案例", link: "https://www.mcpcan.com/zh/#case" },
          // { text: "价格", link: "/zh/#price" },
          { text: "社区", link: "https://www.mcpcan.com/zh/#community" },
          { text: "文档", link: "/zh/guide/welcome" },
        ],
        sidebar: [
          {
            text: "入门",
            collapsed: false,
            items: [
              { text: "产品介绍", link: "/zh/guide/welcome" },
              { text: "快速开始", link: "/zh/guide/quick-start" },
            ],
          },
          {
            text: "使用手册",
            collapsed: false,
            items: [
              {
                text: "安装部署",
                link: "/zh/guide/install",
                collapsed: false,
                items: [
                  // { text: "docker-compose部署", link: "/zh/guide/docker-compose" },
                  {
                    text: "Helm Chart 部署",
                    link: "/zh/guide/helm-deploy",
                  },
                  {
                    text: "Docker Compose 部署(推荐)",
                    link: "/zh/guide/docker-compose",
                  },
                ],
              },
              { text: "模板管理", link: "/zh/guide/template" },
              { text: "实例管理", link: "/zh/guide/instance" },
              { text: "OpenAPI MCP", link: "/zh/guide/mode-openapi-to-mcp" },
              { text: "环境管理", link: "/zh/guide/env" },
              { text: "代码包管理", link: "/zh/guide/code" },
              // { text: "API转MCP(建设中...)", link: "/zh/guide/api-docs" },
              // { text: "Dify同步配置（建设中...）",link: "/zh/guide/dify-sync"},
              { text: "MCP访问配置", link: "/zh/guide/access-config" },
              {
                text: "同步到智能体平台",
                // link: "/zh/guide/install",
                collapsed: false,
                items: [
                  // { text: "docker-compose部署", link: "/zh/guide/docker-compose" },
                  {
                    text: "同步到 Dify",
                    link: "/zh/guide/mcp-to-dify",
                  },
                  {
                    text: "同步到 COZE",
                    link: "/zh/guide/mcp-to-coze",
                  },
                  {
                    text: "同步到 N8N",
                    link: "/zh/guide/mcp-to-n8n",
                  },
                ],
              },
              { text: "访问日志", link: "/zh/guide/access-logs" },
              { text: "配置说明", link: "/zh/guide/startup-config" },
            ],
          },
          {
            text: "访问模式",
            collapsed: false,
            items: [
              { text: "访问模式是什么?", link: "/zh/guide/mode-what" },
              { text: "直连模式", link: "/zh/guide/mode-direct" },
              { text: "代理模式", link: "/zh/guide/mode-proxy" },
              { text: "托管模式", link: "/zh/guide/mode-hosted" },
            ],
          },
          {
            text: "使用案例",
            collapsed: false,
            items: [
              {
                text: "OpenAPI文档封装MCP服务案例",
                link: "/zh/guide/openapitomcp",
              },
              {
                text: "自定义配置案例",
                link: "/zh/guide/custom",
              },
              { text: "同步到 Dify 案例", link: "/zh/guide/synchronous_DIFY" },
            ],
          },
          {
            text: "常见问题",
            collapsed: false,
            items: [{ text: "常见问题", link: "/zh/guide/faq" }],
          },
          {
            text: "社区",
            collapsed: false,
            items: [
              { text: "寻求支持", link: "/zh/guide/support" },
              {
                text: "成为贡献者",
                link: "/zh/guide/contribution",
              },
              {
                text: "为文档贡献内容",
                link: "/zh/guide/update-docs",
              },
            ],
          },
        ],
        outline: {
          label: "页面导航",
        },
        docFooter: {
          prev: "上一页",
          next: "下一页",
        },
      },
    },
    en: {
      label: "English",
      lang: "en-US",
      description: "MCP CAN English Docs",
      themeConfig: {
        nav: [
          { text: "Home", link: "https://www.mcpcan.com/en/" },
          { text: "Case", link: "https://www.mcpcan.com/en/#case" },
          // { text: "Price", link: "/en/#price" },
          { text: "Community", link: "https://www.mcpcan.com/en/#community" },
          { text: "Docs", link: "/en/guide/welcome" },
        ],
        sidebar: [
          {
            text: "Get Started",
            collapsed: false,
            items: [
              { text: "Introduction", link: "/en/guide/welcome" },
              { text: "Quick Start", link: "/en/guide/quick-start" },
            ],
          },
          {
            text: "User Manual",
            collapsed: false,
            items: [
              {
                text: "Installation & Deployment",
                link: "/en/guide/install",
                collapsed: false,
                items: [
                  {
                    text: "Helm Chart Deployment",
                    link: "/en/guide/helm-deploy",
                  },
                  {
                    text: "Docker Compose Deployment(Recommended)",
                    link: "/en/guide/docker-compose",
                  },
                ],
              },
              { text: "Template Management", link: "/en/guide/template" },
              { text: "Instance Management", link: "/en/guide/instance" },
              { text: "Environment Management", link: "/en/guide/env" },
              { text: "Code Package Management", link: "/en/guide/code" },
              { text: "OpenAPI MCP", link: "/en/guide/mode-openapi-to-mcp" },
              {
                text: "MCP Access Configuration",
                link: "/en/guide/access-config",
              },
              {
                text: "Sync to Agent Platform",
                // link: "/zh/guide/install",
                collapsed: false,
                items: [
                  // { text: "docker-compose部署", link: "/zh/guide/docker-compose" },
                  {
                    text: "Sync to Dify",
                    link: "/en/guide/mcp-to-dify",
                  },
                  {
                    text: "Sync to COZE",
                    link: "/en/guide/mcp-to-coze",
                  },
                  {
                    text: "Sync to N8N",
                    link: "/en/guide/mcp-to-n8n",
                  },
                ],
              },
              { text: "Access Logs", link: "/en/guide/access-logs" },
              { text: "Startup Config", link: "/en/guide/startup-config" },
            ],
          },
          {
            text: "Access Mode",
            collapsed: false,
            items: [
              { text: "What is Access Mode?", link: "/en/guide/mode-what" },
              { text: "Direct Mode", link: "/en/guide/mode-direct" },
              { text: "Proxy Mode", link: "/en/guide/mode-proxy" },
              { text: "Hosted Mode", link: "/en/guide/mode-hosted" },
            ],
          },
          {
            text: "Cases",
            collapsed: false,
            items: [
              {
                text: "OpenAPI documentation to MCP service case",
                link: "/en/guide/openapitomcp",
              },
              {
                text: "Custom configuration examples",
                link: "/en/guide/custom",
              },
              { text: "Sync to Dify Case", link: "/en/guide/synchronous_DIFY" },
            ],
          },
          {
            text: "FAQ",
            collapsed: false,
            items: [{ text: "FAQ", link: "/en/guide/faq" }],
          },
          {
            text: "Community",
            collapsed: false,
            items: [
              { text: "Support", link: "/en/guide/support" },
              {
                text: "Contributor",
                link: "/en/guide/contribution",
              },
              {
                text: "Contribute Docs",
                link: "/en/guide/update-docs",
              },
            ],
          },
        ],
      },
    },
  },
  // vite配置
  vite: {
    server: {
      port: 5100,
      host: "0.0.0.0",
      open: true,
    },
  },
});
