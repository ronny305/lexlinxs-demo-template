import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ToolRequestFormProps {
  onSubmit: (data: { 
    name: string; 
    email: string; 
    from_phone?: string;
    law_firm_name?: string;
    toolIdea: string;
    message?: string;
  }) => void;
  initialToolIdea?: string;
  onCancel?: () => void;
}

export const ToolRequestForm: React.FC<ToolRequestFormProps> = ({ 
  onSubmit, 
  initialToolIdea = '',
  onCancel 
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [lawFirm, setLawFirm] = useState('');
  const [toolIdea, setToolIdea] = useState(initialToolIdea);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!toolIdea.trim()) newErrors.toolIdea = 'Tool idea is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        setIsSubmitting(true);
        await onSubmit({ 
          name, 
          email, 
          from_phone: phone, 
          law_firm_name: lawFirm, 
          toolIdea,
          message
        });
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your request. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Request a Custom Tool</h2>
      <p className="text-gray-600 mb-6">
        Have an idea for a tool that would help your practice? Let us know!
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none
                      ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            disabled={isSubmitting}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none
                      ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            disabled={isSubmitting}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label htmlFor="lawFirm" className="block text-sm font-medium text-gray-700 mb-1">
            Law Firm Name
          </label>
          <input
            type="text"
            id="lawFirm"
            value={lawFirm}
            onChange={(e) => setLawFirm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label htmlFor="toolIdea" className="block text-sm font-medium text-gray-700 mb-1">
            Tool Request *
          </label>
          <textarea
            id="toolIdea"
            value={toolIdea}
            onChange={(e) => setToolIdea(e.target.value)}
            rows={2}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none
                      ${errors.toolIdea ? 'border-red-500' : 'border-gray-300'}`}
            disabled={isSubmitting}
          />
          {errors.toolIdea && <p className="mt-1 text-sm text-red-500">{errors.toolIdea}</p>}
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Details
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Describe any additional requirements or features you'd like..."
            disabled={isSubmitting}
          />
        </div>
        
        <div className="flex space-x-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg 
                      transition-colors duration-200 flex items-center justify-center"
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg 
                     transition-colors duration-200 flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>Sending...</span>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Request
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};