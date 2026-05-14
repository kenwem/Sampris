import React from 'react';
import { 
  Facebook, 
  Twitter as TwitterIcon, 
  Linkedin, 
  Send, 
  Link as LinkIcon, 
  MessageCircle 
} from 'lucide-react';

interface ShareProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    { name: 'WhatsApp', icon: MessageCircle, color: 'bg-[#25D366]', link: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
    { name: 'Facebook', icon: Facebook, color: 'bg-[#1877F2]', link: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { name: 'Twitter', icon: TwitterIcon, color: 'bg-[#1DA1F2]', link: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}` },
    { name: 'LinkedIn', icon: Linkedin, color: 'bg-[#0A66C2]', link: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}` },
    { name: 'Telegram', icon: Send, color: 'bg-[#0088CC]', link: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}` },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="py-8 border-y border-slate-100 my-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">Share this article</p>
      <div className="flex flex-wrap gap-3">
        {shareLinks.map((share) => (
          <a
            key={share.name}
            href={share.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${share.color} text-white p-3 rounded-full hover:scale-110 transition-transform active:scale-95 shadow-md`}
            title={`Share on ${share.name}`}
          >
            <share.icon size={18} />
          </a>
        ))}
        <button
          onClick={copyToClipboard}
          className="bg-slate-800 text-white p-3 rounded-full hover:scale-110 transition-transform active:scale-95 shadow-md"
          title="Copy Link"
        >
          <LinkIcon size={18} />
        </button>
      </div>
    </div>
  );
}
