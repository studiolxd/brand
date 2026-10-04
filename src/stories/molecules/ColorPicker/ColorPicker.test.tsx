import { describe, it, expect, vi } from 'vitest';
import { render as renderRTL, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderToString } from 'react-dom/server';
import type { ReactNode } from 'react';
import { ColorPicker } from './ColorPicker';
import { ColorPickerField } from '../ColorPickerField/ColorPickerField';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixture as ES } from '../../../../.storybook/brandMessagesFixture';

const Catalogo = ({ children }: { children: ReactNode }) => (
  <BrandMessagesProvider messages={ES}>{children}</BrandMessagesProvider>
);

function render(ui: React.ReactElement) {
  return renderRTL(ui, { wrapper: Catalogo });
}

describe('ColorPicker', () => {
  it('suelto, el disparador toma su nombre del catálogo y lo describe el valor', () => {
    render(<ColorPicker value="#BAABFF" />);
    const boton = screen.getByRole('button', { name: 'Elegir color' });
    expect(boton).toHaveAccessibleDescription('Color actual: #baabff');
    expect(boton).toHaveAttribute('aria-haspopup', 'dialog');
  });

  it('sin color lo dice', () => {
    render(<ColorPicker aria-label="Color del texto" value={null} />);
    expect(screen.getByRole('button', { name: 'Color del texto' })).toHaveAccessibleDescription('Sin color');
  });

  it('el input oculto manda el hex normalizado', () => {
    const { container } = render(<ColorPicker name="acento" value="#FC0" />);
    expect(container.querySelector('input[name="acento"]')).toHaveValue('#ffcc00');
  });

  it('abre el panel y elegir un predefinido emite su hex', async () => {
    const onValueCommitted = vi.fn();
    render(
      <ColorPicker
        aria-label="Acento"
        defaultValue="#000000"
        presets={[{ color: '#BAABFF', title: 'Lavanda' }, { color: 'transparent', title: 'Fuera' }]}
        onValueCommitted={onValueCommitted}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Acento' }));
    const grupo = await screen.findByRole('group', { name: 'Colores predefinidos' });
    // Lo que no es hex no se ofrece.
    expect(screen.queryByRole('button', { name: 'Fuera' })).toBeNull();
    await userEvent.click(screen.getByRole('button', { name: 'Lavanda' }));
    expect(onValueCommitted).toHaveBeenLastCalledWith('#baabff');
    expect(grupo).toBeInTheDocument();
  });

  it('el área es un deslizador 2D con su valor', async () => {
    render(<ColorPicker aria-label="Acento" defaultValue="#bf6060" />);
    await userEvent.click(screen.getByRole('button', { name: 'Acento' }));
    const area = await screen.findByRole('slider', { name: 'Saturación y brillo' });
    expect(area).toHaveAttribute('aria-valuetext', 'Saturación 50 %, brillo 75 %');
    expect(area).toHaveAttribute('aria-valuenow', '50');
  });

  it('sin `alpha` no hay banda de opacidad ni se exige su texto', async () => {
    render(<ColorPicker aria-label="Acento" defaultValue="#11223380" />);
    await userEvent.click(screen.getByRole('button', { name: 'Acento' }));
    await screen.findByRole('dialog');
    expect(screen.queryByRole('slider', { name: 'Opacidad' })).toBeNull();
    expect(screen.getByRole('textbox', { name: 'Hexadecimal' })).toHaveValue('#112233');
  });

  it('el HTML del servidor no lleva ningún atributo `style`', () => {
    const html = renderToString(
      <BrandMessagesProvider messages={ES}>
        <ColorPicker aria-label="Acento" value="#ffcd00" />
      </BrandMessagesProvider>,
    );
    expect(html).toContain('fill="#ffcd00"');
    expect(html).not.toContain('style=');
  });
});

describe('ColorPickerField', () => {
  it('la etiqueta nombra el disparador y la ayuda lo describe', () => {
    render(<ColorPickerField label="Color de fondo" helperText="El de la portada" value="#ffffff" />);
    const boton = screen.getByRole('button', { name: 'Color de fondo' });
    expect(boton).toHaveAccessibleDescription('Color actual: #ffffff El de la portada');
  });

  it('un mensaje de error pone el disparador en error', () => {
    render(<ColorPickerField label="Color" errorMessage="Elige un color" value={null} />);
    expect(screen.getByRole('button', { name: 'Color' })).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Elige un color');
  });
});
