import { useEffect, useMemo, useRef, useState } from 'react';
import { z } from 'zod';

interface NewsletterFormProps {
  source: string;
  variant?: 'compact' | 'panel';
  showName?: boolean;
  className?: string;
  heading?: string;
  subcopy?: string;
  buttonLabel?: string;
  onSuccess?: () => void;
}

const emailSchema = z.string().email('Ingresá un email válido.');
const nameSchema = z
  .string()
  .trim()
  .max(80, 'Nombre demasiado largo')
  .optional();

export default function NewsletterForm({
  source,
  variant = 'compact',
  showName = false,
  className = '',
  heading,
  subcopy,
  buttonLabel = 'Suscribirme',
  onSuccess,
}: NewsletterFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const mountedAt = useRef<number>(Date.now());
  const gateRef = useRef<boolean>(false); // anti double-submit gate
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [invalidField, setInvalidField] = useState<'email' | 'name' | null>(null);

  // Debounce manual simple: evita múltiples envíos en una ventana corta
  const withGate = async (fn: () => Promise<void>) => {
    if (gateRef.current) return; // ignorar repetidos
    gateRef.current = true;
    try {
      await fn();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ocurrió un error al procesar el envío';
      // mostrar feedback accesible y no romper la interacción
      setError(message);
      // opcional: log para diagnóstico en desarrollo
      if (import.meta.env?.MODE !== 'test') {
        console.error('NewsletterForm submit error:', err);
      }
    } finally {
      setTimeout(() => { gateRef.current = false; }, 800);
    }
  };

  const isPanel = variant === 'panel';

  const containerClasses = useMemo(() => {
    if (isPanel) return 'space-y-4';
    return 'grid gap-2 sm:grid-cols-3';
  }, [isPanel]);

  const inputBase = 'w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF88]';
  const inputPanel = 'w-full px-4 py-3 bg-gray-800/50 border border-[#00FF88]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#00FF88] focus:ring-2 focus:ring-[#00FF88]/40 transition-colors';
  const buttonBase = 'w-full h-full min-h-[42px] px-4 py-2 rounded bg-[#00FF88] text-black font-semibold hover:opacity-90 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF88]';
  const buttonPanel = 'w-full bg-gradient-to-r from-[#00FF88] to-[#39FF14] text-black font-semibold py-3 px-4 rounded-xl hover:shadow-[0_0_30px_rgba(0,255,136,0.6)] transition-all disabled:opacity-60 disabled:cursor-not-allowed';

  useEffect(() => {
    setMsg(null);
    setError(null);
    setInvalidField(null);
  }, [email, name]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void withGate(async () => {
      setMsg(null);
      setError(null);

      // simple time-on-page anti-bot: mínimo 1500ms
      const spent = Date.now() - (mountedAt.current || Date.now());
      const minDelay = (import.meta.env?.MODE === 'test') ? 0 : 1500;
      if (spent < minDelay) {
        setError('Por favor, intentá nuevamente.');
        return;
      }

      // honeypot check
      if (honeypot.trim() !== '') {
        // Silenciosamente ignorar
        setMsg('');
        return;
      }

      // zod validation
      const emailParse = emailSchema.safeParse(email);
      const nameParse = nameSchema.safeParse(showName ? name : undefined);
      if (!emailParse.success) {
        setInvalidField('email');
        setError(emailParse.error.issues[0]?.message || 'Email inválido');
        emailRef.current?.focus();
        return;
      }
      if (!nameParse.success) {
        setInvalidField('name');
        setError(nameParse.error.issues[0]?.message || 'Nombre inválido');
        nameRef.current?.focus();
        return;
      }

      try {
        setSubmitting(true);
        const res = await fetch('/api/newsletter/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name: showName ? name : undefined, source })
        });
        if (!res.ok) throw new Error('No se pudo suscribir');
        setMsg('¡Listo! Revisá tu correo para confirmar la suscripción.');
        setEmail('');
        setName('');
        onSuccess?.();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Ocurrió un error al suscribirse';
        setError(message);
      } finally {
        setSubmitting(false);
      }
    });
  };

  const sectionA11yProps = heading ? { 'aria-labelledby': 'newsletter-heading' } : { 'aria-label': 'Formulario de newsletter' };

  return (
    <section {...sectionA11yProps} className={className}>
      {heading && (
        <h4 id="newsletter-heading" className={`${isPanel ? 'text-xl md:text-2xl' : 'text-white'} font-semibold mb-2 font-inter`}>{heading}</h4>
      )}
      {subcopy && (
        <p className={`${isPanel ? 'text-gray-300 mb-6' : 'text-[#CCCCCC] text-sm mb-3'}`}>{subcopy}</p>
      )}

      <form onSubmit={handleSubmit} className={containerClasses} aria-describedby="newsletter-result" aria-busy={submitting || undefined} noValidate>
        {/* Honeypot */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
          aria-hidden="true"
          name="website"
        />

        {showName && (
          <div className={isPanel ? '' : 'sm:col-span-1'}>
            <label htmlFor="nl-name" className={isPanel ? 'block text-sm font-medium text-gray-300 mb-1' : 'sr-only'}>Nombre</label>
            <input
              id="nl-name"
              name="name"
              ref={nameRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              aria-invalid={invalidField === 'name' || undefined}
              aria-errormessage="newsletter-result"
              className={isPanel ? inputPanel : inputBase}
            />
          </div>
        )}

        <div className={isPanel ? '' : 'sm:col-span-2'}>
          <label htmlFor="nl-email" className={isPanel ? 'block text-sm font-medium text-gray-300 mb-1' : 'sr-only'}>Email</label>
          <input
            id="nl-email"
            name="email"
            type="email"
            ref={emailRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            aria-invalid={invalidField === 'email' || undefined}
            aria-errormessage="newsletter-result"
            className={isPanel ? inputPanel : inputBase}
          />
        </div>

        <div className={isPanel ? '' : 'sm:col-span-1'}>
          <button
            type="submit"
            disabled={submitting}
            className={isPanel ? buttonPanel : buttonBase}
          >
            {submitting ? 'Enviando…' : buttonLabel}
          </button>
        </div>
      </form>

      <div
        id="newsletter-result"
        role={error ? 'alert' : 'status'}
        aria-live={error ? 'assertive' : 'polite'}
        className={`${isPanel ? 'text-sm' : 'mt-1 text-xs'} ${error ? 'text-red-400' : 'text-gray-300'}`}
      >
        {error ? error : msg}
      </div>
    </section>
  );
}