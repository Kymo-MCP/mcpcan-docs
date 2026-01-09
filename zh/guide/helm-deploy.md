# Helm Chart 部署指南

本文档为拥有现有 Kubernetes (K8s) 集群的专业用户提供了详细的部署指南。如果您是初次接触或在全新的环境中部署，我们强烈建议您优先使用[《快速开始》](./quick-start)中的一键化部署脚本。

---

## 0. 环境准备 (可选)

如果您的服务器是全新的、干净的，或者没有安装 Kubernetes 环境，您可以先通过 `mcpcan-deploy` 仓库中的一键化脚本来准备基础环境。

```bash
# 克隆部署仓库
git clone https://github.com/kymo-mcp/mcpcan-deploy.git

# 进入仓库目录
cd mcpcan-deploy

# 执行安装脚本 (如果在中国大陆地区，建议添加 --cn 参数)
./scripts/install-run-environment.sh
```

此脚本将为您自动安装 K3s、Helm 和 Ingress 控制器。脚本执行成功后，您就可以继续后续的 Helm 部署步骤。

---

## 1. 先决条件

在开始之前，请确保您的环境满足以下所有条件：

- **Kubernetes 集群**: 版本需为 `v1.20` 或更高。
- **Helm**: 版本需为 `v3.0` 或更高。
- **kubectl**: 已正确配置并能够连接到您的 K8s 集群。
- **Ingress Controller**: 集群中必须已安装并正确配置 NGINX Ingress Controller，以便通过域名访问平台。
- **持久化存储 (Persistent Storage)**: 如果使用内置数据库，集群必须提供默认的 `StorageClass` 以支持动态卷分配（Dynamic Volume Provisioning）。
- **硬件资源**: 建议节点总资源不少于 `4GB` 内存和 `2` 核 CPU。

## 2. 部署方式

MCPCAN 提供两种主要的 Helm 部署方式。请根据您的需求选择其一。

### 方式一：通过 Helm 仓库进行部署 (推荐)

这是最简单、最快捷的部署方式，推荐大多数用户使用。

**第一步：添加 MCPCAN Helm 仓库**

```bash
helm repo add mcpcan https://kymo-mcp.github.io/mcpcan-deploy/
helm repo update
```

**第二步：创建并自定义配置文件**

为了方便管理和后续升级，我们建议您下载默认的 `values.yaml` 文件，并将其作为自定义配置的基础。

```bash
# 从 Helm 仓库下载默认配置
helm show values mcpcan/mcpcan-deploy > values-custom.yaml
```

使用您喜欢的编辑器打开 `values-custom.yaml` 并根据下一章节的**《核心配置详解》**进行修改。

**第三步：执行安装命令**

使用自定义配置文件 `values-custom.yaml` 来执行安装。

```bash
helm install mcpcan mcpcan/mcpcan-deploy -f values-custom.yaml \
  --namespace mcpcan --create-namespace --timeout 600s --wait
```

> **提示**：对于密码等敏感信息，您仍然可以使用 `--set` 参数在命令行中覆盖 `values-custom.yaml` 中的值，避免将密码明文存储在文件中。
>
> ```bash
> helm install mcpcan mcpcan/mcpcan-deploy -f values-custom.yaml \
>   --set services.init.loginUser.password="YourAdminPassword" \
>   --namespace mcpcan --create-namespace --timeout 600s --wait
> ```

### 方式二：通过本地 Helm Chart 进行部署 (高级自定义)

如果您需要对 `values.yaml` 进行深度定制，例如配置外部数据库、修改资源限制等，推荐使用此方式。

**第一步：获取 Helm Chart**

```bash
# 克隆部署仓库
git clone https://github.com/kymo-mcp/mcpcan-deploy.git

# 进入仓库目录
cd mcpcan-deploy
```

**第二步：创建并编辑自定义配置文件**

我们强烈建议您不要直接修改 `helm/values.yaml`，而是复制一份进行修改，便于后续升级。

```bash
cp helm/values.yaml helm/values-custom.yaml
```

使用您喜欢的编辑器打开 `helm/values-custom.yaml` 并根据下一章节的**《核心配置详解》**进行修改。

**第三步：执行 Helm 安装命令**

