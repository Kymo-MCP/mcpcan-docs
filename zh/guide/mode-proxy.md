# 代理模式（Proxy Mode）

代理模式将平台转化为 MCP 服务的统一访问网关。外部客户端不再直接连接真实的 MCP 服务地址，而是通过平台提供的代理地址进行交互；平台在转发请求的过程中附加安全防护与审计能力，实现“屏蔽后端、统一入口”的目标。

> 仅支持两种 MCP 协议：SEE（Server-Sent Events）与 STEAMABLE_HTTP。

## 核心定义

- 统一网关：平台提供稳定可控的代理入口，屏蔽后端真实地址与凭证。
- 流量路径：Client → Platform（Gateway） → External MCP Service。
- 安全与审计：在转发链路中附加访问控制、日志留存与问题定位能力。

<!-- 建议配图：代理模式数据流向图（Client → Platform → External MCP Service），突出“屏蔽”“记录”。 -->

## 功能详解

- 隐私保护与风险隔离：
  - 对外隐藏后端服务的 IP、端口与原始 Token，仅暴露平台代理地址。
  - 有效降低真实服务的公网暴露面，减少直接攻击风险。
- 基础访问控制（ACL）：
  - 可基于平台侧策略限制来源终端或用户访问指定实例，实现基础权限控制。
- 全链路审计：
  - 记录请求来源（Source IP）、时间、路径与调用详情，支持问题追溯。
  - 调用失败时结合代理日志区分网络问题与后端响应错误。

## 适用场景

- 跨网安全访问：内部网络中的 MCP 服务需安全暴露给外部系统使用。
- 第三方服务集成：托管第三方 MCP 服务的凭证，避免向所有客户端分发原始密钥。

## 支持的 MCP 协议

- SEE（Server-Sent Events）：通过平台代理建立事件流连接。
- STEAMABLE_HTTP：通过平台代理转发流式 HTTP 请求与响应。

> 不支持 STDIO 协议的代理模式；如需 STDIO，请使用托管模式。

## 配置字段说明（mcpServers）

平台侧采用统一的 `mcpServers` 结构管理 MCP 服务配置（代理后端目标）：

```json
{
  "mcpServers": {
    "your-mcp": {
      "url": "https://external.example.com/mcp/stream",
      "type": "streamable-http",
      "headers": {
        "Authorization": "Bearer <backend-token>"
      },
      "timeout": 30000,
      "sseReadTimeout": 60000
    }
  }
}
```

- `url`：后端 MCP 服务目标地址；SEE / STEAMABLE_HTTP 均必填。
- `type` 或 `transport`：协议类型，取值为 `sse` 或 `streamable-http`。
- `headers`：由平台在转发时附加到后端请求的头部（可选），如 `Authorization`、`API-Key`。
- `timeout`：代理转发的 HTTP 请求超时（毫秒，可选）。
- `sseReadTimeout`：SSE 读取超时（毫秒，可选，SEE 场景）。

## 连接示例（通过平台网关）

> 以下示例中的 `https://platform.example.com/<gateway_prefix>/<instanceId>` 为平台代理入口；具体前缀以平台配置为准。

### SEE 代理示例（SSE）

```json
{
  "client": {
    "url": "https://platform.example.com/<gateway_prefix>/<instanceId>/events",
    "type": "sse",
    "headers": {
      "Authorization": "Bearer <client-token>"
    }
  }
}
```

- 客户端连接平台代理地址建立 SSE；平台根据实例配置将必要的后端头部附加到转发请求。

### STEAMABLE_HTTP 代理示例（流式 HTTP）

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

- 客户端向平台代理地址发起请求；平台将请求转发到后端目标并支持流式返回。

## 鉴权头支持

平台代理在转发阶段可附加后端需要的请求头；客户端侧可使用平台级鉴权（若启用）。常见头部：
- `Authorization: Bearer <token>`
- `Authorization: Basic <base64>`
- `API-Key: <key>`
- `X-API-Key: <key>`

> 平台日志对敏感 `token` 做脱敏；查询过滤中的 `token_header` 不区分大小写。

## 使用流程（建议）

- 在平台创建实例并选择「访问模式：代理（Proxy）」与协议 `sse/streamable-http`。
- 填写后端目标 `url` 与可选的后端 `headers`；平台将按配置进行转发。
- 客户端统一接入平台代理地址；平台负责安全与审计，后端保持隐蔽。

## 常见问题

- 平台是否会修改请求内容？
  - 平台默认仅转发并附加必要头部；不改变业务负载。
- 是否支持健康探测与统计？
  - 代理模式聚焦统一入口与安全审计；运行状态与统计可结合托管模式或外部监控。
- 如何确定代理路径？
  - 以平台配置的网关前缀与实例 ID 组合形成代理地址；示例中使用占位符 `<gateway_prefix>/<instanceId>`。
