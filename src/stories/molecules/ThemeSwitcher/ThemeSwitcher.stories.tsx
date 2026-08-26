import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import { ThemeSwitcher, type Theme } from './ThemeSwitcher';
import { Container } from '../../atoms/Container/Container';

function Controlado(props: React.ComponentProps<typeof ThemeSwitcher>) {
  const [value, setValue] = useState<Theme>(props.value);
  return <ThemeSwitcher {...props} value={value} onChange={setValue} />;
}

const meta: Meta<typeof ThemeSwitcher> = {
  title: 'Molecules/ThemeSwitcher',
  component: ThemeSwitcher,
  parameters: { layout: 'padded' },
  args: { value: 'system' },
  argTypes: {
    value: { control: 'select', options: ['light', 'dark', 'system'] },
    variant: { control: 'select', options: ['compact', 'list'] },
    className: { table: { disable: true } },
  },
  render: (args) => <Controlado {...args} />,
};
export default meta;

type Story = StoryObj<typeof ThemeSwitcher>;

/** En el panel: un `DropdownField` con la etiqueta delante y el tema actual en el control. */
export const Compacto: Story = {};

/** En el pie: las tres opciones desplegadas. */
export const Lista: Story = {
  args: { variant: 'list' },
};

/** Sobre superficie oscura. */
export const SuperficieOscura: Story = {
  args: { variant: 'list', value: 'dark' },
  render: (args) => (
    <Container surface="dark" space="md">
      <Controlado {...args} />
    </Container>
  ),
};

export const Contrato: Story = {
  name: 'Test — menú de opciones exclusivas, cambio anunciado',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const boton = canvas.getByRole('button', { name: 'Tema' });
    await expect(boton.textContent).toContain('Sistema');
    await userEvent.click(boton);
    const opciones = await within(document.body).findAllByRole('menuitemradio');
    await expect(opciones).toHaveLength(3);
    await expect(within(document.body).getByRole('menuitemradio', { name: 'Sistema' })).toHaveAttribute('aria-checked', 'true');
    await userEvent.click(within(document.body).getByRole('menuitemradio', { name: 'Oscuro' }));
    await expect(canvas.getByRole('button', { name: 'Tema' }).textContent).toContain('Oscuro');
  },
};

export const ContratoLista: Story = {
  name: 'Test — la lista marca el tema actual',
  tags: ['!dev'],
  args: { variant: 'list' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const grupo = canvas.getByRole('group', { name: 'Tema' });
    // la actual no es un botón: es un dato marcado con aria-current
    await expect(within(grupo).queryByRole('button', { name: 'Sistema' })).toBeNull();
    await expect(within(grupo).getByText('Sistema').closest('[aria-current]')).not.toBeNull();
    await userEvent.click(within(grupo).getByRole('button', { name: 'Claro' }));
    await expect(within(grupo).queryByRole('button', { name: 'Claro' })).toBeNull();
    await expect(within(grupo).getByRole('button', { name: 'Sistema' })).toBeInTheDocument();
  },
};
