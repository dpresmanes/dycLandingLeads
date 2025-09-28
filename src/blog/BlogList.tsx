import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { posts as localPostsRaw } from './data';
import SEOHead from '../components/SEOHead';
import { useReducedMotion } from 'framer-motion'

type PostSummary = {
  slug: string;
  title: string;
  date: string | null;
  excerpt: string;
  tags: string[];
  readingTime: number | null;
};

export default function BlogList() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const prefersReducedMotion = useReducedMotion();
  const prefetchBlogPost = () => {
    if (prefersReducedMotion) return;
    import('./BlogPost').catch(() => {});
  };

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/blog/list');
        
        // Verificar si la respuesta es HTML/JavaScript (no JSON)
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('La respuesta no es JSON válido');
        }
        
        if (!res.ok) throw new Error('Error al cargar posts');
        const data = await res.json();
        if (active) setPosts(data.posts || []);
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : 'Error desconocido';
        console.log('Error cargando desde API, usando datos locales:', errorMessage);
        // Fallback local en desarrollo
        if (active) {
          const mapped = (localPostsRaw || []).map((p) => ({
            slug: p.slug,
            title: p.title,
            date: p.date || null,
            excerpt: p.excerpt || '',
            tags: p.tags || [],
            readingTime: p.readingTime ? parseInt(p.readingTime.replace(/\D/g, '')) || null : null,
          }));
          setPosts(mapped);
          // Mostrar aviso suave en UI
          setError('Mostramos datos locales porque el backend no respondió JSON válido.');
        }
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const canonical = `${siteUrl}/blog`;
  const description = 'Recursos, guías y prácticas para mejorar conversiones y crecimiento.';

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4">
      <SEOHead title="Blog" description={description} image="/og-image.svg" url={canonical} type="website" structuredDataExtra={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Inicio", "item": `${siteUrl}/` },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": canonical }
        ]
      }} includeLocalBusiness={false} />
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Blog</h1>
          <p className="text-gray-300">{description}</p>
        </header>

        <div role="status" aria-live="polite" className="sr-only">
          {loading ? 'Cargando artículos…' : error ? `Error: ${error}` : `${posts.length} artículos`}
        </div>

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2" aria-hidden>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-800/40 animate-pulse rounded-2xl" />
            ))}
          </div>
        )}

        {!loading && error && (
          import.meta.env.DEV ? (
            <div className="text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 rounded px-3 py-2 mb-4" role="status">
              {error}
            </div>
          ) : null
        )}

        {!loading && (
          <ul role="list" className="grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <li key={post.slug} role="listitem">
                <article className="group h-full rounded-2xl border border-gray-800 bg-gray-900/40 hover:bg-gray-900/60 transition-colors p-5 focus-within:outline-none focus-within:ring-2 focus-within:ring-[#00FF88]">
                  <header>
                    <h2 className="text-xl md:text-2xl font-semibold leading-snug">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF88]"
                        onMouseEnter={prefersReducedMotion ? undefined : prefetchBlogPost}
                        onPointerEnter={prefersReducedMotion ? undefined : prefetchBlogPost}
                        onFocus={prefersReducedMotion ? undefined : prefetchBlogPost}
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <div className="text-sm text-gray-400 mt-1">
                      {post.date && (
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('es-AR', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </time>
                      )}
                      {post.readingTime ? ` • ${post.readingTime} min de lectura` : null}
                    </div>
                  </header>

                  {post.excerpt && <p className="text-gray-300 mt-3">{post.excerpt}</p>}

                  {post.tags?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2" aria-label="Etiquetas">
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/30"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <footer className="mt-4">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-black bg-[#00FF88] px-4 py-2 rounded font-medium hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF88]"
                      onMouseEnter={prefersReducedMotion ? undefined : prefetchBlogPost}
                      onPointerEnter={prefersReducedMotion ? undefined : prefetchBlogPost}
                      onFocus={prefersReducedMotion ? undefined : prefetchBlogPost}
                    >
                      Leer artículo
                      <span aria-hidden>→</span>
                    </Link>
                  </footer>
                </article>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10">
          <Link to="/" className="text-[#00FF88] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF88]">Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
}