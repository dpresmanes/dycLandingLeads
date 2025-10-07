import { describe, it, expect } from 'vitest'
import handler from '../magic'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import crypto from 'crypto'

function base64url(input: Buffer | string) {
  return Buffer.from(input).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

function signHS256(payload: any, secret: string) {
  const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = base64url(JSON.stringify(payload))
  const data = `${header}.${body}`
  const signature = base64url(crypto.createHmac('sha256', secret).update(data).digest())
  return `${header}.${body}.${signature}`
}

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

describe('api/access/magic', () => {
  it('rejects non-GET method', async () => {
    const req = createReq({ method: 'POST' })
    const res = createRes()
    await handler(req, res)
    expect((res as any).statusCode).toBe(405)
    expect((res as any).body).toEqual({ error: 'Method Not Allowed' })
  })

  it('fails when token is missing', async () => {
    const req = createReq({ method: 'GET' })
    const res = createRes()
    await handler(req, res)
    expect((res as any).statusCode).toBe(400)
    expect((res as any).body).toEqual({ error: 'Falta token' })
  })

  it('rejects invalid signature', async () => {
    const req = createReq({ method: 'GET', query: { token: 'a.b.c' } as any })
    const res = createRes()
    await handler(req, res)
    expect((res as any).statusCode).toBe(401)
    expect((res as any).body?.error).toBe('Token inválido')
  })

  it('accepts valid token and sets cookie', async () => {
    const secret = 'demo-secret-change'
    const token = signHS256({ sub: '123', exp: Math.floor(Date.now()/1000)+60 }, secret)
    const req = createReq({ method: 'GET', query: { token } as any })
    const res = createRes()
    await handler(req, res)
    expect((res as any).statusCode).toBe(200)
    expect((res as any).body).toEqual({ unlocked: true })
    const setCookie = (res as any).headers['Set-Cookie']
    expect(setCookie).toBeTruthy()
    expect(setCookie).toContain('purchaseUnlocked=true')
  })
})