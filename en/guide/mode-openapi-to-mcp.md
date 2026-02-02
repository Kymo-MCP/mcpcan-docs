# OpenAPI MCP

OpenAPI-MCP enables rapid conversion of any OpenAPI 3.x specification into a fully functional MCP (Model Context Protocol) tool server, providing machine-readable API access capabilities.

> Note: OpenAPI-MCP only supports OpenAPI 3.x specifications and does not support version 2.x.

## Detailed Features
- **Centralized Configuration Management**: Unified entry and management of OpenAPI specification files from external environments.
- **Automatic Conversion**: Automatically generates MCP server code based on the OpenAPI specification.
- **Real-time Monitoring**: Supports real-time monitoring and management of the MCP server.

## Applicable Scenarios
- Converting existing RESTful APIs into MCP services without modifying the original code.
- Minimalist Operations: For environments with existing mature external monitoring systems, only requiring a centralized "Service Yellow Pages" to manage MCP endpoints.

## Supported MCP Protocols
- **STEAMABLE_HTTP**: Uses a streaming HTTP channel for requests/responses.

## Usage Process (Recommended)
- Create an instance on the platform and select "Import OpenAPI".
- Upload the OpenAPI specification file to the platform and select the API interfaces for which you want to generate MCP Tools.
- **Service Address**: Enter the actual access address of the interfaces as defined in the OpenAPI specification.
- After clicking save, the platform will automatically generate the MCP server code based on the OpenAPI specification and start the corresponding container service.
- View the generated MCP service endpoints in the platform's "Instance Management" for monitoring and management.
- If authentication headers are required for interfaces in the OpenAPI specification, you can add the corresponding Token in the instance's "MCP Access Configuration" and enable passthrough mode.

1. Add OpenAPI document and create an instance for OpenAPI To MCP from the main menu.
   <el-image src="/public/images/openapi_mcp_en.png"></el-image>

2. OpenAPI Document Management
   <el-image src="/public/images/openapi_file_en.png"></el-image>

3. OpenAPI To MCP Instance Creation
   <el-image src="/public/images/openapi_mcp_import_en.png"></el-image>

## Authentication Header Support
The platform proxy can attach request headers required by the backend during the forwarding stage; the client side can use platform-level authentication (if enabled). Common headers include:
- `Authorization: Bearer <token>`
- `Authorization: Basic <base64>`
- `API-Key: <key>`
- `X-API-Key: <key>`

> Platform logs mask sensitive `tokens`; the `token_header` in query filters is case-insensitive.
> After enabling passthrough for authentication, accessing the MCP interface via the platform address will pass the corresponding request headers through to the interface defined in the OpenAPI specification.