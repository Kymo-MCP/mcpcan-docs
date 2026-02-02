# mcpcan 实例同步到 Dify 工具

## 创建 Dify 智能体平台
![dify1](../../public/images/dify1.png)

在`智能体平台`菜单中点击新建 Dify 社区或者企业版，填写 mcpcan 能访问到的 Dify 数据库信息，点击保存的时候会执行连通性检查

> 这里的企业版指的是私有化的 Dify 企业版不是 sass 版

## 同步 mcp 实例到 Dify 工具列表

### 选中 mcp 实例进行同步
![dify2](../../public/images/dify2.png)

进入`实例管理`菜单，选中需要同步的 mcp 实例，点击`智能体平台同步`按钮

### 选择刚创建的 Dify 智能体平台
![dify3](../../public/images/dify3.png)

### 选择 Dify 需要同步的的空间
![dify4](../../public/images/dify4.png)

### 给每个空间设定 mcpcan 代理访问时候透传的 headers
![dify5](../../public/images/dify5.png)

mcpcan 默认会给每个空间初始化一个授权信息，这个授权信息会在 mcpcan 代理访问 Dify 时候透传

其中网关认证的 Authorization 会同步到 Dify mcp 工具的 header 中，而透传 headers 会在 mcpcan 接收到代理请求之后透传给实际的 mcp server

> mcpcan 会给每个空间初始化好不同的网关认证 Authorization，透传 headers 会使用实例`MCP访问配置` 中 default 的透传 headers

### 开启同步之后，查看同步状态及错误信息
![dify6](../../public/images/dify6.png)

点击确认同步之后就会弹出同步状态页面，该页面可以查看每个空间每个实例的同步状态及错误信息

## 实例管理中管理每个空间的授权
![dify7](../../public/images/dify7.png)

【实例管理】-> 【MCP访问配置】

在`MCP访问配置`中可以查看每个空间的授权信息，也可以在其中修改透传 headers，也可以决定是否禁用某个空间授权访问

