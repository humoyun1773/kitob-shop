import React, { useEffect } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  schema?: Record<string, any>;
}

export const SEO: React.FC<SEOProps> = ({
  title = "KitobShop — Premium & Zamonaviy Online Kitob Do'koni",
  description = "Eng sara jahon va o'zbek adabiyoti durdonalari, bestseller kitoblar, qulay yetkazib berish va unutilmas mutolaa zavqi.",
  keywords = "kitoblar, kitob do'koni, bestseller kitoblar, o'zbek adabiyoti, badiiy kitoblar, shaxsiy rivojlanish, toshkent kitob do'koni, online kitob xarid qilish",
  image = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80",
  url = typeof window !== 'undefined' ? window.location.href : 'https://kitobshop.uz',
  type = "website",
  schema
}) => {
  useEffect(() => {
    // 1. Document Title
    const formattedTitle = title.includes('KitobShop') ? title : `${title} | KitobShop`;
    document.title = formattedTitle;

    // 2. Meta Tag Setter Utility
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('property', 'og:title', formattedTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:url', url);
    setMetaTag('property', 'og:type', type);
    setMetaTag('name', 'twitter:title', formattedTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);

    // 3. Schema.org JSON-LD Structured Data
    let scriptTag = document.getElementById('dynamic-jsonld') as HTMLScriptElement | null;
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'dynamic-jsonld';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, keywords, image, url, type, schema]);

  return null;
};
