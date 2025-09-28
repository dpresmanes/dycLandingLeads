import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewsletterForm from '../NewsletterForm';

const advanceTime = async (ms: number) => {
  await new Promise((r) => setTimeout(r, ms));
};

describe('NewsletterForm', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renderiza inputs y botón', () => {
    render(<NewsletterForm source="/test" />);
    expect(screen.getByPlaceholderText('tu@email.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /suscribirme/i })).toBeInTheDocument();
  });

  it('valida email inválido', async () => {
    render(<NewsletterForm source="/test" />);
    fireEvent.change(screen.getByPlaceholderText('tu@email.com'), { target: { value: 'invalid' } });
    // respetar el anti-bot de tiempo mínimo
    await advanceTime(2000);
    fireEvent.click(screen.getByRole('button', { name: /suscribirme/i }));
    const msg = await screen.findByText(/Ingresá un email válido\.|email inválido/i);
    expect(msg).toBeInTheDocument();
  });

  it('envía exitosamente y limpia campos', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );
    render(<NewsletterForm source="/test" showName />);
    fireEvent.change(screen.getByPlaceholderText('Tu nombre'), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByPlaceholderText('tu@email.com'), { target: { value: 'juan@example.com' } });
    // esperar anti-bot mínimo
    await advanceTime(2000);
    fireEvent.click(screen.getByRole('button', { name: /suscribirme/i }));
    await waitFor(() => expect(screen.getByText(/listo/i)).toBeInTheDocument());
    expect(screen.getByPlaceholderText('Tu nombre')).toHaveValue('');
    expect(screen.getByPlaceholderText('tu@email.com')).toHaveValue('');
  });

  it('maneja error de API', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(new Response('error', { status: 500 }));
    render(<NewsletterForm source="/test" />);
    fireEvent.change(screen.getByPlaceholderText('tu@email.com'), { target: { value: 'juan@example.com' } });
    await advanceTime(2000);
    fireEvent.click(screen.getByRole('button', { name: /suscribirme/i }));
    await waitFor(() => expect(screen.getByText(/no se pudo suscribir/i)).toBeInTheDocument());
  });
});