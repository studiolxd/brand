import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within, waitFor } from 'storybook/test';
import { LoadingState } from './LoadingState';
import { AppShell } from '../../sections/AppShell/AppShell';
import { AppHeader } from '../../sections/AppHeader/AppHeader';
import { Sidebar } from '../../sections/Sidebar/Sidebar';
import { SidebarNav } from '../SidebarNav/SidebarNav';
import { Logo } from '../../atoms/Logo/Logo';
import { Modal } from '../Modal/Modal';
import { Button } from '../../atoms/Button/Button';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { navEntries } from '../../sections/AppShell/_datos';

const meta: Meta<typeof LoadingState> = {
  title: 'Molecules/LoadingState',
  component: LoadingState,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: { type: 'text' } },
    size: { control: { type: 'inline-radio' }, options: ['md', 'sm'] },
    fill: { control: { type: 'boolean' } },
    action: { control: false },
  },
  args: { size: 'md' },
};

export default meta;
type Story = StoryObj<typeof LoadingState>;

/** Talla `md`: una página o una zona. Solo se ve el girador; el texto lo oyen los lectores de pantalla. */
export const PorDefecto: Story = {};

/** Con su propio texto: lo que se espera, con puntos suspensivos. Sigue sin verse. */
export const ConTexto: Story = {
  name: 'Con texto propio',
  args: { label: 'Cargando revisión…' },
};

/** Talla `sm`: el cuerpo de un diálogo, una hoja, un popover o una barra lateral. */
export const Pequeno: Story = {
  name: 'Talla sm',
  args: { size: 'sm' },
};

/** Una salida mientras se espera: la acción sí se ve. */
export const ConAccion: Story = {
  name: 'Con acción',
  args: { label: 'Procesando el vídeo…', action: { label: 'Cancelar', onClick: fn() } },
};

export const PequenoConAccion: Story = {
  name: 'Talla sm con acción',
  args: { size: 'sm', label: 'Generando la imagen…', action: { label: 'Cancelar', onClick: fn() } },
};

/**
 * En una zona con alto definido, la caja la ocupa entera y centra el girador
 * en ella, en los dos ejes. Sin prop: `block-size: 100%` (y `flex: 1` si la
 * zona es una columna flex).
 */
export const EnZonaConAlto: Story = {
  name: 'En una zona con alto definido',
  render: (args) => (
    <div style={{ blockSize: '28rem', border: '1px dashed currentColor' }}>
      <LoadingState {...args} />
    </div>
  ),
};

/**
 * En un flujo sin alto (entre un párrafo y otro), el porcentaje no resuelve:
 * la caja reserva el mínimo de su talla y centra en él.
 */
export const EnFlujo: Story = {
  name: 'En un flujo sin alto',
  render: (args) => (
    <div>
      <Paragraph>Antes de la espera.</Paragraph>
      <LoadingState {...args} />
      <Paragraph>Después de la espera.</Paragraph>
    </div>
  ),
};

function EsperaEnDialogo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Abrir diálogo</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Elegir imagen">
        <LoadingState size="sm" label="Cargando imágenes…" />
      </Modal>
    </>
  );
}

/** En el cuerpo de un diálogo, talla `sm`. */
export const EnDialogo: Story = {
  name: 'En un diálogo',
  render: () => <EsperaEnDialogo />,
};

/**
 * A página completa (`fill`), el `loading.tsx` de una ruta cuya forma no se
 * conoce: la caja toma el alto visible bajo la cabecera del `AppShell` y
 * centra el girador en él, sin provocar desplazamiento — aunque llegue
 * envuelta en otros elementos del layout.
 */
export const PaginaCompleta: Story = {
  name: 'A página completa (fill)',
  parameters: { layout: 'fullscreen' },
  args: { fill: true },
  render: (args) => (
    <AppShell
      header={<AppHeader sidebarId="sidebar-espera" />}
      sidebar={
        <Sidebar id="sidebar-espera" logo={<Logo size="sm" />}>
          <SidebarNav entries={navEntries} defaultValue={['workspace']} />
        </Sidebar>
      }
    >
      <div data-testid="envoltorio">
        <LoadingState {...args} />
      </div>
    </AppShell>
  ),
};

export const TestPaginaCompleta: Story = {
  ...PaginaCompleta,
  name: 'Test — a página completa centra sin desplazamiento',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const espera = await canvas.findByRole('status');
    await expect(espera).toHaveClass('loading-state--fill');
    const contenido = canvasElement.querySelector('.app-shell__content') as HTMLElement;
    await waitFor(() => expect(contenido.scrollHeight).toBeLessThanOrEqual(contenido.clientHeight));
    // El girador queda en el centro vertical del hueco visible del contenido.
    const caja = contenido.getBoundingClientRect();
    const estilo = getComputedStyle(contenido);
    const arriba = caja.top + parseFloat(estilo.paddingTop);
    const abajo = caja.bottom - parseFloat(estilo.paddingBottom);
    const girador = espera.querySelector('.spinner')!.getBoundingClientRect();
    const centro = girador.top + girador.height / 2;
    await expect(Math.abs(centro - (arriba + abajo) / 2)).toBeLessThan(2);
  },
};

export const TestContrato: Story = {
  name: 'Test — anuncia una vez, texto oculto, reserva alto y centra',
  tags: ['!dev'],
  args: { label: 'Cargando revisión…', action: { label: 'Cancelar', onClick: fn() } },
  render: EnZonaConAlto.render,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const espera = await canvas.findByRole('status', { name: 'Cargando revisión…' });
    await expect(espera).toHaveAttribute('aria-busy', 'true');
    await expect(canvas.getAllByRole('status')).toHaveLength(1);
    await expect(canvas.getByText('Cargando revisión…')).toHaveClass('visually-hidden');

    // Ocupa la zona entera y el girador queda en su centro.
    const zona = espera.parentElement!.getBoundingClientRect();
    const caja = espera.getBoundingClientRect();
    await expect(Math.abs(caja.height - zona.height)).toBeLessThan(3);
    const girador = espera.querySelector('.spinner')!.getBoundingClientRect();
    const grupo = espera.querySelector('.button')!.getBoundingClientRect();
    const centroGrupo = (girador.top + grupo.bottom) / 2;
    await expect(Math.abs(centroGrupo - (caja.top + caja.height / 2))).toBeLessThan(2);

    await userEvent.click(canvas.getByRole('button', { name: 'Cancelar' }));
    await expect(args.action!.onClick).toHaveBeenCalled();
  },
};

export const TestEnFlujo: Story = {
  name: 'Test — en un flujo sin alto reserva el mínimo de la talla',
  tags: ['!dev'],
  render: (args) => (
    <div>
      <LoadingState {...args} data-testid="md" />
      <LoadingState {...args} size="sm" data-testid="sm" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const sonda = document.createElement('div');
    document.body.append(sonda);
    const mide = (token: string) => {
      sonda.style.blockSize = `var(${token})`;
      return sonda.getBoundingClientRect().height;
    };
    const md = canvasElement.querySelector('[data-testid="md"]')!.getBoundingClientRect().height;
    const sm = canvasElement.querySelector('[data-testid="sm"]')!.getBoundingClientRect().height;
    await expect(Math.round(md)).toBe(Math.round(mide('--loading-state-min-block-size')));
    await expect(Math.round(sm)).toBe(Math.round(mide('--loading-state-sm-min-block-size')));
    sonda.remove();
  },
};
