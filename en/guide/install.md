# Installation & Deployment

We offer flexible deployment options to meet different needs, from local development to large-scale production environments.

## Deployment Methods

- **[Docker Compose Deployment](./docker-compose.md) (Recommended)**
  
  Ideal for **Local Development**, **Testing**, and **Lightweight Production** environments.
  - Simple setup with a single command.
  - Includes all necessary components (Gateway, Auth, Market, Web, etc.).
  - Easy to configure and maintain.

- **[Helm Chart Deployment](./helm-deploy.md)**
  
  Designed for **Kubernetes** environments and **Large-Scale Production**.
  - High availability and scalability.
  - Cloud-native integration.
  - Managed via Helm for easy upgrades and rollbacks.

## Which one should I choose?

| Feature | Docker Compose | Helm Chart |
| :--- | :--- | :--- |
| **Scenario** | Local, Dev, Test, Small/Medium Prod | Kubernetes, Large Scale Prod |
| **Complexity** | Low | Medium/High |
| **Prerequisites** | Docker, Docker Compose | Kubernetes Cluster, Helm |
| **Scalability** | Vertical (mostly) | Horizontal (Auto-scaling) |
