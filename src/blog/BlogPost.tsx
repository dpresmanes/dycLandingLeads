import { useParams, Link } from 'react-router-dom';
import { posts } from './data';

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white safe-top safe-bottom">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <p className="text-gray-300">Post no encontrado.</p>
          <div className="mt-6"><Link to="/blog" className="text-[#00FF88] hover:underline">← Volver al blog</Link></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white safe-top safe-bottom">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <article className="prose prose-invert max-w-none">
          <header className="mb-6">
            <h1 className="text-3xl font-orbitron font-bold text-white mb-2">{post.title}</h1>
            <p className="text-sm text-gray-400">{new Date(post.date).toLocaleDateString('es-AR')} • {post.readingTime}</p>
          </header>
          <div className="space-y-4 text-gray-200">
            {post.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </article>
        <div className="mt-10">
          <Link to="/blog" className="text-[#00FF88] hover:underline">← Volver al blog</Link>
        </div>
      </div>
    </div>
  );
}