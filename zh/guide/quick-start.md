# 快速开始

本文档提供两条安装路径，帮助你在不同场景下部署 MCPCAN 管理平台。

- 极速安装脚本：适用于纯净的 Linux 服务器，自动安装依赖与平台，推荐使用 IP 访问快速体验。
- 自定义安装（Helm）：适用于自定义域名、开启 HTTPS、修改默认账户/密码或平台配置的场景。

---

## 1. 环境要求

- 操作系统：纯净的 Linux 服务器（推荐： Ubuntu 22.04+ 64位 ）
- 最低资源：内存 4GB、CPU 2 核
- 网络：能访问互联网以拉取镜像与安装包 

---

## 2. 获取部署仓库

根据网络环境选择拉取源：

```bash
# GitHub（国际网络）
git clone https://github.com/Kymo-MCP/mcpcan-deploy.git
cd mcpcan-deploy

# Gitee（中国网络推荐）
git clone https://gitee.com/kymomcp/mcpcan-deploy.git
cd mcpcan-deploy
```

---

## 3. 安装

### 3.1 极速安装（推荐 IP 访问）

- 此路径会自动安装 k3s、ingress‑nginx、Helm，并部署 MCPCAN 平台；适合没有预装 Kubernetes 组件的全新环境。

使用场景与命令：

```bash
# 标准极速安装（国际镜像源）
./scripts/install-fast.sh

# 极速安装（中国镜像源加速）
./scripts/install-fast.sh --cn
```

执行过程与成功示例输出：

```
...
[install-fast.sh] Running Helm install mcpcan ./helm -f helm/values-custom.yaml --namespace "mcpcan" --create-namespace --timeout 600s (this step nees a few minutes)
NAME: mcpcan
LAST DEPLOYED: Thu Nov 27 16:24:47 2025
NAMESPACE: mcpcan
STATUS: deployed
REVISION: 1
TEST SUITE: None
[install-fast.sh] Running Helm install mcpcan finished
[install-fast.sh] Verifying Helm release status
[install-fast.sh] Installation succeeded: Helm release is deployed
[install-fast.sh] Access URL: http://47.113.218.195
```

- 成功后脚本会校验 Helm 发布状态并打印访问地址：
  - 公网 IP：`http://<public-ip>`（自动检测）
  - 本地回退：`http://localhost`
- 要验证安装并查看常用运维命令，请跳转到[4. 验证部署与常用运维](#4-验证部署与常用运维)
### 3.2. 自定义安装（域名/HTTPS/配置）

当你需要使用自定义域名、开启 HTTPS、或调整默认配置时，按下面步骤进行安装。

### 3.2.1 安装依赖（k3s、ingress‑nginx、Helm）

适用干净环境；如果你已有 k3s/ingress‑nginx/Helm，可跳过本小节。

```bash
# 安装 k3s、ingress‑nginx 与 Helm
./scripts/install-run-environment.sh

# 安装 k3s、ingress‑nginx 与 Helm（中国镜像源）
./scripts/install-run-environment.sh --cn
```

使用场景说明：

- 标准安装：适用于可以稳定访问国际镜像源的网络环境，自动安装 k3s、ingress‑nginx 与 Helm 并初始化集群。
- 中国镜像源安装（--cn）：适用于中国大陆网络环境，使用国内镜像源加速依赖与镜像下载，减少安装时间与失败概率。
- 成功后可通过 `kubectl get pods -A` 看到 `ingress-nginx` 相关 Pod 处于 Running 状态，`helm version` 正常。

验证：

- `kubectl get pods -A` 能看到 `ingress-nginx` 组件运行中
- `helm version` 正常且 `helm status mcpcan -n mcpcan` 可用于状态检查

### 3.2.2 安装 MCPCAN 平台

#### ① 使用自定义配置文件

```bash
# 复制默认配置文件
cp helm/values.yaml helm/values-custom.yaml

# 编辑自定义配置文件
vi helm/values-custom.yaml
```

编辑 `helm/values-custom.yaml`，设置你的域名、TLS 与相关配置；完整参数参考：

https://github.com/Kymo-MCP/mcpcan-deploy/blob/main/helm/values.yaml


```yaml
# helm/values-custom.yaml

# Global configuration
global:
  # Whether to use a domestic mirror source, default is false
  cn: false
  # Set your domain here, e.g., demo.mcpcan.com
  domain: "demo.mcpcan.com"

# Ingress configuration
ingress:
  tls:
    # Enable TLS
    enabled: true
    # Configure certificate content (for self-signed or existing certificates)
    crt: |
      -----BEGIN CERTIFICATE-----
       Your certificate content
      -----END CERTIFICATE-----
    key: |
      -----BEGIN PRIVATE KEY-----
      Your private key content
      -----END PRIVATE KEY-----
```


#### ② 安装命令

```bash
# 安装
helm install mcpcan ./helm -f helm/values-custom.yaml \
  --namespace mcpcan --create-namespace --timeout 600s --wait
```

成功后默认访问方式：

- HTTP：`http://localhost`（默认 80 端口）
- HTTPS：`https://localhost`（默认 443 端口）

---

## 4. 验证部署与常用运维

常用 Helm/Kubectl 命令：

```bash
# 查看发布状态
helm status mcpcan -n mcpcan

# 查看 Pod 列表
kubectl get pods -n mcpcan

# 查看 Pod 日志
kubectl logs -n mcpcan <pod-name>
```

---

## 5. 卸载

卸载 MCPCAN：

```bash
helm uninstall mcpcan -n mcpcan
```

卸载整套环境（k3s 与 Helm），操作前请谨慎：

```bash
./scripts/uninstall.sh
```

卸载后数据不会自动清理，需要手动删除数据目录（通常为 `/data/mcpcan`）。
请以你复制的配置文件中 `global.mountStorage.rootPath` 的值为准。
