import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CodeBlock } from './CodeBlock';

function mockClipboard(writeText: (text: string) => Promise<void>) {
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText },
  });
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('CodeBlock', () => {
  it('copia el texto plano del código, también con nodos resaltados', async () => {
    const writeText = vi.fn(async () => {});
    mockClipboard(writeText);

    render(
      <CodeBlock copyable language="ts">
        <span>const</span> a = 1;
      </CodeBlock>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Copiar código' }));
    expect(writeText).toHaveBeenCalledWith('const a = 1;');
  });

  it('anuncia el copiado por una región live sin cambiar el nombre del botón', async () => {
    mockClipboard(async () => {});
    render(<CodeBlock copyable>npm i</CodeBlock>);

    expect(screen.getByRole('status')).toHaveTextContent('');
    const boton = screen.getByRole('button', { name: 'Copiar código' });
    await userEvent.click(boton);

    expect(screen.getByRole('status')).toHaveTextContent('Copiado');
    expect(boton).toHaveAccessibleName('Copiar código');
  });

  it('un portapapeles que falla no rompe el componente ni anuncia copiado', async () => {
    mockClipboard(async () => { throw new Error('sin permiso'); });
    render(<CodeBlock copyable>npm i</CodeBlock>);

    await userEvent.click(screen.getByRole('button', { name: 'Copiar código' }));
    expect(screen.getByRole('status')).toHaveTextContent('');
    expect(screen.getByText('npm i')).toBeInTheDocument();
  });

  it('el área de código es una región focalizable con nombre accesible', () => {
    render(<CodeBlock language="bash">ls</CodeBlock>);
    const region = screen.getByRole('region', { name: 'Bloque de código bash' });
    expect(region.tagName).toBe('PRE');
    expect(region).toHaveAttribute('tabindex', '0');
  });

  it('las etiquetas se traducen por prop', async () => {
    mockClipboard(async () => {});
    render(
      <CodeBlock copyable language="ts" copyLabel="Copy code" copiedLabel="Copied" codeLabel={(l) => `${l} code`}>
        ls
      </CodeBlock>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Copy code' }));
    expect(screen.getByRole('status')).toHaveTextContent('Copied');
    expect(screen.getByRole('region', { name: 'ts code' })).toBeInTheDocument();
  });
});
