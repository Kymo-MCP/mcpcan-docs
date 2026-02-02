# Business Configuration Description

The MCPCAN platform uses a series of YAML files for detailed business configuration. These configurations are injected into the corresponding services via `configmap.yaml` during deployment. This document aims to elaborate on the configuration parameters of each core service to help you better understand and customize the platform's behavior.

---

## Overview

The platform configuration is divided into multiple files, each corresponding to a core microservice. This modular design makes configuration management clearer and more independent.

-   **`gateway.yaml`**: Configuration for the API gateway service.
-   **`authz.yaml`**: Configuration for the authorization and authentication service.
-   **`market.yaml`**: Configuration for the application market service.
-   **`init.yaml`**: Configuration for the platform initialization service.

In a Helm deployment, the contents of these files are ultimately integrated into `configmap.yaml` and provided to the container instances of each service as file mounts.

---

## 1. Gateway Service (`gateway.yaml`)

The gateway service (`gateway`) is the traffic entry point for the entire platform, responsible for receiving, authenticating, and routing all API requests. It securely forwards external requests to the various internal microservices.

| Parameter Path | Description | Example Value |
| :--- | :--- | :--- |
| `server.httpPort` | The HTTP port the gateway listens on. | `8085` |
| `database.mysql.host` | The hostname or IP address of the MySQL database. | `mysql-svc` |
| `database.mysql.port` | The port of the MySQL database. | `3306` |
| `database.mysql.database` | The name of the database to use. | `mcp_dev` |
| `database.mysql.username` | The database username. | `mcp_user` |
| `database.mysql.password` | The database password. | `dev-password` |
| `database.redis.host` | The hostname or IP address of the Redis server. | `redis-svc` |
| `database.redis.port` | The port of the Redis server. | `6379` |
| `database.redis.password` | The authentication password for Redis. | `dev-redis-password` |
| `database.redis.db` | The Redis database number to use. | `0` |
| `log.level` | The logging level, can be `debug`, `info`, `warn`, `error`. | `debug` |
| `log.format` | The log format, can be `text` or `json`. | `text` |

---

## 2. Authorization Service (`authz.yaml`)

The authorization service (`authz`) is the core of the platform's security system, responsible for user identity authentication, permission management (RBAC), and token generation and validation.

| Parameter Path | Description | Example Value |
| :--- | :--- | :--- |
| `server.httpPort` | The HTTP port the service listens on. | `8082` |
| `secret` | The secret key for inter-service communication and JWT signing. **This value must be consistent with the `secret` in `market.yaml`**. | `dev-app-secret` |
| `services.mcpMarket.host` | The internal hostname of the market service. | `mcp-market-svc` |
| `services.mcpMarket.port` | The internal port of the market service. | `8081` |
| `database.mysql.*` | MySQL database connection configuration, similar to the gateway service. | (Same as above) |
| `database.redis.*` | Redis connection configuration, similar to the gateway service. | (Same as above) |
| `log.level` | The logging level. | `debug` |
| `log.format` | The log format. | `text` |
| `storage.rootPath` | The root directory for persistent data storage. | `./data` |
| `storage.codePath` | The storage path for code packages, usually a subdirectory of `rootPath`. | `./data/code-package` |
| `storage.staticPath` | The storage path for static resources, usually a subdirectory of `rootPath`. | `./data/static` |

---

## 3. Market Service (`market.yaml`)

The market service (`market`) is responsible for managing all applications on the platform, including application publishing, version control, review, and user subscription relationships.

| Parameter Path | Description | Example Value |
| :--- | :--- | :--- |
| `server.httpPort` | The HTTP port the service listens on. | `8081` |
| `secret` | The secret key for inter-service communication and JWT signing. **This value must be consistent with the `secret` in `authz.yaml`**. | `dev-app-secret` |
| `domain` | The main domain for external access to the platform, used for generating access links, etc. | `http://demo.mcp-box.com` |
| `services.mcpAuthz.host` | The internal hostname of the authorization service. | `127.0.0.1` |
| `services.mcpAuthz.port` | The internal port of the authorization service. | `8082` |
| `database.mysql.*` | MySQL database connection configuration. | (Same as above) |
| `database.redis.*` | Redis connection configuration. | (Same as above) |
| `log.level` | The logging level. | `debug` |
| `log.format` | The log format. | `text` |
| `code.upload.maxFileSize` | The maximum allowed size for uploaded application code packages (in MB). | `100` |
| `code.upload.allowedExtensions` | A list of allowed file extensions for code packages. | `[".zip", ".tar.gz"]` |
| `storage.rootPath` | The root directory for persistent storage. | `./data` |
| `storage.codePath` | The storage path for code packages. | `./data/code-package` |
| `storage.staticPath` | The storage path for static resources. | `./data/static` |

---

## 4. Initialization Service (`init.yaml`)

The initialization service (`init`) is a one-time job that runs when the platform is first deployed. It is responsible for creating the initial administrator account, roles, permissions, and performing database initialization (such as data migration).

| Parameter Path | Description | Example Value |
| :--- | :--- | :--- |
| `init.admin_username` | **[IMPORTANT]** The login username for the initial administrator. | `admin` |
| `init.admin_password` | **[IMPORTANT]** The login password for the initial administrator. **Please be sure to change it to a strong password**. | `admin123` |
| `init.admin_nickname` | The display nickname for the initial administrator. | `admin` |
| `init.admin_role_name` | The name of the role to which the initial administrator belongs. | `admin` |
| `init.admin_role_description` | The description of the initial administrator's role. | `admin role` |
| `init.admin_role_level` | The level of the role, used for permission sorting. | `1` |
| `init.admin_data_scope` | The data scope, `all` means having all data permissions. | `all` |
| `kubernetes.namespace` | The Kubernetes namespace where the platform is deployed. | `mcp-box` |
| `kubernetes.defaultConfigFilePath` | The path to the `kubeconfig` file inside the Pod for accessing the K8s API. | `/app/config/kubeconfig.yaml` |
| `database.mysql.*` | MySQL database connection configuration. | (Same as above) |
| `database.redis.*` | Redis connection configuration. | (Same as above) |
| `log.level` | The logging level. | `debug` |
| `log.format` | The log format. | `text` |
| `storage.rootPath` | The root directory for persistent storage. | `./data` |
| `storage.codePath` | The storage path for code packages. | `./data/code-package` |
| `storage.staticPath` | The storage path for static resources. | `./data/static` |
