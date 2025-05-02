// This file contains runtime configuration that can be modified without rebuilding the app
// It's loaded in index.html before the app bundle

window.ENV = {
  // Google Analytics configuration
  GA_MEASUREMENT_ID: "G-XXXXXXXXXX", // Replace with actual GA4 measurement ID in production
  
  // EmailJS configuration
  EMAILJS_SERVICE_ID: "service_xxxxxxx",
  EMAILJS_TEMPLATE_ID: "template_xxxxxxx",
  EMAILJS_USER_ID: "user_xxxxxxxxxxxxxxxxx",
  
  // Feature flags
  FEATURES: {
    ENABLE_ANALYTICS: false, // Set to true in production
  }
};