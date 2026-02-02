# Code Package Management

Code Package Management is used to upload, store, and manage the code package files required for MCP instances to run. Through code package management, you can centrally manage application code, dependency libraries, and configuration files, and quickly reference these code packages for deployment when creating instances.

## What is a Code Package?

A code package is a compressed file containing MCP service implementation code, dependency configurations (such as `requirements.txt`, `package.json`), and necessary resource files. The platform supports the following formats:

- **ZIP compressed package** (.zip)
- **TAR compressed package** (.tar, .tar.gz)

Code packages are uploaded to the platform's storage service. When creating an instance, you can select the corresponding code package to be automatically deployed to the container environment.

## Code Package List

The code package management interface displays all uploaded code packages and their detailed information:

| Field | Description | Example |
| --- | --- | --- |
| **Package Name** | The filename of the compressed package | `server_mcp.zip`, `mcp-example.zip` |
| **Package Size** | The size of the file | `1.61 MB`, `49.32 MB` |
| **Type** | The file format | `ZIP`, `TAR` |
| **Upload Time** | The timestamp of the first upload | `2025-11-17 14:53:03` |
| **Update Time** | The timestamp of the last modification | `2025-11-17 14:53:03` |
| **Actions** | Executable operations (View, Download, Delete) | View, Download, Delete buttons |

### Functional Operations

1.  **Search for Code Packages**:
    *   Enter the code package name in the search box in the upper right corner for quick filtering.
    *   Supports fuzzy matching.

2.  **Refresh List**:
    *   Click the refresh button (🔄) in the upper right corner to update the code package list.

3.  **View Code Package Details**:
    *   Click the "View" button on the right side of the code package row.
    *   View the file structure, size, uploader, and other information within the code package.

4.  **Download Code Package**:
    *   Click the "Download" option in the action menu (⋮).
    *   The browser will download the code package to your local machine.

5.  **Delete Code Package**:
    *   Click the "Delete" option in the action menu (⋮).
    *   The system will pop up a confirmation prompt (⚠️ Deletion is irreversible, but instances currently using the code package will not be affected).

## Uploading a Code Package

Click the "📤 Upload Code Package" button in the upper right corner to enter the upload interface.

### Upload Methods

The platform supports two upload methods:

#### 1. **Drag and Drop Upload**

*   Drag the code package file to the upload area (the dashed box area).
*   The system will automatically recognize the file and start uploading.

#### 2. **Click to Select File**

*   Click the upload area or the "Click or drag file to this area to upload" prompt text.
*   Select the local code package file in the pop-up file selector.
*   The upload will start automatically after selection.

### Upload Instructions

According to the "Upload Instructions" in the screenshot, the following rules must be followed when uploading code packages:

::: warning Upload Restrictions

*   **File Size Limit**: Single file cannot exceed 100MB.
*   **Supported Formats**: ZIP, TAR, TAR.GZ.
*   **Online Viewing**: Code files can be viewed and edited online after uploading.
*   **Overwrite Upload**: Supports downloading already uploaded code packages.
*   **File Name Convention**: Code packages only support English names.
    :::

### Upload Steps

1.  **Prepare the Code Package**:
    *   Package the MCP service code and dependency configuration files (e.g., `requirements.txt`, `package.json`) into a ZIP or TAR format.
    *   Ensure the file name is in English and the size does not exceed 100MB.

2.  **Upload the File**:
    *   Click the "📤 Upload Code Package" button.
    *   Drag the file to the upload area or click to select the file.
    *   Wait for the upload progress bar to complete.

3.  **Verify the Upload**:
    *   After the upload is complete, the code package will appear in the list.
    *   You can click "View" to check if the file structure is correct.

4.  **Associate with an Instance**:
    *   When creating an MCP instance, select the "Code Package" deployment method.
    *   Select the uploaded code package from the drop-down menu.
    *   The system will automatically deploy the code package to the container.

## Recommended Code Package Structure

To ensure that the code package can be deployed correctly, it is recommended to follow the directory structure below:

### Python MCP Service Example

```
server_mcp.zip
├── src/
│   ├── __init__.py
│   ├── server.py          # MCP service main entry point
│   └── handlers/          # Business logic handlers
│       └── tools.py
├── requirements.txt       # Python dependencies
├── README.md             # Documentation
└── config.yaml           # Optional configuration file
```

**`requirements.txt` Example:**

```txt
mcp>=1.0.0
fastapi>=0.100.0
uvicorn>=0.23.0
pydantic>=2.0.0
```

**`server.py` Example:**

