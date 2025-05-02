// Simple Google Analytics 4 (GA4) tracking utility

interface EventParams {
  [key: string]: string | number | boolean;
}

// Get the GA Measurement ID from environment or window.__ENV__
const getGAMeasurementId = (): string | null => {
  // Check for Vite environment variable
  if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
    return import.meta.env.VITE_GA_MEASUREMENT_ID;
  }
  
  // Check for runtime configuration from window.ENV
  if (typeof window !== 'undefined' && window.ENV && window.ENV.GA_MEASUREMENT_ID) {
    return window.ENV.GA_MEASUREMENT_ID;
  }
  
  // No valid ID found
  console.warn('No Google Analytics Measurement ID found. Tracking will be disabled.');
  return null;
};

// Initialize Google Analytics
export const initGA = (): void => {
  const gaId = getGAMeasurementId();
  
  if (!gaId) {
    return;
  }
  
  // Check if analytics is enabled via feature flag
  const analyticsEnabled = 
    (import.meta.env.VITE_ENABLE_ANALYTICS === 'true') || 
    (window.ENV?.FEATURES?.ENABLE_ANALYTICS === true);
  
  if (!analyticsEnabled) {
    console.log('Analytics is disabled via feature flag');
    return;
  }
  
  // GA script is loaded in index.html conditionally
  console.log('Google Analytics initialized with ID:', gaId);
};

// This would use the window.gtag function that's added by the GA4 script
export const trackEvent = (eventName: string, params?: EventParams) => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, params);
    } else {
      console.log('GA4 tracking (development):', eventName, params);
    }
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

// Track page views
export const trackPageView = (pageTitle: string, pagePath: string) => {
  trackEvent('page_view', {
    page_title: pageTitle,
    page_path: pagePath,
  });
};

// Track calculator selection
export const trackCalculatorSelection = (toolName: string) => {
  trackEvent('calculator_selected', {
    tool_name: toolName,
  });
};

// Track form submission
export const trackFormSubmission = (formName: string, successful: boolean) => {
  trackEvent('form_submission', {
    form_name: formName,
    successful: successful,
  });
};

// Define window.gtag for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'set',
      eventName: string,
      params?: EventParams
    ) => void;
    ENV?: {
      GA_MEASUREMENT_ID?: string;
      EMAILJS_SERVICE_ID?: string;
      EMAILJS_TEMPLATE_ID?: string;
      EMAILJS_USER_ID?: string;
      FEATURES?: {
        ENABLE_ANALYTICS?: boolean;
      }
    }
  }
}