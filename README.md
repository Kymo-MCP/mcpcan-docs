# Documentation System Deployment

This document outlines the development, build, and deployment processes specifically for the **Docs** module. This module is built using [VitePress](https://vitepress.dev/) and serves as the official documentation site.

## 1. Local Development

To run the documentation site locally for development and writing:

### Prerequisites
- Node.js (version 18+ recommended)
- pnpm

### Steps
1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm run docs:dev
   ```
   The site will be available at `http://localhost:5173` (or the port shown in your terminal).

## 2. Building for Production

To generate the static assets for deployment:

```bash
pnpm run docs:build
```
The built files will be output to the `docs/dist` directory.