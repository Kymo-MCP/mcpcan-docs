# Hosted Mode

Hosted Mode is a combination of an all-in-one container runtime environment and protocol adaptation capabilities. The platform directly utilizes its own container computing power to run MCP services and resolves "protocol incompatibility" issues through a built-in adapter. This enables seamless conversion from standard input/output (stdio) to network protocols (SSE/Streamable-HTTP), exposing a unified HTTP/SSE endpoint to the outside world.

> This mode only supports two external connection protocols: SSE (Server-Sent Events) and Streamable-HTTP.

## Core Definition

-   **Container Hosting**: The platform pulls and manages the MCP service container, requiring no external server resources.
-   **Protocol Adaptation**: The stdio stream (stdin/stdout) within the container is automatically converted to SSE/Streamable-HTTP, providing a unified network endpoint externally.
-   **External Path**: Client → Platform (Hosted Container + Adapter) → Public Endpoint (SSE/Streamable HTTP).

## Access Principle

-   The MCP service is started within a container, and the instance runs in a platform-controlled network, achieving network and resource isolation.
-   **Access Path**: `Client → Gateway (Platform Gateway Service) → Container Instance (MCP Server)`.
-   **Unified Gateway Entry**: Only the platform gateway address and instance path are exposed externally. Internal routing directs traffic to the container instance, ensuring the backend is not directly exposed.

## Core Capabilities and Deployment Modes

The core of the platform's Hosted Mode lies in its powerful protocol adaptation capabilities and flexible deployment options, designed to accommodate different types of services and development workflows. It primarily supports the following three deployment modes:

### 1. Stdio Protocol Conversion (Stdio → SSE/Streamable-HTTP)

-   **Use Case**: Quickly package any command-line tool or script based on standard input/output (Stdio) into a network service.
-   **How it works**: The platform provides base images pre-installed with common environments (like Python, Node.js). You just need to upload your code, and the platform will automatically convert the service's `stdio` interaction into `sse` or `streamable-http` protocol and generate a publicly accessible endpoint. This is the fastest way to "serverless-ize" traditional scripts.

### 2. Native Protocol Deployment (Native SSE/Streamable-HTTP)

-   **Use Case**: Deploy services that have already implemented the `sse` or `streamable-http` protocol.
-   **How it works**: You can upload a custom code package or container image. The platform is responsible for the service's containerization, deployment, and lifecycle management, while the service itself directly handles network requests. This mode is suitable for services that require higher customization or already adhere to the MCPCAN native protocols.

### 3. OpenAPI Specification Conversion (OpenAPI → Streamable-HTTP)

-   **Use Case**: Quickly integrate existing RESTful APIs (requires an OpenAPI 3.0+ specification) into the MCPCAN ecosystem.
-   **How it works**: You just need to import the service's OpenAPI specification document, and the platform will automatically convert it into a `streamable-http` protocol service and deploy it in a container. This provides great convenience for integrating traditional APIs.

## Operations and Management Features

-   **Container Lifecycle**: A graphical control panel for Start / Stop / Restart, eliminating the need to execute underlying Docker commands.
-   **Real-time Observability**:
    -   **Run Logs**: Real-time streaming display of standard output (Info) and error output (Error).
    -   **Event Auditing**: Combines with platform logs to record the call chain, facilitating troubleshooting and issue resolution.

## Applicable Scenarios

-   **Serverless Deployment**: Run MCP services on the platform by directly uploading code or images, without needing your own server resources.
-   **Protocol Bridging**: Quickly convert local stdio-based MCP scripts (e.g., in Python/Node.js) into online services that can be called by web applications.

## Supported MCP Protocols

-   **SSE (Server-Sent Events)**: Exposes an event stream endpoint externally, adapting to stdio interaction.
-   **Streamable-HTTP**: Exposes a streaming HTTP endpoint externally, suitable for streaming response scenarios.

> STDIO is not directly exposed externally; it is only used as an adaptation input source within the container.

## Configuration Fields (mcpServers)

The platform uses a unified `mcpServers` structure to describe the external endpoints of hosted services:

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

-   `url`: The externally accessible address generated by the platform (SSE/Streamable HTTP).
-   `type` or `transport`: The protocol type, which can be `sse` or `streamable-http`.
-   `headers`: Headers required for accessing the endpoint (optional), such as `Authorization` or `API-Key`.
-   `timeout`: Request timeout (in milliseconds, optional).
-   `sseReadTimeout`: SSE read timeout (in milliseconds, optional, for SSE scenarios).

## Connection Examples (via Platform Hosted Endpoint)

### SSE Hosted Example

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

-   The client connects to the platform's hosted endpoint to establish an SSE connection. The platform internally handles the stdio → SSE conversion.

### Streamable-HTTP Hosted Example

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

-   The client sends a request to the platform's hosted endpoint. The platform uniformly schedules the container and returns a streaming result.

## Authentication Header Support

The platform supports attaching necessary authentication headers to external endpoints and desensitizes sensitive `token` records internally. The `token_header` in query filters is case-insensitive. Common headers include:
-   `Authorization: Bearer <token>`
-   `Authorization: Basic <base64>`
-   `API-Key: <key>`
-   `X-API-Key: <key>`

## Recommended Workflow

-   Create an instance on the platform and select "Access Mode: Hosted" and the protocol `sse/streamable-http`.
-   Upload the code package or select an image, configure the startup command and port. The platform will pull the container and complete the protocol adaptation.
-   Access the service using the hosted endpoint generated by the platform. Unified logs and auditing facilitate issue resolution.

## FAQ

-   **Can I access STDIO directly?**
    -   Direct external connection to STDIO is not supported. Please use the hosted endpoint's SSE or Streamable-HTTP.
-   **Is container status monitoring and logging supported?**
    -   Yes. The platform provides lifecycle management and real-time log streaming.
-   **How are hosted endpoints organized?**
    -   The external address is formed by combining the gateway prefix configured on the platform with the instance ID. The placeholder `<gateway_prefix>/<instanceId>` is used in the examples.
