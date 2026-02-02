# MCPCAN Platform Architecture and Access Mode Overview

To meet the diverse requirements of different enterprise environments, network architectures, and security compliance standards, the MCPCAN platform offers three flexible access modes for MCP services: Direct Mode, Proxy Mode, and Hosted Mode.

In the current technology ecosystem, Model Collaboration Protocol (MCP) services face challenges such as fragmentation, inconsistent protocols, and high security risks. The MCPCAN platform aims to address these core pain points by providing a comprehensive solution that integrates service discovery, secure proxying, protocol adaptation, and full lifecycle management.

The core design philosophy is:

-   **Unity**: Bring all MCP services, regardless of their deployment location or protocol, into a unified configuration and management view.
-   **Security**: Provide centralized authentication, authorization, access control (ACL), and end-to-end auditing, sinking security capabilities from the application layer to the platform layer.
-   **Flexibility**: Offer three progressive access modes, allowing users to choose the most suitable solution based on their infrastructure, security compliance, and operational capabilities, enabling a smooth transition from lightweight registration to deep hosting.

## Overview of the Three Access Modes

| Feature Dimension | Direct Mode | Proxy Mode | Hosted Mode |
| :--- | :--- | :--- | :--- |
| **Core Value** | **Service Discovery & Centralized Configuration** | **Secure Gateway & Traffic Auditing** | **Serverless Runtime & Protocol Adaptation** |
| **Service Deployment**| Customer's own environment (public/private) | Customer's own environment (usually private) | **Platform's built-in container environment** |
| **Traffic Path** | Client ↔ External Service | Client → Platform → External Service | Client → Platform (inside container) |
| **Security Posture** | Endpoint exposed, relies on its own protection | **Endpoint hidden**, platform provides ACL | **Completely isolated**, network managed by platform |
| **Protocol Support** | Native protocols (SSE/Streamable-HTTP) | Native protocols (SSE/Streamable-HTTP) | 1. Stdio to SSE/Streamable-HTTP conversion<br> 2. Native protocol deployment (SSE/Streamable-HTTP)<br> 3. OpenAPI to Streamable-HTTP conversion |
| **Observability** | None | **Access logs, call tracing** | **Real-time logs, resource monitoring, start/stop control** |
| **Ops Responsibility** | User fully responsible | User manages service, platform manages gateway | **Platform manages underlying infra**, user manages code |
| **Best Use Case** | Service registration and discovery within a team | Securely exposing internal services to the outside | Quick deployment without server management, or making CLI tools web-accessible |

### 1. Direct Mode - Service Registration and Discovery

-   **Concept**: A lightweight "service directory" or "configuration center."
-   **How it works**: The platform only stores and distributes the connection metadata of MCP services without participating in any actual business communication. The client obtains the configuration from the platform and establishes a direct connection with the target service.
-   **Advantages**: Zero network overhead, no performance degradation, suitable for environments with well-established network and security infrastructure.

### 2. Proxy Mode - Secure Access Gateway

-   **Concept**: A powerful "secure reverse proxy" and "audit logging center."
-   **How it works**: All client requests are sent to the platform. After verifying permissions, the platform forwards the requests to the backend MCP service. This process is transparent to the client.
-   **Advantages**:
    -   **Risk Isolation**: Perfectly hides the real IP, port, and original credentials of the backend service.
    -   **Centralized Authorization**: Access control policies for all services are configured uniformly on the platform.
    -   **Compliance Auditing**: The platform records detailed logs for every call, meeting security traceability requirements.

### 3. Hosted Mode - All-in-One Serverless Environment

-   **Concept**: A "Serverless" runtime environment and "protocol converter."
-   **How it works**: Users upload their code or container image, and the platform handles resource allocation, service deployment, and exposes a standard access endpoint. The platform's built-in adapter can automatically convert traditional command-line (Stdio) interactive services into network-accessible SSE or Streamable-HTTP protocols.
-   **Advantages**:
    -   **Simplified Operations**: Users don't need to worry about servers, networking, or scaling; they can focus on business logic.
    -   **Protocol Compatibility**: Enables a vast number of existing, excellent Stdio-based tools to be seamlessly integrated into modern web applications.
    -   **Full Lifecycle Management**: Provides a complete set of operational tools, from deployment and start/stop to log monitoring.

## How to Choose the Right Mode

-   If you just want to **unify the management of your team's MCP service list**, and the services already have reliable external access → **Choose Direct Mode**.
-   If you need to **securely expose internal or protected services to third parties** and require unified authentication and auditing → **Choose Proxy Mode**.
-   If you want to **quickly deploy a service without managing servers**, or you have a **command-line tool that needs to be called by a web application** → **Choose Hosted Mode**.
