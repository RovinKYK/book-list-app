declare global {
  interface Window {
    configs?: {
      apiUrl?: string;
      choreoBackendServiceUrl?: string;
    };
  }
}

export {};
