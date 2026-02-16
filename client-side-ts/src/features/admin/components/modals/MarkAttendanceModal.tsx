import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MarkAttendanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMarkPresent: (studentId: string) => void;
  onSearchStudent: (studentId: string) => {
    id: string;
    name: string;
    email: string;
    studentId: string;
    courseYear: string;
  } | null;
}

export const MarkAttendanceModal: React.FC<MarkAttendanceModalProps> = ({
  open,
  onOpenChange,
  onMarkPresent,
  onSearchStudent,
}) => {
  const [studentId, setStudentId] = useState('');
  const [studentDetails, setStudentDetails] = useState<{
    id: string;
    name: string;
    email: string;
    studentId: string;
    courseYear: string;
  } | null>(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!studentId.trim()) {
      setError('Please enter a student ID');
      return;
    }

    const student = onSearchStudent(studentId);
    if (student) {
      setStudentDetails(student);
      setError('');
    } else {
      setStudentDetails(null);
      setError('Student not found');
    }
  };

  const handleMarkPresent = () => {
    if (studentDetails) {
      onMarkPresent(studentDetails.id);
      handleReset();
      onOpenChange(false);
    }
  };

  const handleReset = () => {
    setStudentId('');
    setStudentDetails(null);
    setError('');
  };

  const handleClose = () => {
    handleReset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-md sm:max-w-xs p-0 gap-0 rounded-lg sm:rounded-xl" showCloseButton={false}>
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold leading-6">Mark Attendance</DialogTitle>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleClose}
              className="h-8 w-8 flex items-center justify-center rounded-full cursor-pointer"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="px-6 py-6 space-y-6">
          {/* Search Input */}
          <div className="space-y-2">
            <div className="relative">
              <Input
                placeholder="Search student ID"
                value={studentId}
                onChange={(e) => {
                  setStudentId(e.target.value);
                  setError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                className="pr-12"
              />
              <Button
                size="icon-sm"
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#1C9DDE] hover:bg-[#1C9DDE] rounded-full h-8 w-8"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          {/* Student Details */}
          {studentDetails && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Student Details</h3>

              <div className="space-y-3">
                {/* Student ID */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Student ID</span>
                  <span className="text-sm font-medium">{studentDetails.studentId}</span>
                </div>

                {/* Name */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Name</span>
                  <span className="text-sm font-medium">{studentDetails.name}</span>
                </div>

                {/* Course & Year */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Course & Year</span>
                  <span className="text-sm font-medium">{studentDetails.courseYear}</span>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <span className="text-sm font-medium">{studentDetails.email}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4">
                <Button variant="outline" onClick={handleReset}>
                  Cancel
                </Button>
                <Button
                  onClick={handleMarkPresent}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Mark Present
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
