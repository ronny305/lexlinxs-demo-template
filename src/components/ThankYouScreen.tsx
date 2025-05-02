import React from 'react';
import { CheckCircle, Home } from 'lucide-react';

interface ThankYouScreenProps {
  message?: string;
  toolName?: string;
  onBackToHome?: () => void;
}

export const ThankYouScreen: React.FC<ThankYouScreenProps> = ({
  message,
  toolName,
  onBackToHome
}) => {
  const defaultMessage = toolName 
    ? `Your request for the ${toolName} has been received. We'll be in touch shortly.`
    : "Thanks for your submission! We'll be in touch soon.";

  return (
    <div className="text-center py-10 px-6 bg-white rounded-xl shadow-md">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
        <CheckCircle className="w-8 h-8" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
      <p className="text-gray-600 mb-8">{message || defaultMessage}</p>
      
      {onBackToHome && (
        <button
          onClick={onBackToHome}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm 
                  text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none 
                  focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </button>
      )}
    </div>
  );
};