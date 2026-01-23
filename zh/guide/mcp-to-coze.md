# mcpcan 实例同步到 COZE 插件

## 创建 COZE 智能体平台
![coze1](../../public/images/coze1.png)

在`智能体平台`菜单中点击新建 COZE 商业版，`接入名称`可以随便定义，`团队/企业ID` 填写 COZE 商业版的团队ID

![coze2](../../public/images/coze2.png)

> 由于 COZE 开源版暂时没有支持 mcp，所以这里只能同步到 COZE 商业版

## 同步 mcp 实例到 COZE 插件列表

### 选中 mcp 实例进行同步
![dify2](../../public/images/dify2.png)

进入`实例管理`菜单，选中需要同步的 mcp 实例，点击`智能体平台同步`按钮

### 选择刚创建的 COZE 智能体平台
![dify3](../../public/images/dify3.png)

#### 下一步填写 COZE 商业版用户的 Cookie
![coze3](../../public/images/coze3.png)

Cookie 的获取可以在 COZE 商业版的浏览器中获取，具体操作如下：

1. 登录 COZE 商业版
2. 打开浏览器的开发者工具（F12 或者右键点击页面选择“检查”）
3. 切换到“网络”（Network）标签页
4. 刷新页面
5. 在网络请求列表中找到某一个请求
6. 点击该请求，在右侧的“请求头”（Request Headers）中找到 `Cookie` 字段
7. 复制 `Cookie` 字段的值

![coze4](../../public/images/coze4.png)

> 由于 COZE 官方授权的 API 接口暂时没有支持插件的管理，所以只能通过 Cookie 调用 COZE 商业版的 WEB 接口

### 选择 COZE 需要同步的的空间
![dify4](../../public/images/dify4.png)

> 这里的空间只会获取该 Cookie 的用户`所有者`或者`管理员`权限的空间

### 给每个空间设定 mcpcan 代理访问时候透传的 headers
![dify5](../../public/images/dify5.png)

mcpcan 默认会给每个空间初始化一个授权信息，这个授权信息会在 mcpcan 代理访问 COZE 时候透传

其中网关认证的 Authorization 会同步到 COZE mcp 插件的 header 中，而透传 headers 会在 mcpcan 接收到代理请求之后透传给实际的 mcp server

> mcpcan 会给每个空间初始化好不同的网关认证 Authorization，透传 headers 会使用实例`MCP访问配置` 中 default 的透传 headers

### 开启同步之后，查看同步状态及错误信息
![dify6](../../public/images/dify6.png)

点击确认同步之后就会弹出同步状态页面，该页面可以查看每个空间每个实例的同步状态及错误信息

## 实例管理中管理每个空间的授权
![dify7](../../public/images/dify7.png)

【实例管理】-> 【MCP访问配置】

在`MCP访问配置`中可以查看每个空间的授权信息，也可以在其中修改透传 headers，也可以决定是否禁用某个空间授权访问

