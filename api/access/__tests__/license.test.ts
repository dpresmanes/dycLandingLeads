import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import handler from '../license'
import type { VercelRequest, VercelResponse } from '@vercel/node'

function createReq(opts: Partial<VercelRequest> = {}): VercelRequest {
  return {
    method: 'POST',
    body: {},
    query: {},
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

const ORIGINAL_ENV = { ...process.env }

describe('api/access/license', () => {
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV }
    delete process.env.DEMO_LICENSE_KEY
  })
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV }
  })

  it('rejects non-POST method', async () => {
    const req = createReq({ method: 'GET' })
    const res = createRes()
    await handler(req, res)
    expect((res as any).statusCode).toBe(405)
    expect((res as any).body).toEqual({ error: 'Method Not Allowed' })
  })

  it('fails when license missing', async () => {
    const req = createReq({ method: 'POST', body: {} })
    const res = createRes()
    await handler(req, res)
    expect((res as any).statusCode).toBe(400)
    expect((res as any).body).toEqual({ error: 'Falta clave de licencia' })
  })

  it('accepts demo license from env', async () => {
    process.env.DEMO_LICENSE_KEY = 'LICENSE-DEMO-2025'
    const req = createReq({ method: 'POST', body: { license: 'LICENSE-DEMO-2025' } })
    const res = createRes()
    await handler(req, res)
    expect((res as any).statusCode).toBe(200)
    expect((res as any).body).toEqual({ unlocked: true })
  })

  it('accepts license with valid signature shape', async () => {
    const key = `LICENSE-${'a'.repeat(64)}-2025`
    const req = createReq({ method: 'POST', body: { license: key } })
    const res = createRes()
    await handler(req, res)
    expect((res as any).statusCode).toBe(200)
    expect((res as any).body).toEqual({ unlocked: true })
  })

  it('rejects invalid license', async () => {
    const req = createReq({ method: 'POST', body: { license: 'INVALID' } })
    const res = createRes()
    await handler(req, res)
    expect((res as any).statusCode).toBe(401)
    expect((res as any).body).toEqual({ error: 'Licencia inválida' })
  })
})