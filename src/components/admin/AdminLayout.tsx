import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  MessageSquare, 
  Image as ImageIcon, 
  Users, 
  LogOut,
  ChevronRight,
  Menu,
  X,
  Plus,
  ExternalLink
} from 'lucide-react';
import { cn } from '../../lib/utils';

export default function AdminLayout() {
  const { user, isAdmin, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, loading, navigate]);

  // Handle 30-minute idle timeout
  useEffect(() => {
    let timeoutId: any;

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        logout();
        navigate('/admin');
      }, 30 * 60 * 1000); // 30 minutes
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [logout]);

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Services', icon: FileText, path: '/admin/services' },
    { name: 'Testimonials', icon: MessageSquare, path: '/admin/testimonials' },
    { name: 'Projects', icon: LayoutDashboard, path: '/admin/projects' },
    { name: 'Gallery', icon: ImageIcon, path: '/admin/gallery' },
    { name: 'Sections', icon: Settings, path: '/admin/sections' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  if (loading) return <div>Loading...</div>;
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={cn(
        "bg-brand-primary text-white transition-all duration-300 flex flex-col",
        isSidebarOpen ? "w-64" : "w-20"
      )}>
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center font-bold">S</div>
              <span className="font-bold tracking-tight">SAMPRIS CMS</span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center font-bold mx-auto">S</div>
          )}
        </div>

        <nav className="flex-1 mt-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 p-3 rounded-lg transition-all group",
                isActive ? "bg-brand-accent text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
              {isSidebarOpen && <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-3 p-3 rounded-lg text-red-300 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="text-sm font-medium">Log Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-slate-500 hover:text-brand-primary">
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-6">
            <a 
              href="/" 
              className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-brand-accent hover:text-white transition-all flex items-center gap-2"
            >
              View Site <ExternalLink size={14} />
            </a>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-700">{user?.displayName || 'Admin'}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Site Administrator</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                <img src={user?.photoURL || 'https://ui-avatars.com/api/?name=Admin'} alt="Avatar" />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
