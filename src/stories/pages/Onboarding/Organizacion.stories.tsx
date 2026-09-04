import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { OnboardingPage } from './OnboardingPage';
import { Button } from '../../atoms/Button/Button';
import { Form } from '../../molecules/Form/Form';
import { InputField } from '../../molecules/InputField/InputField';
import { PageIntro } from '../../molecules/PageIntro/PageIntro';
import { Stack } from '../../atoms/Stack/Stack';

interface Args {
  theme: 'light' | 'dark';
}

function Organizacion({ theme }: Args) {
  return (
    <OnboardingPage
      current={1}
      theme={theme}
      backAction={<Button variant="outline">Atrás</Button>}
      primaryAction={<Button variant="primary" type="submit" form="alta-organizacion">Continuar</Button>}
      exitAction={<Button variant="text">Omitir por ahora</Button>}
    >
      <Stack align="stretch">
        <PageIntro title="¿Cómo se llama tu organización?" description="Es el nombre que verán tus compañeros y el que aparecerá en los documentos que compartáis." />
        <Form id="alta-organizacion" size="lg" onSubmit={(e) => e.preventDefault()}>
          <InputField id="alta-org-nombre" label="Nombre de la organización" defaultValue="Ayuntamiento de Sant Cugat" />
          <InputField id="alta-org-dominio" label="Dominio" helperText="Se usa para la dirección de tu espacio: santcugat.studiolxd.com" defaultValue="santcugat" />
        </Form>
      </Stack>
    </OnboardingPage>
  );
}

const meta: Meta<typeof Organizacion> = {
  title: 'Pages/Onboarding · Nombre de la organización',
  component: Organizacion,
  parameters: { layout: 'fullscreen' },
  args: { theme: 'light' },
  argTypes: { theme: { control: { type: 'radio' }, options: ['light', 'dark'], description: 'Tema que enseña el conmutador.' } },
};
export default meta;
type Story = StoryObj<typeof Organizacion>;

/** Paso 2 de 4: el nombre de la organización. */
export const PorDefecto: Story = {};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: { theme: 'dark' },
};

export const Contrato: Story = {
  name: 'Test — segundo paso, con Atrás y el primero alcanzable',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvasElement).toHaveTextContent('Paso 2 de 4');
    await expect(canvas.getByRole('button', { name: 'Atrás' })).toHaveClass('button--outline');
    const progreso = canvas.getByRole('list', { name: 'Progreso' });
    // Solo el paso ya hecho es alcanzable; los pendientes nunca.
    await expect(within(progreso).getAllByRole('button')).toHaveLength(1);
  },
};
