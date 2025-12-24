import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-normal dark:bg-darker p-4">
      <Outlet />
    </div>
  );
}
