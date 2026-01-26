import { Outlet } from "react-router";

export const AdminLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-1">
        {/* Sidebar placeholder */}
        <aside className="hidden w-64 border-r border-gray-200 bg-white p-4 md:block dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-6 text-lg font-bold">Admin Panel</div>
          <nav className="space-y-2">
            <div className="cursor-pointer rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              Dashboard
            </div>
            <div className="cursor-pointer rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              Users
            </div>
            <div className="cursor-pointer rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              Settings
            </div>
          </nav>
        </aside>

        <main className="flex-grow p-6">
          <header className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="h-8 w-8 rounded-full bg-blue-500"></div>
          </header>
          <div className="min-h-[500px] rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
