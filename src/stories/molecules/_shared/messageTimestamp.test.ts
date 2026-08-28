import { describe, expect, it, vi, afterEach } from 'vitest';
import { formatMessageTimestamp } from './messageTimestamp';

describe('formatMessageTimestamp', () => {
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
    vi.restoreAllMocks();
  });

  it('no avisa con una marca de tiempo válida', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const result = formatMessageTimestamp('2026-08-27T14:32:00Z');

    expect(result).not.toBeNull();
    expect(warn).not.toHaveBeenCalled();
  });

  it('avisa por consola en desarrollo cuando no se puede interpretar', () => {
    process.env.NODE_ENV = 'development';
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const result = formatMessageTimestamp('14:32');

    expect(result).toBeNull();
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0]?.[0]).toContain('14:32');
  });

  it('no avisa en producción, aunque siga sin pintar nada', () => {
    process.env.NODE_ENV = 'production';
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const result = formatMessageTimestamp('14:32');

    expect(result).toBeNull();
    expect(warn).not.toHaveBeenCalled();
  });
});
