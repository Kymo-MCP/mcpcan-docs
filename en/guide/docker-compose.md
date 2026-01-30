# Docker Compose Deployment Guide

This document provides detailed steps for deploying the MCPCan system using Docker Compose. This scheme is suitable for local development, testing, and lightweight production environments.

## 1. Get Code

First, you need to clone the project code to your local server or development machine.

```bash
# Clone the deployment repository
git clone https://github.com/kymo-mcp/mcpcan-deploy.git

# Enter the Docker Compose deployment directory
cd mcpcan-deploy/docker-compose/
```

> **Note**: Ensure that Git, Docker (20.10.0+), and Docker Compose (v2.0.0+) are installed on your machine.

## 2. Environment Configuration

Before starting the service, you need to configure environment variables according to your network environment.

### 2.1 Initialize Configuration File

Copy the example environment file `example.env` to `.env`:

```bash
cp example.env .env
```

### 2.2 Switch Image Registry (CN/Global)

To accelerate image pulling, you can configure the image registry prefix in the `.env` file based on your region.

Open the `.env` file with a text editor (such as `vim` or `nano`):

```bash
vim .env
```

Find the `REGISTRY_PREFIX` configuration item:

*   **China Users (Recommended)**: Use the Tencent Cloud mirror registry by uncommenting the following lines:
    ```bash
    # Option 2: China Mirror Registry (Uncomment to use)
    REGISTRY_PREFIX=ccr.ccs.tencentyun.com/itqm-private
    # Remember to comment out Option 1
    # REGISTRY_PREFIX=77kymo
    ```

*   **Global Users**: Use Docker Hub (Global), keep the default or use the following configuration:
    ```bash
    # Option 1: Global Registry (Default)
    REGISTRY_PREFIX=77kymo
    # Option 2 commented out
    # REGISTRY_PREFIX=ccr.ccs.tencentyun.com/itqm-private
    ```

### 2.3 Generate Final Configuration

Run the configuration generation script. This script reads variables from `.env` (including the registry source and ports you just set) and generates the final `docker-compose` configuration file based on templates.

```bash
# Add execution permission
chmod +x replace.sh

# Execute generation script
./replace.sh
```

> **Important**: If you modify the `.env` file later (e.g., changing ports or passwords), you **MUST** re-run `./replace.sh` for changes to take effect.

## 3. Start Services

Execute the following command to start all services:

```bash
docker compose up -d
```

The first startup will automatically pull images and perform database initialization. The startup process usually includes the following stages:
1.  **Basic Services**: MySQL and Redis start.
2.  **Initialization**: The `mcp-init` container runs and executes database migrations.
3.  **Core Services**: After `mcp-init` exits successfully, services like `mcp-authz` and `mcp-market` start.
4.  **Gateway Entry**: Finally, `traefik` and `mcp-web` start to provide external access.

Access Addresses:
*   HTTP: [http://localhost](http://localhost) (Default port 80)
*   HTTPS: [https://localhost](https://localhost) (Default port 443)

## 4. Common Maintenance Commands

### Update and Restart
When you modify the configuration or need to update the image version:

```bash
# 1. Pull the latest image
docker compose pull

# 2. Recreate containers (run ./replace.sh first if config changed)
docker compose up -d
```

### View Logs
Very useful commands for troubleshooting:

```bash
# View all logs
docker compose logs -f

# View initialization logs (check this first if services don't start)
docker compose logs mcp-init
```

## 5. Cleanup and Uninstall

If you need to completely remove MCPCan installation traces, follow these steps.

### 5.1 Stop Services and Clean Containers

Stop all running containers and remove networks:

```bash
docker compose down
```

### 5.2 Clean Data (Use with Caution)

**Warning**: This operation will permanently delete database data (MySQL), Redis data, and all uploaded files.

```bash
# Delete the data folder in the current directory
rm -rf ./data
```

### 5.3 Clean Images

Delete unused old images to free up disk space:

```bash
docker image prune -f
```

Or delete all related images (specify image name manually or use filter):

```bash
# Delete all mcpcan related images (example)
docker images | grep mcpcan | awk '{print $3}' | xargs docker rmi
```
