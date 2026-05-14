import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-12 text-center rounded-sm shadow-xl border border-neutral-100"
      >
        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-2xl font-display font-bold mb-4">Message Sent!</h3>
        <p className="text-neutral-500 mb-8 max-w-sm mx-auto">
          Thank you for reaching out. Our engineering team will review your request and get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-brand-accent font-bold uppercase tracking-widest text-xs"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 md:p-12 rounded-sm shadow-2xl shadow-neutral-200/50 border border-neutral-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Full Name</label>
          <input
            required
            type="text"
            className="w-full bg-neutral-50 border-b border-neutral-200 py-3 px-1 focus:border-brand-accent focus:outline-none transition-colors font-medium"
            placeholder="Ade Femi"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Email Address</label>
          <input
            required
            type="email"
            className="w-full bg-neutral-50 border-b border-neutral-200 py-3 px-1 focus:border-brand-accent focus:outline-none transition-colors font-medium"
            placeholder="tunde@example.com"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Phone Number</label>
          <input
            required
            type="tel"
            className="w-full bg-neutral-50 border-b border-neutral-200 py-3 px-1 focus:border-brand-accent focus:outline-none transition-colors font-medium"
            placeholder="+234 ..."
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Service Required</label>
          <select className="w-full bg-neutral-50 border-b border-neutral-200 py-3 px-1 focus:border-brand-accent focus:outline-none transition-colors font-medium appearance-none">
            <option>Building Construction</option>
            <option>Civil Engineering</option>
            <option>Renovation</option>
            <option>Consultancy</option>
            <option>Others</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Project Details</label>
        <textarea
          required
          rows={4}
          className="w-full bg-neutral-50 border-b border-neutral-200 py-3 px-1 focus:border-brand-accent focus:outline-none transition-colors font-medium resize-none"
          placeholder="Tell us about your project infrastructure needs..."
        />
      </div>

      <button
        disabled={status === 'submitting'}
        className={cn(
          "w-full bg-brand-primary text-white py-5 rounded-sm font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 transition-all overflow-hidden relative group",
          status === 'submitting' ? "opacity-70 cursor-not-allowed" : "hover:bg-brand-accent"
        )}
      >
        <span className="relative z-10">{status === 'submitting' ? 'Processing...' : 'Request a Proposal'}</span>
        <Send size={16} className={cn("relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1", status === 'submitting' && "animate-pulse")} />
        <div className="absolute inset-0 bg-brand-accent transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
      </button>
      
      <p className="text-[10px] text-center text-neutral-400 uppercase tracking-widest leading-relaxed">
        By submitting, you agree to our terms and conditions and privacy policy. 
        We value your privacy and data security.
      </p>
    </form>
  );
}
