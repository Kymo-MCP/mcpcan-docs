# OpenAPI MCP
OpenAPI-MCP 能够将任何 OpenAPI 3.x 规范快速转换为功能完善的 MCP（Model Context Protocol）工具服务器, 机器可读的 API 访问能力。

> 注意：OpenAPI-MCP 仅支持 OpenAPI 3.x 规范，不支持 2.x 版本。

## 功能详解
- 配置集中管理：统一录入并管理外部环境中的 openapi 规范文件。
- 自动转换：根据 openapi 规范自动生成 MCP 服务端代码。
- 实时监控：支持对 MCP 服务端的实时监控和管理。

## 适用场景
- 将现有 RESTful API 转换为 MCP 服务，无需修改原有代码。
- 极简运维：已有完善的外部监控体系，仅需要「服务黄页」集中管理 MCP 端点。

## 支持的 MCP 协议
- STEAMABLE_HTTP：使用可流式的 HTTP 通道进行请求/响应。

## 使用流程（建议）
- 在平台创建实例并选择「导入OpenAPI」。
- 将 openapi 规范文件上传至平台并选择需要生成 MCP Tools 的 API 接口。
- 服务地址: 填写 OpenAPI 中接口的实际访问地址。
- 点击保存后，平台将自动根据 openapi 规范生成 MCP 服务端代码并启动对应的容器服务。
- 在平台「实例管理」中查看生成的 MCP 服务端点进行监控和管理。
- 对于 openapi 中接口如果需要增加鉴权头，可在实例的「MCP访问配置」中添加对应的 Token 并开启透传模式

1. 主菜单添加 Openapi 文档和实例创建Openapi To Mcp
<el-image src="/public/images/openapi_mcp.png"></el-image>

2. OpenAPI 文档管理
<el-image src="/public/images/openapi_file.png"></el-image>

3. OpenAPI To Mcp 实例创建
<el-image src="/public/images/openapi_mcp_import.png"></el-image>

## 鉴权头支持
平台代理在转发阶段可附加后端需要的请求头；客户端侧可使用平台级鉴权（若启用）。常见头部：
- `Authorization: Bearer <token>`
- `Authorization: Basic <base64>`
- `API-Key: <key>`
- `X-API-Key: <key>`

> 平台日志对敏感 `token` 做脱敏；查询过滤中的 `token_header` 不区分大小写。
> 鉴权开启透传后，通过平台地址访问 MCP 接口时会将对应的请求头透传至 OpenAPI 中定义的接口。
