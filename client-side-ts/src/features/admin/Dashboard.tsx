import { useState } from "react";
import { useAuth } from "@/features/auth";
import { useNavigate } from "react-router";
import { showToast } from "@/utils/alertHelper";

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      showToast("success", "Logged out successfully");
      navigate("/auth/login", { replace: true });
    } catch {
      showToast("error", "Logout failed. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Welcome to Admin Dashboard</h2>
          {user?.name && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Signed in as {user.name}
            </p>
          )}
        </div>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoggingOut ? "Logging out…" : "Logout"}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-blue-100 p-4 dark:bg-blue-900">
          <div className="text-2xl font-bold">120</div>
          <div>Users</div>
        </div>
        <div className="rounded-lg bg-green-100 p-4 dark:bg-green-900">
          <div className="text-2xl font-bold">45</div>
          <div>Events</div>
        </div>
        <div className="rounded-lg bg-purple-100 p-4 dark:bg-purple-900">
          <div className="text-2xl font-bold">12</div>
          <div>Organizations</div>
        </div>
      </div>
    </div>
  );
};
