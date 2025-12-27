import React from 'react';
import { Link, useRouteError, isRouteErrorResponse } from 'react-router';
import { AlertCircle, Home } from 'lucide-react';
import { BackgroundText } from '@/components/common/BackgroundText';

export const ErrorPage: React.FC = () => {
  const error = useRouteError();

  let errorMessage: string = 'An unexpected error occurred.';
  let errorTitle: string = 'Oops! Something went wrong.';
  let statusCode: string | number = 'Error';

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    if (error.status === 404) {
      errorTitle = 'Page Not Found';
      errorMessage = "Sorry, we couldn't find the page you're looking for.";
    } else {
      errorTitle = error.statusText || 'Error';
      errorMessage = error.data?.message || 'Something went wrong.';
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
    // @ts-ignore
    statusCode = error.status || 500;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background text-foreground animate-in fade-in duration-500 font-sans p-6 text-center select-none overflow-hidden relative">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-100/20 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative mb-8">
        <div className="rounded-full bg-red-50 p-6 inline-block ring-8 ring-red-50/50 shadow-sm animate-in zoom-in duration-300">
          <AlertCircle className="h-16 w-16 text-red-500" />
        </div>
        {/* Background large text number */}
        <BackgroundText
          text={statusCode.toString()}
          parentStyle="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full text-center scale-150"
          childStyle="text-transparent bg-clip-text bg-gradient-to-br from-primary/20 to-primary/5"
        />
      </div>

      <div className="z-10 max-w-lg space-y-4">
        <h2 className="text-4xl font-bold tracking-tight">{errorTitle}</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {errorMessage}
        </p>

        <div className="pt-8">
          <Link
            to="/"
            className="btn btn-primary gap-2 shadow-lg hover:shadow-primary/25 hover:-translate-y-1 transition-all duration-300"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
        </div>
        <BackgroundText
          text="404"
          parentStyle="absolute -top-16 sm:-top-24 md:-top-32 lg:-top-44 xl:-top-56 left-1/2 -translate-x-1/2 w-full text-center -z-10"
          childStyle="text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary/80"
        />
        <BackgroundText
          text="PSITS"
          parentStyle="absolute -bottom-16 sm:-bottom-24 md:-bottom-32 lg:-bottom-44 xl:-bottom-56 left-1/2 -translate-x-1/2 w-full text-center -z-10"
          childStyle="text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary/80"
        />
      </div>
    </div>
  );
};
