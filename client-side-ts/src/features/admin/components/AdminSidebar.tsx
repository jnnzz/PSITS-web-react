import React, { useState, useRef, useEffect } from 'react';
import { Grid, Calendar, BarChart3, MoreVertical, PanelLeft } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.png';
import { useAuth } from '@/features/auth';
import { useNavigate } from 'react-router-dom';
import { showToast } from '@/utils/alertHelper';

interface AdminSidebarProps {
  userName?: string;
  userRole?: string;
  userInitials?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  userName = 'Jan Lorenz Laroco',
  userRole = 'Developer',
  userInitials = 'JL',
  collapsed = false,
  onToggleCollapse
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutsideMenu = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideMenu);
    return () => document.removeEventListener('mousedown', handleClickOutsideMenu);
  }, []);

  const handleLogout = async () => {
    setMenuOpen(false);
    try {
      await logout();
      showToast('success', 'Logged out successfully');
      navigate('/auth/login', { replace: true });
    } catch (err) {
      showToast('error', 'Logout failed. Please try again.');
    }
  };
  return (
    <TooltipProvider>
      <aside className={cn(
        "bg-background border flex flex-col h-screen fixed lg:sticky top-0 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}>
        {/* Logo and Collapse Button */}
        <div className="p-4">
          <div className="flex items-center gap-3 justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center shrink-0">
                <img src={logo} alt="PSITS Logo" className="w-10 h-10 rounded-full" />
              </div>
              {!collapsed && (
                  <div className="truncate">
                    <h1 className="font-semibold text-xs m-0 leading-tight">Philippines Society of</h1>
                    <h2 className="font-semibold text-xs m-0 leading-tight">Information Technology</h2>
                    <h3 className="font-semibold text-xs m-0 leading-tight">Students</h3>
                  </div>
              )}
            </div>
            {onToggleCollapse && (
              <Button 
                variant="ghost" 
                size="icon-sm"
                onClick={onToggleCollapse}
                className="hidden lg:flex shrink-0 transition-all duration-300"
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <PanelLeft className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  collapsed && "rotate-180"
                )} />
              </Button>
            )}
          </div>
        </div>

      {/* <Separator /> */}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        <div className="mb-4">
            {!collapsed && (
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                Navigation
              </h3>
            )}
            <ul className="space-y-1">
              <li>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" className={cn("w-full", collapsed ? "justify-center px-2" : "justify-start")} asChild>
                      <a href="#">
                        <Grid className="w-5 h-5 shrink-0" />
                        {!collapsed && <span>Dashboard</span>}
                      </a>
                    </Button>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <p>Dashboard</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </li>
              <li>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" className={cn("w-full", collapsed ? "justify-center px-2" : "justify-start")} asChild>
                      <a href="#">
                        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {!collapsed && <span>Organization</span>}
                      </a>
                    </Button>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <p>Organization</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </li>
              <li>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" className={cn("w-full", collapsed ? "justify-center px-2" : "justify-start")} asChild>
                      <a href="#">
                        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        {!collapsed && <span>Students</span>}
                      </a>
                    </Button>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <p>Students</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </li>
              <li>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" className={cn("w-full bg-[#1C9DDE]/10 text-[#1C9DDE] hover:bg-[#1C9DDE]/20 hover:text-[#1C9DDE]", collapsed ? "justify-center px-2" : "justify-start")} asChild>
                      <a href="#">
                        <Calendar className="w-5 h-5 shrink-0" />
                        {!collapsed && <span className="font-medium">Events</span>}
                      </a>
                    </Button>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <p>Events</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </li>
            </ul>
          </div>

          <div className="mb-4">
            {!collapsed && (
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                Operations
              </h3>
            )}
            <ul className="space-y-1">
              <li>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" className={cn("w-full", collapsed ? "justify-center px-2" : "justify-start")}>
                      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      {!collapsed && <span>Merchandise</span>}
                      {!collapsed && (
                        <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </Button>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <p>Merchandise</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </li>
              <li>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" className={cn("w-full", collapsed ? "justify-center px-2" : "justify-start")} asChild>
                      <a href="#">
                        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {!collapsed && <span>Orders</span>}
                      </a>
                    </Button>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <p>Orders</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </li>
              <li>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" className={cn("w-full", collapsed ? "justify-center px-2" : "justify-start")} asChild>
                      <a href="#">
                        <BarChart3 className="w-5 h-5 shrink-0" />
                        {!collapsed && <span>Reports</span>}
                      </a>
                    </Button>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <p>Reports</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </li>
            </ul>
          </div>

          <div>
            {!collapsed && (
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                General
              </h3>
            )}
            <ul className="space-y-1">
              <li>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" className={cn("w-full", collapsed ? "justify-center px-2" : "justify-start")} asChild>
                      <a href="#">
                        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {!collapsed && <span>Settings</span>}
                      </a>
                    </Button>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <p>Settings</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </li>
              <li>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" className={cn("w-full", collapsed ? "justify-center px-2" : "justify-start")}>
                      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      {!collapsed && <span>Documentation</span>}
                      {!collapsed && (
                        <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </Button>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <p>Documentation</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </li>
              <li>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" className={cn("w-full", collapsed ? "justify-center px-2" : "justify-start")} asChild>
                      <a href="#">
                        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {!collapsed && <span>Logs</span>}
                      </a>
                    </Button>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <p>Logs</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </li>
            </ul>
          </div>
        </nav>

        <Separator />

        {/* User Profile */}
        <div className="p-3">
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex justify-center">
                  <Avatar className="w-10 h-10 cursor-pointer">
                    <AvatarFallback className="bg-orange-400 text-white font-semibold">
                      {user?.name?.split(" ").map(n => n[0]).slice(0,2).join("") || userInitials}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <div>
                  <p className="font-medium">{user?.name || userName}</p>
                  <p className="text-xs text-muted-foreground">{user?.role || userRole}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-orange-400 text-white font-semibold">
                  {user?.name?.split(" ").map(n => n[0]).slice(0,2).join("") || userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name || userName}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.role || userRole}</p>
              </div>
              <div className="relative" ref={menuRef}>
                <Button 
                  variant="ghost" 
                  size="icon-sm"
                  onClick={() => setMenuOpen((s) => !s)}
                  aria-label="More options"
                >
                  <MoreVertical className="w-5 h-5" />
                </Button>
                {menuOpen && (
                  <div className="absolute bottom-full mb-2 md:bottom-auto md:top-full md:mt-2 right-0 w-40 bg-white text-black rounded-md shadow-lg z-50 border border-gray-200">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm font-medium transition-colors"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
};

export default AdminSidebar;
