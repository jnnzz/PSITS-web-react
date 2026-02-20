import { useState } from "react";
import { Outlet } from "react-router";
import { Menu } from "lucide-react";
import { AdminSidebar } from "../features/admin/components";
import { Button } from "@/components/ui/button";

export const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="min-h-screen bg-background flex overflow-hidden">
      {/* Hamburger button for mobile */}
      <Button
        variant="ghost"
        size="icon-lg"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={toggleSidebar}
        aria-label="Open sidebar"
      >
        <Menu className="w-7 h-7" />
      </Button>

      {/* Backdrop overlay for mobile — always in DOM, fades in/out */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300 ease-in-out ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={toggleSidebar}
      />

      {/* Mobile sidebar drawer — always in DOM, slides in/out */}
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-background w-64 lg:hidden transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <AdminSidebar collapsed={false} onToggleCollapse={toggleCollapse} />
      </div>

      {/* Sidebar for desktop */}
      <div
        className={`fixed lg:relative inset-y-0 left-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 transition-transform duration-300 ease-in-out lg:block hidden`}
      >
        <AdminSidebar collapsed={isCollapsed} onToggleCollapse={toggleCollapse} />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Page Content */}
        <div className="flex-1 overflow-y-auto pt-14 lg:pt-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
