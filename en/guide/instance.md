# Instance

MCP CAN instances refer to running MCP (Model Context Protocol) service units. Each instance is an independent, accessible MCP service endpoint that provides standardized context and tool capabilities for AI applications such as [扣子](https://space.coze.cn/), [Cursor](https://cursor.com/cn), Windsurf, [Dify](https://cloud.dify.ai/apps), [Kymo](https://kymo.uat.itqm.com/), etc.

## What is an Instance?

Instances are the core concept of the MCP CAN platform, encapsulating your business logic, data interfaces, or tools as services that comply with the MCP protocol. By creating instances, you can:

- **Quick Deployment** - Create MCP services with one click from templates, code packages, or OpenAPI specifications
- **Unified Management** - Manage the lifecycle of all MCP services on a single platform
- **Secure Access** - Control service usage permissions through tokens and access configurations
- **Real-time Monitoring** - View service running status, request logs, and performance metrics
- **Elastic Scaling** - Automatically or manually adjust instance scale based on load

Whether you are a developer, enterprise user, or AI application integrator, instances are the bridge connecting your data and AI capabilities.

## Core Features

- **📈 Dashboard Data** - View your real-time statistics for convenient management
- **🚀 Instance Management** - Instance lifecycle, scaling, and cluster management
- **📈 Monitoring & Logs** - Real-time monitoring, log aggregation, and alert notifications
- **🔐 Security & Authentication** - Identity authentication, access control, and operation auditing
- **⚡ One-Click Usage** - Get external access addresses with one click for AI usage or debugging

## Instance Management

## Create Instance

We provide rich type combinations for instance creation to add MCP services for different application scenarios. We support multiple modes to create an MCP service, including [Custom](#customize), [Template](#template), [OpenAPI to MCP](#OpenApi), and more.

1. Create from menu bar {#customize}

<el-image src="/guide/menu-add-instance.png"></el-image>

2. Create from instance management page {#OpenApi}

<el-image src="/guide/page-add-instance.png"></el-image>

3. Create from template {#template}

<el-image src="/guide/template-add-instance.png"></el-image>

## Access Configuration

Access configuration provides standardized configuration information required to connect MCP instances to various AI clients. Through access configuration, you can quickly obtain connection parameters that comply with the MCP protocol.

### Configuration Management

In the "Access Configuration" tab of the instance details page, you can:

- **View Configuration List** - Display all created access tokens and their status
- **Add Token** - Click the "+ Add Token" button to create new access credentials
- **Edit Token** - Modify token properties such as label and validity period
- **Delete Token** - Remove access credentials that are no longer used
- **View Access Logs** - Track token usage records

### Configuration Format

Access configuration is provided in standard JSON format, containing complete connection information for MCP services:

```json
{
  "mcpServers": {
    "mcp-fc57f995": {
      "url": "https://your-visit.com/url",
      "headers": {
        "Authorization": "Basic your Authorization"
      }
    }
  }
}
```

**Configuration Field Description:**

- `mcpServers` - MCP server configuration root object
  - `mcp-fc57f995` - Unique identifier for the service instance
    - `url` - Access endpoint address for the MCP service
    - `headers` - Request header configuration
      - `Authorization` - Authentication information (Bearer or Basic authentication)

### How to Use

1. **Copy Configuration** - Click the copy icon in the upper right corner to copy the complete JSON configuration to the clipboard
2. **Paste to Client** - Paste the configuration into the MCP configuration file of your AI client
3. **Restart Client** - Restart the AI client to apply the configuration
4. **Verify Connection** - Confirm in the client that the MCP service has been successfully connected

::: tip Tip

- Each access token has an independent validity period. You can view "Permanent" or specific expiration time in the token list
- It is recommended to create different access tokens for different usage scenarios (development, testing, production)
- Regularly rotate tokens to improve security
  :::

## Security Tokens

Security tokens are identity credentials for accessing MCP services, used to authenticate and authorize client requests. MCP CAN supports multiple authentication methods to meet different security requirements and usage scenarios.

### Token Types

MCP CAN supports the following four API authentication methods:

#### 1. **Bearer Token**

Tokens can be randomly generated or custom filled. Suitable for scenarios requiring flexible access credential management.

- **Auto Generate**: System randomly generates a secure token string
- **Custom Token**: You can enter your own token value or custom fill the token
- **Usage**: Add `Authorization: Bearer <token>` in HTTP request headers

#### 2. **Api-Key**

Tokens can be randomly generated or custom filled. This is a common API authentication method where the token is directly used as an API key.

- **Auto Generate**: System randomly generates an API Key
- **Custom Fill**: You can enter your own API Key value
- **Usage**: Add `Api-Key: <your-api-key>` in HTTP request headers

#### 3. **X-API-Key**

Tokens can be randomly generated or custom filled. Suitable for scenarios requiring custom request header names.

- **Auto Generate**: System randomly generates a key
- **Custom Fill**: You can enter your own key value
- **Usage**: Add `X-API-Key: <your-key>` in HTTP request headers

#### 4. **Basic Authentication**

Uses `username:password` and requires filling in username and password. This is the standard HTTP basic authentication method.

- **Username**: Enter authentication username
- **Password**: Enter authentication password
- **Encoding Method**: System automatically encodes `username:password` in Base64
- **Custom**: Can be entered according to custom encoding rules
- **Usage**: Add `Authorization: Basic <base64-encoded-credentials>` in HTTP request headers

### Create Token

Click the "+ Add Token" button on the "Access Configuration" page and follow these steps to create a new token:

1. **Set Validity Period** (Optional):

   - Select the token expiration time
   - Or select "Permanent" (not recommended for production environments)

2. **Select Authentication Type**: Choose the appropriate authentication method from the dropdown menu (Bearer, Api-Key, X-API-Key, or Basic)

3. **Configure Authentication Information**:

   - **Bearer/Api-Key/X-API-Key**: Choose "Random Generate" or manually enter token value
   - **Basic**: Fill in username and password

4. **Add HTTP Request Headers** (Optional):

   - Enable "Passthrough" switch: Pass header content to downstream services
   - Add custom request header key-value pairs
   - Support adding multiple request headers

5. **Add Label** (Optional):

   - Enter label name for easy identification and management
   - Examples: `dev-token`, `production`, `test-env`, etc.

6. **Real-time Configuration Preview**: Modifying token configuration will generate access configuration JSON on the right side

### Token Management

After creating a token, you can perform the following operations in the token list:

- **View Token Information**: Display token type, validity period, creation time, etc.
- **Edit Token**: Modify token label, validity period, or other configurations
- **View Access Logs**: View usage records and access statistics for the token
- **Delete Token**: Revoke token access permissions (deleted tokens become invalid immediately)

### Security Best Practices

::: warning Security Recommendations

- **Avoid Hardcoding**: Do not write tokens directly into code, use environment variables or configuration files
- **Principle of Least Privilege**: Create independent tokens for different usage scenarios, limiting access scope
- **Regular Rotation**: Regularly update tokens, especially long-term tokens in production environments
- **Set Validity Period**: Try to set reasonable expiration times for tokens, avoid using permanent tokens
- **Monitor Usage**: Regularly check access logs, revoke tokens promptly when abnormal access is detected
- **Secure Storage**: Use key management services (such as AWS Secrets Manager, Azure Key Vault) to store sensitive tokens
  :::

### Usage Examples

**Bearer Token Example:**

```bash
curl -X POST https://mcp-dev.itqm.com/mcp-gateway/your-instance-id/mcp \
  -H "Authorization: Bearer your-token-here" \
  -H "Content-Type: application/json" \
  -d '{"method": "tools/list"}'
```

**Basic Authentication Example:**

```bash
curl -X POST https://mcp-dev.itqm.com/mcp-gateway/your-instance-id/mcp \
  -H "Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=" \
  -H "Content-Type: application/json" \
  -d '{"method": "tools/list"}'
```

**Api-Key Example:**

```bash
curl -X POST https://mcp-dev.itqm.com/mcp-gateway/your-instance-id/mcp \
  -H "Api-Key: your-api-key-here" \
  -H "Content-Type: application/json" \
  -d '{"method": "tools/list"}'
```

## Status Probe

Status probe is an important function for health checks on MCP instances, used to monitor service availability and connection status in real-time. Through status probes, you can quickly identify service failures and ensure MCP services are always available.

### Probe Content

MCP CAN performs multi-dimensional status detection on each instance to ensure all components of the service are running normally:

#### 1. **Container Status**

Detects the running status of instance containers to ensure service processes start normally.

- **Status Indicators**:
  - 🟢 **Ready** - Container running normally, service started
  - 🔴 **Not Ready** - Container startup failed or service abnormal
- **Detection Content**: Container health check, process survival status

#### 2. **Container SVC Status**

Detects the connectivity of Kubernetes Service (svc) to ensure network-level reachability.

- **Status Indicators**:
  - 🟢 **Ready** - Service normal, network reachable
  - 🔴 **Not Ready** - Service abnormal, cannot establish connection
- **Detection Content**: Service endpoint availability, load balancer status

#### 3. **Service Status**

Detects the running status and response capability of the MCP service itself.

- **Status Indicators**:
  - 🟢 **Ready** - MCP service responding normally
  - 🔴 **Not Ready** - Service not responding or returning errors
- **Detection Content**: Service port listening, protocol handshake, basic response capability

#### 4. **Error Information**

When probe fails, displays detailed error diagnostic information to help quickly locate problems.

- **Common Errors**:
  - `Connection Timeout` - Network unreachable or service slow to respond
  - `Port Not Listening` - Service process not started or port configuration error
  - `Authentication Failed` - Token invalid or insufficient permissions
  - `Protocol Error` - MCP protocol handshake failed

### Automatic Probe

In addition to manual trigger, MCP CAN also provides automatic health check mechanism:

- **Periodic Probe**: System automatically executes health checks at regular intervals (e.g., every 30 seconds)
- **Status Update**: Status indicators in the instance list reflect the latest health status in real-time
- **Alert Notification**: When service abnormalities are detected, the system triggers alerts (requires alert rule configuration)

### Troubleshooting

When status probe shows abnormalities, you can troubleshoot following these steps:

1. **Check Container Status**:

   - View instance logs to confirm if the service started normally
   - Check if resource allocation (CPU, memory) is sufficient

2. **Check Network Connection**:

   - Confirm Service configuration is correct, port mapping is correct
   - Check if network policies (Network Policy) are blocking access

3. **Verify Authentication Configuration**:

   - Confirm token is valid and not expired
   - Check if authentication method matches instance configuration

4. **View Monitoring Logs**:
   - Switch to "Monitoring Logs" tab to view detailed running logs
   - Search for error keywords to locate specific problems

::: tip Tip

- Status probe results are cached for a period of time. To get the latest status, please click the "Refresh" button
- It is recommended to actively execute status probe after instance changes (such as restart, update configuration) to ensure service is normal
- You can combine with monitoring log functionality to deeply analyze the root cause of probe failures
  :::

## Monitoring Logs

Monitoring logs are the core functionality for instance running status and request tracking, providing real-time log viewing, error tracking, and problem diagnosis capabilities. Through monitoring logs, you can quickly locate service abnormalities, analyze performance bottlenecks, and trace user requests.

MCP CAN provides two types of log views: **Container Logs** and **Access Logs**, used to view application running logs and API request records respectively.

### Container Logs

Container logs record all standard output (stdout) and standard error (stderr) information during MCP instance runtime, including application startup, configuration loading, error stacks, and other underlying running logs.

#### Log Content

Container logs contain the following key information:

- **Timestamp**: Precise time when the log was generated (format: `[I 2025-11-20 12:00:03.686.686]`)
- **Log Level**: Level identifiers such as INFO, WARN, ERROR
- **Module Path**: Code module that generated the log (e.g., `mcp_server.streamable_http_manager`)
- **Log Content**: Detailed running information, error messages, or status updates

**Common Log Types:**

```
[INFO] StreamableHTTP session manager started
[INFO] MCP SSE Protocol [everything] added successfully, SSE access URL: http://0.0.0.0:8080/sse
[INFO] MCP STEAMABLE_HTTP Protocol [everything] added successfully, HTTP access URL: http://0.0.0.0:8080/mcp
[INFO] Serving incoming MCP requests on 0.0.0.0:8080
[INFO] Started server process [22]
[INFO] Waiting for application startup.
[INFO] Application startup complete.
[INFO] Uvicorn running on http://0.0.0.0:8080 (Press CTRL+C to quit)
[INFO] 10.42.0.6:34656 - "POST /mcp HTTP/1.1" 307 Temporary Redirect
```

#### Usage Scenarios

- **Startup Diagnosis**: View service startup logs to confirm if configuration loading and module initialization are normal
- **Error Troubleshooting**: Locate exception stack information, analyze root causes of service crashes or response errors
- **Performance Analysis**: Observe request processing logs to identify slow queries or resource bottlenecks
- **Runtime Monitoring**: View service health status and running events in real-time

#### Operation Functions

In the container log view, you can:

1. **Real-time Viewing**: Log content automatically scrolls to display latest records
2. **Refresh Logs**: Click the "🔄 Refresh" button to manually refresh log content
3. **Download Logs**: Click the "⬇ Download" button to export logs as text files for offline analysis
4. **Close Logs**: Click the "✖ Close" button to exit the log viewing interface
5. **Log Scrolling**: Support mouse wheel or scrollbar to browse historical logs

### Access Logs

Access logs (Trace logs) record all API requests and response details entering MCP instances, including request parameters, response results, execution time, and other key information. They are an important tool for tracking user behavior and diagnosing business problems.

#### Log Content

Access logs are displayed in structured JSON format, with each record containing:

- **Timestamp**: Time when the request occurred (e.g., `2025/11/21 16:05:29`)
- **Log Level**: Info, Trace, Debug, Warn, Error
- **Event Type**: request (request), response (response), sse_start (SSE session start)
- **Detailed Information**: JSON format request and response data

**Request Log Example:**

```json
{
  "event": "request",
  "level": "info",
  "message": {
    "contentType": "application/json",
    "cookies": [],
    "form": [],
    "headers": {
      "Accept": "application/json, text/event-stream",
      "Accept-Encoding": "br, gzip, deflate"
    },
    "responseHeaders": {
      "Cache-Control": "no-store, no-cache, must-revalidate"
    }
  }
}
```

**Response Log Example:**

```json
{
  "event": "response",
  "level": "info",
  "message": {
    "latency": 5012853814,
    "method": "GET",
    "path": "/mcp-gateway/0630c7e5-1661-4066-8cc0-a11b596e09c2d/mcp",
    "responseHeaders": {
      "Content-Length": "2696702"
    }
  }
}
```

#### Filtering and Search

Access logs provide powerful filtering and search functions to help quickly locate target logs:

1. **Log Level Filter**:

   - Click top tag buttons to select log level: All | Trace | Debug | Info | Warn | Error
   - Quickly filter log records of specific levels

2. **Instance Connection Filter**:

   - Select a specific instance from the "Instance Connection" dropdown menu
   - View independent access logs for that instance

3. **Time Range Filter**:

   - Set start time and end time
   - Query log records within the specified time period

4. **Token Filter**:

   - Select a specific access token
   - Track all requests corresponding to that token

5. **Trace ID Search**:

   - Enter Trace ID to precisely find specific request chains
   - Used for distributed link tracking and problem location

6. **Refresh Logs**:
   - Click the "🔄 Refresh" button to update the log list

#### Usage Scenarios

- **Request Tracking**: Track complete request chains through Trace ID to locate cross-service call problems
- **Performance Analysis**: View request latency to identify slow interfaces and performance bottlenecks
- **Error Diagnosis**: Filter Error level logs to quickly locate failed requests and exception causes
- **User Behavior Analysis**: Filter by Token to view access records of specific users or clients
- **Security Audit**: Trace API access history to investigate abnormal access or unauthorized behavior

#### Log Field Description

| Field               | Description                           | Example                        |
| ------------------- | ------------------------------------- | ------------------------------ |
| **Timestamp**       | Time when the request occurred        | `2025/11/21 16:05:29`          |
| **Log Level**       | Info, Trace, Debug, Warn, Error       | `Info`                         |
| **Event Type**      | request, response, sse_start, etc.    | `request`                      |
| **latency**         | Request processing time (nanoseconds) | `5012853814` (about 5 seconds) |
| **method**          | HTTP method                           | `GET`, `POST`                  |
| **path**            | Request path                          | `/mcp-gateway/.../mcp`         |
| **contentType**     | Request content type                  | `application/json`             |
| **headers**         | Request header information            | `{"Accept": "..."}`            |
| **responseHeaders** | Response header information           | `{"Content-Length": "..."}`    |

### Log Management Best Practices

::: tip Tip

- **Regular Review**: It is recommended to check Error level logs once a day to discover potential problems in time
- **Retention Period**: Access logs are retained for 7 days by default, container logs for 3 days (can be adjusted according to subscription plan)
- **Download Archive**: For important events, it is recommended to download logs and archive them
- **Combine Monitoring**: Combine log analysis with status probes and alert monitoring to build a complete observability system
- **Trace ID Standards**: Carry custom Trace ID in client requests to facilitate cross-system link tracking
  :::

### Common Problem Troubleshooting

**Problem 1: Container logs show "No data"**

- Possible cause: Service just started, no logs generated yet
- Solution: Wait a moment or click refresh button, or check if container started normally

**Problem 2: Latest requests not visible in access logs**

- Possible cause: Log collection has delay (usually 10-30 seconds)
- Solution: Click refresh button, or adjust time range to "Last 5 minutes"

**Problem 3: Large number of 307 Temporary Redirect in logs**

- Possible cause: HTTP requests redirected to HTTPS or path normalization
- Solution: Check client configuration to ensure correct protocol and path are used

**Problem 4: Logs show "Application startup complete" but service unavailable**

- Possible cause: Service started successfully but network or authentication configuration has problems
- Solution: Execute status probe, check container svc status and service status

## MCP Debugging Tool

The MCP Debugging Tool provides a visual interface that allows developers to interact directly with MCP services and test tool functions and parameters.

### Features Overview

The debugging tool mainly includes the following areas:

1. **Basic Info Bar**: Displays the current MCP service name, ID, and Base URL.
2. **Tool List**: The left side shows the list of all available tools under the MCP service, with search support.
3. **Parameter Configuration**: The middle area is used to input required parameters for the tool. Supports **Form** and **JSON** input modes.
4. **Operation Area**: Provides shortcuts such as "Run", "Copy Input", and "Copy Output".
5. **Result Display**: The right side shows the execution status (Success/Failure) and detailed JSON output results.

### User Guide

1. **Select Tool**
   Click on the name of the tool you want to debug in the tool list on the left.

2. **Input Parameters**
   Fill in the necessary parameters in the middle parameter area.

   - **Form Mode**: Input values or text directly via form controls.
   - **JSON Mode**: If the parameter structure is complex, switch to JSON mode to edit the request body directly.

3. **Execute Debug**
   Click the **Run** button in the operation area. The system will send a request to the MCP Gateway and display the execution result on the right.

4. **View Results**
   Upon successful execution, the right panel will display a green success message and the returned JSON data. If execution fails, error information will be displayed for troubleshooting.

<el-image src="/guide/mcp-debug-tool.png"></el-image>
