import React, { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface AttendeeSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  venues?: string[];
  onSave: (limits: Record<string, number>) => void;
}

const DEFAULT_CAMPUSES = [
  'University of Cebu Main Campus',
  'University of Cebu Banilad Campus',
  'University of Cebu Lapu-Lapu & Mandaue',
  'University of Cebu Pardo & Talisay',
];

export const AttendeeSettingsModal: React.FC<AttendeeSettingsModalProps> = ({
  open,
  onOpenChange,
  venues,
  onSave,
}) => {
  const campuses = venues && venues.length > 0 ? venues : DEFAULT_CAMPUSES;

  const [limits, setLimits] = useState<Record<string, number>>(
    campuses.reduce((acc, venue) => ({ ...acc, [venue]: 0 }), {})
  );

  const handleIncrement = (venue: string) => {
    setLimits((prev) => ({ ...prev, [venue]: prev[venue] + 1 }));
  };

  const handleDecrement = (venue: string) => {
    setLimits((prev) => ({ ...prev, [venue]: Math.max(0, prev[venue] - 1) }));
  };

  const handleRemove = (venue: string) => {
    setLimits((prev) => ({ ...prev, [venue]: 0 }));
  };

  const handleSave = () => {
    onSave(limits);
    onOpenChange(false);
  };

  const handleCancel = () => {
    // Reset limits
    setLimits(campuses.reduce((acc, venue) => ({ ...acc, [venue]: 0 }), {}));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-2xl sm:max-w-lg h-[80vh] max-h-[90vh] p-0 gap-0 rounded-lg sm:rounded-xl flex flex-col overflow-hidden" showCloseButton={false}>
        <DialogHeader className="px-6 py-4 border-b flex-none">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold leading-6">Attendee Settings</DialogTitle>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleCancel}
              className="h-8 w-8 flex items-center justify-center rounded-full cursor-pointer"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4">
          <p className="text-sm text-muted-foreground mb-6">
            Set the maximum limit for attendees per location.
          </p>

          <div className="space-y-4">
            {campuses.map((venue) => (
              <div key={venue} className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 gap-3">
                <span className="text-sm font-medium max-w-xs break-words">{venue}</span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(venue)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 cursor-pointer"
                  >
                    Remove
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon-sm"
                      onClick={() => handleDecrement(venue)}
                      className="h-8 w-8 cursor-pointer"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>

                    <input
                      aria-label={`Limit for ${venue}`}
                      type="number"
                      min={0}
                      value={limits[venue] ?? 0}
                      onChange={(e) => {
                        const raw = e.target.value;
                        const parsed = parseInt(raw === '' ? '0' : raw, 10);
                        setLimits((prev) => ({ ...prev, [venue]: Number.isNaN(parsed) ? 0 : Math.max(0, parsed) }));
                      }}
                      className="w-16 text-center border rounded-md px-2 py-1 text-sm"
                    />

                    <Button
                      variant="outline"
                      size="icon-sm"
                      onClick={() => handleIncrement(venue)}
                      className="h-8 w-8 cursor-pointer"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex-none flex flex-col sm:flex-row items-center sm:justify-end gap-3 px-6 py-4 border-t bg-background">
          <Button variant="outline" onClick={handleCancel} className="w-full sm:w-auto cursor-pointer">
            Cancel
          </Button>
          <Button onClick={handleSave} className="w-full sm:w-auto bg-[#1C9DDE] hover:bg-[#1C9DDE] cursor-pointer">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
