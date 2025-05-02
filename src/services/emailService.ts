// EmailJS service for sending emails without a backend
import emailjs from '@emailjs/browser';

interface EmailData {
  name: string;
  email: string;
  from_phone?: string;
  law_firm_name?: string;
  toolIdea: string;
  message?: string;
}

// Gets EmailJS configuration from the runtime environment
const getEmailJSConfig = () => {
  if (typeof window !== 'undefined' && window.ENV) {
    return {
      serviceId: window.ENV.EMAILJS_SERVICE_ID,
      templateId: window.ENV.EMAILJS_TEMPLATE_ID,
      userId: window.ENV.EMAILJS_USER_ID
    };
  }
  
  // Fallback to environment variables (for development)
  return {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    userId: import.meta.env.VITE_EMAILJS_USER_ID
  };
};

export const sendEmail = async (data: EmailData): Promise<void> => {
  // In development, log the data instead of sending
  if (process.env.NODE_ENV === 'development') {
    console.log('Email would be sent with:', data);
    return Promise.resolve();
  }

  // Prepare the template parameters
  const templateParams = {
    from_name: data.name,
    email: data.email,
    from_phone: data.from_phone || 'Not provided',
    law_firm_name: data.law_firm_name || 'Not provided',
    tool_name: data.toolIdea,
    message: data.message || '',
    reply_to: 'ron@lexlinxs.com'
  };
  
  const config = getEmailJSConfig();
  
  // Check if we have the required EmailJS configuration
  if (!config.serviceId || !config.templateId || !config.userId) {
    console.error('Missing EmailJS configuration');
    return Promise.reject(new Error('Missing EmailJS configuration'));
  }
  
  try {
    // Send email using EmailJS
    return emailjs.send(
      config.serviceId,
      config.templateId,
      templateParams,
      config.userId
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return Promise.reject(error);
  }
};