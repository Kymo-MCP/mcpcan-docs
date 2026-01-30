# Environment Management

Manage your container runtime environments and provide connection testing tools to help ensure the availability and security of MCP instance operations. Currently supported environment types include Kubernetes and Docker (more environment types can be extended in the future).

## Environment Overview

The environment list displays basic information for each registered environment: environment name, environment type (kubernetes/docker), default namespace, creation time, and modification time. You can enter environment details through the interface to perform connectivity tests, view PVCs, manage nodes, and other operations.

::: tip Environment Types
Currently supported: `kubernetes`, `docker`.
:::

::: warning Namespace
The namespace corresponding to the environment is configured when you create the environment. Ensure you fill in the namespace consistent with the target cluster for correct deployment and access to instances.
:::

::: danger Environment Configuration
The system displays environment configuration in beautified YAML/JSON format in the UI for easy comparison and verification. Please save carefully when modifying.
:::

## Connectivity Test

Connectivity tests are used to verify whether the platform can correctly access the target environment and its resources (API Server, namespace, nodes, Services, etc.). Common check items:

- API Server reachability (by requesting API Server to obtain cluster information)
- Whether the namespace exists
- Node list and status
- Whether temporary Pods can be created in the target namespace (for network/image detection)

UI Operation: Click "Details" on a row in the environment list -> Operation menu -> `Test Connectivity`.

Typical automatic detection steps (executed by the platform):

1. Initiate authentication and cluster information requests to API Server (`/version`, `/api`)
2. Query whether the target namespace exists
3. List nodes and check `Ready` status
4. Create a short-lived detection Pod (e.g., busybox) in the target namespace and execute `curl`/`ping` tests
5. Collect and display detection results (success/failure + diagnostic information)

## PVC Management

PVC (PersistentVolumeClaim) management is used to specify the declaration and binding of persistent storage volumes in container environments. The MCP CAN platform provides visual PVC list and management capabilities to help you diagnose storage configuration issues and monitor volume usage status.

### PVC List View

Click "PVC Management" on the environment details page to enter the PVC list. The interface displays the following information:

| Field             | Description                                                               | Example                       |
| ----------------- | ------------------------------------------------------------------------- | ----------------------------- |
| **PVC Name**      | Name of the PersistentVolumeClaim                                         | `data-mysql-0`                |
| **Namespace**     | Kubernetes namespace to which the PVC belongs                             | `mcp-dev`                     |
| **Storage Class** | StorageClass name, defining storage type and provider                     | `local-path`, `standard`      |
| **Access Mode**   | ReadWriteOnce (RWO), ReadOnlyMany (ROX), ReadWriteMany (RWX)              | `RWO`                         |
| **Capacity**      | Requested storage capacity                                                | `10Gi`                        |
| **Status**        | Bound (bound), Pending (waiting for binding), Released (released), Failed | `Bound`                       |
| **Bound Pod**     | Name of the Pod currently using this PVC                                  | `mysql-0`, `--` (not mounted) |
| **Created Time**  | Timestamp when the PVC was created                                        | `2025-11-05 17:51:26`         |

### Functions and Operations

1. **View PVC List**:

   - Display all PVCs in the current environment (namespace)
   - Support search by PVC name (search box in upper right corner)
   - Support refresh (🔄 button) and filter (🔍 button)

2. **Create PVC**:

   - Click the "+ Create PVC" button in the upper right corner
   - Fill in PVC name, namespace, storage class, access mode, capacity
   - After submission, the system will create the corresponding PVC resource in the Kubernetes cluster

3. **View PVC Details**:

   - Click a PVC row to enter the details page
   - View bound PV name, events, status change history
   - View list of Pods mounting this PVC

