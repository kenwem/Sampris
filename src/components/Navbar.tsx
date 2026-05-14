import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, MessageSquare, ChevronRight } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      id="main-nav"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-brand-primary flex items-center justify-center rounded-sm transition-all duration-300 group-hover:bg-brand-accent">
              <span className="text-white font-display font-bold text-xl">S</span>
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "font-display font-black text-xl leading-none tracking-tight transition-colors",
                !scrolled && location.pathname === '/' ? "text-white" : "text-brand-primary"
              )}>
                SAMPRIS
              </span>
              <span className={cn(
                "text-[10px] uppercase tracking-[0.2em] font-bold leading-none mt-1 transition-colors",
                !scrolled && location.pathname === '/' ? "text-amber-400" : "text-brand-accent"
              )}>
                Nigeria Limited
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => cn(
                  'text-[11px] font-bold uppercase tracking-[0.2em] transition-all relative py-2',
                  isActive ? 'text-brand-accent' : (!scrolled && location.pathname === '/' ? 'text-white/90 hover:text-white' : 'text-neutral-600 hover:text-brand-accent'),
                  isActive && 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-accent'
                )}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            id="mobile-menu-toggle"
            className={cn(
              "lg:hidden p-2 rounded-md",
              !scrolled && location.pathname === '/' ? "text-white" : "text-brand-primary"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-neutral-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-8 flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => cn(
                    'text-xl font-display font-medium py-3 border-b border-neutral-50 flex items-center justify-between',
                    isActive ? 'text-brand-accent' : 'text-neutral-800'
                  )}
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      <ChevronRight size={18} className={isActive ? "text-brand-accent" : "text-neutral-300"} />
                    </>
                  )}
                </NavLink>
              ))}
              <div className="flex flex-col gap-4 mt-6">
                <a 
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="w-full flex items-center justify-center gap-3 bg-neutral-100 text-brand-primary py-4 rounded-xl font-bold uppercase text-sm tracking-widest"
                >
                  <Phone size={18} className="text-brand-accent" />
                  Call Us
                </a>
                <a 
                  href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}`}
                  className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-xl font-bold uppercase text-sm tracking-widest shadow-lg shadow-[#25D366]/20"
                >
                  <MessageSquare size={18} />
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
