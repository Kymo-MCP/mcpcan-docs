# FAQ

Frequently asked questions about the Model Context Protocol ([MCP](https://modelcontextprotocol.io/docs/getting-started/intro)) and using [MCP CAN](https://mcp-demo.itqm.com/).

## What is MCP (Model Context Protocol)?

MCP is an open-source protocol developed by Anthropic that enables AI systems like Claude to securely connect to a wide range of data sources. It provides a universal standard for AI assistants to access external data, tools, and prompts through a client-server architecture.

## What is an MCP Server?

An MCP server is a system that provides context, tools, and prompts to AI clients. They can expose data sources such as files, documents, databases, and API integrations, allowing AI assistants to access real-time information in a secure manner.

## How do MCP Servers work?

MCP servers operate on a simple client-server architecture. They expose data and tools through a standardized protocol, maintaining a secure, one-to-one connection with a client inside a host application like Claude Desktop.

## What can an MCP Server provide?

MCP servers can share resources (files, documents, data), expose tools (API integrations, actions), and provide prompts (templated interactions). They control their own resources and maintain clear system boundaries to ensure security.

## How does Claude use MCP?

Claude can connect to MCP servers to access external data sources and tools, enhancing its capabilities with real-time information. Currently, this applies to local MCP servers, with support for enterprise remote servers coming soon.

## Are MCP Servers secure?

Yes, security is built into the MCP protocol. Servers control their own resources, eliminating the need to share API keys with LLM providers, and systems maintain clear boundaries. Each server manages its own authentication and access control.

## What is MCP CAN?

MCP CAN is an open-source platform focused on the efficient management of MCP (Model Context Protocol) services. It provides DevOps and development teams with comprehensive MCP service lifecycle management capabilities through a modern web interface. MCP CAN supports multi-protocol compatibility and conversion, enabling seamless integration between different MCP service architectures, while also offering visual monitoring, security authentication, and one-stop deployment capabilities.

## How can I submit my MCP server to MCP CAN?

You can submit your MCP server by creating a new issue in our GitHub repository. Click the "Submit" button in the navigation bar or visit our GitHub issues page directly. Please provide detailed information about your server, including its name, description, features, and connection information. Alternatively, you can manage your MCP services yourself using the local management platform by creating and managing them through code packages.
