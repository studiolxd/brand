import type { Meta, StoryObj } from '@storybook/react-vite';
import { DescriptionList } from './DescriptionList';

const meta = {
  title: 'Atoms/DescriptionList',
  component: DescriptionList,
  tags: ['autodocs'],
} satisfies Meta<typeof DescriptionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: null },
  render: () => (
    <DescriptionList>
      <dt>Cliente</dt><dd>Studio LXD</dd>
      <dt>Servicio</dt><dd>Diseño de producto y marca</dd>
      <dt>Año</dt><dd>2024</dd>
      <dt>Sector</dt><dd>Tecnología creativa</dd>
      <dt>Sitio web</dt><dd>studiolxd.com</dd>
    </DescriptionList>
  ),
};

export const ConTextoLargo: Story = {
  args: { children: null },
  render: () => (
    <DescriptionList>
      <dt>Descripción</dt>
      <dd>
        Estudio de diseño especializado en identidad visual, sistemas de diseño y
        desarrollo de producto digital para empresas tecnológicas.
      </dd>
      <dt>Tecnologías</dt>
      <dd>React, TypeScript, Figma, Storybook, Style Dictionary</dd>
      <dt>Estado</dt><dd>Activo</dd>
    </DescriptionList>
  ),
};
