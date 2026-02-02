# 直连模式（Direct Connection）

直连模式是平台最轻量级的接入方式，平台仅承担「配置注册中心」角色，不代理任何业务流量，不参与健康探测与运行监控。客户端按照平台存储的配置，直接与外部 MCP 服务通信。

> 仅支持两种 MCP 协议：SEE（Server-Sent Events）与 STEAMABLE_HTTP。

## 核心定义

- 角色定位：平台负责集中管理 MCP 服务连接信息（地址、协议、鉴权等），不参与通信链路。
- 通信路径：Client → External MCP Service（直接连接）；Platform 仅提供配置查询与管理。
- 目标问题：解决 MCP 服务端点分散、各客户端重复维护连接字符串的问题。

<!-- 建议配图：直连模式架构图（Client 直连 External MCP Service，Platform 仅存储 Config） -->

## 功能详解

- 配置集中管理：统一录入并管理外部环境中的 MCP 服务配置（如本地/云主机）。
- 参数支持：记录服务地址 `url`、协议类型 `type/transport`、请求头 `headers` 等关键元数据。
- 结构化存储：以结构化配置替代硬编码连接字符串，便于团队共享与复用。
- 轻量化设计：
  - 不提供运行状态监控（Health Check）。
  - 不代理业务流量，避免平台带宽压力，保持原生通信延迟。

## 适用场景

- 内网调试：服务运行在本地或内网，仅需平台记录端点参数，方便团队共享。
- 极简运维：已有完善的外部监控体系，仅需要「服务黄页」集中管理 MCP 端点。

## 支持的 MCP 协议

- SEE（Server-Sent Events）：使用 SSE 长连接事件流进行交互。
- STEAMABLE_HTTP：使用可流式的 HTTP 通道进行请求/响应。

> 不支持 STDIO 协议的直连管理；若需 STDIO，请使用托管/代理模式。

## 配置字段说明（mcpServers）

平台采用统一的 `mcpServers` 结构管理 MCP 服务配置：

```json
{
  "mcpServers": {
    "your-mcp": {
      "url": "https://example.com/mcp/sse",
      "type": "sse",
      "headers": {
        "Authorization": "Bearer <token>"
      },
      "timeout": 30000,
      "sseReadTimeout": 60000
    }
  }
}
```

- `url`：外部 MCP 服务地址；SEE/STEAMABLE_HTTP 均必填。
- `type` 或 `transport`：协议类型，取值为 `sse` 或 `streamable-http`。
- `headers`：请求头（可选），支持 `Authorization`、`API-Key`、`X-API-Key` 等。
- `timeout`：HTTP 请求超时（毫秒，可选）。
- `sseReadTimeout`：SSE 读取超时（毫秒，可选，SEE 场景）。

## 连接示例

### SEE 直连示例（SSE）

```json
{
  "mcpServers": {
    "calc-service": {
      "url": "https://mcp.example.com/see/events",
      "type": "sse",
      "headers": {
        "Authorization": "Bearer <your-jwt-token>"
      },
      "sseReadTimeout": 60000
    }
  }
}
```

客户端侧按平台提供的 `url` 与 `headers` 参数建立 SSE 连接，事件通道由外部服务直接维护。

### STEAMABLE_HTTP 直连示例（流式 HTTP）

```json
{
  "mcpServers": {
    "text-service": {
      "url": "https://mcp.example.com/v1/stream",
      "type": "streamable-http",
      "headers": {
        "API-Key": "<your-api-key>"
      },
      "timeout": 30000
    }
  }
}
```

客户端直接向 `url` 发起 HTTP 请求，支持分块/流式返回；鉴权通过 `headers` 传递。

## 鉴权头支持

平台在直连模式下仅存储与分发请求头，不参与鉴权。

## 使用流程（建议）

- 在平台创建实例时选择「访问模式：直连（Direct）」与协议 `sse/streamable-http`。
- 填写外部服务 `url` 与必要的 `headers`；保存后即可在团队内共享该配置。
- 客户端按配置直连外部服务；平台不代理、不监控、不统计调用。

## 常见问题

- 是否支持状态探测？
  - 直连模式不提供健康探测；如需探测与统计，请使用托管/代理模式。
- 是否可以修改协议为 STDIO？
  - 不支持；STDIO 需由平台托管容器/进程并进行调度与代理。
- 直连模式是否影响性能？
  - 不代理流量，通信成本与原生直连一致；平台仅承担配置管理，不引入额外延迟。
