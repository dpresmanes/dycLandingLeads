import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

const CATALOG_URL = process.env.WORKFLOWS_CATALOG_URL;

// Schema for catalog manifest items
const WorkflowItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional().default(''),
  category: z.string().optional().default('General'),
  tags: z.array(z.string()).optional().default([]),
  json_url: z.string().url(),
  readme_url: z.string().url().optional(),
  assistant_url: z.string().url().optional(),
  version: z.string().optional().default('1.0.0'),
  n8n_version: z.string().optional().default('1.x'),
});

const CatalogSchema = z.object({
  source: z.string().optional(),
  updated_at: z.string().optional(),
  items: z.array(WorkflowItemSchema),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CDN/edge cache for 60s, SWR 10min
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=600');

  // Optional filters
  const q = (req.query?.q as string | undefined)?.toLowerCase() ?? '';
  const category = (req.query?.category as string | undefined)?.toLowerCase() ?? '';

  // Fallback catalog with sample items
  const fallbackCatalog = {
    source: 'fallback',
    updated_at: new Date().toISOString(),
    items: [
      {
        id: 'lead-capture-google-sheets',
        name: 'Lead Capture a Google Sheets',
        description: 'Captura leads desde formularios y los guarda en Google Sheets con notificación por email.',
        category: 'Acquisition',
        tags: ['Leads', 'Sheets', 'Email'],
        json_url: 'https://raw.githubusercontent.com/example/fork/main/workflows/lead-capture/workflow.json',
        readme_url: 'https://raw.githubusercontent.com/example/fork/main/workflows/lead-capture/README.md',
        assistant_url: 'https://chat.openai.com/g/gpt-example-lead-capture',
        version: '1.0.0',
        n8n_version: '1.x',
      },
      {
        id: 'abandoned-cart-recovery',
        name: 'Recupero de Carritos Abandonados',
        description: 'Detecta carritos abandonados y envía recordatorios por email/WhatsApp.',
        category: 'Retention',
        tags: ['Ecommerce', 'WhatsApp', 'Email'],
        json_url: 'https://raw.githubusercontent.com/example/fork/main/workflows/abandoned-cart/workflow.json',
        readme_url: 'https://raw.githubusercontent.com/example/fork/main/workflows/abandoned-cart/README.md',
        assistant_url: 'https://chat.openai.com/g/gpt-example-abandoned-cart',
        version: '1.0.0',
        n8n_version: '1.x',
      },
    ],
  };

  try {
    if (!CATALOG_URL) {
      const filtered = applyFilters(fallbackCatalog.items, q, category);
      return res.status(200).json({ ...fallbackCatalog, items: filtered });
    }

    const resp = await fetch(CATALOG_URL, { headers: { 'Accept': 'application/json' } });
    if (!resp.ok) {
      const filtered = applyFilters(fallbackCatalog.items, q, category);
      return res.status(200).json({ ...fallbackCatalog, items: filtered });
    }

    const data = await resp.json();
    const parsed = CatalogSchema.safeParse(data);
    if (!parsed.success) {
      const filtered = applyFilters(fallbackCatalog.items, q, category);
      return res.status(200).json({ ...fallbackCatalog, items: filtered });
    }

    const filtered = applyFilters(parsed.data.items, q, category);
    return res.status(200).json({ source: parsed.data.source ?? 'remote', updated_at: parsed.data.updated_at, items: filtered });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.error('catalog error', message);
    const filtered = applyFilters(fallbackCatalog.items, q, category);
    return res.status(200).json({ ...fallbackCatalog, items: filtered });
  }
}

function applyFilters(items: z.infer<typeof WorkflowItemSchema>[], q: string, category: string) {
  return items.filter((it) => {
    const matchesQ = !q || `${it.name} ${it.description} ${it.category} ${it.tags?.join(' ')}`.toLowerCase().includes(q);
    const matchesCategory = !category || it.category.toLowerCase() === category;
    return matchesQ && matchesCategory;
  }).slice(0, 200);
}