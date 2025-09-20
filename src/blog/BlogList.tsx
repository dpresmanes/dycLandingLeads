import { Link } from 'react-router-dom';
import { posts } from './data';

export default function BlogList() {
  return (
    <div className="min-h-screen bg-black text-white safe-top safe-bottom">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-orbitron font-bold text-[#00FF88] mb-8">Blog</h1>
        <div className="space-y-6">
          {posts.map((p) => (
            <article key={p.slug} className="border border-[#00FF88]/20 rounded-xl p-6 bg-black/40">
              <header className="mb-3">
                <h2 className="text-2xl font-bold mb-1">
                  <Link to={`/blog/${p.slug}`} className="text-white hover:text-[#00FF88] transition-colors">{p.title}</Link>
                </h2>
                <p className="text-sm text-gray-400">{new Date(p.date).toLocaleDateString('es-AR')} • {p.readingTime}</p>
              </header>
              <p className="text-gray-300 mb-3">{p.excerpt}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags?.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/30">{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <Link to="/" className="text-[#00FF88] hover:underline">← Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
}