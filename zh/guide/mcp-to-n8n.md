# mcpcan 实例同步到 N8N 插件

## 创建 N8N 智能体平台
![n8n1](../../public/images/n8n1.jpg)

在`智能体平台`菜单中点击新建 N8N 商业版，`接入名称`可以随便定义，`平台地址` 填写 N8N 的 `HOST` 地址，账号密码则为要同步的账号

> 注意安装后会进行连接性测试，该测试会测试账号密码是否正确，还会测试 N8N 是否安装 n8n-nodes-mcp 插件

![n8n4](../../public/images/n8n4.jpg)

## 同步 mcp 实例到 N8N credentials 列表

### 选中 mcp 实例进行同步
![dify2](../../public/images/dify2.png)

进入`实例管理`菜单，选中需要同步的 mcp 实例，点击`智能体平台同步`按钮

### 选择刚创建的 N8N 智能体平台
![dify3](../../public/images/n8n2.jpg)

### 选择 N8N 需要同步的的项目
![n8n3](../../public/images/n8n3.jpg)

### 给每个项目设定 mcpcan 代理访问时候透传的 headers
![dify5](../../public/images/dify5.png)

mcpcan 默认会给每个 `项目` 初始化一个授权信息，这个授权信息会在 mcpcan 代理访问 N8N 时候透传

其中网关认证的 Authorization 会同步到 N8N mcp 插件的 header 中，而透传 headers 会在 mcpcan 接收到代理请求之后透传给实际的 mcp server

> mcpcan 会给每个空间初始化好不同的网关认证 Authorization，透传 headers 会使用实例`MCP访问配置` 中 default 的透传 headers

### 开启同步之后，查看同步状态及错误信息
![dify6](../../public/images/dify6.png)

点击确认同步之后就会弹出同步状态页面，该页面可以查看每个项目每个实例的同步状态及错误信息

## 实例管理中管理每个项目的授权
![dify7](../../public/images/dify7.png)

【实例管理】-> 【MCP访问配置】

在`MCP访问配置`中可以查看每个空间的授权信息，也可以在其中修改透传 headers，也可以决定是否禁用某个空间授权访问

