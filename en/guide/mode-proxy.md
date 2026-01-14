# Proxy Mode

Proxy Mode transforms the platform into a unified access gateway for MCP services. External clients no longer connect directly to the real MCP service address but instead interact through a proxy address provided by the platform. During the request forwarding process, the platform adds security protection and auditing capabilities, achieving the goal of "shielding the backend and unifying the entry point."

> This mode only supports two MCP protocols: SSE (Server-Sent Events) and Streamable-HTTP.

## Core Definition

-   **Unified Gateway**: The platform provides a stable and controllable proxy entry point, shielding the real backend address and credentials.
-   **Traffic Path**: Client → Platform (Gateway) → External MCP Service.
-   **Security and Auditing**: Adds access control, log retention, and problem-solving capabilities to the forwarding link.

## Feature Details

-   **Privacy Protection and Risk Isolation**:
    -   Hides the IP, port, and original token of the backend service from the public, exposing only the platform's proxy address.
    -   Effectively reduces the public exposure of the real service, minimizing the risk of direct attacks.
-   **Basic Access Control (ACL)**:
    -   Allows for basic permission control by restricting access to specific instances from source terminals or users based on platform-side policies.
-   **End-to-End Auditing**:
    -   Records the source IP, time, path, and details of each request, supporting issue traceability.
    -   In case of a call failure, the proxy logs help distinguish between network problems and backend response errors.

## Applicable Scenarios

-   **Cross-Network Secure Access**: When an MCP service in an internal network needs to be securely exposed to external systems.
-   **Third-Party Service Integration**: Manages the credentials of third-party MCP services, avoiding the need to distribute original keys to all clients.

## Supported MCP Protocols

-   **SSE (Server-Sent Events)**: Establishes an event stream connection through the platform proxy.
-   **Streamable-HTTP**: Forwards streaming HTTP requests and responses through the platform proxy.

> Proxy mode does not support the STDIO protocol. If you need STDIO, please use Hosted Mode.

## Configuration Fields (mcpServers)

The platform uses a unified `mcpServers` structure to manage MCP service configurations (proxy backend targets):

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

-   `url`: The target address of the backend MCP service; mandatory for both SSE and Streamable-HTTP.
-   `type` or `transport`: The protocol type, which can be `sse` or `streamable-http`.
-   `headers`: Headers to be attached by the platform to the backend request during forwarding (optional), such as `Authorization` or `API-Key`.
-   `timeout`: HTTP request timeout for the proxy forwarding (in milliseconds, optional).
-   `sseReadTimeout`: SSE read timeout (in milliseconds, optional, for SSE scenarios).

## Connection Examples (via Platform Gateway)

> In the following examples, `https://platform.example.com/<gateway_prefix>/<instanceId>` is the platform's proxy entry point. The specific prefix depends on the platform's configuration.

### SSE Proxy Example

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

-   The client establishes an SSE connection to the platform's proxy address. The platform attaches the necessary backend headers to the forwarded request based on the instance configuration.

### Streamable-HTTP Proxy Example

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

-   The client sends a request to the platform's proxy address. The platform forwards the request to the backend target and supports streaming responses.
