# 访问协议

MCP 访问协议，指的是你将以什么样的形式管理你的 MCP 服务。我们为你提供了三种访问模式：[托管](./access-protocol#访问模式)、[直连](./access-protocol#访问模式)、[代理](./access-protocol#访问模式)，协议支持标准的[STDIO](./access-protocol#协议类型)、[SEE](./access-protocol#协议类型)、[STEAMABLE_HTTP](./access-protocol#协议类型)

## 访问模式

**服务托管**：将 MCP 服务以托管的模式部署在你的容器中、也可以是我们专用 demo 服务容器；目前我们支持三种协议的托管；如果你的 MCP 服务是专属于你自己的；或是 MCP 服务源码包。推荐你使用托管模式进行管理
::: tip 托管 - STDIO、SEE、STEAMABLE_HTTP
我们支持三种标准协议的托管模式；在托管并成功启用的 MCP 服务；你将可直接交给 AI agent 去调用你的 MCP 服务。
:::

**服务直连**：通过 MCP 配置信息添加第三方的 MCP 服务；以作为你的 MCP 服务收集管理
::: tip 直连 - SEE、STEAMABLE_HTTP
直连的第三方 MCP 服务目前仅支持 SEE 和 STEAMABLE_HTTP 两种协议
:::

**服务代理**：将第三方的服务平台的 MCP 服务进行转发代理的形式作为管理；以更方便的调用与调试
::: tip 代理 - SEE、STEAMABLE_HTTP
代理的第三方 MCP 服务目前仅支持 SEE 和 STEAMABLE_HTTP 两种协议
:::

## 协议类型

<div class="card-group not-prose grid gap-x-4 sm:grid-cols-2">
  <Card link="" class="mb-4">
    <div class="flex mb-3">
        🖥️
      <div class="font-semibold">STDIO</div>
    </div>
    <div class="text-sm">本地标准输入/输出协议，通过进程 stdin/stdout 与 MCP 服务进行逐行或流式交互，适合本地进程化集成与轻量代理。</div>
  </Card>
  <Card link="" class="mb-4">
    <div class="flex mb-3">
        🔌
      <div class="font-semibold">SEE</div>
    </div>
    <div class="text-sm">是基于套接字/流式事件的扩展协议，支持双向流与事件消息，便于长连接、实时事件推送与低延迟交互。</div>
  </Card>
  <Card link="" class="mb-4">
    <div class="flex mb-3">
        🌊
      <div class="font-semibold">STEAMABLE_HTTP</div>
    </div>
    <div class="text-sm">基于可流化（streamable）的 HTTP 协议，使用 HTTP chunked/Server-Sent Events 或 WebSocket 传输大体积或增量响应，适合流式推理与实时结果返回。</div>
  </Card>
</div>
