/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEBUG_NAV?: "true" | "false";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
