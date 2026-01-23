# 托管模式（Managed Mode）

托管模式是一站式容器运行环境与协议适配能力的集合。平台直接利用自身容器算力运行 MCP 服务，并通过内置适配器解决“协议不兼容”问题，实现从标准输入输出（stdio）到网络协议（SEE/STEAMABLE_HTTP）的无感转换，对外统一暴露 HTTP/SSE 端点。

> 仅支持两种对外连接协议：SEE（Server-Sent Events）与 STEAMABLE_HTTP。

## 核心定义

- 容器托管：平台拉起并管理 MCP 服务容器，无需外部服务器资源。
- 协议适配：容器内的 stdio 流（stdin/stdout）自动转换为 SEE/STEAMABLE_HTTP，对外提供统一网络端点。
- 对外路径：Client → Platform（Hosted Container + Adapter） → Public Endpoint（SSE/Streamable HTTP）。

<!-- 建议配图：左侧 MCP Code 包 → 中间 Platform Container（含 "Stdio ↔ SSE Adapter"）→ 右侧 SSE URL 输出 -->

## 访问原理

- 容器内启动 MCP 服务，实例运行在平台受控网络中，实现网络与资源隔离。
- 访问路径：`Client → Gateway（平台网关服务） → Container Instance（MCP Server）`。
- 网关统一入口：对外仅暴露平台网关地址与实例路径，内部路由到容器实例，保障后端不直接暴露。

<!-- 建议通信图：Client → Gateway → Container Instance（MCP Server）；标注 SSE / Streamable HTTP 通道与网关转发方向 -->

## 核心能力与部署模式

平台托管模式的核心是其强大的协议适配能力与灵活的部署选项，以适应不同类型的服务和开发工作流。主要支持以下三种部署模式：

### 1. Stdio 协议转换 (Stdio → SSE/Streamable-HTTP)

- **适用场景**: 将任何基于标准输入/输出（Stdio）的命令行工具或脚本，快速封装为网络服务。
- **工作原理**: 平台提供预装了通用环境（如 Python, Node.js）的基础镜像。您只需上传代码，平台会自动将服务的 `stdio` 交互转换为 `sse` 或 `streamable-http` 协议，并生成可公开访问的端点。这是实现“无服务器”化传统脚本的最快方式。

### 2. 原生协议部署 (Native SSE/Streamable-HTTP)

- **适用场景**: 部署已经实现了 `sse` 或 `streamable-http` 协议的服务。
- **工作原理**: 您可以上传自定义的代码包或容器镜像。平台负责服务的容器化、部署和生命周期管理，而服务本身直接处理网络请求。此模式适用于需要更高定制化或已经遵循 MCPCAN 原生协议的服务。

### 3. OpenAPI 规范转换 (OpenAPI → Streamable-HTTP)

- **适用场景**: 将已有的 RESTful API (需提供 OpenAPI 3.0+ 规范) 快速接入 MCPCAN 生态。
- **工作原理**: 您只需导入服务的 OpenAPI 规范文档，平台将自动将其转换为 `streamable-http` 协议的服务，并在容器中进行部署。这为集成传统 API 提供了极大的便利。

## 运维管理功能

- 容器生命周期：图形化的 启动 / 停止 / 重启 控制面板，无需执行底层 Docker 命令。
- 实时可观测性：
  - 运行日志：实时流式展示标准输出（Info）与错误输出（Error）。
  - 事件审计：结合平台日志记录调用链路，便于故障排查与定位。

## 适用场景

- 无服务器部署：没有自有服务器资源，直接上传代码或镜像在平台运行 MCP 服务。
- 协议桥接：本地基于 Python/Node.js 的 stdio MCP 脚本，快速转化为可供 Web 调用的在线服务。

## 支持的 MCP 协议

- SEE（Server-Sent Events）：对外暴露事件流端点，适配 stdio 交互。
- STEAMABLE_HTTP：对外暴露流式 HTTP 端点，适配流式响应场景。

> 不直接对外暴露 STDIO；stdio 仅在容器内作为适配输入源使用。

## 配置字段说明（mcpServers）

平台采用统一的 `mcpServers` 结构描述托管服务的对外端点：

```json
{
  "mcpServers": {
    "your-hosted-mcp": {
      "url": "https://platform.example.com/<gateway_prefix>/<instanceId>/events",
      "type": "sse",
      "headers": {
        "Authorization": "Bearer <platform-token>"
      },
      "timeout": 30000,
      "sseReadTimeout": 60000
    }
  }
}
```

- `url`：平台生成的对外访问地址（SSE/Streamable HTTP）。
- `type` 或 `transport`：协议类型，取值为 `sse` 或 `streamable-http`。
- `headers`：访问端所需头部（可选），如 `Authorization`、`API-Key`。
- `timeout`：请求超时（毫秒，可选）。
- `sseReadTimeout`：SSE 读取超时（毫秒，可选，SEE 场景）。

## 连接示例（通过平台托管端点）

### SEE 托管示例（SSE）

```json
{
  "client": {
    "url": "https://platform.example.com/<gateway_prefix>/<instanceId>/events",
    "type": "sse",
    "headers": {
      "Authorization": "Bearer <client-token>"
    },
    "sseReadTimeout": 60000
  }
}
```

- 客户端连接平台托管端点建立 SSE；平台内部完成 stdio → SSE 的转换。

### STEAMABLE_HTTP 托管示例（流式 HTTP）

```json
{
  "client": {
    "url": "https://platform.example.com/<gateway_prefix>/<instanceId>/v1/stream",
    "type": "streamable-http",
    "headers": {
      "API-Key": "<client-api-key>"
    },
    "timeout": 30000
  }
}
```

- 客户端向平台托管端点发起请求；平台统一调度容器并返回流式结果。

## 鉴权头支持

平台支持在对外端附加必要鉴权头，内部对敏感 `token` 进行脱敏记录；查询过滤中的 `token_header` 不区分大小写。常见头部：
- `Authorization: Bearer <token>`
- `Authorization: Basic <base64>`
- `API-Key: <key>`
- `X-API-Key: <key>`

## 使用流程（建议）

- 在平台创建实例并选择「访问模式：托管（Managed）」与协议 `sse/streamable-http`。
- 上传代码包或选择镜像，配置启动命令与端口；平台拉起容器并完成协议适配。
- 使用平台生成的托管端点进行访问；统一日志与审计便于定位问题。

## 常见问题

- 是否可以直接访问 STDIO？
  - 不支持对外直连 STDIO；请通过托管端点的 SEE 或 STEAMABLE_HTTP 使用。
- 是否支持容器状态监控与日志？
  - 支持；平台提供生命周期管理与实时日志流。
- 托管端点如何组织？
  - 以平台配置的网关前缀与实例 ID 组合形成对外地址；示例中使用 `<gateway_prefix>/<instanceId>` 占位符。
