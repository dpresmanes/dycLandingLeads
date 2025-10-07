import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

// Mock del módulo de analytics ANTES de importar el componente
vi.mock('@/utils/analytics', () => ({
  trackEvent: (event: string, payload?: any) => {
    const w = window as any
    if (!w.dataLayer) w.dataLayer = []
    w.dataLayer.push({ event, ...(payload || {}) })
  }
}))
import * as analytics from '@/utils/analytics'

// Mock JSZip ANTES de importar el componente para asegurar que downloadAll sea rápido
vi.mock('jszip', () => {
  class MockZip {
    private files: Record<string, any> = {}
    folder(name: string) { return this }
    file(name: string, data: any) { this.files[name] = data }
    async generateAsync(_opts: any) { return new Blob(['zip']) }
  }
  return { default: MockZip }
})

import LeadMagnet from '../LeadMagnet'

function setEnvCatalog(url?: string) {
  // @ts-expect-error set test env
  const meta = import.meta as any
  meta.env = { ...(meta.env || {}), VITE_WORKFLOWS_CATALOG_URL: url }
}

describe('LeadMagnet Catalog UI', () => {
  beforeEach(() => {
    try { localStorage.clear(); sessionStorage.clear(); } catch {}
    vi.clearAllMocks()
    ;(window as any).dataLayer = []
    global.fetch = vi.fn()
    ;(globalThis as any).URL.createObjectURL = vi.fn(() => 'blob:mock')
    ;(globalThis as any).URL.revokeObjectURL = vi.fn(() => {})
  })

  it('muestra el bloque de gating y el link de recuperar acceso cuando está bloqueado', async () => {
    setEnvCatalog(undefined)
    render(<MemoryRouter><LeadMagnet /></MemoryRouter>)
    expect(await screen.findByText(/Debes realizar la compra/)).toBeInTheDocument()
    const link = screen.getByText(/Recuperar acceso/i)
    expect(link).toHaveAttribute('href', '/recuperar-acceso')
  })

  it('muestra Manifest RAW cuando está desbloqueado y hay VITE_WORKFLOWS_CATALOG_URL', async () => {
    setEnvCatalog('http://example.com/catalog.json')
    try { localStorage.setItem('purchaseUnlocked', 'true') } catch {}
    ;(global.fetch as any).mockResolvedValueOnce({ ok: true, json: async () => ({ items: [
      { id: 'acq', name: 'Acquisition Flow', category: 'Acquisition', tags: [], json_url: 'http://localhost/examples/acq.json' }
    ] }) })
    render(<MemoryRouter><LeadMagnet /></MemoryRouter>)
    expect(await screen.findByText('Acquisition Flow')).toBeInTheDocument()
    const manifestLink = screen.getByText(/Manifest RAW/i).closest('a')!
    const href = manifestLink.getAttribute('href')!
    expect(href.endsWith('/catalog.json')).toBe(true)
  })

  it('aplica filtros q y category sobre el manifest remoto', async () => {
    setEnvCatalog('http://example.com/catalog.json')
    try { localStorage.setItem('purchaseUnlocked', 'true') } catch {}
    ;(global.fetch as any).mockResolvedValueOnce({ ok: true, json: async () => ({ items: [
      { id: 'a', name: 'Alpha', category: 'Analytics', tags: [], json_url: 'http://localhost/a.json' },
      { id: 'b', name: 'Beta', category: 'Retention', tags: [], json_url: 'http://localhost/b.json' },
    ] }) })
    render(<MemoryRouter><LeadMagnet /></MemoryRouter>)
    expect(await screen.findByText('Alpha')).toBeInTheDocument()
    expect(screen.getByText('Beta')).toBeInTheDocument()
    // Nuevas llamadas de fetch cuando cambian los filtros (q y category)
    ;(global.fetch as any).mockResolvedValueOnce({ ok: true, json: async () => ({ items: [
      { id: 'a', name: 'Alpha', category: 'Analytics', tags: [], json_url: 'http://localhost/a.json' },
      { id: 'b', name: 'Beta', category: 'Retention', tags: [], json_url: 'http://localhost/b.json' },
    ] }) })
    ;(global.fetch as any).mockResolvedValueOnce({ ok: true, json: async () => ({ items: [
      { id: 'a', name: 'Alpha', category: 'Analytics', tags: [], json_url: 'http://localhost/a.json' },
      { id: 'b', name: 'Beta', category: 'Retention', tags: [], json_url: 'http://localhost/b.json' },
    ] }) })
    const search = screen.getByPlaceholderText('Buscar…') as HTMLInputElement
    const select = screen.getByDisplayValue('Todas las categorías') as HTMLSelectElement
    fireEvent.change(search, { target: { value: 'beta' } })
    fireEvent.change(select, { target: { value: 'Retention' } })
    await waitFor(() => {
      expect(screen.queryByText('Alpha')).not.toBeInTheDocument()
      expect(screen.getByText('Beta')).toBeInTheDocument()
    })
  })

  it('hace fallback al endpoint /api cuando falla el remoto', async () => {
    setEnvCatalog('http://example.com/catalog.json')
    try { localStorage.setItem('purchaseUnlocked', 'true') } catch {}
    ;(global.fetch as any)
      .mockResolvedValueOnce({ ok: false })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ items: [
        { id: 'x', name: 'Fallback Item', category: 'Ops', json_url: 'http://localhost/x.json' }
      ] }) })
    render(<MemoryRouter><LeadMagnet /></MemoryRouter>)
    expect(await screen.findByText('Fallback Item')).toBeInTheDocument()
  })

  it('muestra error cuando fallan remoto y /api', async () => {
    setEnvCatalog('http://example.com/catalog.json')
    try { localStorage.setItem('purchaseUnlocked', 'true') } catch {}
    ;(global.fetch as any)
      .mockResolvedValueOnce({ ok: false })
      .mockResolvedValueOnce({ ok: false })
    render(<MemoryRouter><LeadMagnet /></MemoryRouter>)
    expect(await screen.findByText('Error cargando catálogo')).toBeInTheDocument()
  })

  it('Descargar todo genera el ZIP y emite trackEvent', async () => {
    setEnvCatalog('http://example.com/catalog.json')
    try { localStorage.setItem('purchaseUnlocked', 'true') } catch {}
    ;(global.fetch as any).mockResolvedValueOnce({ ok: true, json: async () => ({ items: [
      { id: 'one', name: 'One', category: 'Analytics', json_url: 'http://localhost/one.json' },
      { id: 'two', name: 'Two', category: 'Ops', json_url: 'http://localhost/two.json' },
    ] }) })
    // Mock de descargas individuales: devolver objetos con arrayBuffer()
    const mockBlob = { arrayBuffer: async () => new ArrayBuffer(2) }
    ;(global.fetch as any)
      .mockResolvedValueOnce({ ok: true, blob: async () => mockBlob })
      .mockResolvedValueOnce({ ok: true, blob: async () => mockBlob })

    render(<MemoryRouter><LeadMagnet /></MemoryRouter>)
    expect(await screen.findByText('One')).toBeInTheDocument()
    const btn = screen.getByRole('button', { name: /Descargar todo/ })
    fireEvent.click(btn)
    await waitFor(() => {
      expect((window as any).dataLayer).toEqual(expect.arrayContaining([
        expect.objectContaining({ event: 'catalog_download_all', count: 2 })
      ]))
    })
  })

  it('Descargar .json emite trackEvent por cada item', async () => {
    setEnvCatalog('http://example.com/catalog.json')
    try { localStorage.setItem('purchaseUnlocked', 'true') } catch {}
    ;(global.fetch as any).mockResolvedValueOnce({ ok: true, json: async () => ({ items: [
      { id: 'one', name: 'One', category: 'Analytics', json_url: 'http://localhost/one.json' },
    ] }) })
    render(<MemoryRouter><LeadMagnet /></MemoryRouter>)
    expect(await screen.findByText('One')).toBeInTheDocument()
    const downloadLink = screen.getByText('Descargar .json')
    fireEvent.click(downloadLink)
    await waitFor(() => {
      expect((window as any).dataLayer).toEqual(expect.arrayContaining([
        expect.objectContaining({ event: 'catalog_download_json', id: 'one', name: 'One', category: 'Analytics' })
      ]))
    })
  })
})

vi.mock('../LeadMagnetModal', async () => {
  const React = await import('react')
  return {
    default: ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
      if (!isOpen) return null as any
      return React.createElement('div', { 'data-testid': 'modal' },
        React.createElement('button', { onClick: () => {
          try { sessionStorage.setItem('purchaseUnlocked', 'true') } catch {}
          onClose()
        } }, 'Confirmar Compra')
      )
    }
  }
})