import React from 'react';
import { motion } from 'motion/react';
import { COMPANY_INFO } from '../constants';
import SectionHeading from '../components/SectionHeading';
import ContactForm from '../components/ContactForm';
import { Phone, Mail, MapPin, MessageSquare, Clock, Globe } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

export default function Contact() {
  const contactMethods = [
    { 
      icon: Phone, 
      label: 'Call Us', 
      value: COMPANY_INFO.phone, 
      href: `tel:${COMPANY_INFO.phone}`,
      detail: 'Mon-Fri, 8am-6pm'
    },
    { 
      icon: MessageSquare, 
      label: 'WhatsApp', 
      value: 'Instant Chat', 
      href: `https://wa.me/${COMPANY_INFO.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}`,
      detail: 'Available 24/7'
    },
    { 
      icon: Mail, 
      label: 'Mail', 
      value: COMPANY_INFO.email, 
      href: `mailto:${COMPANY_INFO.email}`,
      detail: 'Quick Response'
    }
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-brand-primary py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="grid grid-cols-12 h-full opacity-5">
             {[...Array(12)].map((_, i) => <div key={i} className="border-r border-white" />)}
           </div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <SectionHeading 
            light
            badge="Contact Us"
            title="Start Your Engineering Journey"
            subtitle="Our team of directors and engineering professionals is ready to handle your next diverse construction opportunity."
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1 space-y-12">
              <div className="space-y-8">
                <SectionHeading 
                  title="Connect With Us"
                  subtitle="Reach out via any of these channels or visit our corporate office for a one-on-one consultation."
                />
                <div className="flex flex-col gap-6">
                  {contactMethods.map((method) => (
                    <a 
                      key={method.label}
                      href={method.href}
                      className="group flex items-start gap-6 p-8 border border-neutral-100 hover:border-brand-accent transition-all duration-500 hover:bg-neutral-50"
                    >
                      <div className="w-12 h-12 bg-neutral-50 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all duration-500 rounded-lg">
                        <method.icon size={20} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">{method.label}</p>
                        <h4 className="font-display font-bold text-brand-primary text-lg">{method.value}</h4>
                        <p className="text-[10px] uppercase tracking-widest text-brand-accent">{method.detail}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-6 bg-brand-primary p-12 text-white overflow-hidden relative">
                 <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full" />
                 <h4 className="text-2xl font-display font-bold mb-4">Office Location</h4>
                 <div className="space-y-4">
                    <div className="flex gap-4">
                       <MapPin className="text-brand-accent shrink-0" size={20} />
                       <p className="text-white/60 text-sm italic font-light">{COMPANY_INFO.address}</p>
                    </div>
                    <div className="flex gap-4">
                       <Clock className="text-brand-accent shrink-0" size={20} />
                       <div className="space-y-2">
                         <p className="text-white/60 text-sm font-light">Monday - Friday: 08:00 - 18:00</p>
                         <p className="text-white/60 text-sm font-light">Saturday: 09:00 - 14:00</p>
                       </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
