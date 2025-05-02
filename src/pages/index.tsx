import React, { useState, useEffect } from 'react';
import { ProfileSection } from '../components/ProfileSection';
import { ToolButton } from '../components/ToolButton';
import { ToolRequestForm } from '../components/ToolRequestForm';
import { ThankYouScreen } from '../components/ThankYouScreen';
import { Footer } from '../components/Footer';
import { tools } from '../data/tools';
import { sendEmail } from '../services/emailService';
import { initGA, trackPageView, trackCalculatorSelection, trackFormSubmission } from '../analytics';

const HomePage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Initialize Google Analytics
  useEffect(() => {
    initGA();
    trackPageView('Home Page', '/');
  }, []);
  
  const handleToolClick = (toolName: string) => {
    trackCalculatorSelection(toolName);
  };
  
  const handleFormSubmit = async (data: { name: string; email: string; toolIdea: string }) => {
    try {
      // In a real implementation, this would send the data
      await sendEmail(data);
      trackFormSubmission('Tool Request Form', true);
      setFormSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      trackFormSubmission('Tool Request Form', false);
      // Would handle errors in a real implementation
    }
  };
  
  const resetForm = () => {
    setFormSubmitted(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-4">
      <div className="max-w-md mx-auto px-4">
        <ProfileSection 
          name="LexLinxs Legal Tools"
          subtitle="Personal Injury Legal Calculators"
          description="Explore our calculators and tools designed for personal injury attorneys. Request custom tools for your practice."
        />
        
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Available Tools</h2>
          {tools.map(tool => (
            <div key={tool.id} onClick={() => handleToolClick(tool.name)}>
              <ToolButton tool={tool} />
            </div>
          ))}
        </div>
        
        {formSubmitted ? (
          <ThankYouScreen onBackToHome={resetForm} />
        ) : (
          <ToolRequestForm onSubmit={handleFormSubmit} />
        )}
        
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;