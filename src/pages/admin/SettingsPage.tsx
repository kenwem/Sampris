import React, { useState, useEffect } from 'react';
import { useCMS, CMSItem } from '../../hooks/useCMS';
import { Save, Loader2, Image as ImageIcon, Globe, Phone, Mail, MapPin, Layout, AlignLeft, Plus, CheckCircle2, ChevronRight } from 'lucide-react';

export default function SettingsPage() {
  const { fetchItems, saveItem, uploadImage } = useCMS();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [successField, setSuccessField] = useState<string | null>(null);
  const [settings, setSettings] = useState<any>({
    hero: { 
      title: '', 
      subtitle: '', 
      images: ['', '', ''],
      introImage: '',
      slides: [
        { title: '', subtitle: '' },
        { title: '', subtitle: '' },
        { title: '', subtitle: '' }
      ]
    },
    site: { logo: '', favicon: '', footerText: '', aboutUs: '', copyright: '' },
    contact: { email: '', phone: '', phoneSecondary: '', whatsapp: '', address: '', branchAddress: '' },
    about: { headerImage: '', storyImage1: '', storyImage2: '' },
    socials: { facebook: '', twitter: '', linkedin: '', instagram: '' }
  });

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      const data = await fetchItems('siteSettings');
      if (data && data.length > 0) {
        const remoteSettings = data[0];
        setSettings({
          ...settings,
          ...remoteSettings,
          hero: {
            ...settings.hero,
            ...remoteSettings.hero,
            slides: remoteSettings.hero?.slides || settings.hero.slides
          },
          site: { ...settings.site, ...remoteSettings.site },
          contact: { ...settings.contact, ...remoteSettings.contact },
          about: { ...settings.about, ...remoteSettings.about },
          socials: { ...settings.socials, ...remoteSettings.socials }
        });
      }
      setLoading(false);
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveItem('siteSettings', settings, settings.id || 'general');
      alert('Settings updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const updateSettingsValue = (path: string, value: any) => {
    setSettings((prev: any) => {
      const newSettings = JSON.parse(JSON.stringify(prev)); // Deep clone
      const keys = path.split('.');
      let current = newSettings;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newSettings;
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, path: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingField(path);
      setSuccessField(null);
      try {
        const url = await uploadImage(file);
        updateSettingsValue(path, url);
        setSuccessField(path);
        setTimeout(() => setSuccessField(null), 3000);
      } catch (err: any) {
        alert(err.message);
      } finally {
        setUploadingField(null);
      }
    }
  };

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  };

  const ImageField = ({ label, path, aspect = "aspect-square", description }: { label: string, path: string, aspect?: string, description?: string }) => {
    const value = getNestedValue(settings, path);
    const isUploading = uploadingField === path;
    const isSuccess = successField === path;
    
    return (
      <div className="space-y-4">
        <label className="block text-xs font-bold uppercase tracking-widest text-slate-500">{label}</label>
        <div className={`relative group ${aspect} bg-slate-50 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden hover:border-brand-primary transition-colors`}>
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="animate-spin text-brand-accent" />
              <span className="text-[10px] font-bold text-slate-400">Uploading...</span>
            </div>
          ) : isSuccess ? (
             <div className="flex flex-col items-center gap-2 animate-pulse">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                   <Plus size={24} className="rotate-45" />
                </div>
                <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Saved to draft</span>
             </div>
          ) : value ? (
            <div className="relative w-full h-full">
              <img 
                src={value} 
                className="w-full h-full object-contain p-2" 
                referrerPolicy="no-referrer"
                onError={(e: any) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=800';
                }}
              />
              <div className="absolute top-1 right-1">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white shadow-md">
                   <ChevronRight size={12} className="rotate-[-45deg] scale-x-[-1]" />
                </div>
              </div>
            </div>
          ) : (
            <ImageIcon size={32} className="text-slate-300" />
          )}
          <input 
            type="file" 
            className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed" 
            onChange={(e) => handleImageUpload(e, path)}
            disabled={isUploading}
          />
        </div>
        <div className="space-y-1">
          <input 
            type="text"
            placeholder="Or paste Image URL here..."
            className="w-full p-2 bg-slate-50 border border-slate-100 rounded text-[10px] outline-none focus:ring-1 focus:ring-brand-accent transition-all"
            value={value || ''}
            onChange={(e) => updateSettingsValue(path, e.target.value)}
          />
          {description && <p className="text-[9px] text-slate-400 italic">{description}</p>}
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="p-12 text-center text-slate-400">Loading Configuration...</div>;
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Global Settings</h1>
          <p className="text-slate-500 text-sm">Configure core website sections and brand assets</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-brand-primary text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider text-xs flex items-center gap-2 hover:bg-brand-primary/90 transition-all shadow-lg active:scale-95 disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          Publish Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Site Identity */}
        <section className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
             <Globe className="text-brand-accent" size={20} />
             <h2 className="font-bold text-slate-700 uppercase tracking-widest text-xs">Site Identity</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <ImageField label="Website Logo" path="site.logo" />
            <ImageField label="Favicon" path="site.favicon" />
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm space-y-6 lg:col-span-1">
          <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
             <Layout className="text-brand-accent" size={20} />
             <h2 className="font-bold text-slate-700 uppercase tracking-widest text-xs">Hero Section Content</h2>
          </div>
          
          <div className="space-y-8">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="p-6 bg-slate-50/50 rounded-xl border border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-400">Slide {idx + 1} Content</h3>
                  <div className="w-24">
                    <ImageField label="" path={`hero.images.${idx}`} aspect="aspect-square" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Heading</label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-accent text-sm"
                    value={settings.hero.slides?.[idx]?.title || ''}
                    onChange={(e) => {
                      const newSlides = [...(settings.hero.slides || [])];
                      newSlides[idx] = { ...newSlides[idx], title: e.target.value };
                      setSettings({ ...settings, hero: { ...settings.hero, slides: newSlides } });
                    }}
                    placeholder={idx === 0 ? "Building the Future..." : "Slide Title"}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Sub-heading</label>
                  <textarea 
                    rows={2}
                    className="w-full p-3 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-accent text-sm"
                    value={settings.hero.slides?.[idx]?.subtitle || ''}
                    onChange={(e) => {
                      const newSlides = [...(settings.hero.slides || [])];
                      newSlides[idx] = { ...newSlides[idx], subtitle: e.target.value };
                      setSettings({ ...settings, hero: { ...settings.hero, slides: newSlides } });
                    }}
                    placeholder="Brief description for this slide"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Home Intro Image & Summary */}
        <section className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm space-y-6 lg:col-span-1">
          <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
             <ImageIcon className="text-brand-accent" size={20} />
             <h2 className="font-bold text-slate-700 uppercase tracking-widest text-xs">Home "Who We Are" Media</h2>
          </div>
          <div className="space-y-4">
            <ImageField 
              label="Intro Image (Home Page)" 
              path="hero.introImage" 
              aspect="aspect-video lg:aspect-square" 
              description="Recommended: High-resolution construction site or corporate photo."
            />
          </div>
        </section> 


        {/* About Page Media */}
        <section className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm space-y-6 lg:col-span-2">
          <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
             <ImageIcon className="text-brand-accent" size={20} />
             <h2 className="font-bold text-slate-700 uppercase tracking-widest text-xs">About Page Assets</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ImageField label="Header Background" path="about.headerImage" aspect="aspect-video" />
            <ImageField label="Story Image 1" path="about.storyImage1" aspect="aspect-[4/5]" />
            <ImageField label="Story Image 2" path="about.storyImage2" aspect="aspect-[4/5]" />
          </div>
        </section>

        {/* Access & Contact */}
        <section className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm space-y-6 lg:col-span-2">
          <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
             <Phone className="text-brand-accent" size={20} />
             <h2 className="font-bold text-slate-700 uppercase tracking-widest text-xs">Official Contact Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Primary Email
              </label>
              <input 
                type="email" 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-accent text-sm"
                value={settings.contact.email}
                onChange={(e) => setSettings({...settings, contact: {...settings.contact, email: e.target.value}})}
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Primary Phone
              </label>
              <input 
                type="text" 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-accent text-sm"
                value={settings.contact.phone}
                onChange={(e) => setSettings({...settings, contact: {...settings.contact, phone: e.target.value}})}
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Secondary Phone
              </label>
              <input 
                type="text" 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-accent text-sm"
                value={settings.contact.phoneSecondary || ''}
                onChange={(e) => setSettings({...settings, contact: {...settings.contact, phoneSecondary: e.target.value}})}
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#25D366]">
                WhatsApp Number
              </label>
              <input 
                type="text" 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-[#25D366] text-sm font-bold"
                value={settings.contact.whatsapp || ''}
                onChange={(e) => setSettings({...settings, contact: {...settings.contact, whatsapp: e.target.value}})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Head Office Address
              </label>
              <input 
                type="text" 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-accent text-sm"
                value={settings.contact.address}
                onChange={(e) => setSettings({...settings, contact: {...settings.contact, address: e.target.value}})}
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Branch Office Address
              </label>
              <input 
                type="text" 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-accent text-sm"
                value={settings.contact.branchAddress || ''}
                onChange={(e) => setSettings({...settings, contact: {...settings.contact, branchAddress: e.target.value}})}
              />
            </div>
          </div>
        </section>

        {/* Social Media & Footer */}
        <section className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm space-y-6 lg:col-span-2">
          <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
             <Globe className="text-brand-accent" size={20} />
             <h2 className="font-bold text-slate-700 uppercase tracking-widest text-xs">Social Presence & Footer</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['facebook', 'twitter', 'linkedin', 'instagram'].map((platform) => (
              <div key={platform} className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">{platform}</label>
                <input 
                  type="text"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-brand-accent"
                  value={settings.socials?.[platform] || ''}
                  onChange={(e) => setSettings({...settings, socials: { ...settings.socials, [platform]: e.target.value }})}
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-slate-50">
             <div className="space-y-4">
               <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Short "About Us" Summary</label>
               <textarea 
                 rows={4}
                 className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-accent text-sm"
                 value={settings.site.aboutUs}
                 onChange={(e) => setSettings({...settings, site: {...settings.site, aboutUs: e.target.value}})}
               />
             </div>
             <div className="space-y-4">
               <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Footer Tagline/Text</label>
               <textarea 
                 rows={4}
                 className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-accent text-sm"
                 value={settings.site.footerText}
                 onChange={(e) => setSettings({...settings, site: {...settings.site, footerText: e.target.value}})}
               />
             </div>
             <div className="space-y-4">
               <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Copyright Text</label>
               <textarea 
                 rows={4}
                 className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-accent text-sm"
                 value={settings.site.copyright || ''}
                 onChange={(e) => setSettings({...settings, site: {...settings.site, copyright: e.target.value}})}
                 placeholder="© 2024 Sampris Nigeria Limited. All Rights Reserved."
               />
             </div>
          </div>
        </section>

      </div>
    </div>
  );
}