```bash
helm install mcpcan ./helm -f helm/values-custom.yaml \
  --namespace mcpcan --create-namespace --timeout 600s --wait
```

## 3. 核心配置详解 (`values-custom.yaml`)

以下是部署前必须关注和修改的关键参数。请根据您的实际环境进行配置。
完整配置请参考 [values.yaml](https://github.com/kymo-mcp/mcpcan-deploy/blob/main/helm/values.yaml)。

### 全局配置 (`global`)

| 参数 | 描述 | 建议配置 |
| :--- | :--- | :--- |
| `cn` | 如果您在中国大陆部署，设置为 `true` 会使用国内镜像源以加速镜像拉取。 | `true` 或 `false` |
| `domain` | 平台的访问域名。如果设置了此项，将默认启用 Ingress 并通过域名访问。 | `mcpcan.your-company.com` |
| `publicIP` | 平台的公网 IP。仅在不使用域名时配置此项。 | `1.2.3.4` |
| `appSecret` | **【重要】** 应用内部通信和 JWT 签名的密钥，请务必修改为高强度的随机字符串。 | `your-strong-secret-string` |
| `hostStorage.rootPath` | **【重要】** 在 K8s 节点上用于持久化存储的根路径。请确保该路径存在且有足够的空间和读写权限。 | `/data/mcpcan` |

### Ingress 与 TLS 配置 (`ingress`)

| 参数 | 描述 | 建议配置 |
| :--- | :--- | :--- |
| `enabled` | 是否启用 Ingress。使用域名或公网 IP 访问时都应保持 `true`。 | `true` |
| `tls.enabled` | 是否为域名启用 TLS (HTTPS)。 | `true` |
| `tls.crt` | **【重要】** 您的域名证书内容 (PEM 格式)。 | `-----BEGIN CERTIFICATE-----...` |
| `tls.key` | **【重要】** 您的域名私钥内容 (PEM 格式)。 | `-----BEGIN PRIVATE KEY-----...` |

### 基础设施配置 (`infrastructure`)

默认情况下，MCPCAN 会部署内置的 MySQL 和 Redis。但在生产环境中，我们强烈建议您使用外部的高可用数据库和缓存服务。

- **使用内置数据库 (默认)**

  请务必修改默认密码！

  ```yaml
  infrastructure:
    mysql:
      auth:
        rootPassword: "YourMySQLRootPassword"
        password: "YourMySQLAppPassword"
    redis:
      auth:
        password: "YourRedisPassword"
  ```

- **使用外部数据库**

  首先，禁用内置的数据库和缓存，然后修改 `configmap.yaml` 中各个服务的数据库连接信息（此操作需在 Chart 源码中进行，或通过 `--set` 在命令行中传递）。

  ```yaml
  # values-custom.yaml
  infrastructure:
    mysql:
      enabled: false
    redis:
      enabled: false
  ```

### 服务配置 (`services`)

此部分用于配置平台的核心微服务，包括初始管理员账户、各服务的副本数量和资源分配。

#### 初始管理员账户

| 参数 | 描述 | 建议配置 |
| :--- | :--- | :--- |
| `init.loginUser.username` | **【重要】** 平台初始管理员的登录用户名。 | `admin` |
| `init.loginUser.password` | **【重要】** 平台初始管理员的登录密码，请务必修改为强密码。 | `YourSecurePassword123` |

#### 服务副本数量 (`replicas`)

您可以为每个核心服务独立设置副本数量，以实现高可用和负载均衡。

| 参数 | 描述 | 默认值 |
| :--- | :--- | :--- |
| `web.replicas` | Web前端服务的副本数量。 | `1` |
| `market.replicas` | 市场服务的副本数量。 | `1` |
| `authz.replicas` | 授权服务的副本数量。 | `1` |
| `gateway.replicas` | 网关服务的副本数量。 | `1` |

#### 服务资源分配 (`resources`)

为每个服务精细化分配 CPU 和内存资源，是保障平台稳定运行的关键。生产环境中，请根据您的实际负载进行调整。

- **资源请求 (`requests`)**: K8s 调度器保证为 Pod 分配的最小资源。
- **资源限制 (`limits`)**: Pod 可使用的资源上限，超出限制可能导致 Pod 被终止或重启。

**Web 服务 (`web.resources`)**
- `requests`: `{ cpu: "50m", memory: "64Mi" }`
- `limits`: `{ cpu: "200m", memory: "128Mi" }`

**Market 服务 (`market.resources`)**
- `requests`: `{ cpu: "100m", memory: "128Mi" }`
- `limits`: `{ cpu: "500m", memory: "256Mi" }`

**Authz 服务 (`authz.resources`)**
- `requests`: `{ cpu: "100m", memory: "128Mi" }`
- `limits`: `{ cpu: "500m", memory: "256Mi" }`

**Gateway 服务 (`gateway.resources`)**
- `requests`: `{ cpu: "100m", memory: "128Mi" }`
- `limits`: `{ cpu: "500m", memory: "256Mi" }`

## 4. 验证与访问

部署命令成功返回后，您可以通过以下方式验证部署结果：

```bash
# 检查 mcpcan 命名空间下的所有 Pod 状态
kubectl get pods -n mcpcan
```

当所有 Pod 的 `STATUS` 都显示为 `Running` 且 `READY` 状态正常时，代表平台已成功启动。

现在，您可以通过浏览器访问您配置的域名（例如 `https://mcpcan.your-company.com`）或 IP 地址来打开 MCPCAN 平台的登录界面。

## 5. 升级与卸载

### 平台升级

当您需要更新配置或升级平台版本时，请使用 `helm upgrade` 命令。

- **方式一：通过 Helm 仓库升级**

  1.  确保您的 Helm 仓库是最新版本：
      ```bash
      helm repo update
      ```
  2.  修改您的 `values-custom.yaml` 文件。
  3.  执行升级命令：
      ```bash
      helm upgrade mcpcan mcpcan/mcpcan-deploy -f values-custom.yaml \
        -n mcpcan --timeout 600s --wait
      ```

- **方式二：通过本地 Chart 升级**

  1.  进入 `mcpcan-deploy` 目录，并拉取最新的代码：
      ```bash
      git pull
      ```
  2.  对比并更新您的 `values-custom.yaml` 文件。
  3.  执行升级命令：
      ```bash
      helm upgrade mcpcan ./helm -f helm/values-custom.yaml \
        -n mcpcan --timeout 600s --wait
      ```

### 平台卸载

如果您需要从集群中完全卸载 MCPCAN 平台，可以执行以下命令：

```bash
helm uninstall mcpcan -n mcpcan
```

> **⚠️ 警告:** 此命令会删除所有相关的 K8s 资源。但它可能不会自动删除持久卷（PV/PVC）和节点上的存储目录 (`hostStorage.rootPath`)。如果需要彻底清理数据，请手动删除这些资源。

## 6. 常用运维命令

以下是一些常用的 `kubectl` 命令，可以帮助您管理和监控 MCPCAN 平台。

- **查看 Pod 状态**:
  ```bash
  # 查看所有 Pod
  kubectl get pods -n mcpcan

  # 持续监控 Pod 状态
  kubectl get pods -n mcpcan -w
  ```

- **查看 Pod 日志**:
  ```bash
  # 查看特定 Pod 的实时日志
  kubectl logs -f <pod-name> -n mcpcan

  # 查看 Pod 中特定容器的日志
  kubectl logs -f <pod-name> -c <container-name> -n mcpcan
  ```

- **进入 Pod 容器**:
  ```bash
  # 在特定 Pod 中打开一个 shell 会话
  kubectl exec -it <pod-name> -n mcpcan -- /bin/sh
  ```

- **查看资源详情**:
  ```bash
  # 查看特定 Pod 的详细信息，用于排查问题
  kubectl describe pod <pod-name> -n mcpcan

  # 查看 Service 列表
  kubectl get svc -n mcpcan

  # 查看 Ingress 配置
  kubectl get ingress -n mcpcan
  ```

- **查看资源使用情况**:
  ```bash
  # 查看节点的资源使用情况 (需要安装 metrics-server)
  kubectl top nodes

  # 查看 Pod 的资源使用情况 (需要安装 metrics-server)
  kubectl top pods -n mcpcan
  ```

