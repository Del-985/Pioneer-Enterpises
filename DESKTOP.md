# Pioneer Enterprises Desktop Debugging

The web admin panel is wrapped in a Tauri 2 desktop shell for Windows development and panel debugging.

## Prerequisites

Install the current Node.js 20 LTS release, Rust through rustup, Microsoft C++ Build Tools with the Desktop development with C++ workload, and Microsoft Edge WebView2 Runtime.

## First-time setup

```bash
npm install
```

## Run the desktop app in development mode

```bash
npm run tauri:dev
```

Tauri starts the Vite development server automatically and opens the desktop window. Frontend edits should hot-reload. DevTools are enabled in the debug window.

## Build a local Windows installer

```bash
npm run tauri:build
```

The NSIS installer is written under:

```text
src-tauri/target/release/bundle/nsis/
```

For an unoptimized debug installer:

```bash
npm run tauri:build -- --debug
```

Debug output is written under:

```text
src-tauri/target/debug/bundle/nsis/
```

## GitHub Actions

The `Tauri Desktop Build` workflow runs when relevant files are pushed to `main` and can also be started manually from the Actions tab.

The workflow builds a Windows debug installer and uploads it as the `pioneer-enterprises-admin-windows-debug` artifact for 14 days.

## Current scope

The desktop shell wraps the existing React admin panel. It does not yet add native storage, updater support, filesystem permissions, system notifications, or code signing. Those should be added only when the admin modules need native capabilities.
