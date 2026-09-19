import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { OrgChart, type OrgChartNode } from './OrgChart';
import { Link } from '../../atoms/Link/Link';
import { SOLO_OSCURO } from '../../utils/chromaticModes';

const meta = {
  title: 'Organisms/OrgChart',
  component: OrgChart,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof OrgChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const persona = (id: string, name: string, role?: string) => ({
  id,
  name,
  label: <Link href={`#${id}`} tone="ink">{name}</Link>,
  role,
});

const DEPARTAMENTOS: OrgChartNode[] = [
  {
    id: 'dir',
    name: 'Dirección',
    managers: [persona('p1', 'Elena Sarrià', 'Directora general')],
    members: [persona('p2', 'Tomás Rueda', 'Asistencia de dirección')],
    children: [
      {
        id: 'tec',
        name: 'Tecnología',
        managers: [persona('p3', 'Nuria Oliva', 'CTO')],
        members: [
          persona('p4', 'Alicia Benítez', 'Front'),
          persona('p5', 'Ignacio Puente', 'Back'),
        ],
        children: [
          {
            id: 'plat',
            name: 'Plataforma',
            managers: [persona('p6', 'Julio Vidal', 'Lead')],
            members: [persona('p7', 'Rosa Cabanes', 'SRE')],
          },
          {
            id: 'sop',
            name: 'Soporte',
            managers: [],
            members: [persona('p8', 'Marta Ferrer', 'N2'), persona('p9', 'Daniel Sanz', 'N1')],
          },
        ],
      },
      {
        id: 'per',
        name: 'Personas',
        managers: [persona('p10', 'Alicia Roldán', 'Directora de personas')],
        members: [persona('p11', 'Pau Estévez', 'Selección')],
      },
      {
        id: 'fin',
        name: 'Finanzas',
        managers: [persona('p12', 'Óscar Lamas', 'Controller')],
        members: [],
        children: [
          {
            id: 'adm',
            name: 'Administración',
            managers: [],
            members: [persona('p13', 'Lucía Arroyo', 'Facturación')],
          },
        ],
      },
    ],
  },
];

export const PorDefecto: Story = {
  args: { nodes: DEPARTAMENTOS, label: 'Organigrama de Studio LXD' },
};

export const ConRamasPlegadas: Story = {
  name: 'Con ramas plegadas',
  args: { nodes: DEPARTAMENTOS, label: 'Organigrama de Studio LXD', defaultCollapsed: ['tec', 'fin'] },
};

export const SoloDepartamentos: Story = {
  name: 'Solo los departamentos',
  args: { nodes: DEPARTAMENTOS, label: 'Organigrama de Studio LXD', showPeople: false },
};

export const Alejado: Story = {
  args: { nodes: DEPARTAMENTOS, label: 'Organigrama de Studio LXD', defaultZoom: 0.7 },
};

export const SinControles: Story = {
  name: 'Sin controles de zoom',
  args: { nodes: DEPARTAMENTOS, label: 'Organigrama de Studio LXD', showZoom: false },
};

export const UnSoloDepartamento: Story = {
  name: 'Un solo departamento',
  args: {
    nodes: [DEPARTAMENTOS[0].children![1]],
    label: 'Organigrama de Personas',
  },
};

export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  args: { nodes: DEPARTAMENTOS, label: 'Organigrama de Studio LXD' },
  parameters: { surface: 'dark', chromatic: SOLO_OSCURO },
};

export const TestPlegar: Story = {
  name: 'Test — plegar una rama esconde sus hijos',
  tags: ['!dev'],
  args: { nodes: DEPARTAMENTOS, label: 'Organigrama de Studio LXD' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Plataforma')).toBeInTheDocument();

    const botón = canvas.getByRole('button', { name: 'Plegar Tecnología' });
    expect(botón).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(botón);

    expect(canvas.queryByText('Plataforma')).not.toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Desplegar Tecnología' })).toHaveAttribute('aria-expanded', 'false');
  },
};
