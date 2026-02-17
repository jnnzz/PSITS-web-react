import React from 'react'
import image1 from '@/assets/awarding/2.jpg';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogClose,
} from '@/components/ui/dialog'

interface EventCardProps {
  title: string
  desc: string
  present?: boolean
  image?: string | any
}

// Helper to get student ID from sessionStorage
const getStudentId = (): string | null => {
  try {
    const possibleKeys = ['id_number', 'IdNumber', 'idNumber', 'student_id', 'StudentId', 'user']
    for (const k of possibleKeys) {
      const v = sessionStorage.getItem(k)
      if (!v) continue
      if (k === 'user' || v.trim().startsWith('{')) {
        try {
          const parsed = JSON.parse(v)
          if (parsed && (parsed.id_number || parsed.idNumber || parsed.student_id)) {
            return parsed.id_number || parsed.idNumber || parsed.student_id
          }
        } catch (e) {
          // not JSON
        }
      }
      return v
    }
  } catch (e) {
    console.error('Error retrieving student ID from sessionStorage:', e)
  }
  return null
}

export const EventCard: React.FC<EventCardProps> = ({ title, desc, present, image }) => {
  const imgSrc = image ?? '/assets/awarding/thumbnail.jpg'
  const studentId = getStudentId()
  
  // QR code includes both event and student ID for unique attendance tracking
  const qrData = `https://psits.example.com/attendance?event=${encodeURIComponent(
    title
  )}&student=${encodeURIComponent(studentId ?? 'unknown')}`
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=440x440&data=${encodeURIComponent(
    qrData
  )}&bgcolor=FFFFFF&color=1C9DDE`

  return (
    <Card className="rounded-2xl">
      <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6">
        <div className="w-full sm:w-48 md:w-72 h-48 sm:h-40 md:h-56 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
          <img src={imgSrc} alt={title} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">{title}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 text-sky-600 flex-shrink-0" fill="currentColor" aria-hidden>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
              </svg>
              <span className="text-xs text-slate-800 sm:text-sm">University of Cebu Main Campus</span>
            </div>
            {present && <Badge variant="default">Present</Badge>}
          </div>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 sm:mt-3 line-clamp-3 sm:line-clamp-none">{desc}</p>
        </div>

        <div className="flex-shrink-0 w-full sm:w-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" size="sm" className="w-full cursor-pointer sm:w-auto">
                Attendance QR
              </Button>
            </DialogTrigger>

            <DialogContent className="w-[calc(100%-2rem)] max-w-md sm:max-w-4xl p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 place-items-center">
                <div className="w-full flex items-center justify-center pt-4 rounded-lg overflow-hidden">
                  <img src={imgSrc} alt={title} className="w-full h-40 sm:h-64 md:h-80 object-cover rounded-lg" />
                </div>

                <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 w-full">
                  <DialogHeader className="text-center w-full">
                    <DialogTitle className="text-lg sm:text-2xl text-sky-600">{title}</DialogTitle>
                    <DialogDescription />
                  </DialogHeader>

                  {present && <Badge variant="default">Present</Badge>}

                  <div className="bg-transparent rounded-lg p-3 sm:p-4  w-full max-w-[180px] sm:max-w-xs flex items-center justify-center">
                    <img src={qrUrl} alt="qr" className="w-28 h-28 sm:w-40 sm:h-40 object-contain" />
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground text-center">Scan this QR code for attendance</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}

export const EventAttendance: React.FC = () => {
  const longDesc =
    'One of the most awaited events of every UCian is the annual celebration of Intramurals, and this year is no other. An event where all college departments battle each other to stand above the rest; an event that allows UCians to showcase their talents and skills.'

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Event Attendance</h2>

      <section className="bg-muted p-0 sm:p-8 rounded-b-lg mb-10">
        <div className="max-w-screen-xl mx-auto px-0 sm:px-2">
          <Card className="rounded-2xl px-4 py-10 sm:p-10">
            <CardHeader>
              <CardTitle>Today's Event</CardTitle>
              <CardDescription className='text-slate-600'>See today's scheduled event and your attendance status.</CardDescription>
            </CardHeader>

            <div className="mt-4">
              <EventCard title={'61st Year of UC Intramurals'} desc={longDesc} present image={image1} />
            </div>
          </Card>
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto px-0">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold">Past Event</h3>
            <p className="text-sm text-muted-foreground">Review previous events and your attendance records.</p>
          </div>

          <div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent> 
            </Select>
          </div>
        </div>

        <a className="text-primary font-medium mb-4 inline-block">2024</a>

        <div className="space-y-6 mt-6">
          <EventCard title={'60th Year of UC Intramurals'} desc={longDesc} present image={image1} />
          <EventCard title={'60th Year of UC Intramurals'} desc={longDesc} image={image1} />
          <EventCard title={'60th Year of UC Intramurals'} desc={longDesc} image={image1} />
        </div>
      </section>
    </div>
  )
}

export default EventAttendance
