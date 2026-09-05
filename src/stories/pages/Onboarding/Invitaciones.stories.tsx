import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { OnboardingPage } from './OnboardingPage';
import { Button } from '../../atoms/Button/Button';
import { Form } from '../../molecules/Form/Form';
import { InputField } from '../../molecules/InputField/InputField';
import { SelectField } from '../../molecules/SelectField/SelectField';
import { PageIntro } from '../../molecules/PageIntro/PageIntro';
import { FieldRow, FieldRows } from '../../molecules/FieldRow/FieldRow';
import { Icon } from '../../atoms/Icon/Icon';
import { Stack } from '../../atoms/Stack/Stack';

const ROLES = [
  { value: 'admin', label: 'Administración' },
  { value: 'editor', label: 'Edición' },
  { value: 'lectura', label: 'Solo lectura' },
];

const FILAS = [
  { id: '1', correo: 'nuria.serra@santcugat.cat', rol: 'admin' },
  { id: '2', correo: 'marc.oliva@santcugat.cat', rol: 'editor' },
  { id: '3', correo: '', rol: 'lectura' },
];

interface Args {
  theme: 'light' | 'dark';
}

function Invitaciones({ theme }: Args) {
  return (
    <OnboardingPage
      current={3}
      theme={theme}
      backAction={<Button variant="outline">Atrás</Button>}
      primaryAction={<Button variant="primary" type="submit" form="alta-invitaciones">Enviar invitaciones</Button>}
      exitAction={<Button variant="text">Omitir por ahora</Button>}
    >
      <Stack align="stretch">
        <PageIntro title="Invita a tu equipo" />
        <Form
          id="alta-invitaciones"
          size="lg"
          onSubmit={(e) => e.preventDefault()}
          actions={<Button variant="outline">Añadir otra persona</Button>}
        >
          <FieldRows>
            {FILAS.map((fila) => (
              <FieldRow
                key={fila.id}
                widths={['grow', 'md']}
                action={
                  <Button
                    variant="ghost"
                    iconOnly
                    disabled={FILAS.length === 1}
                    aria-label={fila.correo ? `Quitar a ${fila.correo}` : 'Quitar la fila vacía'}
                  >
                    <Icon name="close" />
                  </Button>
                }
              >
                <InputField
                  id={`invitacion-correo-${fila.id}`}
                  label="Correo electrónico"
                  type="email"
                  autoComplete="off"
                  placeholder="nombre@organizacion.cat"
                  defaultValue={fila.correo}
                />
                <SelectField
                  id={`invitacion-rol-${fila.id}`}
                  label="Papel"
                  options={ROLES}
                  defaultValue={fila.rol}
                />
              </FieldRow>
            ))}
          </FieldRows>
        </Form>
      </Stack>
    </OnboardingPage>
  );
}

const meta: Meta<typeof Invitaciones> = {
  title: 'Pages/Onboarding · Invitaciones',
  component: Invitaciones,
  parameters: { layout: 'fullscreen' },
  args: { theme: 'light' },
  argTypes: { theme: { control: { type: 'radio' }, options: ['light', 'dark'], description: 'Tema que enseña el conmutador.' } },
};
export default meta;
type Story = StoryObj<typeof Invitaciones>;

/** Paso 4 de 4: la lista de invitaciones en `FieldRows`. El correo crece, el papel lleva su ancho y el aspa va al final, fuera de la columna de los campos; la etiqueta solo se ve en la primera fila. */
export const PorDefecto: Story = {};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: { theme: 'dark' },
};

export const Contrato: Story = {
  name: 'Test — último paso, tres filas y la principal cierra el alta',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvasElement).toHaveTextContent('Paso 4 de 4');
    await expect(canvas.getAllByLabelText('Correo electrónico')).toHaveLength(3);
    await expect(canvas.getByRole('button', { name: 'Enviar invitaciones' })).toHaveClass('button--primary');
    const progreso = canvas.getByRole('list', { name: 'Progreso' });
    await expect(within(progreso).getAllByRole('button')).toHaveLength(3);
  },
};
