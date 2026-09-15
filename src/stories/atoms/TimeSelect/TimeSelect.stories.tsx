import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, userEvent, within } from 'storybook/test';
import { TimeSelect } from './TimeSelect';
import type { TimeValue } from './TimeSelect';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixtureEn as EN } from '../../../../.storybook/brandMessagesFixtureEn';

const meta: Meta<typeof TimeSelect> = {
  title: 'Atoms/TimeSelect',
  component: TimeSelect,
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof TimeSelect>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<TimeValue | null>(null);
    return (
      <TimeSelect
        {...args}
        value={value}
        onChange={(v) => { setValue(v); args.onChange?.(v); }}
      />
    );
  },
};

export const WithValue: Story = {
  render: (args) => {
    const [value, setValue] = useState<TimeValue | null>({ h: 14, m: 30 });
    return (
      <TimeSelect
        {...args}
        value={value}
        onChange={(v) => { setValue(v); args.onChange?.(v); }}
      />
    );
  },
};

export const Step15: Story = {
  name: 'Paso 15 minutos',
  render: (args) => {
    const [value, setValue] = useState<TimeValue | null>({ h: 9, m: 0 });
    return (
      <TimeSelect
        {...args}
        value={value}
        step={15}
        onChange={(v) => { setValue(v); args.onChange?.(v); }}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    value: { h: 10, m: 0 },
    disabled: true,
  },
};

export const SizeSm: Story = {
  name: 'Tamaño sm',
  render: (args) => {
    const [value, setValue] = useState<TimeValue | null>({ h: 8, m: 15 });
    return (
      <TimeSelect
        {...args}
        value={value}
        size="sm"
        onChange={(v) => { setValue(v); args.onChange?.(v); }}
      />
    );
  },
};

export const SizeLg: Story = {
  name: 'Tamaño lg',
  render: (args) => {
    const [value, setValue] = useState<TimeValue | null>({ h: 18, m: 45 });
    return (
      <TimeSelect
        {...args}
        value={value}
        size="lg"
        onChange={(v) => { setValue(v); args.onChange?.(v); }}
      />
    );
  },
};

export const ChangeMinute: Story = {
  name: 'Cambiar minuto y ver resultado',
  render: (args) => {
    const [value, setValue] = useState<TimeValue | null>({ h: 10, m: 0 });
    return (
      <TimeSelect
        {...args}
        value={value}
        step={30}
        onChange={(v) => { setValue(v); args.onChange?.(v); }}
      />
    );
  },
  play: async ({ canvas, args }) => {
    const triggers = canvas.getAllByRole('combobox');
    await userEvent.click(triggers[1]);

    // Base UI abre el popup en el siguiente frame de animación tras el mousedown
    const listbox = await within(document.body).findByRole('listbox');
    const option30 = within(listbox).getByText('30');
    await userEvent.click(option30);

    await expect(args.onChange).toHaveBeenCalledWith({ h: 10, m: 30 });
  },
};

/**
 * Los dos rótulos y las dos máscaras salen del `BrandMessagesProvider`. Las
 * máscaras están ahí porque `HH`/`MM` son la inicial de una palabra y cambian
 * con el idioma; lo que no cambia es el dibujo —dos cifras y los dos puntos—,
 * que no depende ni de la prop ni del catálogo.
 */
export const TextosDelProveedor: Story = {
  name: 'Textos desde el proveedor (otro idioma)',
  render: () => (
    <BrandMessagesProvider messages={EN}>
      <TimeSelect />
    </BrandMessagesProvider>
  ),
};

/**
 * Test: sin props, los cuatro textos salen del proveedor; con ellas, ganan las
 * props. No hay castellano de respaldo en el componente.
 */
export const Etiquetas: Story = {
  name: 'Test — etiquetas accesibles',
  tags: ['!dev'],
  render: () => (
    <>
      <div data-testid="proveedor">
        <TimeSelect />
      </div>
      <div data-testid="traducido">
        <TimeSelect
          hoursLabel="Heures"
          minutesLabel="Minutes"
          hoursPlaceholder="hh"
          minutesPlaceholder="mn"
        />
      </div>
    </>
  ),
  play: async ({ canvasElement }) => {
    // El Storybook monta el catálogo castellano en la raíz: eso es lo que se
    // lee cuando no hay prop, y no un default dentro del componente.
    const catalogo = within(canvasElement.querySelector('[data-testid="proveedor"]') as HTMLElement);
    await expect(catalogo.getByLabelText('Horas')).toBeInTheDocument();
    await expect(catalogo.getByLabelText('Minutos')).toBeInTheDocument();
    await expect(catalogo.getByText('HH')).toBeInTheDocument();
    await expect(catalogo.getByText('MM')).toBeInTheDocument();

    const fr = within(canvasElement.querySelector('[data-testid="traducido"]') as HTMLElement);
    await expect(fr.getByLabelText('Heures')).toBeInTheDocument();
    await expect(fr.getByLabelText('Minutes')).toBeInTheDocument();
    await expect(fr.getByText('hh')).toBeInTheDocument();
    await expect(fr.queryByLabelText('Horas')).toBeNull();
  },
};
