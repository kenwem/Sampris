import React from 'react';
import { MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import { motion } from 'motion/react';

export default function WhatsAppButton({ phone }: { phone?: string }) {
  const whatsappNumber = (phone || COMPANY_INFO.whatsapp).replace(/\+/g, '').replace(/\s/g, '');
  
  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <MessageSquare size={24} fill="white" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 whitespace-nowrap font-bold uppercase tracking-widest text-[10px]">
        Chat with us
      </span>
    </motion.a>
  );
}
