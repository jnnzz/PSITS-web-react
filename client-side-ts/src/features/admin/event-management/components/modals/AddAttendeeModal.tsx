import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AddAttendeeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddAttendee: (attendee: AttendeeFormData) => void;
}

export interface AttendeeFormData {
  studentId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  campus: string;
  course: string;
  yearLevel: string;
  shirtSize: string;
  shirtPrice: string;
  password: string;
  confirmPassword: string;
}

const CAMPUS_OPTIONS = ['Main Campus', 'Banilad Campus', 'LM Campus', 'Maritime Campus'];
const COURSE_OPTIONS = ['BSIT', 'BSCS', 'ACT', 'BLIS'];
const YEAR_LEVEL_OPTIONS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const SHIRT_SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

export const AddAttendeeModal: React.FC<AddAttendeeModalProps> = ({
  open,
  onOpenChange,
  onAddAttendee,
}) => {
  const [formData, setFormData] = useState<AttendeeFormData>({
    studentId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    campus: '',
    course: '',
    yearLevel: '',
    shirtSize: '',
    shirtPrice: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (field: keyof AttendeeFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    onAddAttendee(formData);
    handleReset();
    onOpenChange(false);
  };

  const handleReset = () => {
    setFormData({
      studentId: '',
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      campus: '',
      course: '',
      yearLevel: '',
      shirtSize: '',
      shirtPrice: '',
      password: '',
      confirmPassword: '',
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleCancel = () => {
    handleReset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-4xl sm:max-w-2xl h-[90vh] max-h-[90vh] flex flex-col overflow-hidden p-0 gap-0 rounded-lg sm:rounded-xl" showCloseButton={false}>
        <DialogHeader className="px-6 py-4 border-b flex-none">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold leading-6">Add Attendee</DialogTitle>
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

        <div className="flex-1 min-h-0 overflow-y-auto px-6 py-6">
          <div className="space-y-4">
            {/* Student ID Number */}
            <div>
              <Label htmlFor="studentId" className="mb-2">Student ID Number</Label>
              <Input
                id="studentId"
                placeholder="Enter student ID number"
                value={formData.studentId}
                onChange={(e) => handleChange('studentId', e.target.value)}
              />
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="firstName" className="mb-2">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="middleName" className="mb-2">Middle Name</Label>
                <Input
                  id="middleName"
                  placeholder="Enter middle name"
                  value={formData.middleName}
                  onChange={(e) => handleChange('middleName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="mb-2">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <Label htmlFor="email" className="mb-2">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>

            {/* Campus, Course, Year Level */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="campus" className="mb-2">Campus</Label>
                <Select value={formData.campus} onValueChange={(value) => handleChange('campus', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select campus" />
                  </SelectTrigger>
                  <SelectContent>
                    {CAMPUS_OPTIONS.map((campus) => (
                      <SelectItem key={campus} value={campus}>
                        {campus}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="course" className="mb-2">Course</Label>
                <Select value={formData.course} onValueChange={(value) => handleChange('course', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {COURSE_OPTIONS.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="yearLevel" className="mb-2">Year Level</Label>
                <Select value={formData.yearLevel} onValueChange={(value) => handleChange('yearLevel', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select year level" />
                  </SelectTrigger>
                  <SelectContent>
                    {YEAR_LEVEL_OPTIONS.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Shirt Size and Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="shirtSize" className="mb-2">Shirt Size</Label>
                <Select value={formData.shirtSize} onValueChange={(value) => handleChange('shirtSize', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {SHIRT_SIZE_OPTIONS.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="shirtPrice" className="mb-2">Shirt Price</Label>
                <div className="relative">
                  <Input
                    id="shirtPrice"
                    type="number"
                    placeholder="Enter price"
                    value={formData.shirtPrice}
                    onChange={(e) => handleChange('shirtPrice', e.target.value)}
                    className="pr-12"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                    PHP
                  </div>
                </div>
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password" className="mb-2">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="mb-2">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-none flex items-center justify-end gap-3 px-6 py-4 border-t bg-background">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-[#1C9DDE] hover:bg-[#1C9DDE]">
            Add Event
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
