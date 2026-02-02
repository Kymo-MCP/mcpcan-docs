# MCPCAN Instance Sync to Dify Tool

## Create Dify Agent Platform
![dify1](../../public/images/dify1_en.png)

In the `Agent Platform` menu, click to create a new Dify Community or Enterprise Edition, fill in the Dify database information that mcpcan can access, and a connectivity check will be performed when you click save.

> The Enterprise Edition here refers to the privately deployed Dify Enterprise Edition not the SaaS version.

## Sync MCP Instance to Dify Tool List

### Select an MCP instance to sync
![dify2](../../public/images/dify2_en.png)

Go to the `Instance Management` menu, select the MCP instance you want to sync, and click the `Agent Platform Sync` button.

### Select the newly created Dify agent platform
![dify3](../../public/images/dify3_en.png)

### Select the space in Dify that needs to be synced
![dify4](../../public/images/dify4_en.png)

### Set the pass-through headers for mcpcan proxy access for each space
![dify5](../../public/images/dify5_en.png)

mcpcan will initialize an authorization credential for each space by default. This credential will be passed through when mcpcan accesses Dify through the proxy.

The Authorization for gateway authentication will be synchronized to Dify's mcp tool header, while the pass-through headers will be passed to the actual MCP server after mcpcan receives the proxy request.

> mcpcan will initialize different gateway authentication Authorizations for each space. The pass-through headers will use the default pass-through headers from the instance's `MCP Access Configuration`.

### After enabling synchronization, check the sync status and error messages
![dify6](../../public/images/dify6_en.png)

After confirming the synchronization, a sync status page will pop up. This page allows you to view the sync status and error messages for each instance in each space.

## Manage authorization for each space in Instance Management
![dify7](../../public/images/dify7_en.png)

[Instance-Mg] -> [Config]

In `MCP Access Configuration`, you can view the authorization information for each space, modify the pass-through headers, and decide whether to disable authorization access for a specific space.
