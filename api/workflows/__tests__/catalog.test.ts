import { describe, it, expect, beforeEach, vi } from 'vitest'
import handler from '../catalog'
import type { VercelRequest, VercelResponse } from '@vercel/node'

function createReq(opts: Partial<VercelRequest> = {}): VercelRequest {
  return {
    method: 'GET',
    body: {},
    query: {},
    headers: {},
    ...opts,
  } as unknown as VercelRequest
}

function createRes() {
  const res: Partial<VercelResponse> & { statusCode: number; body: any; headers: Record<string, string> } = {
    statusCode: 200,
    body: undefined,
    headers: {},
    setHeader(name: string, value: string) { res.headers[name] = value },
    status(code: number) { res.statusCode = code; return res as VercelResponse },
    json(payload: any) { res.body = payload; return res as VercelResponse },
    send(payload: any) { res.body = payload; return res as VercelResponse },
  }
  return res as VercelResponse & { statusCode: number; body: any; headers: Record<string, string> }
}

describe('api/workflows/catalog', () => {
  const originalFetch = global.fetch
  const originalEnv = { ...process.env }

  beforeEach(() => {
    global.fetch = vi.fn()
    process.env = { ...originalEnv }
    delete process.env.WORKFLOWS_CATALOG_URL
  })

  it('returns fallback when no env var', async () => {
    const req = createReq({ method: 'GET' })
    const res = createRes()
    await handler(req, res)
    expect((res as any).statusCode).toBe(200)
    expect((res as any).body?.source).toBe('fallback')
    expect(Array.isArray((res as any).body?.items)).toBe(true)
  })

  it('returns remote data when fetch ok', async () => {
    process.env.WORKFLOWS_CATALOG_URL = 'https://example.com/catalog.json'
    ;(global.fetch as any).mockResolvedValueOnce({ ok: true, json: async () => ({ items: [{ id:'x', name:'n', json_url:'https://x', description:'', category:'General', tags:[], version:'1.0.0', n8n_version:'1.x' }], source:'remote' }) })
    const req = createReq({ method: 'GET' })
    const res = createRes()
    await handler(req, res)
    expect((res as any).statusCode).toBe(200)
    expect((res as any).body?.source).toBe('remote')
    expect((res as any).body?.items?.length).toBe(1)
  })

  it('returns fallback when fetch fails', async () => {
    process.env.WORKFLOWS_CATALOG_URL = 'https://example.com/catalog.json'
    ;(global.fetch as any).mockResolvedValueOnce({ ok: false, text: async () => 'err' })
    const req = createReq({ method: 'GET' })
    const res = createRes()
    await handler(req, res)
    expect((res as any).statusCode).toBe(200)
    expect((res as any).body?.source).toBe('fallback')
  })

  it('applies filters q and category', async () => {
    process.env.WORKFLOWS_CATALOG_URL = 'https://example.com/catalog.json'
    ;(global.fetch as any).mockResolvedValueOnce({ ok: true, json: async () => ({ items: [
      { id:'a', name:'Alpha', description:'', category:'General', tags:['tag'], json_url:'https://a', version:'1.0.0', n8n_version:'1.x' },
      { id:'b', name:'Beta', description:'', category:'Retention', tags:['tag'], json_url:'https://b', version:'1.0.0', n8n_version:'1.x' },
    ] }) })
    const req = createReq({ method: 'GET', query: { q: 'beta', category: 'retention' } as any })
    const res = createRes()
    await handler(req, res)
    expect((res as any).statusCode).toBe(200)
    expect((res as any).body?.items?.length).toBe(1)
    expect((res as any).body?.items?.[0]?.id).toBe('b')
  })
})