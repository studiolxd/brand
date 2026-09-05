import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { StatusPage, StatusBoard, type StatusBoardProps } from './StatusPage';
import { APLICACIONES, sinResponder, type SaludConjunto } from './_datos';

interface Args {
  estado: StatusBoardProps['estado'];
  salud: SaludConjunto;
  caidas: string[];
  theme: 'light' | 'dark';
}

function Estado({ estado, salud, caidas, theme }: Args) {
  return (
    <StatusPage theme={theme}>
      <StatusBoard
        estado={estado}
        salud={salud}
        aplicaciones={caidas.length === 0 ? APLICACIONES : sinResponder(caidas, salud === 'down' ? 214 : 96)}
      />
    </StatusPage>
  );
}

const TODAS = APLICACIONES.map((aplicacion) => aplicacion.id);

const meta: Meta<typeof Estado> = {
  title: 'Pages/Estado del servicio',
  component: Estado,
  parameters: { layout: 'fullscreen' },
  args: { estado: 'listo', salud: 'operational', caidas: [], theme: 'light' },
  argTypes: {
    estado: { control: { type: 'radio' }, options: ['listo', 'cargando', 'incomunicado'], description: 'Cómo fue la consulta al monitor: contestada, pidiéndose, o sin respuesta.' },
    salud: { control: { type: 'radio' }, options: ['operational', 'degraded', 'down', 'unknown'], description: 'Cómo está el conjunto: es lo que decide el resumen de arriba.' },
    caidas: { control: { type: 'check' }, options: TODAS, description: 'Las aplicaciones que no responden.' },
    theme: { control: { type: 'radio' }, options: ['light', 'dark'], description: 'Tema que enseña el conmutador.' },
  },
};
export default meta;
type Story = StoryObj<typeof Estado>;

/** Todo responde: el resumen en verde y treinta días con las incidencias ya pasadas. */
export const TodoOperativo: Story = { name: 'Todo operativo' };

/** Dos aplicaciones no responden y el resto sigue: el resumen lo dice y solo sus dos tiras se rompen hoy. */
export const ParcialmenteDisponible: Story = {
  name: 'Parcialmente disponible',
  args: { salud: 'degraded', caidas: ['localizia', 'localizia-worker'] },
};

/** Ninguna responde: el corte es de la plataforma, no de una aplicación. */
export const Caido: Story = { name: 'Caído', args: { salud: 'down', caidas: TODAS } };

/** El monitor no contesta. No es un error de la página: es lo único que se puede decir desde aquí, y se dice. */
export const SinDatos: Story = { name: 'Sin datos', args: { estado: 'incomunicado' } };

/** Mientras se pregunta al monitor: el aviso en texto y el hueco de lo que va a llegar. */
export const Cargando: Story = { args: { estado: 'cargando' } };

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: { theme: 'dark' },
};

export const Contrato: Story = {
  name: 'Test — un h1, main-content, dieciocho aplicaciones y sus tiras',
  tags: ['!dev'],
  args: ParcialmenteDisponible.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    await expect(canvasElement.querySelector('main#main-content')).not.toBeNull();
    // La cabecera del panel no lleva índice: sin él, `SiteHeader` no monta el
    // panel y su botón de menú no existe.
    await expect(canvas.queryByRole('button', { name: 'Abrir menú' })).toBeNull();
    await expect(canvas.getAllByRole('heading', { level: 2 })).toHaveLength(APLICACIONES.length);
    await expect(canvas.getAllByRole('list', { name: /^Disponibilidad de/ })).toHaveLength(APLICACIONES.length);
    await expect(canvas.getByRole('alert').textContent).toContain('Servicio parcialmente disponible');
    await expect(canvas.getAllByText('No responde')).toHaveLength(2);
    await expect(canvas.getByRole('link', { name: 'slxd.app' })).toHaveAttribute('href', 'https://slxd.app');
  },
};

export const ContratoIncomunicado: Story = {
  name: 'Test — sin respuesta del monitor no se inventa un estado',
  tags: ['!dev'],
  args: { estado: 'incomunicado' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('alert').textContent).toContain('No podemos comprobar el servicio ahora mismo');
    await expect(canvas.queryAllByRole('heading', { level: 2 })).toHaveLength(0);
  },
};
