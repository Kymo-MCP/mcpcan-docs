# 业务配置说明

MCPCAN 平台通过一系列 YAML 文件进行精细化的业务配置，这些配置在部署时通过 `configmap.yaml` 注入到相应的服务中。本文档旨在详细阐述每个核心服务的配置参数，帮助您更好地理解和自定义平台行为。

---

## 概述

平台配置被划分为多个文件，每个文件对应一个核心微服务。这种模块化的设计使得配置管理更加清晰和独立。

- **`gateway.yaml`**: API 网关服务的配置。
- **`authz.yaml`**: 授权与认证服务的配置。
- **`market.yaml`**: 应用市场服务的配置。
- **`init.yaml`**: 平台初始化服务的配置。

在 Helm 部署中，这些文件的内容最终会被整合到 `configmap.yaml` 中，并以文件挂载的形式提供给各个服务的容器实例。

---

## 1. 网关服务 (`gateway.yaml`)

网关服务 (`gateway`) 是整个平台的流量入口，负责所有 API 请求的接收、鉴权和路由。它将外部请求安全地转发到内部的各个微服务。

| 参数路径 | 描述 | 示例值 |
| :--- | :--- | :--- |
| `server.httpPort` | 网关监听的 HTTP 端口。 | `8085` |
| `database.mysql.host` | MySQL 数据库的主机名或 IP 地址。 | `mysql-svc` |
| `database.mysql.port` | MySQL 数据库的端口。 | `3306` |
| `database.mysql.database` | 使用的数据库名称。 | `mcp_dev` |
| `database.mysql.username` | 数据库用户名。 | `mcp_user` |
| `database.mysql.password` | 数据库密码。 | `dev-password` |
| `database.redis.host` | Redis 服务器的主机名或 IP 地址。 | `redis-svc` |
| `database.redis.port` | Redis 服务器的端口。 | `6379` |
| `database.redis.password` | Redis 的认证密码。 | `dev-redis-password` |
| `database.redis.db` | 使用的 Redis 数据库编号。 | `0` |
| `log.level` | 日志记录级别，可选值为 `debug`, `info`, `warn`, `error`。 | `debug` |
| `log.format` | 日志格式，可选值为 `text` 或 `json`。 | `text` |

---

## 2. 授权服务 (`authz.yaml`)

授权服务 (`authz`) 是平台安全体系的核心，负责用户身份认证、权限管理（RBAC）和令牌（Token）生成与校验。

| 参数路径 | 描述 | 示例值 |
| :--- | :--- | :--- |
| `server.httpPort` | 服务监听的 HTTP 端口。 | `8082` |
| `secret` | 用于服务间内部通信和 JWT 签名的密钥。**此值必须与 `market.yaml` 中的 `secret` 保持一致**。 | `dev-app-secret` |
| `services.mcpMarket.host` | 市场服务的内部主机名。 | `mcp-market-svc` |
| `services.mcpMarket.port` | 市场服务的内部端口。 | `8081` |
| `database.mysql.*` | MySQL 数据库连接配置，与网关服务类似。 | (同上) |
| `database.redis.*` | Redis 连接配置，与网关服务类似。 | (同上) |
| `log.level` | 日志记录级别。 | `debug` |
| `log.format` | 日志格式。 | `text` |
| `storage.rootPath` | 用于存储持久化数据的根目录。 | `./data` |
| `storage.codePath` | 代码包的存储路径，通常是 `rootPath` 的子目录。 | `./data/code-package` |
| `storage.staticPath` | 静态资源的存储路径，通常是 `rootPath` 的子目录。 | `./data/static` |

---

## 3. 市场服务 (`market.yaml`)

市场服务 (`market`) 负责管理平台上的所有应用，包括应用的发布、版本控制、审核以及用户订阅关系等。

| 参数路径 | 描述 | 示例值 |
| :--- | :--- | :--- |
| `server.httpPort` | 服务监听的 HTTP 端口。 | `8081` |
| `secret` | 用于服务间内部通信和 JWT 签名的密钥。**此值必须与 `authz.yaml` 中的 `secret` 保持一致**。 | `dev-app-secret` |
| `domain` | 平台对外访问的主域名，用于生成访问链接等。 | `http://demo.mcp-box.com` |
| `services.mcpAuthz.host` | 授权服务的内部主机名。 | `127.0.0.1` |
| `services.mcpAuthz.port` | 授权服务的内部端口。 | `8082` |
| `database.mysql.*` | MySQL 数据库连接配置。 | (同上) |
| `database.redis.*` | Redis 连接配置。 | (同上) |
| `log.level` | 日志记录级别。 | `debug` |
| `log.format` | 日志格式。 | `text` |
| `code.upload.maxFileSize` | 允许上传的应用代码包的最大体积（单位：MB）。 | `100` |
| `code.upload.allowedExtensions` | 允许上传的代码包文件扩展名列表。 | `[".zip", ".tar.gz"]` |
| `storage.rootPath` | 持久化存储的根目录。 | `./data` |
| `storage.codePath` | 代码包的存储路径。 | `./data/code-package` |
| `storage.staticPath` | 静态资源的存储路径。 | `./data/static` |

---

## 4. 初始化服务 (`init.yaml`)

初始化服务 (`init`) 是一个一次性任务（Job），在平台首次部署时运行。它负责创建初始的管理员账户、角色、权限，并执行数据库的初始化（如数据迁移）。

| 参数路径 | 描述 | 示例值 |
| :--- | :--- | :--- |
| `init.admin_username` | **【重要】** 初始管理员的登录用户名。 | `admin` |
| `init.admin_password` | **【重要】** 初始管理员的登录密码。**请务必修改为强密码**。 | `admin123` |
| `init.admin_nickname` | 初始管理员的显示昵称。 | `admin` |
| `init.admin_role_name` | 初始管理员所属的角色名称。 | `admin` |
| `init.admin_role_description` | 初始管理员角色的描述。 | `admin role` |
| `init.admin_role_level` | 角色的级别，用于权限排序。 | `1` |
| `init.admin_data_scope` | 数据范围，`all` 表示拥有所有数据权限。 | `all` |
| `kubernetes.namespace` | 平台部署所在的 Kubernetes 命名空间。 | `mcp-box` |
| `kubernetes.defaultConfigFilePath` | Pod 内部用于访问 K8s API 的 `kubeconfig` 文件路径。 | `/app/config/kubeconfig.yaml` |
| `database.mysql.*` | MySQL 数据库连接配置。 | (同上) |
| `database.redis.*` | Redis 连接配置。 | (同上) |
| `log.level` | 日志记录级别。 | `debug` |
| `log.format` | 日志格式。 | `text` |
| `storage.rootPath` | 持久化存储的根目录。 | `./data` |
| `storage.codePath` | 代码包的存储路径。 | `./data/code-package` |
| `storage.staticPath` | 静态资源的存储路径。 | `./data/static` |
