import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const Field: React.FC<{ label: string; value?: string }> = ({ label, value }) => {
  return (
    <div>
      <Label className="text-sm">{label}</Label>
      <Input defaultValue={value} disabled className="mt-2" />
    </div>
  )
}

export const AccountSettings: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>

      <div className="max-w-screen-xl mx-auto">
        <Card className="rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-medium">Personal Information</h3>
            </div>
          </div>

          <CardContent className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="First Name" value="Jan Lorenz" />
            <Field label="Last Name" value="Laroco" />
            <Field label="Course" value="BSIT" />
            <Field label="Year" value="3rd Year" />
            <div className="md:col-span-2">
              <Field label="Email Address" value="laroco@gmail.com" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AccountSettings
