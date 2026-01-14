# Access Protocol

MCP access protocol refers to how you manage your MCP services. We provide three access modes: [Hosted](./access-protocol#access-modes), [Direct Connect](./access-protocol#access-modes), and [Proxy](./access-protocol#access-modes). The protocol supports standard [STDIO](./access-protocol#protocol-types), [SSE](./access-protocol#protocol-types), and [STREAMABLE_HTTP](./access-protocol#protocol-types).

## Access Modes

**Service Hosting**: Deploy MCP services in hosted mode in your containers, or in our dedicated demo service containers. We currently support hosting for three protocols. If your MCP service is exclusively yours or is an MCP service source code package, we recommend using hosted mode for management.
::: tip Hosting - STDIO, SSE, STREAMABLE_HTTP
We support hosted mode for three standard protocols. For MCP services that are hosted and successfully enabled, you can directly hand them over to AI agents to call your MCP services.
:::

**Service Direct Connect**: Add third-party MCP services through MCP configuration information as part of your MCP service collection management.
::: tip Direct Connect - SSE, STREAMABLE_HTTP
Third-party MCP services connected directly currently only support SSE and STREAMABLE_HTTP protocols.
:::

**Service Proxy**: Manage third-party service platform MCP services in the form of forwarding proxy for easier invocation and debugging.
::: tip Proxy - SSE, STREAMABLE_HTTP
Third-party MCP services proxied currently only support SSE and STREAMABLE_HTTP protocols.
:::

## Protocol Types

<div class="card-group not-prose grid gap-x-4 sm:grid-cols-2">
  <Card link="" class="mb-4">
    <div class="flex mb-3">
        🖥️
      <div class="font-semibold">STDIO</div>
    </div>
    <div class="text-sm">Local standard input/output protocol that interacts with MCP services line-by-line or in streams through process stdin/stdout, suitable for local process integration and lightweight proxying.</div>
  </Card>
  <Card link="" class="mb-4">
    <div class="flex mb-3">
        🔌
      <div class="font-semibold">SSE</div>
    </div>
    <div class="text-sm">An extended protocol based on socket/streaming events, supporting bidirectional streams and event messages, facilitating long connections, real-time event push, and low-latency interaction.</div>
  </Card>
  <Card link="" class="mb-4">
    <div class="flex mb-3">
        🌊
      <div class="font-semibold">STREAMABLE_HTTP</div>
    </div>
    <div class="text-sm">A streamable HTTP-based protocol that uses HTTP chunked/Server-Sent Events or WebSocket to transmit large-volume or incremental responses, suitable for streaming inference and real-time result returns.</div>
  </Card>
</div>