```python
from mcp.server import Server
from mcp.server.models import InitializationOptions
import mcp.types as types

app = Server("example-server")

@app.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    return [
        types.Tool(
            name="get_weather",
            description="Get weather information",
            inputSchema={
                "type": "object",
                "properties": {
                    "city": {"type": "string"}
                }
            }
        )
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
```

### Node.js MCP Service Example

```
mcp-example.zip
├── src/
│   ├── index.js           # MCP service main entry point
│   └── tools/             # Tool implementations
│       └── calculator.js
├── package.json           # Node.js dependencies
├── package-lock.json
├── README.md
└── .env.example          # Example environment variables
```

**`package.json` Example:**

```json
{
  "name": "mcp-example",
  "version": "1.0.0",
  "main": "src/index.js",
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "express": "^4.18.0"
  },
  "scripts": {
    "start": "node src/index.js"
  }
}
```

## Use Cases

### 1. **Rapid Deployment of Standard MCP Services**

*   Package and upload commonly used MCP service code.
*   Directly select the code package when creating an instance, eliminating repetitive configuration.

### 2. **Version Management**

*   Upload different versions of code packages (e.g., `mcp-v1.0.zip`, `mcp-v1.1.zip`).
*   Instances can reference different versions for canary releases or rollbacks.

### 3. **Team Collaboration**

*   Developers upload code packages to the platform.
*   Operations personnel can directly use the code packages to create instances without accessing the source code.

### 4. **Code Reuse**

*   Package common tools, libraries, or templates.
*   Multiple instances can share the same code package.

## Best Practices

::: tip Recommendations

*   **Naming Convention**: Use meaningful English names, such as `weather-api-v1.0.zip`.
*   **Version Identification**: Include version numbers in the filenames to distinguish between different versions.
*   **Complete Dependencies**: Ensure `requirements.txt` or `package.json` includes all dependencies.
*   **Test and Verify**: Test that the code package is runnable locally before uploading it to the platform.
*   **Regular Cleanup**: Delete old, unused code packages to free up storage space.
*   **Documentation**: Include a README.md file in the code package to explain usage and configuration options.
    :::

## Frequently Asked Questions

### 1. Upload Fails

**Possible Reasons:**

*   File size exceeds 100MB.
*   Unsupported file format (not ZIP/TAR/TAR.GZ).
*   Filename contains Chinese characters or special characters.
*   Network connection interrupted.

**Solutions:**

*   Check the file size and format.
*   Use an English filename.
*   Compress the code package to reduce its size (delete irrelevant files like `node_modules`, `.git`).
*   Retry the upload.

### 2. Instance Fails to Start (When Deployed with a Code Package)

**Possible Reasons:**

*   Incorrect code package structure (missing entry file).
*   Dependency installation failed (`requirements.txt` or `package.json` configuration error).
*   Port configuration mismatch.

**Solutions:**

*   Check if the code package contains the correct entry file (e.g., `server.py`, `index.js`).
*   Test if dependency installation is successful in a local environment.
*   Check the instance logs to locate the specific error.
*   Ensure the port the service is listening on matches the instance configuration (usually 8080).

### 3. Code Package is Deleted but the Instance is Still Running

**Explanation:**

*   Deleting a code package does not affect already deployed instances.
*   When an instance is created, it copies the code package into the container, after which it is independent of the original code package.

**Recommendation:**

*   To update the instance code, upload a new version of the code package and recreate the instance.
*   Alternatively, use the instance's "Update" feature to replace the code package.

### 4. How to View the Contents of a Code Package?

**Steps:**

*   Click the "View" button on the right side of the code package row.
*   The system will display the file list and directory structure within the code package.
*   Some platforms support online preview and editing of file content.

## Related Commands

### Local Packaging Example (Linux/macOS)

```bash
# Package a Python project
cd /path/to/your/project
zip -r server_mcp.zip src/ requirements.txt README.md -x "*.pyc" "__pycache__/*"

# Package a Node.js project (excluding node_modules)
zip -r mcp-example.zip src/ package.json package-lock.json README.md -x "node_modules/*"

# Using tar for packaging
tar -czf mcp-example.tar.gz src/ package.json README.md
```

### Local Packaging Example (Windows PowerShell)

```powershell
# Package as ZIP (using Compress-Archive)
Compress-Archive -Path src/, requirements.txt, README.md -DestinationPath server_mcp.zip

# Package a Node.js project
Compress-Archive -Path src/, package.json, README.md -DestinationPath mcp-example.zip
```

---

Through code package management, you can more efficiently manage MCP service code, achieving rapid deployment, version control, and team collaboration. It is recommended to regularly maintain the code package list and keep a clear version management strategy.
