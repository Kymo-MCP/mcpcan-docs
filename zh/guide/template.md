# 模板

MCP CAN 模板提供了可复用的 MCP 服务协议配置，可快速的开启一个 MCP 服务实例的创建管理。简化了每次创建实例过程中的繁琐指令和信息的配置。

### 模板的好处

- **复用实例的创建流程：** 以模板类型创建实例的时候；我们将自动将该模板的参数作为你的实例的创建参数；减少重复填写信息的操作
- **使用模板分类管理：** 创建一次类型的实例；即可更具名称或 logo 区分模板的可创建什么类型的实例

## 模板使用

管理你的模板列表以及提供再可快速部署 MCP 服务实例

### 快速创建

根据你不同的访问模式和 MCP 协议；我们将为你提供不同的配置信息以更加完美的适配和启动你的 MCP 服务。主要以托管、直连和代理三种访问模式为主；MCP 协议有 STDIO、SEE、STEAMABLE_HTTP。配置信息包含有：代码包、初始化脚本、容器环境、端口号、启动命令、服务路径

**1.** 模板列表页面：在主页面点击“创建模板”<Popover title="管理列表创建模板" src="/guide/page-add-template.png" width="384" height="182"/>

**2.** 菜单导航：菜单导航随时随地可“创建模板”<Popover title="菜单栏创建模板" src="/guide/menu-add-template.png" height="220" />

- **默认服务器配置提示**

```JSON
{
    "mcpServers": {
        "everything": {
            "args": [
                "-y",
                "@modelcontextprotocol/server-everything"
            ],
            "command": "npx"
        }
    }
}
```

- **[代码包](./code)启动** <Popover title="使用代码包启动" src="/guide/code-package-select.png" width="260" height="165" />

  如果你是使用自己的 MCP 项目；可将代码包托管至平台；在开启 MCP 服务的时候就可以选择自己的项目包作为启动源。

- **初始化脚本**

  初始化脚本需要保证执行完后最终能够退出，不能设置阻塞，否则无法启动

- **[容器环境](./env) 使用** <Popover title="环境管理" src="/guide/env-page.png" width="350" height="168" />

  当前我们仅支持单集群,所以环境的信息暂时未固定信息,多集群的方式我们将在下一个版本更新,敬请期待......

- **端口号**

  默认端口号：8080

- **启动命令**

  当以 STDIO 协议访问时默认启动命令：mcp-hosting --port=%d --mcp-servers-config /app/mcp-servers.json。 否则需要填写自定义启动命令。

  1. 基于 python:3.12-alpine 镜像构建，轻量且兼容主流容器环境
  2. 预装组件及版本明确锁定：
     系统基础命令：tar、wget、zip、unzip
     Python 环境：Python 3.12.11，配套工具 uv 0.7.12、uvx 0.7.12
     Node.js 环境：Node.js v18.20.1，配套工具 npm 9.6.6、npx 9.6.6
  3. 默认启动命令： mcp-hosting ，启动后将 MCP STDIO 协议转为 STEAMABLE_HTTP 协议运行。

- **服务路径**

  服务路径指的是 MCP 服务访问的子路径；SEE、STEAMBLE_HTTP 协议的时候需要指定 MCP 服务的访问路径；否则将以根路径访问。
