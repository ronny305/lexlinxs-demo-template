import { Scale, Calculator, Clock, UserCheck, Banknote, Gavel } from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.FC<any>;       // Lucide icon component
  color: string;             // Tailwind background class
  route?: string;            // Only defined for active tools
  status: 'active' | 'coming_soon';
}

export const tools: Tool[] = [
  {
    id: 'settlement',
    name: 'Settlement Value Calculator',
    description: 'Estimate potential case value based on injury details and expenses.',
    icon: Scale,
    color: 'bg-blue-600',
    route: '/tool/settlement',
    status: 'active'
  },
  {
    id: 'child-support',
    name: 'Child Support Estimator',
    description: 'Calculate expected monthly child support based on income and custody.',
    icon: Calculator,
    color: 'bg-green-600',
    status: 'coming_soon'
  },
  {
    id: 'green-card-quiz',
    name: 'Green Card Eligibility Quiz',
    description: 'Check if you or your client may qualify for a U.S. green card.',
    icon: UserCheck,
    color: 'bg-emerald-600',
    status: 'coming_soon'
  },
  {
    id: 'wrongful-termination',
    name: 'Wrongful Termination Assessment',
    description: 'Evaluate whether a firing was potentially illegal or unfair.',
    icon: Gavel,
    color: 'bg-red-600',
    status: 'coming_soon'
  },
  {
    id: 'bankruptcy-selector',
    name: 'Bankruptcy Chapter Selector',
    description: 'Determine whether Chapter 7 or Chapter 13 fits the situation best.',
    icon: Banknote,
    color: 'bg-yellow-600',
    status: 'coming_soon'
  },
  {
    id: 'expungement-checker',
    name: 'Expungement Eligibility Checker',
    description: 'Find out if a prior conviction can be sealed or expunged.',
    icon: Clock,
    color: 'bg-purple-600',
    status: 'coming_soon'
  }
];
