import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  // New: allow passing extra JSON-LD structured data entries
  structuredDataExtra?: object | object[];
  // New: optionally include LocalBusiness schema (default true for site-wide)
  includeLocalBusiness?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Damián & Carolina - Expertos en Marketing Digital",
  description = "Automatizamos, conectamos y escalamos tu negocio con Meta Ads, automatización y growth marketing. Expertos en marketing digital con resultados comprobados.",
  keywords = "marketing digital, meta ads, facebook ads, automatización, growth marketing, leads, conversiones, ROI",
  image = "/og-image.svg",
  url = import.meta.env.VITE_SITE_URL || "https://localhost:5173",
  type = "website",
  structuredDataExtra,
  includeLocalBusiness = true,
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Function to update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    // Function to update or create link tags
    const updateLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };
    
    // Basic Meta Tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Damián & Carolina');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', 'Spanish');
    updateMetaTag('revisit-after', '7 days');
    
    // Canonical URL
    updateLinkTag('canonical', url);
    
    // Open Graph / Facebook
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:site_name', 'Damián & Carolina', true);
    updateMetaTag('og:locale', 'es_ES', true);
    
    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:url', url, true);
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', image, true);
    
    // Additional SEO
    updateMetaTag('theme-color', '#00FF88');
    updateMetaTag('msapplication-TileColor', '#00FF88');
    
    // Structured Data - LocalBusiness (optional)
    const localBusiness = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Damián & Carolina - Marketing Digital",
      "description": description,
      "url": url,
      "logo": image,
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": "Spanish"
      },
      "areaServed": "Argentina",
      "serviceType": "Marketing Digital",
      "priceRange": "$$",
      "founder": [
        {
          "@type": "Person",
          "name": "Damián",
          "jobTitle": "Especialista en Estrategia & Performance"
        },
        {
          "@type": "Person",
          "name": "Carolina",
          "jobTitle": "Especialista en Planificación & Ecommerce"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Servicios de Marketing Digital",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Meta Ads",
              "description": "Publicidad precisa, medible y escalable en Facebook e Instagram"
            }
          },
          {
            "@type": "Service",
            "name": "Automatización Inteligente",
            "description": "Reducimos tareas manuales y mejoramos procesos internos"
          },
          {
            "@type": "Service",
            "name": "Growth Marketing",
            "description": "Escalamos con metodología, no con suposiciones"
          }
        ]
      }
    } as const;

    if (includeLocalBusiness) {
      let structuredDataScript = document.querySelector('script#ld-localbusiness[type="application/ld+json"]');
      if (!structuredDataScript) {
        structuredDataScript = document.createElement('script');
        structuredDataScript.setAttribute('type', 'application/ld+json');
        (structuredDataScript as HTMLScriptElement).id = 'ld-localbusiness';
        document.head.appendChild(structuredDataScript);
      }
      (structuredDataScript as HTMLScriptElement).textContent = JSON.stringify(localBusiness);
    }

    // Additional structured data entries (e.g., BlogPosting, BreadcrumbList)
    const extras = Array.isArray(structuredDataExtra)
      ? structuredDataExtra
      : structuredDataExtra
      ? [structuredDataExtra]
      : [];

    extras.forEach((item, idx) => {
      const id = `ld-extra-${idx}`;
      let extraScript = document.querySelector(`script#${id}[type="application/ld+json"]`);
      if (!extraScript) {
        extraScript = document.createElement('script');
        extraScript.setAttribute('type', 'application/ld+json');
        (extraScript as HTMLScriptElement).id = id;
        document.head.appendChild(extraScript);
      }
      (extraScript as HTMLScriptElement).textContent = JSON.stringify(item);
    });
    
  }, [title, description, keywords, image, url, type, structuredDataExtra, includeLocalBusiness]);
  
  return null;
};

export default SEOHead;