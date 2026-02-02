# 代码包管理

代码包管理用于上传、存储和管理 MCP 实例运行所需的代码包文件。通过代码包管理，你可以集中管理应用代码、依赖库和配置文件，并在创建实例时快速引用这些代码包进行部署。

## 什么是代码包？

代码包是包含 MCP 服务实现代码、依赖配置（如 `requirements.txt`、`package.json`）和必要资源文件的压缩包。平台支持以下格式：

- **ZIP 压缩包** (.zip)
- **TAR 压缩包** (.tar, .tar.gz)

代码包会被上传到平台的存储服务中，创建实例时可以选择对应的代码包自动部署到容器环境。

## 代码包列表

代码包管理界面展示所有已上传的代码包及其详细信息：

| 字段           | 说明                             | 示例                                |
| -------------- | -------------------------------- | ----------------------------------- |
| **代码包名称** | 压缩包文件名                     | `server_mcp.zip`、`mcp-example.zip` |
| **代码包大小** | 文件大小                         | `1.61 MB`、`49.32 MB`               |
| **类型**       | 文件格式                         | `ZIP`、`TAR`                        |
| **上传时间**   | 首次上传的时间戳                 | `2025-11-17 14:53:03`               |
| **更新时间**   | 最后修改的时间戳                 | `2025-11-17 14:53:03`               |
| **操作**       | 可执行的操作（查看、下载、删除） | 查看、下载、删除按钮                |

### 功能操作

1. **搜索代码包**：

   - 在右上角的搜索框中输入代码包名称进行快速筛选
   - 支持模糊匹配

2. **刷新列表**：

   - 点击右上角的刷新按钮（🔄）更新代码包列表

3. **查看代码包详情**：

   - 点击代码包行右侧的"查看"按钮
   - 查看代码包内的文件结构、大小、上传者等信息

4. **下载代码包**：

   - 点击操作菜单（⋮）中的"下载"选项
   - 浏览器会下载该代码包到本地

5. **删除代码包**：
   - 点击操作菜单（⋮）中的"删除"选项
   - 系统会弹出确认提示（⚠️ 删除后无法恢复，正在使用该代码包的实例不受影响）

## 上传代码包

点击右上角的"📤 上传代码包"按钮进入上传界面。

### 上传方式

平台支持两种上传方式：

#### 1. **拖拽上传**

- 将代码包文件拖拽到上传区域（虚线框区域）
- 系统会自动识别文件并开始上传

#### 2. **点击选择文件**

- 点击上传区域或"点击或将文件拖拽到这里上传"提示文字
- 在弹出的文件选择器中选择本地代码包文件
- 选择后自动开始上传

### 上传说明

根据截图中的"上传说明"，上传代码包需遵守以下规则：

::: warning 上传限制

- **文件大小限制**：单个文件不超过 100MB
- **支持格式**：ZIP、TAR、TAR.GZ
- **在线查看**：上传后可以在线查看和编辑代码文件
- **覆盖上传**：支持下载已上传的代码包
- **文件名规范**：代码包仅支持英文命名
  :::

### 上传步骤

1. **准备代码包**：

   - 将 MCP 服务代码、依赖配置文件（如 `requirements.txt`、`package.json`）打包成 ZIP 或 TAR 格式
   - 确保文件名为英文，大小不超过 100MB

2. **上传文件**：

   - 点击"📤 上传代码包"按钮
   - 拖拽文件到上传区域或点击选择文件
   - 等待上传进度条完成

3. **验证上传**：

   - 上传完成后，代码包会出现在列表中
   - 可点击"查看"检查文件结构是否正确

4. **关联实例**：
   - 在创建 MCP 实例时，选择"代码包"部署方式
   - 从下拉菜单中选择已上传的代码包
   - 系统会自动将代码包部署到容器中

## 代码包结构建议

为了确保代码包能正确部署，建议遵循以下目录结构：

### Python MCP 服务示例

```
server_mcp.zip
├── src/
│   ├── __init__.py
│   ├── server.py          # MCP 服务主入口
│   └── handlers/          # 业务逻辑处理
│       └── tools.py
├── requirements.txt       # Python 依赖
├── README.md             # 说明文档
└── config.yaml           # 配置文件（可选）
```

**requirements.txt 示例：**

```txt
mcp>=1.0.0
fastapi>=0.100.0
uvicorn>=0.23.0
pydantic>=2.0.0
```

**server.py 示例：**

