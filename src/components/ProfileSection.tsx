import React from 'react';
import { AlignJustify as LawJustice } from 'lucide-react';

interface ProfileSectionProps {
  name: string;
  subtitle: string;
  description?: string;
  imageUrl?: string;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  name,
  subtitle,
  description,
  imageUrl
}) => {
  return (
    <div className="flex flex-col items-center text-center mb-8">
      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <LawJustice className="w-12 h-12 text-white" />
        )}
      </div>
      <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
      <p className="text-md text-gray-600 font-medium">{subtitle}</p>
      {description && <p className="text-sm text-gray-500 mt-2 max-w-md">{description}</p>}
    </div>
  );
};