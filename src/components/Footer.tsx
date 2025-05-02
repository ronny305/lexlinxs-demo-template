import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-12 mb-6 px-4 text-center text-gray-500 text-sm">
      <p className="mb-2">Powered by LexLinxs</p>
      <p>© {currentYear} LexLinxs Demo</p>
    </footer>
  );
};