/// <reference types="vite/client" />

// If you need to expose specific VITE_ env variables with typing, declare them here.
// This lets `import.meta.env.VITE_API_URL` be recognized by TypeScript.

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  // add other env vars you expect here, for example:
  // readonly VITE_SOME_FLAG?: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
