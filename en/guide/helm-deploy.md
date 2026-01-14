# Helm Chart Deployment Guide

This document provides a detailed deployment guide for professional users who have an existing Kubernetes (K8s) cluster. If you are a first-time user or deploying in a brand-new environment, we strongly recommend using the one-click deployment script in the [Quick Start](./quick-start) guide first.

---

## 0. Environment Preparation (Optional)

If you have a new, clean server, or if a Kubernetes environment is not installed, you can first use the one-click script from the `mcpcan-deploy` repository to prepare the basic environment.

```bash
# Clone the deployment repository
git clone https://github.com/kymo-mcp/mcpcan-deploy.git

# Navigate to the repository directory
cd mcpcan-deploy

# Execute the installation script (if you are in mainland China, it is recommended to add the --cn parameter)
./scripts/install-run-environment.sh
```

This script will automatically install K3s, Helm, and an Ingress controller for you. After the script runs successfully, you can proceed with the subsequent Helm deployment steps.

---

## 1. Prerequisites

Before you begin, please ensure that your environment meets all of the following conditions:

- **Kubernetes Cluster**: Version `v1.20` or higher.
- **Helm**: Version `v3.0` or higher.
- **kubectl**: Correctly configured and able to connect to your K8s cluster.
- **Ingress Controller**: An NGINX Ingress Controller must be installed and correctly configured in the cluster to access the platform via a domain name.
- **Persistent Storage**: If using the built-in database, the cluster must provide a default `StorageClass` to support Dynamic Volume Provisioning.
- **Hardware Resources**: It is recommended that the total node resources be no less than `4GB` of memory and `2` CPU cores.

## 2. Deployment Methods

MCPCAN offers two main Helm deployment methods. Please choose one according to your needs.

### Method 1: Deploying via Helm Repository (Recommended)

This is the simplest and fastest deployment method, recommended for most users.

**Step 1: Add the MCPCAN Helm Repository**

```bash
helm repo add mcpcan https://kymo-mcp.github.io/mcpcan-deploy/
helm repo update
```

**Step 2: Create and Customize the Configuration File**

For ease of management and future upgrades, we recommend that you download the default `values.yaml` file and use it as a basis for your custom configuration.

```bash
# Download the default configuration from the Helm repository
helm show values mcpcan/mcpcan-deploy > values-custom.yaml
```

Open `values-custom.yaml` with your favorite editor and modify it according to the **"Core Configuration Details"** in the next section.

**Step 3: Execute the Installation Command**

Use the custom configuration file `values-custom.yaml` to perform the installation.

```bash
helm install mcpcan mcpcan/mcpcan-deploy -f values-custom.yaml \
  --namespace mcpcan --create-namespace --timeout 600s --wait
```

> **Tip**: For sensitive information such as passwords, you can still use the `--set` parameter to override values in `values-custom.yaml` from the command line, avoiding storing passwords in plain text in the file.
>
> ```bash
> helm install mcpcan mcpcan/mcpcan-deploy -f values-custom.yaml \
>   --set services.init.loginUser.password="YourAdminPassword" \
>   --namespace mcpcan --create-namespace --timeout 600s --wait
> ```

### Method 2: Deploying via Local Helm Chart (Advanced Customization)

This method is recommended if you need to deeply customize `values.yaml`, such as configuring an external database or modifying resource limits.

**Step 1: Get the Helm Chart**

```bash
# Clone the deployment repository
git clone https://github.com/kymo-mcp/mcpcan-deploy.git

# Navigate to the repository directory
cd mcpcan-deploy
```

**Step 2: Create and Edit the Custom Configuration File**

We strongly recommend that you do not modify `helm/values.yaml` directly. Instead, copy it for modification to facilitate future upgrades.

```bash
cp helm/values.yaml helm/values-custom.yaml
```

Open `helm/values-custom.yaml` with your favorite editor and modify it according to the **"Core Configuration Details"** in the next section.

