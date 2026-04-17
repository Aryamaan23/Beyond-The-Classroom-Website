/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUBSTACK_EMBED_URL?: string;
  readonly VITE_SUBSTACK_PROFILE_URL?: string;
  readonly VITE_CASE_STUDIES_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
