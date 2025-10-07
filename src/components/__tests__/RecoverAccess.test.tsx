import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import RecoverAccess from '../../components/RecoverAccess'

// Mock analytics
vi.mock('@/utils/analytics', () => ({ trackEvent: vi.fn() }))

// Helper to mock fetch
function mockFetchOnce(response: Partial<Response> & { json?: () => Promise<any> }) {
  global.fetch = vi.fn().mockResolvedValue({
    ok: response.ok ?? true,
    json: response.json ?? (async () => (response as any).body ?? {}),
  } as any)
}

describe('RecoverAccess component', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    global.fetch = vi.fn()
  })

  it('unlocks with API success on license submit', async () => {
    mockFetchOnce({ ok: true, json: async () => ({ unlocked: true }) })
    render(<RecoverAccess />)

    const input = screen.getByPlaceholderText('LICENSE-XXXX…-2025') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'LICENSE-' + 'a'.repeat(64) + '-2025' } })

    const btn = screen.getByText('Desbloquear con licencia')
    fireEvent.click(btn)

    await waitFor(() => {
      expect(localStorage.getItem('purchaseUnlocked')).toBe('true')
      expect(sessionStorage.getItem('purchaseUnlocked')).toBe('true')
      expect(screen.getByText(/Acceso desbloqueado por licencia/i)).toBeTruthy()
    })
  })

  it('falls back to demo unlock when API fails', async () => {
    mockFetchOnce({ ok: false, json: async () => ({ unlocked: false }) })
    render(<RecoverAccess />)

    const input = screen.getByPlaceholderText('LICENSE-XXXX…-2025') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'DEMO-ABCDEF-2025' } })

    const btn = screen.getByText('Desbloquear con licencia')
    fireEvent.click(btn)

    await waitFor(() => {
      expect(localStorage.getItem('purchaseUnlocked')).toBe('true')
      expect(screen.getByText(/modo demo/i)).toBeTruthy()
    })
  })

  it('validates magic link token on mount and unlocks', async () => {
    // Simular token en URL
    const url = new URL(window.location.href)
    url.searchParams.set('token', 'valid')
    Object.defineProperty(window, 'location', { value: { ...window.location, href: url.toString(), search: url.search } })

    mockFetchOnce({ ok: true, json: async () => ({ unlocked: true }) })

    render(<RecoverAccess />)

    await waitFor(() => {
      expect(localStorage.getItem('purchaseUnlocked')).toBe('true')
      expect(screen.getByText(/Acceso desbloqueado mediante Magic Link/i)).toBeTruthy()
    })
  })
})