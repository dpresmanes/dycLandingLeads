import { describe, it, expect } from 'vitest';
import sanitizeHtml, { type IOptions } from 'sanitize-html';

const sanitizeOptions: IOptions = {
  allowedTags: ['h2','h3','h4','h5','h6','p','blockquote','ul','ol','li','strong','em','code','pre','a','img','table','thead','tbody','tr','th','td','hr','br','span'],
  allowedAttributes: {
    a: ['href','name','target','rel'],
    img: ['src','alt','title','width','height'],
    code: ['class'],
    span: ['class'],
    '*': ['class']
  },
  allowedSchemes: ['http','https','mailto']
};

describe('sanitize options (cliente)', () => {
  it('elimina scripts y mantiene contenido permitido', () => {
    const input = '<h2>Título</h2><script>alert(1)</script><p>Texto <a href="https://x.com">link</a></p>';
    const out = sanitizeHtml(input, sanitizeOptions);
    expect(out).toContain('<h2>Título</h2>');
    expect(out).toContain('<p>Texto <a href="https://x.com">link</a></p>');
    expect(out).not.toContain('<script>');
  });

  it('remueve atributos peligrosos', () => {
    const input = '<a href="javascript:alert(1)" onclick="x()">x</a>';
    const out = sanitizeHtml(input, sanitizeOptions);
    expect(out).toBe('<a>x</a>');
  });
});