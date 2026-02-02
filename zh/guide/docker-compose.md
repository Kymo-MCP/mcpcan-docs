# Docker Compose 部署指南

本文档提供了使用 Docker Compose 部署 MCPCan 系统的详细步骤。此方案适合本地开发、测试以及轻量级的生产环境部署。

## 1. 获取代码

首先，你需要将项目代码克隆到本地服务器或开发机上。

```bash
# 克隆部署仓库
git clone https://github.com/kymo-mcp/mcpcan-deploy.git

# 进入 Docker Compose 部署目录
cd mcpcan-deploy/docker-compose/
```

> **注意**：请确保你的机器上已安装 Git、Docker (20.10.0+) 和 Docker Compose (v2.0.0+)。

## 2. 环境配置

在启动服务之前，需要根据你的网络环境配置环境变量。

### 2.1 初始化配置文件

复制示例环境文件 `example.env` 为 `.env`：

```bash
cp example.env .env
```

### 2.2 切换国内/国外镜像源

为了加速镜像拉取，你可以根据所在地区在 `.env` 文件中配置镜像仓库前缀。

使用文本编辑器（如 `vim` 或 `nano`）打开 `.env` 文件：

```bash
vim .env
```

找到 `REGISTRY_PREFIX` 配置项：

*   **国内用户（推荐）**：使用腾讯云镜像源，解开以下注释：
    ```bash
    # Option 2: China Mirror Registry (Uncomment to use)
    REGISTRY_PREFIX=ccr.ccs.tencentyun.com/itqm-private
    # 记得注释掉 Option 1
    # REGISTRY_PREFIX=77kymo
    ```

*   **海外用户**：使用 Docker Hub (Global)，保持默认或使用以下配置：
    ```bash
    # Option 1: Global Registry (Default)
    REGISTRY_PREFIX=77kymo
    # Option 2 被注释
    # REGISTRY_PREFIX=ccr.ccs.tencentyun.com/itqm-private
    ```

### 2.3 生成最终配置

运行配置生成脚本。该脚本会读取 `.env` 中的变量（包括刚才设置的镜像源、端口等），并根据模板生成最终的 `docker-compose` 配置文件。

```bash
# 添加执行权限
chmod +x replace.sh

# 执行生成脚本
./replace.sh
```

> **重要**：如果你后续修改了 `.env` 文件（例如修改了端口或密码），**必须**重新运行 `./replace.sh` 才能生效。

## 3. 启动服务

执行以下命令启动所有服务：

```bash
docker compose up -d
```

首次启动会自动拉取镜像并进行数据库初始化。启动过程通常包含以下阶段：
1.  **基础服务**：MySQL 和 Redis 启动。
2.  **初始化**：`mcp-init` 容器运行，执行数据库迁移。
3.  **核心服务**：`mcp-init` 成功退出后，`mcp-authz`、`mcp-market` 等服务启动。
4.  **网关入口**：最后 `traefik` 和 `mcp-web` 启动，对外提供访问。

访问地址：
*   HTTP: [http://localhost](http://localhost) (默认端口 80)
*   HTTPS: [https://localhost](https://localhost) (默认端口 443)

## 4. 常用维护命令

### 更新与重启
当你修改了配置或需要更新镜像版本时：

```bash
# 1. 拉取最新镜像
docker compose pull

# 2. 重建容器 (如果修改了配置需先运行 ./replace.sh)
docker compose up -d
```

### 查看日志
排查问题时非常有用的命令：

```bash
# 查看所有日志
docker compose logs -f

# 查看初始化日志 (如果服务没起来，先看这个)
docker compose logs mcp-init
```

## 5. 清理与卸载

如果你需要彻底移除 MCPCan 安装痕迹，请按以下步骤操作。

### 5.1 停止服务并清理容器

停止所有运行的容器并删除网络：

```bash
docker compose down
```

### 5.2 清理数据 (慎用)

**警告**：此操作将永久删除数据库数据（MySQL）、Redis 数据以及所有上传的文件。

```bash
# 删除当前目录下的 data 文件夹
rm -rf ./data
```

### 5.3 清理镜像

删除不再使用的旧镜像以释放磁盘空间：

```bash
docker image prune -f
```

或者删除所有相关的镜像（需手动指定镜像名或通过过滤器）：

```bash
# 删除所有 mcpcan 相关的镜像 (示例)
docker images | grep mcpcan | awk '{print $3}' | xargs docker rmi
```
