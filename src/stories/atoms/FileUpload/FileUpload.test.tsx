import { describe, it, expect } from 'vitest';
import { render as renderRTL, screen } from '@testing-library/react';
import { FileUpload } from './FileUpload';
import type { ReactNode } from 'react';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixture as ES } from '../../../../.storybook/brandMessagesFixture';

/**
 * Estas piezas ya no traen su castellano puesto: el cromo sale del catálogo.
 * Aquí el catálogo lo monta este envoltorio, que es lo que hace la aplicación
 * en su raíz. `rerender` lo reutiliza solo.
 */
const Catalogo = ({ children }: { children: ReactNode }) => (
  <BrandMessagesProvider messages={ES}>{children}</BrandMessagesProvider>
);

function render(ui: React.ReactElement) {
  return renderRTL(ui, { wrapper: Catalogo });
}


const archivo = new File(['xxx'], 'contrato.pdf', { type: 'application/pdf' });

describe('FileUpload — piezas del sistema', () => {
  it('la barra de progreso es el átomo ProgressBar', () => {
    render(<FileUpload progress={40} aria-label="Adjuntos" />);

    const barra = screen.getByRole('progressbar', { name: 'Progreso de subida' });
    expect(barra).toHaveAttribute('aria-valuenow', '40');
    // `aria-valuetext` solo lo pone ProgressBar: la barra propia no lo tenía
    expect(barra).toHaveAttribute('aria-valuetext', '40%');
    expect(barra.closest('.progress-bar')).not.toBeNull();
  });

  it('los iconos son el átomo Icon, no SVG sueltos', () => {
    const { container } = render(<FileUpload defaultValue={[archivo]} aria-label="Adjuntos" />);

    // el de la zona de arrastre y el de la fila
    expect(container.querySelectorAll('svg.icon').length).toBeGreaterThanOrEqual(2);
    expect(container.querySelectorAll('svg:not(.icon)')).toHaveLength(0);
    expect(screen.getByRole('button', { name: 'Eliminar contrato.pdf' }).querySelector('svg.icon')).not.toBeNull();
  });
});
