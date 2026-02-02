# Template

MCP CAN templates provide reusable MCP service protocol configurations, enabling quick creation and management of MCP service instances. This simplifies the tedious command and information configuration process each time you create an instance.

### Benefits of Templates

- **Reuse instance creation process:** When creating instances using template types, we will automatically use the template parameters as your instance creation parameters, reducing repetitive information entry operations.
- **Use templates for categorized management:** Create one type of instance, and you can distinguish what type of instances a template can create based on its name or logo.

## Template Usage

Manage your template list and provide quick deployment of MCP service instances.

### Quick Creation

Based on your different access modes and MCP protocols, we will provide you with different configuration information to better adapt and start your MCP services. Mainly focused on three access modes: hosting, direct connect, and proxy; MCP protocols include STDIO, SSE, and STREAMABLE_HTTP. Configuration information includes: code package, initialization script, container environment, port number, startup command, and service path.

**1.** Template list page: Click "Create Template" on the main page<Popover title="Create template from management list" src="/guide/page-add-template.png" width="384" height="182"/>

**2.** Menu navigation: You can "Create Template" from the menu navigation anytime, anywhere<Popover title="Create template from menu bar" src="/guide/menu-add-template.png" height="220" />

- **Default Server Configuration Tip**

```JSON
{
    "mcpServers": {
        "everything": {
            "args": [
                "-y",
                "@modelcontextprotocol/server-everything"
            ],
            "command": "npx"
        }
    }
}
```

- **[Code Package](./code) Startup** <Popover title="Start using code package" src="/guide/code-package-select.png" width="260" height="165" />

  If you are using your own MCP project, you can host the code package on the platform. When starting the MCP service, you can select your own project package as the startup source.

- **Initialization Script**

  The initialization script must ensure that it can exit after execution is complete. It cannot be set to block, otherwise it will not start.

- **[Container Environment](./env) Usage** <Popover title="Environment management" src="/guide/env-page.png" width="350" height="168" />

  Currently we only support single cluster, so environment information is temporarily not fixed. Multi-cluster support will be updated in the next version, stay tuned......

- **Port Number**

  Default port number: 8080

- **Startup Command**

  Default startup command when accessing via STDIO protocol: `mcp-hosting --port=%d --mcp-servers-config /app/mcp-servers.json`. Otherwise, you need to fill in a custom startup command.

  1. Built based on python:3.12-alpine image, lightweight and compatible with mainstream container environments
  2. Pre-installed components with version locking:
     System basic commands: tar, wget, zip, unzip
     Python environment: Python 3.12.11, with tools uv 0.7.12, uvx 0.7.12
     Node.js environment: Node.js v18.20.1, with tools npm 9.6.6, npx 9.6.6
  3. Default startup command: `mcp-hosting`, which converts MCP STDIO protocol to STREAMABLE_HTTP protocol after startup.

- **Service Path**

  Service path refers to the sub-path for MCP service access. When using SSE and STREAMABLE_HTTP protocols, you need to specify the access path for the MCP service; otherwise, it will be accessed via the root path.
