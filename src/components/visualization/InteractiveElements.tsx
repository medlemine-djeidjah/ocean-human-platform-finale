import React from 'react';
import { SystemMapping } from '../../types/models';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface InteractiveElementProps {
  mapping: SystemMapping;
  isActive: boolean;
  onSelect: () => void;
}

export const InteractiveElement: React.FC<InteractiveElementProps> = ({
  mapping,
  isActive,
  onSelect,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onSelect}
            className={`
              p-2 rounded-lg transition-colors
              ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}
            `}
          >
            <div className="text-sm font-medium">
              {mapping.humanSystem} / {mapping.oceanSystem}
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">{mapping.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface SystemDetailsProps {
  mapping: SystemMapping;
}

export const SystemDetails: React.FC<SystemDetailsProps> = ({ mapping }) => {
  return (
    <Card className="mt-4">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold mb-2">Importance</h4>
            <p className="text-gray-700">{mapping.importance}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-green-600 mb-2">Healthy Effects</h5>
              <ul className="list-disc pl-5 space-y-1">
                {mapping.effects.healthy.map((effect, index) => (
                  <li key={index} className="text-sm text-gray-600">{effect}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium text-red-600 mb-2">Unhealthy Effects</h5>
              <ul className="list-disc pl-5 space-y-1">
                {mapping.effects.unhealthy.map((effect, index) => (
                  <li key={index} className="text-sm text-gray-600">{effect}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