```python
from mcp.server import Server
from mcp.server.models import InitializationOptions
import mcp.types as types

app = Server("example-server")

@app.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    return [
        types.Tool(
            name="get_weather",
            description="Get weather information",
            inputSchema={
                "type": "object",
                "properties": {
                    "city": {"type": "string"}
                }
            }
        )
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
```

### Node.js MCP 服务示例

```
mcp-example.zip
├── src/
│   ├── index.js           # MCP 服务主入口
│   └── tools/             # 工具实现
│       └── calculator.js
├── package.json           # Node.js 依赖
├── package-lock.json
├── README.md
└── .env.example          # 环境变量示例
```

**package.json 示例：**

```json
{
  "name": "mcp-example",
  "version": "1.0.0",
  "main": "src/index.js",
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "express": "^4.18.0"
  },
  "scripts": {
    "start": "node src/index.js"
  }
}
```

## 使用场景

### 1. **快速部署标准 MCP 服务**

- 将常用的 MCP 服务代码打包上传
- 创建实例时直接选择代码包，无需重复配置

### 2. **版本管理**

- 上传不同版本的代码包（如 `mcp-v1.0.zip`、`mcp-v1.1.zip`）
- 实例可以引用不同版本进行灰度发布或回滚

### 3. **团队协作**

- 开发人员上传代码包到平台
- 运维人员直接使用代码包创建实例，无需接触源代码

### 4. **代码复用**

- 将通用工具、库或模板打包
- 多个实例可以共享同一代码包

## 最佳实践

::: tip 建议

- **命名规范**：使用有意义的英文名称，如 `weather-api-v1.0.zip`
- **版本标识**：在文件名中包含版本号，便于区分不同版本
- **依赖完整**：确保 `requirements.txt` 或 `package.json` 包含所有依赖
- **测试验证**：本地测试代码包可运行后再上传到平台
- **定期清理**：删除不再使用的旧版本代码包，释放存储空间
- **文档说明**：在代码包中包含 README.md，说明使用方法和配置项
  :::

## 常见问题

### 1. 上传失败

**可能原因：**

- 文件大小超过 100MB
- 文件格式不支持（非 ZIP/TAR/TAR.GZ）
- 文件名包含中文或特殊字符
- 网络连接中断

**解决方法：**

- 检查文件大小和格式
- 使用英文文件名
- 压缩代码包以减小体积（删除 `node_modules`、`.git` 等无关文件）
- 重试上传

### 2. 实例无法启动（使用代码包部署）

**可能原因：**

- 代码包结构不正确（缺少入口文件）
- 依赖安装失败（requirements.txt 或 package.json 配置错误）
- 端口配置不匹配

**解决方法：**

- 检查代码包中是否包含正确的入口文件（如 `server.py`、`index.js`）
- 在本地环境测试依赖安装是否成功
- 查看实例日志，定位具体错误
- 确保服务监听的端口与实例配置一致（通常为 8080）

### 3. 代码包已删除但实例仍在运行

**说明：**

- 删除代码包不会影响已部署的实例
- 实例在创建时会将代码包复制到容器中，之后与原代码包独立

**建议：**

- 如需更新实例代码，上传新版本代码包并重新创建实例
- 或使用实例的"更新"功能替换代码包

### 4. 如何查看代码包内容？

**操作步骤：**

- 点击代码包行右侧的"查看"按钮
- 系统会展示代码包内的文件列表和目录结构
- 部分平台支持在线预览和编辑文件内容

## 相关命令

### 本地打包示例（Linux/macOS）

```bash
# 打包 Python 项目
cd /path/to/your/project
zip -r server_mcp.zip src/ requirements.txt README.md -x "*.pyc" "__pycache__/*"

# 打包 Node.js 项目（排除 node_modules）
zip -r mcp-example.zip src/ package.json package-lock.json README.md -x "node_modules/*"

# 使用 tar 打包
tar -czf mcp-example.tar.gz src/ package.json README.md
```

### 本地打包示例（Windows PowerShell）

```powershell
# 打包为 ZIP（使用 Compress-Archive）
Compress-Archive -Path src/, requirements.txt, README.md -DestinationPath server_mcp.zip

# 打包 Node.js 项目
Compress-Archive -Path src/, package.json, README.md -DestinationPath mcp-example.zip
```

---

通过代码包管理，你可以更高效地管理 MCP 服务代码，实现快速部署、版本控制和团队协作。建议定期维护代码包列表，保持清晰的版本管理策略。
