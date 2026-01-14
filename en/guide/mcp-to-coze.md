# Sync mcpcan instance to COZE plugin

## Create COZE Agent Platform
![coze1](../../public/images/coze1_en.png)

In the `Agent Platform` menu, click to create a new COZE Business Edition. The `Access Name` can be defined arbitrarily, and the `Team/Enterprise ID` should be filled with the Team ID of the COZE Business Edition.

![coze2](../../public/images/coze2.png)

> Since the open-source version of COZE does not currently support mcp, you can only sync to the COZE Business Edition here.

## Sync mcp instance to COZE plugin list

### Select an mcp instance to sync
![dify2](../../public/images/dify2_en.png)

Go to the `Instance Management` menu, select the mcp instance to be synchronized, and click the `Agent Platform Sync` button.

### Select the newly created COZE agent platform
![dify3](../../public/images/dify3_en.png)

#### Next, fill in the Cookie of the COZE Business Edition user
![coze3](../../public/images/coze3_en.png)

The Cookie can be obtained from the browser in the COZE Business Edition. The specific operations are as follows:

1. Log in to the COZE Business Edition
2. Open the browser's developer tools (F12 or right-click on the page and select "Inspect")
3. Switch to the "Network" tab
4. Refresh the page
5. Find a request in the network request list
6. Click on the request and find the `Cookie` field in the "Request Headers" on the right
7. Copy the value of the `Cookie` field

![coze4](../../public/images/coze4.png)

> Since the officially authorized API of COZE does not currently support plugin management, the WEB interface of the COZE Business Edition can only be called through Cookies.

### Select the space in COZE that needs to be synced
![dify4](../../public/images/dify4_en.png)

> Only spaces for which the user with this Cookie is an `Owner` or `Administrator` will be retrieved here.

### Set the pass-through headers for mcpcan proxy access for each space
![dify5](../../public/images/dify5_en.png)

mcpcan will initialize an authorization credential for each space by default. This credential will be passed through when mcpcan accesses COZE through the proxy.

The gateway authentication's Authorization will be synchronized to the header of the COZE mcp plugin, while the pass-through headers will be passed to the actual mcp server after mcpcan receives the proxy request.

> mcpcan will initialize different gateway authentication Authorizations for each space. The pass-through headers will use the default pass-through headers from the instance's `MCP Access Configuration`.

### After enabling synchronization, check the sync status and error messages
![dify6](../../public/images/dify6_en.png)

After confirming the synchronization, a sync status page will pop up. This page allows you to view the sync status and error messages for each instance in each space.

## Manage authorization for each space in Instance Management
![dify7](../../public/images/dify7_en.png)

[Instance-Mg] -> [Config]

In `MCP Access Configuration`, you can view the authorization information for each space, modify the pass-through headers, and decide whether to disable authorization access for a specific space.
