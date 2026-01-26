import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

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
  };

  // when resend button is clicked
  const handleResend = () => {
    if (canResend) {
      onResend();
      setCountdown(59);
      setCode("");
    }
  };

  return (
    <Card className="w-full border-none shadow-none sm:max-w-md">
      <CardHeader className="space-y-2">
        <CardTitle className="text-4xl font-semibold">
          Verification Code
        </CardTitle>
        <CardDescription>Enter the OTP code sent to your email</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex w-full justify-center">
          <InputOTP maxLength={4} value={code} onChange={(v) => setCode(v)}>
            <InputOTPGroup className="flex gap-4">
              <InputOTPSlot index={0} className="h-13 w-13 shadow-md" />
              <InputOTPSlot index={1} className="h-13 w-13 shadow-md" />
              <InputOTPSlot index={2} className="h-13 w-13 shadow-md" />
              <InputOTPSlot index={3} className="h-13 w-13 shadow-md" />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="flex w-full items-center justify-center text-sm font-extralight text-gray-300">
          Didn't receive the code?&nbsp;
          {canResend ? (
            <span
              className="cursor-pointer text-black hover:underline"
              onClick={handleResend}
            >
              Resend
            </span>
          ) : (
            <span className="text-black">{countdown}s</span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Field orientation="vertical" className="w-full space-y-3">
          <Button className="w-full" onClick={handleVerify}>
            Verify
          </Button>
          <Button variant="outline" className="w-full">
            Back
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
