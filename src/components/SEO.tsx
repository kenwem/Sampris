import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth, SITE_ID } from '../context/AuthContext';
import { useCMS } from '../hooks/useCMS';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  slug?: string;
  type?: 'website' | 'article';
}

export default function SEO({ 
  title, 
  description = "Sampris Nigeria Limited is a leading indigenous construction company specializing in civil engineering, building construction, and infrastructure development.",
  image = "/og-image.jpg",
  slug = "",
  type = "website"
}: SEOProps) {
  const siteUrl = window.location.origin;
  const { fetchItems } = useCMS();
  const [favicon, setFavicon] = useState("https://cdn-icons-png.flaticon.com/512/1212/1212627.png");
  
  useEffect(() => {
    const loadFavicon = async () => {
      const data = await fetchItems('siteSettings');
      if (data && data[0]?.site?.favicon) {
        setFavicon(data[0].site.favicon);
      }
    };
    loadFavicon();
  }, []);

  const fullTitle = title ? `${title} | Sampris Nigeria` : "Sampris Nigeria Limited | Excellence in Construction";
  const fullUrl = `${siteUrl}/${slug}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="icon" type="image/png" href={favicon} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
