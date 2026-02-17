import React from 'react';
import { Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ViewToggleProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onViewModeChange }) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-end">
      <div className="flex items-center gap-1 bg-background border rounded-lg p-1">
        <Button
          variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
          size="icon-sm"
          onClick={() => onViewModeChange('grid')}
          aria-label="Grid view"
        >
          <Grid />
        </Button>
        <Button
          variant={viewMode === 'list' ? 'secondary' : 'ghost'}
          size="icon-sm"
          onClick={() => onViewModeChange('list')}
          aria-label="List view"
        >
          <List />
        </Button>
      </div>
    </div>
  );
};

export default ViewToggle;
