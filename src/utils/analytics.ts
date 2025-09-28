export type TrackParams = Record<string, unknown>;

// Lightweight analytics bridge: safely dispatches events to GA4 (gtag) and/or GTM (dataLayer)
// Falls back to console in development if no analytics is configured
export function trackEvent(name: string, params: TrackParams = {}): void {
  try {
    type AnalyticsWindow = Window & {
      dataLayer?: unknown[];
      gtag?: (...args: unknown[]) => void;
    };
    const w = window as unknown as AnalyticsWindow;
    const enriched = {
      pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
      ts: Date.now(),
      ...params,
    };

    // Prefer GTM dataLayer to avoid double-sending when GTM and GA4 coexist
    if (Array.isArray(w?.dataLayer)) {
      w.dataLayer.push({ event: name, ...enriched });
    } else if (typeof w?.gtag === 'function') {
      // Fallback: send directly to GA4 via gtag only if dataLayer is not present
      w.gtag('event', name, enriched);
    }

    // Dev fallback for visibility when no analytics provider is present
    const isProd = typeof import.meta !== 'undefined' && import.meta.env.MODE === 'production';
    if (!isProd && typeof w?.gtag !== 'function' && !Array.isArray(w?.dataLayer)) {
      console.log('[trackEvent]', name, enriched);
    }
  } catch {
    // Silently ignore tracking errors to avoid impacting UX
  }
}