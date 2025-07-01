/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client-react" />

interface ImportMetaEnv {
  readonly VITE_STAGE: string;
  readonly VITE_ENV_NODE: string;
  readonly VITE_REST_COUNTRY_API: string;
  readonly VITE_TECHNOLOGY_API: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
