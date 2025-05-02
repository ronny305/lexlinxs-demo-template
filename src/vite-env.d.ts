/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID: string;
  readonly VITE_EMAILJS_SERVICE_ID: string;
  readonly VITE_EMAILJS_TEMPLATE_ID: string;
  readonly VITE_EMAILJS_USER_ID: string;
  readonly VITE_ENABLE_ANALYTICS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Add window.ENV interface for runtime configuration
interface Window {
  ENV?: {
    GA_MEASUREMENT_ID?: string;
    EMAILJS_SERVICE_ID?: string;
    EMAILJS_TEMPLATE_ID?: string;
    EMAILJS_USER_ID?: string;
    FEATURES?: {
      ENABLE_ANALYTICS?: boolean;
    }
  };
  gtag?: (
    command: 'event' | 'config' | 'set',
    eventName: string,
    params?: Record<string, any>
  ) => void;
}