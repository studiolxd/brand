import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
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

describe('FileUpload — uploading', () => {
  it('girador dentro de la zona, aria-busy y espera anunciada con el texto del catálogo', () => {
    const { container } = render(<FileUpload uploading aria-label="Adjuntos" />);
    const input = screen.getByLabelText('Adjuntos');
    expect(input).toHaveAttribute('aria-busy', 'true');
    expect(input).toHaveAttribute('aria-disabled', 'true');
    expect(input).not.toBeDisabled();
    expect(container.querySelector('.file-upload__dropzone .spinner')).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelector('.file-upload__dropzone svg.icon')).toBeNull();
    const estado = screen.getByRole('status');
    expect(estado).toHaveTextContent('Cargando…');
    expect(estado).toHaveClass('visually-hidden');
    expect(estado).toHaveAttribute('aria-live', 'polite');
  });

  it('sin uploading no hay estado ni aria-busy', () => {
    render(<FileUpload aria-label="Adjuntos" />);
    expect(screen.queryByRole('status')).toBeNull();
    expect(screen.getByLabelText('Adjuntos')).not.toHaveAttribute('aria-busy');
  });

  it('no admite otro fichero (soltar, selector, quitar) y no pierde el foco', async () => {
    const onChange = vi.fn();
    const { container } = render(
      <FileUpload uploading defaultValue={[archivo]} onChange={onChange} aria-label="Adjuntos" />,
    );
    const input = screen.getByLabelText('Adjuntos') as HTMLInputElement;
    const zona = container.querySelector('.file-upload__dropzone') as HTMLElement;
    const clic = vi.spyOn(input, 'click');
    await userEvent.click(zona);
    expect(clic).not.toHaveBeenCalled();

    // Un clic en la zona no es lo que se vigila (un clic fuera de un control
    // siempre desenfoca): el foco que importa es el del teclado.
    input.focus();
    expect(input).toHaveFocus();

    const otro = new File(['y'], 'otro.pdf', { type: 'application/pdf' });
    const { fireEvent } = await import('@testing-library/react');
    fireEvent.drop(zona, { dataTransfer: { files: [otro] } });
    fireEvent.change(input, { target: { files: [otro] } });
    const quitar = screen.getByRole('button', { name: 'Eliminar contrato.pdf' });
    expect(quitar).toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(quitar);
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.queryByText('otro.pdf')).toBeNull();
    expect(screen.getByText('contrato.pdf')).toBeInTheDocument();
    expect(input).toHaveFocus();
  });

  it('uploadingLabel es el nombre de la espera, oculto por defecto', () => {
    const { container } = render(<FileUpload uploading uploadingLabel="Subiendo 2 de 5…" aria-label="Adjuntos" />);
    expect(screen.getByRole('status')).toHaveTextContent('Subiendo 2 de 5…');
    expect(container.querySelector('.file-upload__dropzone .file-upload__text')).toBeNull();
  });

  it('uploadingLabelVisible pinta el texto en la zona; la copia visible no se lee dos veces', () => {
    const { container } = render(
      <FileUpload uploading uploadingLabel="Subiendo 2 de 5…" uploadingLabelVisible aria-label="Adjuntos" />,
    );
    const zona = container.querySelector('.file-upload__dropzone') as HTMLElement;
    expect(zona).toHaveTextContent('Subiendo 2 de 5…');
    expect(zona).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('status')).toHaveTextContent('Subiendo 2 de 5…');
  });

  it('uploadingLabelVisible sin uploadingLabel propio no pinta el texto del catálogo', () => {
    const { container } = render(<FileUpload uploading uploadingLabelVisible aria-label="Adjuntos" />);
    expect(container.querySelector('.file-upload__dropzone .file-upload__text')).toBeNull();
    expect(screen.getByRole('status')).toHaveTextContent('Cargando…');
  });
});
