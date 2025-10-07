import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { posts as localPosts } from './data';
import NewsletterForm from '../components/NewsletterForm';
import SEOHead from '../components/SEOHead';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [html, setHtml] = useState<string>('');
  const [meta, setMeta] = useState<{ title: string; date: string; readingTime: number | null; tags: string[]; excerpt?: string }>({
    title: '',
    date: '',
    readingTime: null,
    tags: [],
    excerpt: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog/post?slug=${slug}`);
        // Verificar si la respuesta es JSON válida (evita proxys rotos cuando no corre vercel dev en 3000)
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('La respuesta no es JSON válido');
        }
        if (!res.ok) throw new Error('Error al cargar el artículo');
        const data = await res.json();
        if (!data?.post) throw new Error('Artículo no encontrado');
        if (active) {
          // El HTML ya viene escapado/sanitizado desde la API
          setHtml(data.post.html || '');
          setMeta({ title: data.post.title, date: data.post.date, readingTime: data.post.readingTime, tags: data.post.tags, excerpt: data.post.excerpt || '' });
        }
      } catch (error: unknown) {
        // Fallback local en desarrollo
        const local = (localPosts || []).find((p) => p.slug === slug || slugify(p.title) === slug);
        if (local && active) {
          // Convertir líneas de contenido en párrafos seguros
          const localHtml = (local.content || []).map((p) => `<p>${escapeHtml(p)}</p>`).join('\n');
          const readingTime = typeof local.readingTime === 'string' ? parseInt(local.readingTime) || null : local.readingTime ?? null;
          setHtml(localHtml);
          setMeta({ title: local.title, date: local.date, readingTime, tags: local.tags || [], excerpt: local.excerpt || '' });
        } else if (active) {
          const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
          setError(errorMessage);
        }
      }
    };
    if (slug) fetchPost();
    return () => { active = false; };
  }, [slug]);

  // Intercepta links internos como #contact dentro del contenido del post
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      // Ignorar enlaces externos o mailto/tel
      if (/^(https?:)?\/\//.test(href) && !href.startsWith(window.location.origin)) return;
      if (href.startsWith('mailto:') || href.startsWith('tel:')) return;

      const siteOrigin = window.location.origin;
      let hash = '';
      // Casos: "#contact", "/#contact", "https://site/#contact"
      if (href.startsWith('#')) {
        hash = href.slice(1);
      } else if (href.startsWith('/#')) {
        hash = href.slice(2);
      } else if (href.startsWith(siteOrigin + '/#')) {
        hash = href.replace(siteOrigin + '/#', '');
      }

      const validSections = new Set(['contact', 'services', 'process', 'about', 'hero']);
      if (hash && validSections.has(hash)) {
        e.preventDefault();
        navigate('/', { state: { scrollTo: hash } });
      }
    };
    el.addEventListener('click', handler);
    return () => el.removeEventListener('click', handler);
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Error</h1>
            <p className="text-gray-300">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!html) {
    return (
      <div className="min-h-screen bg-black text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00FF88] mx-auto"></div>
            <p className="mt-4 text-gray-300">Cargando artículo...</p>
          </div>
        </div>
      </div>
    );
  }

  // SEO dinámico para el post
  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const canonical = `${siteUrl}/blog/${slug ?? ''}`;
  const description = meta.excerpt || html.replace(/<[^>]+>/g, '').trim().slice(0, 160);
  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": meta.title,
    "datePublished": meta.date,
    "author": [
      { "@type": "Person", "name": "Damián" },
      { "@type": "Person", "name": "Carolina" }
    ],
    "keywords": (meta.tags || []).join(', '),
    "image": `${siteUrl}/og-image.svg`,
    "mainEntityOfPage": canonical,
    "publisher": {
      "@type": "Organization",
      "name": "Damián & Carolina",
      "logo": { "@type": "ImageObject", "url": `${siteUrl}/og-image.svg` }
    },
    "inLanguage": "es-AR"
  };
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": `${siteUrl}/` },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${siteUrl}/blog` },
      { "@type": "ListItem", "position": 3, "name": meta.title || 'Artículo', "item": canonical }
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <SEOHead title={meta.title || 'Artículo'} description={description} image="/og-image.svg" url={canonical} type="article" structuredDataExtra={[blogPosting, breadcrumbList]} includeLocalBusiness={false} />
      <article className="mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="post-title">
        <div className="max-w-[70ch] mx-auto">
          <header className="mb-6">
            <h1 id="post-title" className="text-4xl font-bold text-white mb-2">{meta.title}</h1>
            <div className="flex items-center text-sm text-gray-400 gap-4 flex-wrap">
              <time dateTime={meta.date}>{new Date(meta.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              {meta.readingTime && <span>{meta.readingTime} min de lectura</span>}
            </div>
            {meta.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {meta.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/30">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div ref={contentRef} className="prose prose-invert md:prose-lg [&>p:first-child]:mt-0" role="region" aria-label="Contenido del artículo" dangerouslySetInnerHTML={{ __html: html }} />

          <section className="mt-12">
            <div className="relative overflow-hidden rounded-xl border border-gray-700/40 bg-gray-900/50 backdrop-blur-sm p-5 md:p-6">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#00FF88]/10 blur-2xl pointer-events-none" aria-hidden />
              <h3 className="text-xl font-bold mb-1">¿Te gustó este artículo?</h3>
              <p className="text-gray-300 mb-4 text-sm">Suscribite al newsletter para recibir más contenido como este directamente en tu correo.</p>
              <NewsletterForm
                source={`/blog/${slug ?? ''}`}
                variant="compact"
                showName={false}
                buttonLabel="Suscribirme"
              />
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}

export default BlogPost;

// Reemplazo de funciones pesadas por un escape mínimo para el fallback local
const escapeHtml = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

// Helper: slugify a partir del título para empatar URLs largas usadas por Notion/SEO
const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .normalize('NFD')
    // Remueve marcas diacríticas de forma compatible con parsers que no soportan Unicode property escapes
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};