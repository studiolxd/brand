import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CodeBlock, CodeToken } from './CodeBlock';

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

  it('sin saltos de línea se detecta como una línea: fila, sin cabecera aparte', () => {
    const { container } = render(
      <CodeBlock copyable language="bash">https://ejemplo.com/x</CodeBlock>,
    );
    const root = container.querySelector('.code-block') as HTMLElement;
    expect(root).toHaveClass('code-block--single-line');
    expect(root.querySelector('.code-block__header')).toBeNull();
    expect(root.querySelector('.code-block__row')).not.toBeNull();
    expect(root.querySelector('.code-block__controls')).not.toBeNull();
  });

  it('con saltos de línea sigue siendo multilínea: cabecera arriba, código debajo', () => {
    const { container } = render(
      <CodeBlock copyable language="bash">{'línea uno\nlínea dos'}</CodeBlock>,
    );
    const root = container.querySelector('.code-block') as HTMLElement;
    expect(root).not.toHaveClass('code-block--single-line');
    expect(root.querySelector('.code-block__header')).not.toBeNull();
    expect(root.querySelector('.code-block__row')).toBeNull();
  });

  it('`singleLine` explícita gana a la detección automática', () => {
    const { container: unaLinea } = render(
      <CodeBlock singleLine={false} copyable>https://ejemplo.com/x</CodeBlock>,
    );
    expect(unaLinea.querySelector('.code-block')).not.toHaveClass('code-block--single-line');

    const { container: multilinea } = render(
      <CodeBlock singleLine copyable>{'línea uno\nlínea dos'}</CodeBlock>,
    );
    expect(multilinea.querySelector('.code-block')).toHaveClass('code-block--single-line');
  });

  it('con nodos ya resaltados (no cadena), por defecto es multilínea', () => {
    const { container } = render(
      <CodeBlock copyable>
        <span>const</span> a = 1;
      </CodeBlock>,
    );
    expect(container.querySelector('.code-block')).not.toHaveClass('code-block--single-line');
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

describe('CodeToken', () => {
  it('pone la clase base y la del tipo, y ningún estilo inline', () => {
    render(<CodeToken type="keyword">const</CodeToken>);
    const token = screen.getByText('const');
    expect(token.tagName).toBe('SPAN');
    expect(token).toHaveClass('code-block__token', 'code-block__token--keyword');
    expect(token.getAttribute('style')).toBeNull();
  });

  it('className se añade DESPUÉS de las clases propias', () => {
    render(<CodeToken type="string" className="propia">&apos;hola&apos;</CodeToken>);
    expect(screen.getByText("'hola'")).toHaveClass('code-block__token', 'code-block__token--string', 'propia');
  });

  it('reenvía atributos al span', () => {
    render(<CodeToken type="comment" data-testid="nota">// nota</CodeToken>);
    expect(screen.getByTestId('nota')).toHaveClass('code-block__token--comment');
  });
});
