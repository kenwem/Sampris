import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ChevronRight, MapPinned } from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../constants';
import { useCMS } from '../hooks/useCMS';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { fetchItems } = useCMS();
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const loadSettings = async () => {
      const data = await fetchItems('siteSettings');
      if (data && data.length > 0) {
        setSettings(data[0]);
      }
    };
    loadSettings();
  }, []);

  const socials = [
    { icon: Facebook, url: settings?.socials?.facebook || COMPANY_INFO.socials.facebook },
    { icon: Twitter, url: settings?.socials?.twitter || COMPANY_INFO.socials.twitter },
    { icon: Instagram, url: settings?.socials?.instagram || COMPANY_INFO.socials.instagram },
    { icon: Linkedin, url: settings?.socials?.linkedin || COMPANY_INFO.socials.linkedin },
  ];

  return (
    <footer id="main-footer" className="bg-brand-dark text-white pt-20 pb-10 overflow-hidden relative">
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-1 h-32 bg-brand-accent transition-all duration-700" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-brand-primary flex items-center justify-center rounded-sm">
                <span className="text-white font-display font-bold text-xl">S</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-xl leading-none tracking-tight">SAMPRIS</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold leading-none mt-1 text-brand-accent">Nigeria Limited</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm font-light">
              {settings?.site?.footerText || "Sampris Nigeria Limited is an indigenous construction company maintaining high standards of excellence and quality performance across Nigeria since 2002."}
            </p>
            <div className="flex items-center gap-4">
              {socials.map(({ icon: Icon, url }, i) => (
                <a 
                  key={i} 
                  href={url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent transition-all duration-300 text-white/50 hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-display font-bold text-lg uppercase tracking-wider relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-brand-accent" />
            </h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Services', 'Projects', 'Gallery', 'Contact'].map((link) => (
                <li key={link}>
                  <Link 
                    to={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '')}`} 
                    className="text-white/60 hover:text-brand-accent transition-colors flex items-center gap-2 text-sm group"
                  >
                    <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 lg:col-span-2">
            <h4 className="font-display font-bold text-lg uppercase tracking-wider relative inline-block">
              Contact & Locations
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-brand-accent" />
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <MapPin className="text-brand-accent shrink-0" size={20} />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-white/30 tracking-widest mb-1">Head Office</span>
                    <span className="text-white/60 text-sm leading-relaxed">{settings?.contact?.address || COMPANY_INFO.address}</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <MapPinned className="text-brand-accent shrink-0" size={20} />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-white/30 tracking-widest mb-1">Branch Office</span>
                    <span className="text-white/60 text-sm leading-relaxed">{settings?.contact?.branchAddress || COMPANY_INFO.branchAddress}</span>
                  </div>
                </li>
              </ul>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <Phone className="text-brand-accent shrink-0" size={20} />
                  <div className="flex flex-col">
                    <span className="text-white/60 text-sm">{settings?.contact?.phone || COMPANY_INFO.phone}</span>
                    {settings?.contact?.phoneSecondary && <span className="text-white/60 text-sm">{settings?.contact.phoneSecondary}</span>}
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <Mail className="text-brand-accent shrink-0" size={20} />
                  <span className="text-white/60 text-sm">{settings?.contact?.email || COMPANY_INFO.email}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs tracking-widest uppercase font-medium text-white/40">
          <p>© {currentYear} {COMPANY_INFO.name}. <Link to="/admin" className="hover:text-brand-accent transition-colors">ALL</Link> Rights Reserved.</p>
          <div className="flex items-center gap-8">
            <span className="opacity-0">Admin Access</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