**Step 3: Execute the Helm Installation Command**

```bash
helm install mcpcan ./helm -f helm/values-custom.yaml \
  --namespace mcpcan --create-namespace --timeout 600s --wait
```

## 3. Core Configuration Details (`values-custom.yaml`)

Below are the key parameters that must be reviewed and modified before deployment. Please configure them according to your actual environment.
For the full configuration, please refer to [values.yaml](https://github.com/kymo-mcp/mcpcan-deploy/blob/main/helm/values.yaml).

### Global Configuration (`global`)

| Parameter | Description | Recommended Configuration |
| :--- | :--- | :--- |
| `cn` | If you are deploying in mainland China, setting this to `true` will use a domestic image source to speed up image pulling. | `true` or `false` |
| `domain` | The access domain for the platform. If this is set, Ingress will be enabled by default and access will be via the domain. | `mcpcan.your-company.com` |
| `publicIP` | The public IP of the platform. Configure this only if you are not using a domain. | `1.2.3.4` |
| `appSecret` | **[IMPORTANT]** The secret key for internal application communication and JWT signing. Be sure to change this to a strong random string. | `your-strong-secret-string` |
| `hostStorage.rootPath` | **[IMPORTANT]** The root path on the K8s node for persistent storage. Ensure this path exists and has sufficient space and read/write permissions. | `/data/mcpcan` |

### Ingress and TLS Configuration (`ingress`)

| Parameter | Description | Recommended Configuration |
| :--- | :--- | :--- |
| `enabled` | Whether to enable Ingress. Should remain `true` when accessing via a domain or public IP. | `true` |
| `tls.enabled` | Whether to enable TLS (HTTPS) for the domain. | `true` |
| `tls.crt` | **[IMPORTANT]** The content of your domain certificate (PEM format). | `-----BEGIN CERTIFICATE-----...` |
| `tls.key` | **[IMPORTANT]** The content of your domain private key (PEM format). | `-----BEGIN PRIVATE KEY-----...` |

### Infrastructure Configuration (`infrastructure`)

By default, MCPCAN deploys built-in MySQL and Redis. However, in a production environment, we strongly recommend using external, highly available database and cache services.

- **Using the Built-in Database (Default)**

  Be sure to change the default passwords!

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

- **Using an External Database**

  First, disable the built-in database and cache, then modify the database connection information for each service in `configmap.yaml` (this must be done in the Chart source code or passed via `--set` on the command line).

  ```yaml
  # values-custom.yaml
  infrastructure:
    mysql:
      enabled: false
    redis:
      enabled: false
  ```

### Service Configuration (`services`)

This section is used to configure the platform's core microservices, including the initial administrator account, replica counts for each service, and resource allocation.

#### Initial Administrator Account

| Parameter | Description | Recommended Configuration |
| :--- | :--- | :--- |
| `init.loginUser.username` | **[IMPORTANT]** The login username for the platform's initial administrator. | `admin` |
| `init.loginUser.password` | **[IMPORTANT]** The login password for the platform's initial administrator. Be sure to change it to a strong password. | `YourSecurePassword123` |

#### Service Replica Count (`replicas`)

You can set the replica count for each core service independently to achieve high availability and load balancing.

| Parameter | Description | Default Value |
| :--- | :--- | :--- |
| `web.replicas` | The number of replicas for the web frontend service. | `1` |
| `market.replicas` | The number of replicas for the market service. | `1` |
| `authz.replicas` | The number of replicas for the authorization service. | `1` |
| `gateway.replicas` | The number of replicas for the gateway service. | `1` |

#### Service Resource Allocation (`resources`)

Fine-tuning CPU and memory resources for each service is key to ensuring the platform's stability. In a production environment, please adjust according to your actual load.

- **Resource Requests (`requests`)**: The minimum resources guaranteed by the K8s scheduler for a Pod.
- **Resource Limits (`limits`)**: The maximum resources a Pod can use. Exceeding the limit may cause the Pod to be terminated or restarted.

**Web Service (`web.resources`)**
- `requests`: `{ cpu: "50m", memory: "64Mi" }`
- `limits`: `{ cpu: "200m", memory: "128Mi" }`

**Market Service (`market.resources`)**
- `requests`: `{ cpu: "100m", memory: "128Mi" }`
- `limits`: `{ cpu: "500m", memory: "256Mi" }`

**Authz Service (`authz.resources`)**
- `requests`: `{ cpu: "100m", memory: "128Mi" }`
- `limits`: `{ cpu: "500m", memory: "256Mi" }`

**Gateway Service (`gateway.resources`)**
- `requests`: `{ cpu: "100m", memory: "128Mi" }`
- `limits`: `{ cpu: "500m", memory: "256Mi" }`

## 4. Validation and Access

After the deployment command returns successfully, you can verify the deployment result in the following ways:

```bash
# Check the status of all Pods in the mcpcan namespace
kubectl get pods -n mcpcan
```

When the `STATUS` of all Pods shows `Running` and the `READY` state is normal, it means the platform has started successfully.

Now, you can open the MCPCAN platform login interface by visiting the domain you configured (e.g., `https://mcpcan.your-company.com`) or the IP address in your browser.

## 5. Upgrading and Uninstalling

### Platform Upgrade

When you need to update the configuration or upgrade the platform version, use the `helm upgrade` command.

- **Method 1: Upgrading via Helm Repository**

  1.  Ensure your Helm repository is up to date:
      ```bash
      helm repo update
      ```
  2.  Modify your `values-custom.yaml` file.
  3.  Execute the upgrade command:
      ```bash
      helm upgrade mcpcan mcpcan/mcpcan-deploy -f values-custom.yaml \
        -n mcpcan --timeout 600s --wait
      ```

- **Method 2: Upgrading via Local Chart**

  1.  Navigate to the `mcpcan-deploy` directory and pull the latest code:
      ```bash
      git pull
      ```
  2.  Compare and update your `values-custom.yaml` file.
  3.  Execute the upgrade command:
      ```bash
      helm upgrade mcpcan ./helm -f helm/values-custom.yaml \
        -n mcpcan --timeout 600s --wait
      ```

### Platform Uninstall

If you need to completely uninstall the MCPCAN platform from your cluster, you can execute the following command:

```bash
helm uninstall mcpcan -n mcpcan
```

> **⚠️ Warning:** This command will delete all related K8s resources. However, it may not automatically delete persistent volumes (PV/PVC) and the storage directory on the node (`hostStorage.rootPath`). If you need to completely clear the data, please delete these resources manually.

## 6. Common Operational Commands

Below are some common `kubectl` commands that can help you manage and monitor the MCPCAN platform.

- **Check Pod Status**:
  ```bash
  # View all Pods
  kubectl get pods -n mcpcan

  # Continuously monitor Pod status
  kubectl get pods -n mcpcan -w
  ```

- **View Pod Logs**:
  ```bash
  # View real-time logs of a specific Pod
  kubectl logs -f <pod-name> -n mcpcan

  # View logs of a specific container in a Pod
  kubectl logs -f <pod-name> -c <container-name> -n mcpcan
  ```

- **Enter a Pod Container**:
  ```bash
  # Open a shell session in a specific Pod
  kubectl exec -it <pod-name> -n mcpcan -- /bin/sh
  ```

- **View Resource Details**:
  ```bash
  # View detailed information of a specific Pod for troubleshooting
  kubectl describe pod <pod-name> -n mcpcan

  # View the list of Services
  kubectl get svc -n mcpcan

  # View the Ingress configuration
  kubectl get ingress -n mcpcan
  ```

- **View Resource Usage**:
  ```bash
  # View resource usage of nodes (requires metrics-server to be installed)
  kubectl top nodes

  # View resource usage of Pods (requires metrics-server to be installed)
  kubectl top pods -n mcpcan
  ```
