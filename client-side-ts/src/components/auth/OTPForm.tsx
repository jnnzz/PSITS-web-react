import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Field } from '../ui/field';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';

export interface OTPFormProps {
  onVerify: (value: string) => void;
  onResend: () => void;
}

export default function OTPForm({ onVerify, onResend }: OTPFormProps) {
  const [code, setCode] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(59);

  // Derive canResend from countdown instead of storing it in state
  const canResend = countdown === 0;

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // when verify button is clicked
  const handleVerify = () => {
    onVerify(code);
  }

  // when resend button is clicked
  const handleResend = () => {
    if (canResend) {
      onResend();
      setCountdown(59);
      setCode("");
    }
  }

  return (
    <Card className="w-full sm:max-w-md border-none shadow-none">
      <CardHeader className="space-y-2">
        <CardTitle className="text-4xl font-semibold">Verification Code</CardTitle>
        <CardDescription>Enter the OTP code sent to your email</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className='w-full flex justify-center'>
          <InputOTP maxLength={4} value={code} onChange={(v) => setCode(v)}>
            <InputOTPGroup className='flex gap-4'>
              <InputOTPSlot index={0} className='shadow-md w-13 h-13' />
              <InputOTPSlot index={1} className='shadow-md w-13 h-13' />
              <InputOTPSlot index={2} className='shadow-md w-13 h-13' />
              <InputOTPSlot index={3} className='shadow-md w-13 h-13' />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="w-full text-sm font-extralight text-gray-300 flex justify-center items-center">
          Didn't receive the code?&nbsp;
          {canResend ? (
            <span 
              className="text-black cursor-pointer hover:underline" 
              onClick={handleResend}
            >
              Resend
            </span>
          ) : (
            <span className="text-black">
              {countdown}s
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Field orientation="vertical" className="w-full space-y-3">
          <Button className="w-full" onClick={handleVerify}>Verify</Button>
          <Button variant='outline' className="w-full">Back</Button>
        </Field>
      </CardFooter>
    </Card>
  );
}