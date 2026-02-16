import React from 'react';
import { ChevronDown, QrCode, IdCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MarkAttendanceButtonProps {
  onScanQR: () => void;
  onEnterStudentId: () => void;
  className?: string;
}

export const MarkAttendanceButton: React.FC<MarkAttendanceButtonProps> = ({
  onScanQR,
  onEnterStudentId,
  className,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className={`${className ? className + ' ' : ''}bg-[#1C9DDE] hover:bg-[#1C9DDE] rounded-xl cursor-pointer`}>
          Mark Attendance
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={onScanQR} className="cursor-pointer py-3">
          <QrCode className="mr-3 h-5 w-5" />
          <span className="text-base">Scan QR</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEnterStudentId} className="cursor-pointer py-3">
          <IdCard className="mr-3 h-5 w-5" />
          <span className="text-base">Enter Student ID</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
