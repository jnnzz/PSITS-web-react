import { Outlet } from 'react-router';

export const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-1">
        {/* Sidebar placeholder */}
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 hidden md:block">
          <div className="font-bold text-lg mb-6">Admin Panel</div>
          <nav className="space-y-2">
            <div className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Dashboard
            </div>
            <div className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Users
            </div>
            <div className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Settings
            </div>
          </nav>
        </aside>

        <main className="flex-grow p-6">
          <header className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="w-8 h-8 rounded-full bg-blue-500"></div>
          </header>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 min-h-[500px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
