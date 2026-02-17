import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface FilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilter: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  status: ('present' | 'absent')[];
  course: string[];
  yearLevel: string[];
  confirmedOn: Date | undefined;
}

const STATUS_OPTIONS = [
  { label: 'Present', value: 'present' },
  { label: 'Absent', value: 'absent' },
];

const COURSE_OPTIONS = [
  { label: 'BSIT', value: 'BSIT' },
  { label: 'BSCS', value: 'BSCS' },
];

const YEAR_LEVEL_OPTIONS = [
  { label: '1st Year', value: '1' },
  { label: '2nd Year', value: '2' },
  { label: '3rd Year', value: '3' },
  { label: '4th Year', value: '4' },
];

export const FilterSheet: React.FC<FilterSheetProps> = ({ open, onOpenChange, onApplyFilter }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    status: [],
    course: [],
    yearLevel: [],
    confirmedOn: undefined,
  });

  const toggleFilter = (category: keyof FilterOptions, value: string) => {
    setFilters((prev) => {
      const currentValues = prev[category] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prev, [category]: newValues };
    });
  };

  const handleReset = () => {
    setFilters({
      status: [],
      course: [],
      yearLevel: [],
      confirmedOn: undefined,
    });
  };

  const handleApply = () => {
    onApplyFilter(filters);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden p-0 gap-0 rounded-lg sm:rounded-xl" showCloseButton={false}>
        <DialogHeader className="px-6 py-4 border-b flex-none">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Filter</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              Reset Filter
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 min-h-0 overflow-y-auto px-6 py-6">
          <div className="space-y-6">
            {/* Status */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Status</h3>
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((option) => (
                  <Button
                    key={option.value}
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFilter('status', option.value)}
                    className={cn(
                      'rounded-full',
                      filters.status.includes(option.value as 'present' | 'absent') &&
                        'bg-[#1C9DDE]/10 border-[#1C9DDE] text-[#1C9DDE] hover:bg-[#1C9DDE]/20'
                    )}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Course */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Course</h3>
              <div className="flex flex-wrap gap-2">
                {COURSE_OPTIONS.map((option) => (
                  <Button
                    key={option.value}
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFilter('course', option.value)}
                    className={cn(
                      'rounded-full',
                      filters.course.includes(option.value) &&
                        'bg-[#1C9DDE]/10 border-[#1C9DDE] text-[#1C9DDE] hover:bg-[#1C9DDE]/20'
                    )}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Year Level */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Year Level</h3>
              <div className="flex flex-wrap gap-2">
                {YEAR_LEVEL_OPTIONS.map((option) => (
                  <Button
                    key={option.value}
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFilter('yearLevel', option.value)}
                    className={cn(
                      'rounded-full',
                      filters.yearLevel.includes(option.value) &&
                        'bg-[#1C9DDE]/10 border-[#1C9DDE] text-[#1C9DDE] hover:bg-[#1C9DDE]/20'
                    )}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Confirmed on */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Confirmed on</h3>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !filters.confirmedOn && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.confirmedOn ? format(filters.confirmedOn, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.confirmedOn}
                    onSelect={(date) => setFilters((prev) => ({ ...prev, confirmedOn: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <div className="flex-none flex items-center justify-end gap-3 px-6 py-4 border-t bg-background">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleApply} className="bg-[#1C9DDE] hover:bg-[#1C9DDE]">
            Apply Filter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};