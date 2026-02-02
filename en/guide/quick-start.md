# Quick Start

This guide provides two installation paths for deploying the MCPCAN platform:

- Fast Install Script: Best for clean Linux servers. Automatically installs dependencies and the platform; recommended for quick IP-based access.
- Custom Helm Install: Use a custom domain, enable HTTPS, and adjust default credentials or platform configuration.

---

## 1. Prerequisites

- Operating System: Clean Linux server (recommended: Ubuntu 22.04+ 64‑bit)
- Minimum resources: 4GB RAM, 2 CPU cores
- Network: Outbound Internet access for images and packages

---

## 2. Get the Deployment Repository

Choose a source based on your network environment:

```bash
# GitHub (global)
git clone https://github.com/Kymo-MCP/mcpcan-deploy.git
cd mcpcan-deploy

# Gitee (recommended in China)
git clone https://gitee.com/kymomcp/mcpcan-deploy.git
cd mcpcan-deploy
```

## 3. Install

### 3.1 Fast Install (Recommended for IP access)

- Automatically installs k3s, ingress‑nginx, Helm, and deploys the MCPCAN platform.
- Intended for clean servers without preinstalled Kubernetes components.

Usage and scenarios:

```bash
# Standard fast install (global mirrors)
./scripts/install-fast.sh
```

Sample success output:

```
... 
[install-fast.sh] Running Helm install mcpcan ./helm -f helm/values-custom.yaml --namespace "mcpcan" --create-namespace --timeout 600s (this step needs a few minutes)
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

- On success, the script verifies the Helm release and prints the access URL:
  - Public IP: `http://<public-ip>` (auto-detected)
  - Fallback: `http://localhost`

- To validate and view common operations, go to [4. Validate & Operate](#4-validate--operate)

### 3.2 Custom Install (Domain/HTTPS/Config)

Use this path to configure a custom domain, enable HTTPS, or adjust default settings.

#### 3.2.1 Install dependencies (k3s, ingress‑nginx, Helm)

For clean environments; skip if you already have k3s/ingress‑nginx/Helm:

```bash
# Install k3s, ingress‑nginx and Helm
./scripts/install-run-environment.sh

# Install with China mirrors
./scripts/install-run-environment.sh --cn
```

Scenario notes:

- Standard install: for networks with stable access to global mirrors; installs k3s, ingress‑nginx, and Helm, and initializes the cluster.
- China mirrors (`--cn`): for mainland China networks; uses domestic mirrors to speed up downloads and improve reliability.
- Verify success: `kubectl get pods -A` shows `ingress-nginx` pods running; `helm version` is available.

#### 3.2.2 Install the MCPCAN platform

##### ① Prepare a custom values file

```bash
# Copy
cp helm/values.yaml helm/values-custom.yaml

# Edit
vi helm/values-custom.yaml
```

Edit `helm/values-custom.yaml` to set your domain, TLS, and other configuration; see the full parameter list:

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
      -----END PRIVATE KEY-----
      key: |
      -----BEGIN PRIVATE KEY-----
      Your private key content
      -----END PRIVATE KEY-----
```

##### ② Install command

```bash
# Install
helm install mcpcan ./helm -f helm/values-custom.yaml \
  --namespace mcpcan --create-namespace --timeout 600s --wait
```

Default access after success:

- HTTP: `http://localhost` (port 80)
- HTTPS: `https://localhost` (port 443)

---

## 4. Validate & Operate

Common operations:

```bash
# Check release status
helm status mcpcan -n mcpcan

# List pods
kubectl get pods -n mcpcan

# Inspect logs
kubectl logs -n mcpcan <pod-name>
```

## 5. Uninstall

Uninstall the MCPCAN release:

```bash
helm uninstall mcpcan -n mcpcan
```

Uninstall the entire environment (k3s and Helm). Use with caution:

```bash
./scripts/uninstall.sh
```

Data is not removed automatically. Manually delete the data directory (typically `/data/mcpcan`).
Use the value from `global.mountStorage.rootPath` in your copied values file.
