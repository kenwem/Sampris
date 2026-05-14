import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  FileText, 
  Settings, 
  MessageSquare, 
  Image as ImageIcon, 
  Package, 
  Users,
  Layout,
  Briefcase,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { user } = useAuth();

  const stats = [
    { name: 'Active Projects', value: '0', icon: Briefcase, color: 'bg-amber-500' },
    { name: 'Services', value: '0', icon: Package, color: 'bg-brand-primary' },
    { name: 'Gallery Items', value: '0', icon: ImageIcon, color: 'bg-blue-500' },
    { name: 'Testimonials', value: '0', icon: MessageSquare, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Welcome, {user?.displayName || 'Admin'}</h1>
        <p className="text-slate-500 mt-2">Manage Sampris Nigeria Limited construction operations and site assets.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.name}</p>
              <p className="text-2xl font-black text-slate-800 mt-1">{stat.value}</p>
            </div>
            <div className={`${stat.color} p-3 rounded-lg text-white`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Operations & Content</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/admin/services" className="p-4 border border-slate-100 rounded-lg hover:border-brand-primary hover:bg-slate-50 transition-all flex flex-col items-center gap-3">
              <Package className="text-brand-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 text-center">Manage Services</span>
            </Link>
            <Link to="/admin/projects" className="p-4 border border-slate-100 rounded-lg hover:border-brand-primary hover:bg-slate-50 transition-all flex flex-col items-center gap-3">
              <Briefcase className="text-brand-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 text-center">Update Projects</span>
            </Link>
            <Link to="/admin/gallery" className="p-4 border border-slate-100 rounded-lg hover:border-brand-primary hover:bg-slate-50 transition-all flex flex-col items-center gap-3">
              <ImageIcon className="text-brand-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 text-center">Media Gallery</span>
            </Link>
            <Link to="/admin/settings" className="p-4 border border-slate-100 rounded-lg hover:border-brand-primary hover:bg-slate-50 transition-all flex flex-col items-center gap-3">
              <Settings className="text-brand-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 text-center">Site Settings</span>
            </Link>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-center text-center">
            <Layout className="text-brand-accent mx-auto mb-4" size={48} />
            <h2 className="text-lg font-bold text-slate-800 mb-2">Live CMS Preview</h2>
            <p className="text-sm text-slate-500 mb-6 italic leading-relaxed">
              "Building the future of infrastructure with precision and excellence."
            </p>
            <a href="/" target="_blank" className="text-brand-primary font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:underline">
              View Website <ExternalLink size={14} />
            </a>
        </div>
      </div>
    </div>
  );
}
