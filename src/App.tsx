/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { useCMS } from './hooks/useCMS';

// Layout wrapper for page transitions
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen pt-20"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Projects = lazy(() => import('./pages/Projects'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Contact = lazy(() => import('./pages/Contact'));

// Admin Pages
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const ModerationPanel = lazy(() => import('./pages/admin/ModerationPanel'));
const CMSManager = lazy(() => import('./pages/admin/CMSManager'));
const SettingsPage = lazy(() => import('./pages/admin/SettingsPage'));

// CMS Constants
const TESTIMONIAL_FIELDS = [
  { name: 'name', label: 'Client Name', type: 'text' },
  { name: 'role', label: 'Company/Role', type: 'text' },
  { name: 'content', label: 'Testimonial Text', type: 'textarea' },
  { name: 'rating', label: 'Rating (1-5)', type: 'number' },
  { name: 'image', label: 'Client Photo (Optional)', type: 'image' },
];

const PROJECT_FIELDS = [
  { name: 'title', label: 'Project Name', type: 'text' },
  { name: 'category', label: 'Category', type: 'select', options: ['Building', 'Infrastructure', 'Renovation', 'Estate'] },
  { name: 'image', label: 'Thumbnail Image', type: 'image' },
  { name: 'video', label: 'Video (Upload or Link)', type: 'video' },
  { name: 'status', label: 'Status', type: 'select', options: ['Planned', 'Ongoing', 'Completed'] },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'progress', label: 'Progress (%)', type: 'number' },
  { name: 'beforeImage', label: 'Before Image (Optional)', type: 'image' },
  { name: 'afterImage', label: 'After Image (Optional)', type: 'image' },
];

const GALLERY_FIELDS = [
  { name: 'title', label: 'Title', type: 'text' },
  { name: 'imageUrl', label: 'Image', type: 'image' },
  { name: 'video', label: 'Video (Optional Upload or Link)', type: 'video' },
  { name: 'category', label: 'Category', type: 'text' },
];

const SERVICE_FIELDS = [
  { name: 'title', label: 'Service Name', type: 'text' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'iconName', label: 'Lucide Icon Name (e.g. HardHat, Construction)', type: 'text' },
  { name: 'image', label: 'Featured Image', type: 'image' },
  { name: 'longDescription', label: 'Full Details (Markdown)', type: 'markdown' },
];

const SECTION_FIELDS = [
  { name: 'title', label: 'Section Title', type: 'text' },
  { name: 'subtitle', label: 'Subtitle', type: 'text' },
  { name: 'content', label: 'Content', type: 'markdown' },
  { name: 'image', label: 'Image', type: 'image' },
];

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
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

  return (
    <BrowserRouter>
      <div className="relative overflow-x-hidden">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<><Navbar /><PageTransition><Suspense fallback={<Loading />}><Home /></Suspense></PageTransition><Footer /></>} />
          <Route path="/about" element={<><Navbar /><PageTransition><Suspense fallback={<Loading />}><About /></Suspense></PageTransition><Footer /></>} />
          <Route path="/services" element={<><Navbar /><PageTransition><Suspense fallback={<Loading />}><Services /></Suspense></PageTransition><Footer /></>} />
          <Route path="/projects" element={<><Navbar /><PageTransition><Suspense fallback={<Loading />}><Projects /></Suspense></PageTransition><Footer /></>} />
          <Route path="/gallery" element={<><Navbar /><PageTransition><Suspense fallback={<Loading />}><Gallery /></Suspense></PageTransition><Footer /></>} />
          <Route path="/testimonials" element={<><Navbar /><PageTransition><Suspense fallback={<Loading />}><Testimonials /></Suspense></PageTransition><Footer /></>} />
          <Route path="/contact" element={<><Navbar /><PageTransition><Suspense fallback={<Loading />}><Contact /></Suspense></PageTransition><Footer /></>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Suspense fallback={<Loading />}><AdminLogin /></Suspense>} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="services" element={<CMSManager collectionName="services" fields={SERVICE_FIELDS as any} />} />
            <Route path="testimonials" element={<CMSManager collectionName="testimonials" fields={TESTIMONIAL_FIELDS as any} />} />
            <Route path="projects" element={<CMSManager collectionName="projects" fields={PROJECT_FIELDS as any} />} />
            <Route path="gallery" element={<CMSManager collectionName="gallery" fields={GALLERY_FIELDS as any} />} />
            <Route path="sections" element={<CMSManager collectionName="sections" fields={SECTION_FIELDS as any} />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
        <WhatsAppButton phone={settings?.contact?.whatsapp} />
      </div>
    </BrowserRouter>
  );
}
