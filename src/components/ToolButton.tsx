import React from 'react';
import * as Icons from 'lucide-react';
import { Tool } from '../data/tools';

interface ToolButtonProps {
  tool: Tool;
}

export const ToolButton: React.FC<ToolButtonProps> = ({ tool }) => {
  // Get the icon component from Lucide icons
  const IconComponent = tool.icon as keyof typeof Icons;
  const Icon = Icons[IconComponent];
  
  return (
    <a 
      href={tool.status === 'active' ? tool.route : '#'}
      className={`relative flex items-center p-4 rounded-xl mb-4 shadow-md transition-all 
                  duration-200 hover:shadow-lg hover:brightness-110 transform hover:-translate-y-1
                  ${tool.color} text-white`}
    >
      <div className="flex items-start">
        <div className="p-2 bg-white/20 rounded-lg mr-3">
          {Icon && <Icon className="w-6 h-6" />}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg">{tool.name}</h3>
          <p className="text-sm text-white/80">{tool.description}</p>
        </div>
      </div>
      
      {tool.status === 'coming_soon' && (
        <div className="absolute top-0 right-0 bg-black/30 text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg font-medium">
          Coming Soon
        </div>
      )}
    </a>
  );
};