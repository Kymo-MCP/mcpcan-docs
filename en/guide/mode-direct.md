# Direct Connection Mode

Direct Connection Mode is the most lightweight integration method on the platform. In this mode, the platform acts solely as a "Configuration Registry," meaning it does not proxy any business traffic, nor does it participate in health checks or runtime monitoring. The client communicates directly with the external MCP service based on the configuration stored on the platform.

> This mode only supports two MCP protocols: SSE (Server-Sent Events) and Streamable-HTTP.

## Core Definition

-   **Role**: The platform is responsible for centrally managing MCP service connection information (address, protocol, authentication, etc.) but is not part of the communication link.
-   **Communication Path**: Client → External MCP Service (direct connection); the platform only provides configuration querying and management.
-   **Problem Solved**: Addresses the issue of scattered MCP service endpoints and the need for each client to repeatedly maintain connection strings.

## Feature Details

-   **Centralized Configuration Management**: Uniformly record and manage the configurations of MCP services in external environments (e.g., local/cloud hosts).
-   **Parameter Support**: Records key metadata such as the service address `url`, protocol type `type/transport`, and request headers `headers`.
-   **Structured Storage**: Replaces hard-coded connection strings with structured configurations, making it easy for teams to share and reuse.
-   **Lightweight Design**:
    -   Does not provide runtime status monitoring (Health Check).
    -   Does not proxy business traffic, thus avoiding platform bandwidth pressure and maintaining native communication latency.

## Applicable Scenarios

-   **Intranet Debugging**: The service runs locally or on an intranet, and the platform is only needed to record endpoint parameters for easy team sharing.
-   **Minimalist Operations**: You already have a complete external monitoring system and only need a "service directory" to centrally manage MCP endpoints.

## Supported MCP Protocols

-   **SSE (Server-Sent Events)**: Interacts using an SSE long-lived connection event stream.
-   **Streamable-HTTP**: Uses a streamable HTTP channel for requests/responses.

> Direct management of the STDIO protocol is not supported. If you need STDIO, please use Hosted or Proxy Mode.

## Configuration Fields (mcpServers)

The platform uses a unified `mcpServers` structure to manage MCP service configurations:

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

-   `url`: The address of the external MCP service; mandatory for both SSE and Streamable-HTTP.
-   `type` or `transport`: The protocol type, which can be `sse` or `streamable-http`.
-   `headers`: Request headers (optional), supporting `Authorization`, `API-Key`, `X-API-Key`, etc.
-   `timeout`: HTTP request timeout (in milliseconds, optional).
-   `sseReadTimeout`: SSE read timeout (in milliseconds, optional, for SSE scenarios).

## Connection Examples

### SSE Direct Connection Example

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

The client establishes an SSE connection based on the `url` and `headers` provided by the platform. The event channel is maintained directly by the external service.

### Streamable-HTTP Direct Connection Example

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

The client sends an HTTP request directly to the `url`, which supports chunked/streaming responses. Authentication is passed via the `headers`.
