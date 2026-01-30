# MCPCAN Gateway Log System Explained

The gateway of the MCPCAN platform is the entry point for all data streams, and its log system provides key data for monitoring, auditing, and troubleshooting. To ensure the high performance and low latency of the gateway, the log system is designed as a high-performance, asynchronous, bounded queue model.

## 1. Core Design Philosophy

- **Asynchronous Non-blocking**: All log recording operations are completed in memory and will not block the main request processing flow. Logs are sent to a dedicated queue and persisted by a background worker thread.
- **Bounded Memory**: The log queue has a fixed memory budget (default is 200MB) to prevent exhausting system resources in extreme cases. When the queue is full, the system discards the oldest logs to accept new ones, prioritizing service availability.
- **Sequential Persistence**: A dedicated background worker thread consumes logs from the queue and writes them sequentially to the backend storage (default is MySQL), ensuring the order of the logs.

## 2. Core Components

- `GatewayLogQueue`: A thread-safe in-memory queue responsible for caching logs to be written. It is the core of the entire asynchronous system.
- `LogWriter`: An interface that defines the behavior of log writing. The default implementation `mysqlWriter` records logs to a MySQL database.
- `worker`: A Goroutine running in the background that continuously takes logs from the `GatewayLogQueue` and persists them using the `LogWriter`.

## 3. Log Data Model

Each gateway log follows the `mcp_gateway_log` table structure, and its core fields are as follows:

| Field Name | Type | Description |
| :--- | :--- | :--- |
| `ID` | `uint` | The unique identifier of the log (primary key). |
| `TraceID` | `string` | Distributed tracing ID, used to associate all logs on a complete request link. |
| `InstanceID` | `string` | The ID of the MCP instance that generated this log. |
| `TokenHeader` | `string` | The name of the authentication header carried in the request (such as `Authorization`). |
| `Token` | `string` | A summary or partial information of the authentication token carried in the request, used for auditing. |
| `Event` | `string` | The event type that describes the specific behavior of the log. |
| `Level` | `int` | Log level (such as `Info`, `Error`, `Warn`). |
| `Log` | `json` | A JSON object containing detailed information, its structure is `{"event": "...", "level": ..., "message": "...", "ts": "..."}`. |
| `CreatedAt` | `time.Time` | The creation time of the log. |

## 4. Key Event Types (Event)

The system predefines a wealth of event types to accurately describe every key step of the gateway when processing requests. Here are some core events:

### Request Lifecycle
- `request`: A new request is received.
- `response`: The request processing is complete and a response is returned.
- `director.before`: Before the request is forwarded to the upstream service.
- `director.after`: After the request returns from the upstream service.
- `client.canceled`: The client actively canceled the request.

### SSE (Server-Sent Events) Related
- `sse.start`: SSE connection starts.
- `sse.cancel`: SSE connection is canceled.
- `sse.eof`: SSE stream ends (End of File).
- `sse.endpoint.rewrite`: The SSE endpoint is rewritten.

### Errors and Exceptions
- `panic.recovered`: Recovered from a panic in the processing flow.
- `request.validation.failed`: Request validation failed.
- `instance.missing`: The MCP instance corresponding to the request cannot be found.
- `protocol.unsupported`: Unsupported protocol type.
- `access.unsupported`: Unsupported access mode.
- `upstream.url.parse.failed`: Failed to parse the upstream URL.
- `upstream.error`: An error occurred in the communication with the upstream service.
- `upstream.connection.interrupted`: The connection with the upstream service was unexpectedly interrupted.
