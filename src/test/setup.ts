import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';

// Limpiar después de cada test
afterEach(() => {
  cleanup();
});

// Definir dataLayer en el objeto Window para los tests
declare global {
  interface Window {
    dataLayer?: any[]
  }
}

// Reiniciar dataLayer entre pruebas para evitar contaminación de estado
beforeEach(() => {
  const w = window as any;
  w.dataLayer = [];
});

// Mock de IntersectionObserver para tests
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })),
});

// Mock de ResizeObserver para tests
Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })),
});

// Mock de matchMedia para tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// URL mocks para JSDOM (no sobreescribir el constructor)
try {
  const gURL = (globalThis as any).URL
  if (gURL) {
    if (typeof gURL.createObjectURL !== 'function') {
      Object.defineProperty(gURL, 'createObjectURL', {
        writable: true,
        configurable: true,
        value: vi.fn(() => 'blob:mock'),
      })
    } else {
      gURL.createObjectURL = vi.fn(() => 'blob:mock')
    }
    if (typeof gURL.revokeObjectURL !== 'function') {
      Object.defineProperty(gURL, 'revokeObjectURL', {
        writable: true,
        configurable: true,
        value: vi.fn(() => {}),
      })
    } else {
      gURL.revokeObjectURL = vi.fn(() => {})
    }
  }
} catch {}

// Evitar navegación en JSDOM al hacer click en <a>
try {
  const proto = (window as any).HTMLAnchorElement?.prototype
  if (proto) {
    Object.defineProperty(proto, 'click', {
      writable: true,
      configurable: true,
      value: vi.fn(),
    })
  }
} catch {}