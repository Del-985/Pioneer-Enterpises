/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_DEBUG_NAV?: "true" | "false";
  readonly VITE_ADMIN_DEBUG_BYPASS?: "true" | "false";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
