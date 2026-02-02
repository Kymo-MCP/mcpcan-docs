# MCPCAN 网关日志系统详解

MCPCAN 平台的网关（Gateway）是所有数据流的入口，其日志系统为监控、审计和故障排查提供了关键数据。为了保证网关的高性能和低延迟，日志系统被设计为一个高性能的异步、有界队列模型。

## 1. 核心设计理念

- **异步非阻塞**：所有日志记录操作均在内存中完成，不会阻塞主请求处理流程。日志被发送到一个专用的队列中，由后台工作线程（worker）负责持久化。
- **有界内存**：日志队列具有固定的内存预算（默认为 200MB），以防止在极端情况下耗尽系统资源。当队列已满时，系统会丢弃最旧的日志以接纳新日志，优先保障服务的可用性。
- **顺序持久化**：一个专用的后台工作线程从队列中消费日志，并按顺序将其写入后端存储（默认为 MySQL），确保日志的顺序性。

## 2. 核心组件

- `GatewayLogQueue`: 一个线程安全的内存队列，负责缓存待写入的日志。它是整个异步系统的核心。
- `LogWriter`: 一个定义了日志写入行为的接口。默认实现 `mysqlWriter` 将日志记录到 MySQL 数据库。
- `worker`: 一个在后台运行的 Goroutine，它持续地从 `GatewayLogQueue` 中取出日志并使用 `LogWriter` 进行持久化。

## 3. 日志数据模型

每一条网关日志都遵循 `mcp_gateway_log` 表结构，其核心字段如下：

| 字段名 | 类型 | 描述 |
| :--- | :--- | :--- |
| `ID` | `uint` | 日志的唯一标识符（主键）。 |
| `TraceID` | `string` | 分布式追踪 ID，用于关联一个完整请求链路上的所有日志。 |
| `InstanceID` | `string` | 产生此日志的 MCP 实例 ID。 |
| `TokenHeader` | `string` | 请求中携带的认证头名称（如 `Authorization`）。 |
| `Token` | `string` | 请求中携带的认证令牌的摘要或部分信息，用于审计。 |
| `Event` | `string` | 描述日志具体行为的事件类型。 |
| `Level` | `int` | 日志级别（如 `Info`, `Error`, `Warn`）。 |
| `Log` | `json` | 包含详细信息的 JSON 对象，其结构为 `{"event": "...", "level": ..., "message": "...", "ts": "..."}`。 |
| `CreatedAt` | `time.Time` | 日志创建时间。 |

## 4. 关键事件类型 (Event)

系统预定义了丰富的事件类型，以精确描述网关在处理请求时的每一个关键步骤。以下是一些核心事件：

### 请求生命周期
- `request`: 收到一个新请求。
- `response`: 请求处理完成，返回响应。
- `director.before`: 请求转发到上游服务之前。
- `director.after`: 请求从上游服务返回之后。
- `client.canceled`: 客户端主动取消了请求。

### SSE (Server-Sent Events) 相关
- `sse.start`: SSE 连接开始。
- `sse.cancel`: SSE 连接被取消。
- `sse.eof`: SSE 流结束（End of File）。
- `sse.endpoint.rewrite`: SSE 端点被重写。

### 错误与异常
- `panic.recovered`: 从处理流程的 panic 中恢复。
- `request.validation.failed`: 请求验证失败。
- `instance.missing`: 找不到请求对应的 MCP 实例。
- `protocol.unsupported`: 不支持的协议类型。
- `access.unsupported`: 不支持的访问模式。
- `upstream.url.parse.failed`: 解析上游 URL 失败。
- `upstream.error`: 与上游服务的通信发生错误。
- `upstream.connection.interrupted`: 与上游服务的连接意外中断。

