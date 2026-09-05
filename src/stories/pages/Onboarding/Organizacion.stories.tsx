import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { OnboardingPage } from './OnboardingPage';
import { Button } from '../../atoms/Button/Button';
import { Form } from '../../molecules/Form/Form';
import { InputField } from '../../molecules/InputField/InputField';
import { PageIntro } from '../../molecules/PageIntro/PageIntro';
import { Stack } from '../../atoms/Stack/Stack';

interface Args {
  opcional: boolean;
  theme: 'light' | 'dark';
}

function Organizacion({ opcional, theme }: Args) {
  return (
    <OnboardingPage
      current={1}
      theme={theme}
      primaryAction={<Button variant="primary" type="submit" form="alta-organizacion">Continuar</Button>}
      exitAction={opcional ? <Button variant="text">Omitir</Button> : undefined}
    >
      <Stack align="stretch">
        <PageIntro title="Pon nombre a tu organización" />
        <Form id="alta-organizacion" size="lg" onSubmit={(e) => e.preventDefault()}>
          <InputField
            id="create-org-name"
            label="Nombre de la organización"
            placeholder="Escribe el nombre de tu organización"
            defaultValue="Ayuntamiento de Sant Cugat"
          />
        </Form>
      </Stack>
    </OnboardingPage>
  );
}

const meta: Meta<typeof Organizacion> = {
  title: 'Pages/Onboarding · Nombre de la organización',
  component: Organizacion,
  parameters: { layout: 'fullscreen' },
  args: { opcional: false, theme: 'light' },
  argTypes: {
    opcional: { description: 'Crear organización se ofrece pero no se exige: entonces, y solo entonces, hay salida.' },
    theme: { control: { type: 'radio' }, options: ['light', 'dark'], description: 'Tema que enseña el conmutador.' },
  },
};
export default meta;
type Story = StoryObj<typeof Organizacion>;

/**
 * Paso 2 de 4: el nombre de la organización, y nada más — es el campo que la
 * crea. Ningún paso es alcanzable todavía: el perfil no es un destino y el
 * logotipo y las invitaciones no existen sin la organización.
 */
export const PorDefecto: Story = {};

/** Cuando crear organización se ofrece pero no se exige, aparece la salida. */
export const Opcional: Story = { args: { opcional: true } };

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: { theme: 'dark' },
};

export const Contrato: Story = {
  name: 'Test — segundo paso, sin Atrás y sin ningún paso alcanzable',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvasElement).toHaveTextContent('Paso 2 de 4');
    await expect(canvas.queryByRole('button', { name: 'Atrás' })).toBeNull();
    await expect(canvas.getByLabelText('Nombre de la organización')).toBeInTheDocument();
    const progreso = canvas.getByRole('list', { name: 'Progreso' });
    // Nada que pulsar: el perfil no es un destino, y los dos pasos siguientes
    // no existen hasta que esta pantalla cree la organización.
    await expect(within(progreso).queryAllByRole('button')).toHaveLength(0);
  },
};
