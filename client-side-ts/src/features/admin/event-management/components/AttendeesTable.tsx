import React, { useState, useEffect } from 'react';
import { Search, Download, Plus, Filter } from 'lucide-react';
import { getAttendees, markAsPresent } from '@/features/events/api/event';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { FilterSheet, AddAttendeeModal, MarkAttendanceButton, StudentDetailsModal, MarkAttendanceModal, ScanQRModal } from './modals';
import type { FilterOptions, AttendeeFormData } from './modals';

interface Attendee {
  id: string;
  name: string;
  email: string;
  studentId: string;
  status: 'present' | 'absent';
  courseYear: string;
  confirmedOn: string;
  confirmedBy: string;
  campus?: string;
  shirtSize?: string;
  shirtPrice?: string;
}

interface AttendeesTableProps {
  venue: string;
  eventId: string;
}

export const AttendeesTable: React.FC<AttendeesTableProps> = ({ venue, eventId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddAttendeeOpen, setIsAddAttendeeOpen] = useState(false);
  const [isStudentDetailsOpen, setIsStudentDetailsOpen] = useState(false);
  const [isMarkAttendanceOpen, setIsMarkAttendanceOpen] = useState(false);
  const [isScanQROpen, setIsScanQROpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Attendee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    status: [],
    course: [],
    yearLevel: [],
    confirmedOn: undefined,
  });

  // Attendees data from API
  const [attendees, setAttendees] = useState<Attendee[]>(
    Array.from({ length: 50 }, (_, i) => ({
      id: `${i + 1}`,
      name: 'Jane Lapas Lopez',
      email: 'lopez.jane@gmail.com',
      studentId: '23785371',
      status: i % 5 === 1 ? 'absent' : 'present',
      courseYear: i % 3 === 0 ? 'BSCS - 2' : i % 3 === 1 ? 'BSIT - 1' : 'BSIT - 3',
      confirmedOn: i % 5 === 1 ? '--' : 'Nov 20, 2025\n10:31 AM',
      confirmedBy: i % 5 === 1 ? '--' : 'Anton James...',
      campus: 'University of Cebu Main Campus',
      shirtSize: i % 3 === 0 ? 'Medium' : i % 3 === 1 ? 'Large' : 'Small',
      shirtPrice: '250',
    }))
  );

  // Fetch attendees from API
  useEffect(() => {
    const fetchAttendees = async () => {
      if (!eventId) return;
      
      setIsLoading(true);
      const result = await getAttendees(eventId);
      if (result) {
        // Map API data to Attendee interface
        const mappedAttendees: Attendee[] = result.attendees.map((attendee: any) => ({
          id: attendee.id_number,
          name: attendee.name,
          email: attendee.email || `${attendee.id_number}@uc.edu.ph`,
          studentId: attendee.id_number,
          status: attendee.isPresent ? 'present' : 'absent',
          courseYear: `${attendee.course} - ${attendee.year}`,
          confirmedOn: attendee.transactDate 
            ? new Date(attendee.transactDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) + '\n' + 
              new Date(attendee.transactDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            : '--',
          confirmedBy: attendee.transactBy || '--',
          campus: attendee.campus,
          shirtSize: attendee.shirtSize,
          shirtPrice: attendee.shirtPrice?.toString(),
        }));
        setAttendees(mappedAttendees);
      }
      setIsLoading(false);
    };
    fetchAttendees();
  }, [eventId]);

  // Filter attendees based on active filters and search query
  const filteredAttendees = attendees.filter((attendee) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        attendee.name.toLowerCase().includes(query) ||
        attendee.email.toLowerCase().includes(query) ||
        attendee.studentId.includes(query);
      if (!matchesSearch) return false;
    }

    // Status filter
    if (activeFilters.status.length > 0 && !activeFilters.status.includes(attendee.status)) {
      return false;
    }

    // Course filter
    if (activeFilters.course.length > 0) {
      const attendeeCourse = attendee.courseYear.split(' - ')[0];
      if (!activeFilters.course.includes(attendeeCourse)) return false;
    }

    // Year level filter
    if (activeFilters.yearLevel.length > 0) {
      const attendeeYear = attendee.courseYear.split(' - ')[1];
      if (!activeFilters.yearLevel.includes(attendeeYear)) return false;
    }

    // Date filter
    if (activeFilters.confirmedOn && attendee.confirmedOn !== '--') {
      const filterDate = activeFilters.confirmedOn.toLocaleDateString();
      const attendeeDate = attendee.confirmedOn.split('\n')[0];
      // Simple date comparison - you may want to improve this
      if (!attendeeDate.includes(filterDate.split('/')[0])) return false;
    }

    return true;
  });

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredAttendees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAttendees = filteredAttendees.slice(startIndex, endIndex);
  const totalAttendees = filteredAttendees.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAttendees(paginatedAttendees.map((a) => a.id));
    } else {
      setSelectedAttendees([]);
    }
  };

  const handleSelectAttendee = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedAttendees((prev) => [...prev, id]);
    } else {
      setSelectedAttendees((prev) => prev.filter((aid) => aid !== id));
    }
  };

  const handleFilter = () => {
    setIsFilterOpen(true);
  };

  const handleApplyFilter = (filters: FilterOptions) => {
    setActiveFilters(filters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleExportCSV = () => {
    console.log('Export to CSV');
  };

  const handleAddAttendee = () => {
    setIsAddAttendeeOpen(true);
  };

  const handleAddAttendeeSubmit = (attendee: AttendeeFormData) => {
    // Modal now handles API call, this just updates local state
    const newAttendee: Attendee = {
      id: attendee.studentId,
      name: `${attendee.firstName} ${attendee.middleName} ${attendee.lastName}`.trim(),
      email: attendee.email,
      studentId: attendee.studentId,
      status: 'present',
      courseYear: `${attendee.course} - ${attendee.yearLevel.charAt(0)}`,
      confirmedOn: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) + '\n' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      confirmedBy: 'Admin',
      campus: attendee.campus,
      shirtSize: attendee.shirtSize,
      shirtPrice: attendee.shirtPrice,
    };
    setAttendees((prev) => [newAttendee, ...prev]);
    setCurrentPage(1);
  };

  const handleScanQR = () => {
    setIsScanQROpen(true);
  };

  const handleScanSuccess = async (studentId: string) => {
    if (!eventId) return;

    const student = attendees.find((a) => a.studentId === studentId);
    if (student) {
      const [course, year] = student.courseYear.split(' - ');
      const result = await markAsPresent(
        eventId,
        studentId,
        student.campus || 'Main Campus',
        course,
        year,
        student.name
      );

      if (result) {
        const now = new Date();
        const timestamp = `${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}\n${now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
        setAttendees((prev) =>
          prev.map((a) =>
            a.id === student.id
              ? { ...a, status: 'present', confirmedOn: timestamp, confirmedBy: 'QR Scanner' }
              : a
          )
        );
      }
    }
  };

  const handleEnterStudentId = () => {
    setIsMarkAttendanceOpen(true);
  };

  const handleSearchStudent = (studentId: string) => {
    const student = attendees.find((a) => a.studentId === studentId);
    if (student) {
      return {
        id: student.id,
        name: student.name,
        email: student.email,
        studentId: student.studentId,
        courseYear: student.courseYear,
      };
    }
    return null;
  };

  const handleMarkPresent = async (attendeeId: string) => {
    if (!eventId) return;

    const student = attendees.find((a) => a.id === attendeeId);
    if (student) {
      const [course, year] = student.courseYear.split(' - ');
      const result = await markAsPresent(
        eventId,
        attendeeId,
        student.campus || 'Main Campus',
        course,
        year,
        student.name
      );

      if (result) {
        setAttendees((prev) =>
          prev.map((attendee) =>
            attendee.id === attendeeId
              ? {
                  ...attendee,
                  status: 'present',
                  confirmedOn:
                    new Date().toLocaleDateString('en-US', {
                      month: 'short',
                      day: '2-digit',
                      year: 'numeric',
                    }) +
                    '\n' +
                    new Date().toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    }),
                  confirmedBy: 'Admin',
                }
              : attendee
          )
        );
      }
    }
  };

  const handleViewDetails = (attendeeId: string) => {
    const student = attendees.find((a) => a.id === attendeeId);
    if (student) {
      setSelectedStudent(student);
      setIsStudentDetailsOpen(true);
    }
  };

  return (
    <div className="space-y-4">
      {/* Venue Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold">{venue}</h3>
        <div className="flex flex-row items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
          <div className="flex-1 sm:flex-none">
            <Button variant="outline" size="sm" onClick={handleAddAttendee} className="w-full rounded-xl cursor-pointer">
              <Plus className="h-4 w-4 mr-2" />
              Add Attendee
            </Button>
          </div>
          <div className="flex-1 sm:flex-none">
            <MarkAttendanceButton
              className="w-full"
              onScanQR={handleScanQR}
              onEnterStudentId={handleEnterStudentId}
            />
          </div>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleFilter} className="rounded-xl cursor-pointer">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportCSV} className="rounded-xl cursor-pointer">
            <Download className="h-4 w-4 mr-2" />
            Export to CSV
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12">
                  <Checkbox
                    checked={paginatedAttendees.length > 0 && selectedAttendees.length === paginatedAttendees.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="min-w-[200px]">Name</TableHead>
                <TableHead className="min-w-[120px]">Student ID</TableHead>
                <TableHead className="min-w-[100px]">Status</TableHead>
                <TableHead className="min-w-[120px]">Course & Year</TableHead>
                <TableHead className="min-w-[150px]">Confirmed on</TableHead>
                <TableHead className="min-w-[150px]">Confirmed by</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedAttendees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                    No attendees found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedAttendees.map((attendee) => (
                  <TableRow key={attendee.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedAttendees.includes(attendee.id)}
                        onCheckedChange={(checked) =>
                          handleSelectAttendee(attendee.id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{attendee.name}</p>
                        <p className="text-sm text-muted-foreground">{attendee.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{attendee.studentId}</TableCell>
                    <TableCell>
                      <Badge
                        variant={attendee.status === 'present' ? 'default' : 'destructive'}
                        className={
                          attendee.status === 'present'
                            ? 'bg-green-100 text-green-800 hover:bg-green-100'
                            : 'bg-red-100 text-red-800 hover:bg-red-100'
                        }
                      >
                        {attendee.status === 'present' ? 'Present' : 'Absent'}
                      </Badge>
                    </TableCell>
                    <TableCell>{attendee.courseYear}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {attendee.confirmedOn.split('\n').map((line, i) => (
                          <div key={i} className={i === 0 ? 'font-medium' : 'text-muted-foreground'}>
                            {line}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{attendee.confirmedBy}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(attendee.id)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Footer with pagination and count */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <p className="text-sm text-muted-foreground">
          Showing {totalAttendees > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, totalAttendees)} of{' '}
          {totalAttendees}
        </p>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            {/* Dynamic page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(pageNum);
                    }}
                    isActive={currentPage === pageNum}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(totalPages);
                  }}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Modals */}
      <FilterSheet
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        onApplyFilter={handleApplyFilter}
      />
      <AddAttendeeModal
        open={isAddAttendeeOpen}
        onOpenChange={setIsAddAttendeeOpen}
        eventId={eventId}
        onAddAttendee={handleAddAttendeeSubmit}
      />
      <StudentDetailsModal
        open={isStudentDetailsOpen}
        onOpenChange={setIsStudentDetailsOpen}
        student={selectedStudent}
      />
      <MarkAttendanceModal
        open={isMarkAttendanceOpen}
        onOpenChange={setIsMarkAttendanceOpen}
        onMarkPresent={handleMarkPresent}
        onSearchStudent={handleSearchStudent}
      />
      <ScanQRModal
        open={isScanQROpen}
        onOpenChange={setIsScanQROpen}
        onScanSuccess={handleScanSuccess}
      />
    </div>
  );
};
