import { motion } from 'framer-motion';
import { CheckCircle, Clock, Target, Zap } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { trackEvent } from '@/utils/analytics';
import JSZip from 'jszip';
import { Link } from 'react-router-dom'
import { useLeadCaptureContext } from '../contexts/LeadCaptureContext'

const LeadMagnet = () => {
  const { openModal } = useLeadCaptureContext()
  const [unlocked, setUnlocked] = useState(true);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let fired = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!fired && entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          trackEvent('lead_magnet_impression', { location: 'LeadMagnet_Section' });
          fired = true;
          observer.disconnect();
        }
      });
    }, { threshold: [0, 0.3, 0.6, 1] });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);


  const benefits = [
    {
      icon: Clock,
      text: 'Optimiza 20+ horas semanales'
    },
    {
      icon: Target,
      text: 'Aumenta conversiones 40%'
    },
    {
      icon: Zap,
      text: 'Implementación inmediata'
    }
  ];

  const automations = [
    'Email marketing automatizado',
    'Seguimiento de leads perdidos',
    'Respuestas automáticas en redes',
    'Reportes de ventas automáticos',
    'Gestión de inventario inteligente',
    'Facturación y cobranza automática',
    'Segmentación de clientes',
    'Remarketing personalizado',
    'Chatbots de atención al cliente',
    'Análisis predictivo de ventas'
  ];

  return (
    <section ref={sectionRef} id="lead-magnet" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-900/50 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300FF88' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-[#00FF88]/5 border border-[#00FF88]/20 rounded-full px-4 py-2 inline-flex items-center space-x-2 mb-6">
              <Zap className="text-[#00FF88]" size={16} />
              <span className="text-[#00FF88] font-semibold text-sm">Acceso gratuito</span>
            </div>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold text-white mb-6 leading-tight">
              <span className="text-[#00FF88]">10 Sistemas Inteligentes</span><br />
              que optimizan tu tiempo y recursos
            </h2>

            <p className="text-gray-300 text-base md:text-lg font-inter leading-relaxed mb-6">
              Accede al <span className="text-[#00FF88]">Pack de Automatizaciones</span> por $17 con los sistemas más efectivos
              que implementamos en nuestros clientes. Estrategias probadas y validadas.
            </p>

            {/* Benefits */}
            <div className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-8 h-8 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="text-[#00FF88]" size={16} />
                  </div>
                  <span className="text-white font-inter">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ 
                scale: 1.02
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { trackEvent('lead_capture_cta_click', { location: 'LeadMagnet_Section' }); openModal(); }}
              className="bg-[#00FF88] text-black px-8 py-4 rounded-lg text-lg font-bold font-inter transition-all duration-300 inline-flex items-center space-x-3"
            >
              <Zap size={20} />
              <span>Obtener acceso</span>
            </motion.button>
          </motion.div>

          {/* Right Content - Preview con Estilo Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Fondo con efecto glassmorphism */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-green-600/5 rounded-3xl backdrop-blur-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 via-green-500/10 to-green-700/20 rounded-3xl"></div>
            
            {/* Contenido principal */}
            <div className="relative bg-gradient-to-br from-gray-900/40 via-gray-800/30 to-gray-900/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-green-500/20 hover:border-green-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10">
              {/* Efectos decorativos */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-green-400/5 rounded-full blur-xl"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-green-600/5 rounded-full blur-lg"></div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center">
                    <Zap className="text-green-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-orbitron font-bold text-lg">Pack de Automatizaciones</h3>
                    <p className="text-gray-300 text-sm">10 sistemas • Acceso inmediato</p>
                  </div>
                </div>

                <h4 className="text-green-400 font-semibold mb-4">Incluye:</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {automations.map((automation, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-2"
                    >
                      <CheckCircle className="text-green-400 flex-shrink-0" size={16} />
                      <span className="text-gray-300 text-sm font-inter">{automation}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-600/30">
                  <p className="text-center text-gray-300 text-xs font-inter">
                    🔒 Acceso inmediato tras la compra • Valor real: $297
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-full flex items-center justify-center"
            >
              <Zap className="text-[#00FF88]" size={24} />
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Catálogo dinámico */}
      <div id="workflows-catalog" className="mt-16">
        <Catalog unlocked={true} onBuy={openModal} />
      </div>
      
    </section>
  );
};

function Catalog({ unlocked, onBuy }: { unlocked: boolean; onBuy: () => void }) {
  const [items, setItems] = useState<Array<{ id: string; name: string; description?: string; category?: string; tags?: string[]; json_url: string; readme_url?: string; assistant_url?: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const RAW_MANIFEST_URL = (import.meta as any)?.env?.VITE_WORKFLOWS_CATALOG_URL as string | undefined;
  const [isZipping, setIsZipping] = useState(false);
  async function downloadAll() {
    if (!unlocked) return;
    try {
      setIsZipping(true);
      const zip = new JSZip();
      const addFile = async (url: string, filename: string) => {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`Falló descarga: ${filename}`);
        const blob = await resp.blob();
        const arrayBuf = await blob.arrayBuffer();
        zip.file(filename, arrayBuf);
      };
      const now = new Date().toISOString().slice(0,19).replace(/[:T]/g,'-');
      const folder = zip.folder(`workflows-${now}`)!;
      for (const it of items) {
        const fname = `${it.id || it.name?.replace(/\s+/g,'-').toLowerCase() || 'workflow'}.json`;
        const resp = await fetch(it.json_url);
        if (resp.ok) {
          const blob = await resp.blob();
          const ab = await blob.arrayBuffer();
          folder.file(fname, ab);
        }
      }
      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `workflows-pack-${now}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      trackEvent('catalog_download_all', { count: items.length });
    } catch (e) {
      console.error(e);
    } finally {
      setIsZipping(false);
    }
  }

  useEffect(() => {
    if (!unlocked) return;
    setLoading(true);
    setError(null);
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (category) params.set('category', category);

    const loadRemoteFirst = async () => {
      let list: any[] = [];
      // 1) Intentar primero manifest remoto si está configurado
      if (RAW_MANIFEST_URL) {
        try {
          const r2 = await fetch(RAW_MANIFEST_URL);
          if (r2.ok) {
            const d2 = await r2.json();
            const arr = Array.isArray(d2?.items) ? d2.items : (Array.isArray(d2) ? d2 : []);
            list = arr
              .filter((it: any) => {
                const text = `${it?.name ?? ''} ${it?.description ?? ''} ${it?.category ?? ''} ${(Array.isArray(it?.tags) ? it.tags : []).join(' ')}`.toLowerCase();
                const matchesQ = !q || text.includes(q.toLowerCase());
                const matchesCategory = !category || (it?.category ?? '').toLowerCase() === category.toLowerCase();
                return matchesQ && matchesCategory;
              })
              .slice(0, 200);
          }
        } catch {
          // ignorar errores del remoto y continuar con /api
        }
      }

      // 2) Si no hubo resultados del remoto, intentar el endpoint local (/api)
      if (!Array.isArray(list) || list.length === 0) {
        try {
          const apiUrl = `${new URL('/api/workflows/catalog', window.location.origin).toString()}${params.toString() ? `?${params.toString()}` : ''}`;
          const r = await fetch(apiUrl);
          if (r.ok) {
            const data = await r.json();
            const arr = Array.isArray(data?.items) ? data.items : [];
            list = arr;
          }
        } catch {
          // ignorar y dejar list vacío
        }
      }

      if (Array.isArray(list) && list.length > 0) {
        setError(null);
        setItems(list);
      } else {
        setItems([]);
        setError('Error cargando catálogo');
      }
    };

    loadRemoteFirst()
      .finally(() => setLoading(false));
  }, [unlocked, q, category]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
      {/* Respaldo del manifest RAW (visible solo desbloqueado) */}
      {unlocked && RAW_MANIFEST_URL ? (
        <div className="mt-2 text-xs text-gray-400">
          Respaldo: <a href={RAW_MANIFEST_URL} target="_blank" rel="noreferrer noopener" className="underline">Manifest RAW</a>
        </div>
      ) : null}
      {/* Botón Descargar todo */}
      {unlocked && items.length > 0 && (
        <div className="mb-4">
          <button onClick={downloadAll} disabled={isZipping} className="bg-[#00FF88] text-black px-4 py-2 rounded-lg text-sm font-bold font-inter">
            {isZipping ? 'Preparando ZIP…' : `Descargar todo (${items.length})`}
          </button>
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-white font-orbitron font-bold text-2xl">Catálogo de Workflows</h3>
        <p className="text-gray-300 font-inter">Accede a los JSON, tutoriales y soporte GPT</p>
      </div>

      {!unlocked && (
        <div className="rounded-2xl p-6 border border-[#00FF88]/30 bg-[#00FF88]/5 text-white">
          <p className="font-inter mb-3">Debes realizar la compra para desbloquear el catálogo.</p>
          <div className="flex items-center gap-3 mb-3">
            <Link to="/recuperar-acceso" className="text-xs font-inter underline text-[#00FF88]">
              ¿Perdiste el acceso? Recuperar acceso
            </Link>
          </div>
          <button onClick={onBuy} className="bg-[#00FF88] text-black px-4 py-2 rounded-lg text-sm font-bold font-inter">Comprar ahora • $17</button>
        </div>
      )}

      {unlocked && (
        <div className="space-y-6">
          {/* Filtros */}
          <div className="flex flex-col md:flex-row gap-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar…"
              className="flex-1 rounded-lg bg-gray-900/50 border border-[#00FF88]/30 px-4 py-2 text-white placeholder-gray-400"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg bg-gray-900/50 border border-[#00FF88]/30 px-4 py-2 text-white"
            >
              <option value="">Todas las categorías</option>
              <option value="Acquisition">Acquisition</option>
              <option value="Retention">Retention</option>
              <option value="Analytics">Analytics</option>
              <option value="Ops">Ops</option>
            </select>
          </div>

          {loading && (
            <div className="rounded-2xl p-6 border border-[#00FF88]/30 bg-[#00FF88]/5 text-white">Cargando catálogo…</div>
          )}
          {error && (
            <div className="rounded-2xl p-6 border border-red-500/40 bg-red-900/30 text-white">{error}</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((it) => (
              <div key={it.id} className="relative bg-gradient-to-br from-gray-900/40 via-gray-800/30 to-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border border-green-500/20 hover:border-green-400/40 transition-all duration-500">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-orbitron font-bold text-lg">{it.name}</h4>
                  <span className="text-xs text-[#00FF88] font-inter">{it.category || 'General'}</span>
                </div>
                {it.description && <p className="text-gray-300 text-sm mb-4 font-inter">{it.description}</p>}
                {Array.isArray(it.tags) && it.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {it.tags.slice(0, 5).map((t) => (
                      <span key={t} className="text-xs text-[#00FF88] bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-full px-2 py-1">{t}</span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                <a
                href={it.json_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#00FF88] text-black px-3 py-2 rounded-lg text-sm font-bold font-inter"
                onClick={() => trackEvent('catalog_download_json', { id: it.id, name: it.name, category: it.category })}
                >
                Descargar .json
                </a>
                   {it.readme_url && (
                    <a
                      href={it.readme_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm font-inter border border-[#00FF88]/30"
                      onClick={() => trackEvent('catalog_open_readme', { id: it.id, name: it.name, category: it.category })}
                    >
                      Ver README
                    </a>
                   )}
                   {it.assistant_url && (
                    <a
                      href={it.assistant_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#00FF88]/20 text-[#00FF88] px-3 py-2 rounded-lg text-sm font-inter border border-[#00FF88]/30"
                      onClick={() => trackEvent('catalog_open_gpt', { id: it.id, name: it.name, category: it.category })}
                    >
                      Abrir GPT
                    </a>
                   )}
                 </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LeadMagnet;