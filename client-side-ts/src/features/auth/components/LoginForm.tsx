import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router";

const formSchema = z.object({
  id: z.string().min(8, "ID Number must at least be 8 digits."),
  password: z.string().min(8, "Password must at least be 8 characters"),
  rememberMe: z.boolean(),
});

export type LoginCredentials = z.infer<typeof formSchema>;

export interface LoginFormProps {
  onLogin?: (values: LoginCredentials) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const form = useForm({
    defaultValues: {
      id: "",
      password: "",
      rememberMe: false,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }: { value: LoginCredentials }) =>
      onLogin && onLogin(value),
  });

  return (
    <Card className="w-full border-none shadow-none sm:max-w-md">
      <CardHeader>
        <CardTitle className="text-4xl font-semibold">Welcome Back</CardTitle>
        <CardDescription>
          Welcome back! Please enter your details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="id"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Student ID Number
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter your student ID number"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <div className="flex flex-row justify-between">
              <form.Field
                name="rememberMe"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} orientation="horizontal">
                      <Checkbox
                        id={field.name}
                        name={field.name}
                        checked={field.state.value}
                        onCheckedChange={(checked) =>
                          field.handleChange(checked === true)
                        }
                      />
                      <FieldLabel htmlFor={field.name} className="font-normal">
                        Remember Me
                      </FieldLabel>
                    </Field>
                  );
                }}
              />
              <Link
                to="/auth/forgot-password"
                className="w-full text-right text-sm font-extralight"
              >
                Forgot Password
              </Link>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Field orientation="horizontal">
          <Button type="submit" form="login-form" className="w-full">
            Sign in
          </Button>
        </Field>
        <p className="mt-2 flex flex-row items-center justify-center text-sm font-extralight text-gray-300">
          Don't have an account?&nbsp;
          <Link to="/auth/signup" className="text-black">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
