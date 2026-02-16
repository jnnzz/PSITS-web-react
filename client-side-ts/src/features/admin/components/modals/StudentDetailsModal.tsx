import React from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface StudentDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: {
    id: string;
    name: string;
    email: string;
    studentId: string;
    status: 'present' | 'absent';
    courseYear: string;
    campus?: string;
    shirtSize?: string;
    shirtPrice?: string;
  } | null;
}

export const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({
  open,
  onOpenChange,
  student,
}) => {
  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md sm:max-w-xs p-0 gap-0 rounded-lg sm:rounded-xl" showCloseButton={false}>
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Student Details</DialogTitle>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 flex items-center justify-center rounded-full cursor-pointer"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="px-6 py-6 space-y-4">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status</span>
            <Badge
              variant={student.status === 'present' ? 'default' : 'destructive'}
              className={
                student.status === 'present'
                  ? 'bg-green-100 text-green-800 hover:bg-green-100'
                  : 'bg-red-100 text-red-800 hover:bg-red-100'
              }
            >
              {student.status === 'present' ? 'Present' : 'Absent'}
            </Badge>
          </div>

          {/* Student ID */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Student ID</span>
            <span className="text-sm font-medium">{student.studentId}</span>
          </div>

          {/* Name */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Name</span>
            <span className="text-sm font-medium">{student.name}</span>
          </div>

          {/* Course & Year */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Course & Year</span>
            <span className="text-sm font-medium">{student.courseYear}</span>
          </div>

          {/* Campus */}
          {student.campus && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Campus</span>
              <span className="text-sm font-medium">{student.campus}</span>
            </div>
          )}

          {/* Shirt Size */}
          {student.shirtSize && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Shirt Size</span>
              <span className="text-sm font-medium">{student.shirtSize}</span>
            </div>
          )}

          {/* Shirt Price */}
          {student.shirtPrice && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Shirt Price</span>
              <span className="text-sm font-medium text-[#1C9DDE]">₱{student.shirtPrice}</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