4. **Delete PVC**:
   - Click the operation menu (⋮) in the PVC list and select "Delete"
   - The system will pop up a confirmation prompt (⚠️ Deleting PVC will cause data loss, please operate with caution)
   - After deletion, the corresponding PV may be recycled or retained (depending on the StorageClass's reclaim policy)

### Usage Scenarios

- **Storage Capacity Planning**: View storage capacity used by each instance, evaluate whether expansion is needed
- **Fault Diagnosis**: When Pods cannot start, check if PVC status is Pending or Failed
- **Data Migration**: Before instance migration or upgrade, view PVC binding relationships, plan data backup and migration
- **Resource Cleanup**: Regularly clean up unused PVCs to release storage resources

### Operation Recommendations

::: warning Notes

- **Backup Before Deletion**: For production environment PVCs, be sure to backup data before executing deletion operations
- **Check Dependencies**: Before deleting PVC, confirm no Pods are using the volume (Bound Pod column shows "--")
- **StorageClass Policy**: Understand your StorageClass reclaim policy (Retain/Delete) to avoid accidental data deletion

:::

**Common Problem Troubleshooting:**

| Problem                   | Possible Causes                                               | Solution                                                                                                        |
| ------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| PVC status is Pending     | No available PV, StorageClass does not exist or misconfigured | Check Events in `kubectl describe pvc <name>`, confirm StorageClass and PV configuration                        |
| Pod cannot mount PVC      | Access mode mismatch, PVC occupied by another Pod (RWO)       | Confirm access mode supports multi-Pod mounting, or wait for occupying Pod to release                           |
| PVC capacity insufficient | Storage volume full, application write failed                 | Check actual usage capacity, expand PVC (requires StorageClass support for dynamic expansion) or clean old data |

## Node Management

Node management is used to view and maintain the status of nodes in Kubernetes clusters. The MCP CAN platform provides node list and operation capabilities to help you monitor node health and perform maintenance operations.

### Node List View

Click "Node Management" on the environment details page to enter the node list. The interface displays the following information:

| Field                | Description                                                       | Example                           |
| -------------------- | ----------------------------------------------------------------- | --------------------------------- |
| **Node Name**        | Name of the Kubernetes node                                       | `vm-16-6-ubuntu`                  |
| **Status**           | Ready (ready), NotReady (not ready), Unknown (unknown)            | `Ready`                           |
| **Role**             | master (control plane node), worker (worker node) or custom label | `master`                          |
| **Internal IP**      | Internal IP address of the node                                   | `10.0.1.6` or `--` (not assigned) |
| **External IP**      | External IP address of the node (if any)                          | `203.0.113.10` or `--`            |
| **Created Time**     | Time when the node joined the cluster                             | `2025-11-05 17:51:26`             |
| **Operating System** | Operating system running on the node                              | `linux`, `windows`                |

### Functions and Operations

1. **View Node List**:

   - Display all nodes in the cluster
   - Support search by node name (search box in upper right corner)
   - Support refresh (🔄 button) and filter (🔍 button)

2. **View Node Details**:

   - Click a node row to enter the details page
   - View node resource usage (CPU, memory, disk)
   - View node labels, taints, conditions
   - View list of Pods running on the node

3. **Node Scheduling Control**:

   - **Cordon (Mark Unschedulable)**: Prevent new Pods from being scheduled to this node, existing Pods continue running
   - **Uncordon (Restore Scheduling)**: Allow new Pods to be scheduled to this node again
   - **Drain (Graceful Eviction)**: Evict all Pods on the node (except DaemonSet), used for node maintenance or decommissioning

4. **Node Monitoring**:
   - View node health status (Ready, MemoryPressure, DiskPressure, PIDPressure)
   - Monitor node allocatable resources and allocated resources

### Usage Scenarios

- **Node Maintenance**: Execute Drain operation to safely evict Pods before upgrading, restarting, or performing hardware maintenance on nodes
- **Resource Scheduling Optimization**: Use Cordon to control specific nodes not accepting new Pods for resource adjustment or testing
- **Fault Troubleshooting**: When Pod scheduling fails or nodes are NotReady, view node status and events
- **Capacity Planning**: View node resource usage to evaluate whether cluster expansion is needed

### Operation Recommendations

::: tip Best Practices

- **Check Before Drain**: Before executing Drain, confirm that critical services on the node have multiple replicas or can be migrated
- **DaemonSet Handling**: Use `--ignore-daemonsets` parameter when draining to avoid evicting system Pods (such as monitoring, log collection)
- **PodDisruptionBudget**: Configure PDB for critical applications to prevent Drain from causing complete service unavailability
- **Regular Inspection**: Regularly check node status to discover NotReady or resource pressure issues in time

:::

**Common Problem Troubleshooting:**

| Problem                     | Possible Causes                                                               | Solution                                                                                           |
| --------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Node status NotReady        | kubelet abnormal, network interruption, resource exhaustion (disk/memory/PID) | Check Conditions and Events in `kubectl describe node <name>`, log in to node to view kubelet logs |
| Pod cannot schedule to node | Node cordoned, taints blocking, insufficient resources                        | Check if node is schedulable, view node Taints and resource usage                                  |
| Drain fails                 | PodDisruptionBudget restrictions, Pods with local data                        | Use `--delete-emptydir-data` or `--force` parameters, or adjust PDB configuration                  |

## Troubleshooting and Common Issues

1. API Server Unreachable

- Possible causes: Certificate or credential errors, network policy blocking, incorrect API Server address
- Troubleshooting suggestions: Verify kubeconfig, curl API Server `/version`, check cluster network routing

2. Namespace Does Not Exist or No Permission

- Possible causes: Namespace spelling error, insufficient permissions for credentials used
- Troubleshooting suggestions: Use a user with permissions to check `kubectl get ns` or update credentials

3. PVC Pending for Long Time

- Possible causes: No matching PV, StorageClass misconfigured, insufficient cluster storage capacity
- Troubleshooting suggestions: View Events in `kubectl describe pvc <name>`, check StorageClass and PV

4. Node Unavailable (NotReady)

- Possible causes: Node disk/network/CPU resource exhaustion, kubelet abnormal
- Troubleshooting suggestions: View node `kubectl describe node <node>` and node logs, check kubelet status

## Best Practices

- When creating environments, adopt the principle of least privilege, providing dedicated service accounts or kubeconfig for the platform
- Use independent namespaces and different StorageClasses for different scenarios (dev/test/prod)
- Regularly execute connectivity tests and configure alerts (notify operations when connectivity fails)
- Implement backup strategies for production PVCs, carefully execute deletion or reclaim operations

---
