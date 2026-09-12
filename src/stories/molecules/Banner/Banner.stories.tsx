import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Banner } from './Banner';
import { Button } from '../../atoms/Button/Button';
import { SOLO_OSCURO } from '../../utils/chromaticModes';

const meta: Meta<typeof Banner> = {
  title: 'Molecules/Banner',
  component: Banner,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      control: { type: 'inline-radio' },
      options: ['info', 'warning'],
      description: 'Intención de la barra.',
    },
    actions: { control: false },
    onDismiss: { control: false },
  },
  args: {
    variant: 'info',
    children: 'Estás viendo la aplicación como ana.perez@studiolxd.com.',
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

/**
 * `info` es el default: relleno prusia. Para el estado de la sesión que no es
 * un problema, solo un hecho que conviene tener delante.
 */
export const PorDefecto: Story = {};

/**
 * `warning` es el relleno de aviso del sistema: el amarillo de marca con tinta
 * prusia. Para cuando el estado sí pide atención — una cuenta a punto de
 * caducar, un mantenimiento con hora.
 */
export const Aviso: Story = {
  args: {
    variant: 'warning',
    children: 'El mantenimiento previsto empieza hoy a las 22:00 y durará una hora.',
  },
};

/**
 * Con acción: la ranura `actions` recibe un `Button` del sistema. Sobre el
 * relleno prusia el botón lee en su cara clara sin configurarlo, porque la
 * barra se declara superficie oscura.
 */
export const ConAccion: Story = {
  name: 'Con acción',
  args: {
    actions: <Button variant="outline" size="sm">Dejar de suplantar</Button>,
  },
};

/**
 * Con cierre: pasar `onDismiss` pinta el aspa. La barra **no se oculta sola** —
 * avisa, y la aplicación decide si sigue en pantalla.
 */
export const ConCierre: Story = {
  name: 'Con cierre',
  args: {
    actions: <Button variant="outline" size="sm">Dejar de suplantar</Button>,
    onDismiss: fn(),
  },
};

/** El aviso, con acción y cierre: el aspa se fija a la tinta del rol. */
export const AvisoConCierre: Story = {
  name: 'Aviso con cierre',
  args: {
    variant: 'warning',
    children: 'El mantenimiento previsto empieza hoy a las 22:00 y durará una hora.',
    actions: <Button variant="outline" size="sm">Ver detalles</Button>,
    onDismiss: fn(),
  },
};

/**
 * En superficie oscura. `info` mantiene el relleno prusia en las dos
 * superficies —es autocontenido— y es su filete blanco el que dibuja el canto
 * cuando la página ya es oscura. El aviso no cambia: su relleno es universal.
 */
export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark', chromatic: SOLO_OSCURO },
  args: {
    actions: <Button variant="outline" size="sm">Dejar de suplantar</Button>,
    onDismiss: fn(),
  },
};

/** Test: rol, live region, variante por defecto y reenvío de props. */
export const Contrato: Story = {
  name: 'Test — rol, variante y paso de props',
  tags: ['!dev'],
  render: () => (
    <>
      <Banner data-uso="prueba" className="extra">Por defecto</Banner>
      <Banner variant="warning" role="alert" aria-live="assertive">Aviso</Banner>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const porDefecto = canvas.getByText('Por defecto').parentElement!;
    await expect(porDefecto).toHaveAttribute('role', 'status');
    await expect(porDefecto).toHaveAttribute('aria-live', 'polite');
    await expect(porDefecto).toHaveClass('banner', 'banner--info', 'surface-dark', 'extra');
    await expect(porDefecto).toHaveAttribute('data-uso', 'prueba');
    await expect(porDefecto.className.trim().endsWith('extra')).toBe(true);

    // El aviso es el único relleno claro: no se declara superficie oscura.
    const aviso = canvas.getByText('Aviso').parentElement!;
    await expect(aviso).toHaveClass('banner', 'banner--warning');
    await expect(aviso).not.toHaveClass('surface-dark');
    await expect(aviso).toHaveAttribute('role', 'alert');
    await expect(aviso).toHaveAttribute('aria-live', 'assertive');
  },
};

const onDismissSpy = fn();

/** Test: el aspa solo aparece con `onDismiss`, y la barra no se oculta sola. */
export const ContratoCierre: Story = {
  name: 'Test — cierre controlado',
  tags: ['!dev'],
  render: () => (
    <>
      <Banner>Sin cierre</Banner>
      <Banner onDismiss={onDismissSpy} dismissLabel="Dejar de suplantar">Con cierre</Banner>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    onDismissSpy.mockClear();
    await expect(canvas.queryByRole('button', { name: 'Descartar aviso' })).toBeNull();

    const aspa = canvas.getByRole('button', { name: 'Dejar de suplantar' });
    await userEvent.click(aspa);
    await expect(onDismissSpy).toHaveBeenCalled();
    // Controlada: sigue en pantalla, quien decide es la aplicación.
    await expect(canvas.getByText('Con cierre')).toBeInTheDocument();
  },
};
